function displayIngredients() {
  $('#ingredients').html('');
  for (var i = 0; i < PLAYER_DATA['UNLOCKED_INGREDIENTS'].length; i++) {
    var ingredient_element_string = '<div id="ing-' + PLAYER_DATA['UNLOCKED_INGREDIENTS'][i] + '"data-type="' + PLAYER_DATA['UNLOCKED_INGREDIENTS'][i] + '" class="ingredient" style="';
    if ('is_potion' in ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]]) {
      ingredient_element_string += 'border-color: ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].outline_color + '; border-width: 3px; border-top: 5px solid #8F4218;';
      ingredient_element_string += 'background-image: linear-gradient(bottom, ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].potion_color + ' 80%, rgba(0, 0, 0, 0) 20%);\
                                    background-image: -o-linear-gradient(bottom, ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].potion_color + ' 80%, rgba(0, 0, 0, 0) 20%);\
                                    background-image: -moz-linear-gradient(bottom, ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].potion_color + ' 80%, rgba(0, 0, 0, 0) 20%);\
                                    background-image: -webkit-linear-gradient(bottom, ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].potion_color + ' 80%, rgba(0, 0, 0, 0) 20%);\
                                    background-image: -ms-linear-gradient(bottom, ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].potion_color + ' 80%, rgba(0, 0, 0, 0) 20%);';
    } else {
      ingredient_element_string += 'border-color: ' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].outline_color;
    }
    ingredient_element_string += '"><p>' + ALL_INGREDIENTS[PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]].name + '</p>' +
    '<p>Quantity: <span class="ing-qty">' + getIngredientQuantity(PLAYER_DATA['UNLOCKED_INGREDIENTS'][i]) + '</span></p></div>';
    $('#ingredients').append(ingredient_element_string);
  }


  // initialize draggable ingredients
  $('.ingredient').draggable({
    revert: true, containment: "document",
    start: function() {
      $(this).css("z-index", 10); // make sure dragging always on top
    },
    stop: function() {
      $(this).css("z-index", 0); // return to default layer
    }
  });
  $('.ingredient').droppable({
    classes: {
      "ui-droppable-hover": "ingredienthover",
    },
    drop: function(event, ui) {
      combineIngredients($(ui.draggable).data("type"), $(this).data("type"));
    }
  });
}

function displayActions() {
  $('#actions').html('');
  for (var i = 0; i < PLAYER_DATA['UNLOCKED_ACTIONS'].length; i++) {
    var action = ALL_ACTIONS[PLAYER_DATA['UNLOCKED_ACTIONS'][i]];
    var color = ALL_INGREDIENTS[action.output].outline_color;
    $('#actions').append('<div class="action" style="border: 2px solid ' + color + '"><p class="nopadding"><b><u>' + action.name + '</u></b></p>\
    <p style="font-size: 12px" class="nopadding">' + action.desc + '</p>\
    <p class="nopadding">Takes ' + action.time + ' seconds. Costs ' + action.energycost + ' energy.<b><br><button data-action="' + PLAYER_DATA['UNLOCKED_ACTIONS'][i] + '" class="action-button">Go</button><button title="Costs ' + getActionUpgradeCost(PLAYER_DATA['UNLOCKED_ACTIONS'][i]) + ' golem(s) to perform another of this action automatically. " class="automate-action" data-action="' + PLAYER_DATA['UNLOCKED_ACTIONS'][i] + '">Automate</button> <span style="font-size: 11px">' + PLAYER_DATA['AUTOMATED_ACTIONS'][PLAYER_DATA['UNLOCKED_ACTIONS'][i]] + ' per ' + action.time + ' sec.</span></p></div>');
  }
}


function displayResearch() {
  $('#research').html('');
  for (var i = 0; i < PLAYER_DATA['UNLOCKED_RESEARCH'].length; i++) {
    $('#research').append('<div data-type="' + PLAYER_DATA['UNLOCKED_RESEARCH'][i] + '" class="researchable"><p style="margin-top: 2px"><b>' + ALL_RESEARCH[PLAYER_DATA['UNLOCKED_RESEARCH'][i]].name + '</b></p>\
    <p style="margin-bottom: 0">' + ALL_RESEARCH[PLAYER_DATA['UNLOCKED_RESEARCH'][i]].desc + '<br><span id="' + PLAYER_DATA['UNLOCKED_RESEARCH'][i] + '-researched">0</span> owned. Costs <span id="' + PLAYER_DATA['UNLOCKED_RESEARCH'][i] + '-researchcost">' + ALL_RESEARCH[PLAYER_DATA['UNLOCKED_RESEARCH'][i]].base_price + '</span> ' + ALL_RESEARCH[PLAYER_DATA['UNLOCKED_RESEARCH'][i]].currency.toLowerCase() + '.<br><i>Click to research</i></p></div>');
  }
}

function displayGolems() {
  $('#golems').html('');
  $('#golems').append('<p>You have ' + PLAYER_DATA['NUM_GOLEMS'] + ' golems available.</p>');
  showGolemAuto();
}

function displayRecipes() {
  $('#recipes').html('');
  if (PLAYER_DATA['DISCOVERED_RECIPES'].length == 0) {
    $('#recipes').html('<p>None discovered yet.</p><p>Drag and drop ingredients into each other to combine them.</p>');
  }
  for (var i = 0; i < PLAYER_DATA['DISCOVERED_RECIPES'].length; i++) {
    var recipe_string = '<div style="border: 1px solid grey; border-radius: 2px; padding-top: 5px; padding-bottom: 4px; padding-right: 3px; padding-left: 5px; margin-top: 3px;"><span style="border: 2px solid ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][0][0]].outline_color + ';">' + ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][0][1] + ' ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][0][0]].name + '</span> + ';
    recipe_string += '<span style="border: 2px solid ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][1][0]].outline_color + ';">' + ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][1][1] + ' ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][1][0]].name + '</span> &rarr;';
    recipe_string += '<span style="border: 2px solid ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][2][0]].outline_color + ';">' + ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][2][1] + ' ' + ALL_INGREDIENTS[ALL_RECIPES[ PLAYER_DATA['DISCOVERED_RECIPES'][i] ][2][0]].name + '</span> ';
    recipe_string += '<br><button class="recipe-button" data-ingredients="' + PLAYER_DATA['DISCOVERED_RECIPES'][i] + '">Craft</button><button class="automate-recipe" title="Costs ' + getRecipeUpgradeCost(PLAYER_DATA['DISCOVERED_RECIPES'][i]) + ' golem(s) to craft 1 more per second." data-ingredients="' + PLAYER_DATA['DISCOVERED_RECIPES'][i] + '">Automate</button> <span style="font-size: 12px">Crafting ' + PLAYER_DATA['AUTOMATED_RECIPES'][PLAYER_DATA['DISCOVERED_RECIPES'][i]] + ' per second</span></div>'
    $('#recipes').append(recipe_string);
  }
}

function displayClicker() {
  $('#turn-crank').html('Turn crank (+' + (PLAYER_DATA['RESEARCHED']['powerful_cranks'][0]+1) + ' energy)');
}

function showPanes() {
  for (var i = 0; i < PLAYER_DATA['UNLOCKED_PANES'].length; i++) {
    $('.' + PLAYER_DATA['UNLOCKED_PANES'][i]).show();
  }
}
