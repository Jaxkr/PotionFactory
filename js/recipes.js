// there is no good reason this isn't part of constants.js
// consider it an extension of that file

var ALL_RECIPES = {
  'flint,steel': [ ['flint', 1], ['steel', 0], ['spark', 1], 'The flint and steel collide to create a spark!', 0],// [ing1, qty], [ing2, qty], [out, qty], message, xp
  'coal,spark': [ ['coal', 1], ['spark', 1], ['heat', 1], 'The spark ignites the coal, producing heat.', 0],
  'heat,water': [ ['heat', 5], ['water', 20], ['steam', 1], 'The heat and water produce a powerful steam...'],
  'ice,steam': [ ['ice', 3], ['steam', 1], ['distilled_water', 1], 'The steam congeals on an ice-cooled surface to create distilled water.'],
  'distilled_water,fresh_herb': [ ['distilled_water', 1], ['fresh_herb', 5], ['weak_potion', 1], 'You grind the fresh herbs and mix it with the distilled water to create a weak potion!', 10],
  'distilled_water,red_herb': [ ['distilled_water', 1], ['red_herb', 5], ['weak_red_potion', 1], 'You grind the fresh herbs and mix it with the distilled water to create a weak potion!', 10],
  'weak_potion,weak_red_potion': [ ['weak_potion', 1], ['weak_red_potion', 1], ['potent_potion', 1], 'You combine the two potions into a more potent mild potion.', 15],
  'magic_ore,spark': [ ['magic_ore', 7], ['spark', 5], ['golem', 1], 'A golem sputters to life'],
  'potent_potion,wormwood': [ ['potent_potion', 3], ['wormwood', 10], ['absinthe', 1] ],
  'distilled_water,wormwood': [ ['distilled_water', 1], ['wormwood', 10], ['bitter_base', 1] ],
  'distilled_water,kingly_rosemary': [ ['distilled_water', 5], ['kingly_rosemary', 2], ['rosemary_tea', 1] ],
  'absinthe,rosemary_tea': [ ['absinthe', 1], ['rosemary_tea', 1], ['kingly_absinthe', 1] ],
  'goats_eye,kingly_absinthe': [ ['goats_eye', 1], ['kingly_absinthe', 1], ['empowered_kingly_absinthe', 1] ],
  'bitter_base,goats_eye': [ ['bitter_base', 1], ['goats_eye', 1], ['glowing_base', 1] ],
  'empowered_kingly_absinthe,glowing_base': [ ['empowered_kingly_absinthe', 1], ['glowing_base', 1], ['cancer_cure', 1] ],
  'goats_eye,potent_potion': [ ['goats_eye', 1], ['potent_potion', 1], ['basic_poison', 1] ],
  'basic_poison,newt_tongue': [ ['basic_poison', 1], ['newt_tongue', 1], ['fire_starter', 1] ],


}

function discoverRecipe(name) {
  if (PLAYER_DATA['DISCOVERED_RECIPES'].indexOf(name) < 0 && (name in ALL_RECIPES)) {
    var ingredients = name.split(',');
    $.growl.notice({title: "New recipe discovered!", message: ALL_INGREDIENTS[ingredients[0]].name + ' & ' + ALL_INGREDIENTS[ingredients[1]].name + '&rarr;' + ALL_INGREDIENTS[ALL_RECIPES[name][2][0]].name });
    PLAYER_DATA['DISCOVERED_RECIPES'].push(name);
    PLAYER_DATA['AUTOMATED_RECIPES'][name] = 0;
  }
}

function getCapableOf(name) {
  var recipe = ALL_RECIPES[name];
  var q1 = Math.floor(getIngredientQuantity(recipe[0][0]) / recipe[0][1]);
  var q2 = Math.floor(getIngredientQuantity(recipe[1][0]) / recipe[1][1]);
  return Math.min(q1, q2);
}
