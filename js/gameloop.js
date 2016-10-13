var MS_PER_TICK = 70;
var running = true;

setInterval(function () {
  if (CURRENT_ACTIONS.length < PLAYER_DATA['NUM_GOLEMS'] && ACTION_QUEUE.length > 0) {
    var action_to_add = ACTION_QUEUE.shift();
    CURRENT_ACTIONS.push([action_to_add, ALL_ACTIONS[action_to_add]['time'], ALL_ACTIONS[action_to_add]['time']]); // name, total, remaining
  }

  for (var i = 0; i < CURRENT_ACTIONS.length; i++) {
    CURRENT_ACTIONS[i][2] -= MS_PER_TICK / 1000;
    var currentPercentage = ((CURRENT_ACTIONS[i][1] - CURRENT_ACTIONS[i][2]) / (CURRENT_ACTIONS[i][1])) * 100;

    if (CURRENT_ACTIONS[i][2] <= 0) {
      actionComplete(CURRENT_ACTIONS[i][0]);
      CURRENT_ACTIONS.splice(i, 1);
    }

  }
  showGolemActions();
}, MS_PER_TICK);


// research/automation loop

var LOOP_TICKS = {};

setInterval(function() {

  PLAYER_DATA['ENERGY'] += getEnergyPerSecond();
  var energy_particle_count = Math.max(Math.min(30, getEnergyPerSecond()), 0);
  for (var i = 0; i < energy_particle_count; i++) {
    createParticle('bolt');
  }

  if (GOLEMS_ARE_ENABLED) {
    for (var key in PLAYER_DATA['AUTOMATED_RECIPES']) {
      var ingredients = key.split(',');
      var capable_of = getCapableOf(key);
      capable_of = Math.min(capable_of, PLAYER_DATA['AUTOMATED_RECIPES'][key]);
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

    }
    // this may be the best thing i've ever written. first try and it worked. so proud.
    // i am so happy.
    for (var key in PLAYER_DATA['AUTOMATED_ACTIONS']) {
      if (!(key in LOOP_TICKS)) {
        LOOP_TICKS[key] = 0;
      }
      var action_time = ALL_ACTIONS[key].time;
      var action_qty = PLAYER_DATA['AUTOMATED_ACTIONS'][key];
      if (action_qty > 0) {
        if (LOOP_TICKS[key] == action_time - 1) {
          var action = ALL_ACTIONS[key];
          if (PLAYER_DATA['ENERGY'] > action.energycost * action_qty) {
            var output_name = action.output;
            PLAYER_DATA['INGREDIENT_QUANTITIES'][output_name] += action.quantity * action_qty;
            if (output_name in SPRITES)
            createParticle(output_name);
            givexp(action.xp * action_qty);
            PLAYER_DATA['ENERGY'] -= action.energycost * action_qty;
          }
          LOOP_TICKS[key] = 0;
        } else {
          LOOP_TICKS[key] += 1;
        }
      }

    }
  }
  refreshInfo();
  updateXPBar();
  refreshIngredientCountDisplay();
}, 1000);

document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    document.title = '*Potion Factory*';
    MS_PER_TICK = 1000;
  } else {
    document.title = 'Potion Factory';
    MS_PER_TICK = 70;
  }
}, false);
