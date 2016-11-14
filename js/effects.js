var PARTICLES = []; //list of div ids
var NUM_PARTICLES = 0;
var ENABLE_PARTICLES = true;


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


var ALL_SPRITES = {
  'bolt': 'img/bolt.png',
  'water': 'img/ing/water.png',
  'coal': 'img/ing/coal.png',
  'red_herb': 'img/ing/red_herb.png',
  'fresh_herb': 'img/ing/fresh_herb.png',
  'steel': 'img/ing/steel.png',
  'flint': 'img/ing/flint.png',
  'ice': 'img/ing/ice.png',
  'magic_ore': 'img/ing/magic_ore.png',
  'goats_eye': 'img/ing/goats_eye.png',
  'heat': 'img/ing/heat.png',
  'steam': 'img/ing/steam.png',
  'wormwood': 'img/ing/wormwood.png',
  'kingly_rosemary': 'img/ing/kingly_rosemary.png',


  'fluxball': 'img/research/fluxball.png',
};

function initCanvas() {
  canvas = document.getElementById("particle-canvas");
  ctx = canvas.getContext("2d");
  makeFullscreen();

  for (var key in ALL_SPRITES) {
    SPRITES[key] = new Image();
    SPRITES[key].src = ALL_SPRITES[key];
  }

}
// thanks kushify
function makeFullscreen() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', makeFullscreen);


var BACKGROUND_PARTICLES = [];

function createParticle(type) {
  if (ENABLE_PARTICLES) {
    var x = 50;
    var vel_x = 0;
    var vel_y = 1;
    if (type == 'bolt') {
      x = getRandomInt(0, document.getElementById('infobox').getBoundingClientRect().right);
      var element = document.getElementById('energy-display');
      var rect = getBoundingRect(element);
      var y_target = rect.top - 10;
      var x_target = rect.right - 25;
    } else {
      var ing_box_rect = document.getElementById('ingredientbox').getBoundingClientRect();
      x = getRandomInt(ing_box_rect.left, ing_box_rect.right);
      var element = document.getElementById('ing-'+type);
      var rect = getBoundingRect(element);
      var y_target = rect.top + 10;
      var x_target = rect.right - 30;
    }

    vel_x = (x_target - x);
    vel_y = (y_target - 0);
    var len = Math.sqrt(Math.pow(vel_x, 2) + Math.pow(vel_y, 2));
    vel_x /= len;
    vel_y /= len;

    BACKGROUND_PARTICLES.push({'sprite': SPRITES[type], 'x': x, 'y': 0, 'width': 30, 'height': 30, 'vely': vel_y * 3, 'velx': vel_x * 3, 'targetx': x_target, 'targety': y_target});
  }
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
    top: rect.top - margin.top + window.scrollY,
    bottom: rect.bottom - margin.bottom - padding.top - padding.bottom - border.bottom + window.scrollY,
  };
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  return rect;

};
