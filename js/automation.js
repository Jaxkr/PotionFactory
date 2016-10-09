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


function getRecipeUpgradeCost(name) {
  var price = Math.floor(1 * Math.pow(1.04, PLAYER_DATA['AUTOMATED_RECIPES'][name]))
  return price;
}
function getActionUpgradeCost(name) {
  var price = Math.floor(1 * Math.pow(1.04, PLAYER_DATA['AUTOMATED_ACTIONS'][name]))
  return price;
}
