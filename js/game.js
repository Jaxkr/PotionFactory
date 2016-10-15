// player prefs
var PLAYER_DATA = {};
PLAYER_DATA['UNLOCKED_INGREDIENTS'] = ['water'];
PLAYER_DATA['UNLOCKED_ACTIONS'] = [];
PLAYER_DATA['UNLOCKED_RESEARCH'] = [];


PLAYER_DATA['INGREDIENT_QUANTITIES'] = {};
function getIngredientQuantity(name) {
  if (name in PLAYER_DATA['INGREDIENT_QUANTITIES']) {
    return PLAYER_DATA['INGREDIENT_QUANTITIES'][name];
  } else {
    PLAYER_DATA['INGREDIENT_QUANTITIES'][name] = 0;
    return 0;
  }
}
PLAYER_DATA['EXPERIENCE'] = 0;
PLAYER_DATA['EXPERIENCE_BAR_SIZE'] = 5;
PLAYER_DATA['LEVEL'] = 1;
PLAYER_DATA['ENERGY'] = 0;
PLAYER_DATA['GOLD'] = 0;

PLAYER_DATA['LAST_SAVED'] = Math.round(new Date().getTime() / 1000);

PLAYER_DATA['RESEARCHED'] = {} //key: number owned, price to player

PLAYER_DATA['NUM_GOLEMS'] = 3;

PLAYER_DATA['DISCOVERED_RECIPES'] = [];

PLAYER_DATA['AUTOMATED_RECIPES'] = {};
PLAYER_DATA['AUTOMATED_ACTIONS'] = {};

PLAYER_DATA['UNLOCKED_PANES'] = ['info', 'recipes', 'golems', 'ingredients', 'research', 'tools', 'messages'];

PLAYER_DATA['CURRENT_ORDERS'] = []; // potion/ingredient, gold each, qty

unlockResearch('powerful_cranks'); unlockResearch('auto_cranker');
unlockAction('gather_water');

var GOLEMS_ARE_ENABLED = true;



//helper globals
var CURRENT_ACTIONS = []; //name, time total, time remaining

$(document).ready(function() {
  initCanvas();
  loadGame();
  displayIngredients();
  displayActions();
  refreshInfo();
  refreshIngredientCountDisplay();
  displayResearch();
  displayRecipes();
  displayGolems();
  refreshResearchInfo();
  displayClicker();
  logMessage('You open the door to your potion room. Inside, your crew of assistant golems lie dormant, waiting for your command.');
  updateXPBar();
  resume();
  showPanes();
  displayOrders();
  $('.tooltip').tooltipster();
  if (PLAYER_DATA['UNLOCKED_PANES'].indexOf('orders') > -1) {
    setTimeout(newOrder, getRandomInt(20 * 1000, 600 * 1000)); // 20 and 600 seconds
  }

  $('.orders').droppable({
    classes: {
      "ui-droppable-hover": "ingredienthover",
    },
    drop: function(event, ui) {
      processDrop($(ui.draggable).data("type"));
    }
  });


  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 800) {
    alert("This game does not work on mobile devices. Sorry! If you're not on a touch device, you can ignore this message.");
  }

  window.requestAnimationFrame(animation);

});

function resume() {
  var current_time = Math.round(new Date().getTime() / 1000);
  var delta = current_time - PLAYER_DATA['LAST_SAVED'];
  if (delta > 30) {
    var welcome_back_string = "<ul>";
    delta = Math.ceil(delta/2);
    var energy_per_second = getEnergyPerSecond();
    PLAYER_DATA['ENERGY'] += energy_per_second * delta;
    welcome_back_string += '<li>Generated ' + energy_per_second * delta + ' energy</li>';

    for (var key in PLAYER_DATA['AUTOMATED_ACTIONS']) {
      var action = ALL_ACTIONS[key];
      if (PLAYER_DATA['AUTOMATED_ACTIONS'][key] > 0) {
        var output = Math.round((PLAYER_DATA['AUTOMATED_ACTIONS'][key] / ALL_ACTIONS[key].time) * delta);
        if (PLAYER_DATA['ENERGY'] > action.energycost * output) {
          PLAYER_DATA['ENERGY'] -= action.energycost * output;
          PLAYER_DATA['INGREDIENT_QUANTITIES'][action.output] += action.quantity * output;
          welcome_back_string += '<li>Gathered ' + action.quantity * output + ' ' + ALL_INGREDIENTS[ALL_ACTIONS[key].output].name + '</li>';
        }
      }
    }

    for (var key in PLAYER_DATA['AUTOMATED_RECIPES']) {
      if (PLAYER_DATA['AUTOMATED_RECIPES'][key] > 0) {
        var ingredients = key.split(',');
        var capable_of = getCapableOf(key);
        capable_of = Math.min(delta, capable_of);
        switch (key) {
          case 'magic_ore,spark':
          PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[key][0][0]] -= ALL_RECIPES[key][0][1] * capable_of;
          PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[key][1][0]] -= ALL_RECIPES[key][1][1] * capable_of;
          PLAYER_DATA['NUM_GOLEMS'] += 1 * capable_of;
          break;
          default:
          PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[key][0][0]] -= ALL_RECIPES[key][0][1] * capable_of;
          PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[key][1][0]] -= ALL_RECIPES[key][1][1] * capable_of;
          PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[key][2][0]] += ALL_RECIPES[key][2][1] * capable_of;
        }
        welcome_back_string += '<li>Crafted ' + capable_of + ' ' + ALL_INGREDIENTS[ALL_RECIPES[key][2][0]].name + '</li>';
      }
    }


    welcome_back_string += '</ul>'
    $('#welcomeback').append(welcome_back_string);
    $('#welcomeback').show();
    refreshInfo();
    refreshIngredientCountDisplay();
  }
}

function refreshIngredientCountDisplay() {
  for (var i = 0; i < PLAYER_DATA['UNLOCKED_INGREDIENTS'].length; i++) {
    $('#ing-' + PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]).find('.ing-qty').html(getIngredientQuantity(PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]));
  }
}
function refreshInfo() {
  $('#energy-display').html(PLAYER_DATA['ENERGY']);
  $('#energy-per-second').html(getEnergyPerSecond() + ' energy/sec.');
  $('#energy-cost-per-second').html('Using ' + getEnergyCostPerSecond() + ' energy/sec.');
  $('#gold-display').html(PLAYER_DATA['GOLD']);
}

function logMessage(message) {
  var timestamp = new Date().toLocaleTimeString();
  $('#message-log').append(timestamp + ': ' + message + "<br>");
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function performAction(name) {
  $('#' + name + '-progressbar').show();

  if (PLAYER_DATA['ENERGY'] >= ALL_ACTIONS[name]['energycost']) {
    ACTION_QUEUE.push(name);
    PLAYER_DATA['ENERGY'] -= ALL_ACTIONS[name]['energycost'];
  } else {
    $.growl.error({title: "Golem says no.", message: "Not enough energy to perform that action."});
  }

  refreshInfo();
}
function actionComplete(name) {
  var output_name = ALL_ACTIONS[name].output;
  var this_quantity = getIngredientQuantity(output_name);
  PLAYER_DATA['INGREDIENT_QUANTITIES'][output_name] = this_quantity + ALL_ACTIONS[name].quantity;
  givexp(ALL_ACTIONS[name].xp);

  if (output_name in SPRITES) {
    createParticle(output_name);
  }

  updateXPBar();
  refreshIngredientCountDisplay();
}
