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
  window.requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);


var CLICK_PHRASES = ['More energy!', 'Great scott!', 'Potions incoming!', 'More power!'];
