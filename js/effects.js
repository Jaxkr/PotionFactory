var PARTICLES = []; //list of div ids
var NUM_PARTICLES = 0;


function animation() {
  for (var i = PARTICLES.length - 1; i >= 0; i--) {
    var pos = $('#'+PARTICLES[i]).css("top");
    pos = pos.substring(0, pos.length - 2);
    $('#'+PARTICLES[i]).css("top", pos - 1);
    if (pos < 200) {
      $('#'+PARTICLES[i]).remove();
      PARTICLES.splice(i, 1);
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = BACKGROUND_PARTICLES.length - 1; i >= 0; i--) {
    var p = BACKGROUND_PARTICLES[i];
    ctx.drawImage(p.sprite, p.x, p.y, p.width, p.height);
    p.y += p.vely;
    p.x += p.velx;
    p.velx *= 1.02;
    p.vely *= 1.02;
    if (p.y > p.targety) {
      BACKGROUND_PARTICLES.splice(i, 1);
    }
  }
  window.requestAnimationFrame(animation);
}


var CLICK_PHRASES = ['More energy!', 'Great scott!', 'Potions incoming!', 'More power!'];

var canvas;
var width;
var height;
var ctx;

var SPRITES = [];

function initCanvas() {
  canvas = document.getElementById("particle-canvas");
  ctx = canvas.getContext("2d");
  makeFullscreen();
  SPRITES['bolt'] = new Image();SPRITES['bolt'].src = 'img/bolt.png';
  SPRITES['water'] = new Image; SPRITES['water'].src = 'img/water.png';
  SPRITES['coal'] = new Image; SPRITES['coal'].src = 'img/coal.png';
}
// thanks kushify
function makeFullscreen() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', makeFullscreen);


var BACKGROUND_PARTICLES = [];

function createParticle(type) {
  var x = getRandomInt(0, canvas.width);
  var vel_x = 0;
  var vel_y = 1;
  if (type == 'bolt') {
    var element = document.getElementById('energy-display');
    var rect = element.getBoundingClientRect();
    var y_target = rect.top - 10;
    var x_target = rect.left - 10;
  } else {
    var element = document.getElementById('ing-'+type);
    var rect = getBoundingRect(element);
    var y_target = rect.top + ((rect.bottom - rect.top) / 2);
    var x_target = rect.left + ((rect.right - rect.left) / 2);
  }

  vel_x = (x_target - x);
  vel_y = (y_target - 0);
  var len = Math.sqrt(Math.pow(vel_x, 2) + Math.pow(vel_y, 2));
  vel_x /= len;
  vel_y /= len;

  BACKGROUND_PARTICLES.push({'sprite': SPRITES[type], 'x': x, 'y': 0, 'width': 30, 'height': 30, 'vely': vel_y * 3, 'velx': vel_x * 3, 'targetx': x_target, 'targety': y_target});
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function getBoundingRect(element) {

    var style = window.getComputedStyle(element);
    var margin = {
        left: parseInt(style["margin-left"]),
        right: parseInt(style["margin-right"]),
        top: parseInt(style["margin-top"]),
        bottom: parseInt(style["margin-bottom"])
    };
    var padding = {
        left: parseInt(style["padding-left"]),
        right: parseInt(style["padding-right"]),
        top: parseInt(style["padding-top"]),
        bottom: parseInt(style["padding-bottom"])
    };
    var border = {
        left: parseInt(style["border-left"]),
        right: parseInt(style["border-right"]),
        top: parseInt(style["border-top"]),
        bottom: parseInt(style["border-bottom"])
    };


    var rect = element.getBoundingClientRect();
    rect = {
        left: rect.left - margin.left,
        right: rect.right - margin.right - padding.left - padding.right,
        top: rect.top - margin.top,
        bottom: rect.bottom - margin.bottom - padding.top - padding.bottom - border.bottom
    };
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    return rect;

};
