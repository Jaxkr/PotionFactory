function combineIngredients(ing1, ing2, show_output) {
  var ingredients = [ing1, ing2].sort();
  var success = false;
  if (show_output != false) {
    show_output = true;
  }

  var ingredients_string = ingredients[0] + ',' +  ingredients[1];

  if (ingredients_string in ALL_RECIPES) {
    if ( (getIngredientQuantity(ingredients[0]) < ALL_RECIPES[ingredients_string][0][1]) || (getIngredientQuantity(ingredients[1]) < ALL_RECIPES[ingredients_string][1][1]) ) {
      if (show_output)
      $.growl.error({title: 'Insufficient resources', message: "You need " + ALL_RECIPES[ingredients_string][0][1] + ' ' + ALL_INGREDIENTS[ingredients[0]].name + " and " + ALL_RECIPES[ingredients_string][1][1] + ' ' + ALL_INGREDIENTS[ingredients[1]].name + "."});
    } else {
      success = true;
      // to handle special cases
      switch (ingredients_string) {
        case 'magic_ore,spark':
        PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[ingredients_string][0][0]] -= ALL_RECIPES[ingredients_string][0][1];
        PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[ingredients_string][1][0]] -= ALL_RECIPES[ingredients_string][1][1];
        PLAYER_DATA['NUM_GOLEMS'] += 1;
        break;
        default:
        unlockIngredient(ALL_RECIPES[ingredients_string][2][0]);
        PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[ingredients_string][0][0]] -= ALL_RECIPES[ingredients_string][0][1];
        PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[ingredients_string][1][0]] -= ALL_RECIPES[ingredients_string][1][1];
        PLAYER_DATA['INGREDIENT_QUANTITIES'][ALL_RECIPES[ingredients_string][2][0]] += ALL_RECIPES[ingredients_string][2][1];
        if (ALL_RECIPES[ingredients_string][4])
        givexp(ALL_RECIPES[ingredients_string][4]);
      }
      if (show_output && ALL_RECIPES[ingredients_string][3])
      logMessage(ALL_RECIPES[ingredients_string][3]);
    }

  } else {
    $.growl({title: "Nothing happened.", message: 'You tried to combine ' + ingredientName(ingredients[0]) + ' and ' + ingredientName(ingredients[1]) + ', but nothing happened.'});
  }




  //OLD METHOD
  /*

  if (ingredients.equals(['flint', 'steel'])) {
    if (getIngredientQuantity('flint') < 1) {
      if (show_output)
      $.growl.error({title: 'Insufficient resources', message: "You don't have any flint."});
    } else {
      if (show_output)
      logMessage("The flint and steel collide with one-another to create a spark! The flint crumbles in the process.");
      unlockIngredient('spark');
      var spark_qty = getIngredientQuantity('spark');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['spark'] = spark_qty + 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['flint'] -= 1;
      success = true;
    }
  }
  else if (ingredients.equals(['coal', 'spark'])) {
    if (getIngredientQuantity('spark') < 1) {
      if (show_output)
      $.growl.error({title: 'Insufficient resources', message: "You don't have any sparks."});
      return;
    } else if (getIngredientQuantity('coal') < 1) {
      if (show_output)
      $.growl.error({title: 'Insufficient resources', message: "You don't have enough coal."});
      return;
    }
    if (show_output)
    logMessage('The spark ignites the coal, producing heat.');
    unlockIngredient('heat');
    PLAYER_DATA['INGREDIENT_QUANTITIES']['heat'] += 1;
    PLAYER_DATA['INGREDIENT_QUANTITIES']['coal'] -= 1;
    PLAYER_DATA['INGREDIENT_QUANTITIES']['spark'] -= 1;
    success = true;
  }

  else if (ingredients.equals(['heat', 'water'])) {
    if (getIngredientQuantity('heat') < 5) {
      if (show_output)
      logMessage("The heat isn't enough to boil the water. Maybe you need more of it?");
    } else if (getIngredientQuantity('water') < 20) {
      if (show_output)
      logMessage("Not enough water to make good steam...");
    } else {
      if (show_output)
      logMessage('The heat and water produce a powerful steam...');
      unlockIngredient('steam');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['heat'] -= 5;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['water'] -= 20;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['steam'] += 1;
      success = true;
    }
  }

  else if (ingredients.equals(['fresh_herb', 'water'])) {
    logMessage("You can't make a proper potion with regular water! It must be <b>distilled</b> first!")
  }

  else if (ingredients.equals(['distilled_water', 'fresh_herb'])) {
    if (getIngredientQuantity('fresh_herb') < 5) {
      if (show_output)
      logMessage('Not enough herbs to make anything good...');
    } else if (getIngredientQuantity('distilled_water') < 1) {
      if (show_output)
      logMessage("Need some distilled water!");
    } else {
      if (show_output)
      logMessage('You grind the fresh herbs and mix it with the distilled water to create a weak potion! Your first potion! You have recieved 15 XP.');
      unlockIngredient('weak_potion');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['weak_potion'] += 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['distilled_water'] -= 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['fresh_herb'] -= 5;
      givexp(15);
      success = true;
    }
  }
  else if (ingredients.equals(['distilled_water', 'red_herb'])) {
    if (getIngredientQuantity('red_herb') < 5) {
      if (show_output)
      logMessage('Not enough herbs to make anything good...');
    } else if (getIngredientQuantity('distilled_water') < 1) {
      if (show_output)
      logMessage("Need some distilled water!");
    } else {
      if (show_output)
      logMessage('You grind the red herbs and mix it with the distilled water to create a weak potion! Your first potion! You have recieved 15 XP.');
      unlockIngredient('weak_red_potion');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['weak_red_potion'] += 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['distilled_water'] -= 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['red_herb'] -= 5;
      givexp(15);
      success = true;
    }
  }
  else if (ingredients.equals(['weak_potion', 'weak_red_potion'])) {
    if (getIngredientQuantity('weak_potion') > 0 && getIngredientQuantity('weak_red_potion') > 0) {
      if (show_output)
      logMessage('You combine the potions into a more powerful one!');
      unlockIngredient('potent_potion');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['weak_red_potion'] -= 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['weak_potion'] -= 1;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['potent_potion'] += 1;
      success = true;
    }
  }
  else if (ingredients.equals(['magic_ore', 'spark'])) {
    if (getIngredientQuantity('magic_ore') >= 50 && getIngredientQuantity('spark') >= 5) {
      if (show_output)
      logMessage('A new golem construct sputters to life.');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['magic_ore'] -= 50;
      PLAYER_DATA['INGREDIENT_QUANTITIES']['spark'] -= 5;
      PLAYER_DATA['NUM_GOLEMS'] += 1;
      displayGolems();
      success = true;
    }
  }


  else {
    $.growl({title: "Nothing happened.", message: 'You tried to combine ' + ingredientName(ingredients[0]) + ' and ' + ingredientName(ingredients[1]) + ', but nothing happened.'});
  }
  */
  if (success) {
    discoverRecipe(ingredients[0] + ',' +  ingredients[1]);
  }
  if (show_output) {
    displayRecipes();
    displayIngredients();
    refreshIngredientCountDisplay();
    displayGolems();
  }
}
