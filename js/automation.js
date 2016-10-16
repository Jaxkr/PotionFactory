function automateRecipe(name) {
  var price = getRecipeUpgradeCost(name);
  if (PLAYER_DATA['NUM_GOLEMS'] >= price + 3) {
    PLAYER_DATA['AUTOMATED_RECIPES'][name] += 1;
    PLAYER_DATA['NUM_GOLEMS'] -= price;
  } else {
    $.growl.error({title: 'Insufficient golems', message: "You cannot have less than 3 golems. Another automation will use " + price + " golems."});
  }
  displayGolems();
  displayRecipes();
}

function removeRecipeAutomation(name) {
  if (PLAYER_DATA['AUTOMATED_RECIPES'][name] > 0) {
    PLAYER_DATA['AUTOMATED_RECIPES'][name] -= 1;
    var price = getRecipeUpgradeCost(name);
    PLAYER_DATA['NUM_GOLEMS'] += price;
  } else {
    $.growl.error({title: "Cannot remove automation.", "message": "You don't have any golems assigned to this recipe."})
  }

  displayGolems();
  displayRecipes();
}

function automateAction(name) {
  var price = getActionUpgradeCost(name);
  if (PLAYER_DATA['NUM_GOLEMS'] >= price + 3) {
    PLAYER_DATA['AUTOMATED_ACTIONS'][name] += 1;
    PLAYER_DATA['NUM_GOLEMS'] -= price;
  } else {
    $.growl.error({title: 'Insufficient golems', message: "You cannot have less than 3 golems. Another automation will use " + price + " golems."});
  }
  displayGolems();
  displayActions();
}

function removeActionAutomation(name) {
  if (PLAYER_DATA['AUTOMATED_ACTIONS'][name] > 0) {
    PLAYER_DATA['AUTOMATED_ACTIONS'][name] -= 1;
    var price = getActionUpgradeCost(name);
    PLAYER_DATA['NUM_GOLEMS'] += price;
  } else {
    $.growl.error({title: "Cannot remove automation.", "message": "You don't have any golems assigned to this action."})
  }

  displayGolems();
  displayActions();
}


function getRecipeUpgradeCost(name) {
  var price = Math.ceil(1 * Math.pow(1.2, PLAYER_DATA['AUTOMATED_RECIPES'][name]))
  return price;
}
function getActionUpgradeCost(name) {
  var price = Math.floor(1 * Math.pow(1.1, PLAYER_DATA['AUTOMATED_ACTIONS'][name]))
  return price;
}

function getEnergyCostPerSecond() {
  var eps = 0;
  for (var key in PLAYER_DATA['AUTOMATED_ACTIONS']) {
    var action = ALL_ACTIONS[key];
    var qty = PLAYER_DATA['AUTOMATED_ACTIONS'][key]
    eps += Math.round((action.energycost * qty)/action.time);
  }
  return eps;
}
