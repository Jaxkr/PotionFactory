// constants
var ALL_INGREDIENTS = {
  /*
  Format:
  'namecode': {
  'name': 'Name that is displayed',
  'outline-color': 'Color in ingredients list'
}
*/
'coal': {
  'name': 'Coal',
  'outline_color': '#0A0A09',
  'text': "Regular old coal. Can be ignited with a spark."
},
'water': {
  'name': 'Water',
  'outline_color': '#86CDDB',
  'text': "Fresh, cold water from the lake."
},
'flint': {
  'name': 'Flint',
  'outline_color': '#6C8C96',
  'text': "A white and smooth piece of flint.",
},
'steel': {
  'name': 'Steel',
  'outline_color': '#BABABA',
  'text': "A strong piece of steel one of your golems found.",
},
'spark': {
  'name': 'Spark',
  'outline_color': '#EDF725',
  'text': "Pure energy!",
},
'heat': {
  'name': 'Heat',
  'outline_color': '#ED9537',
  'text': "Warm powerful heat emanated from a fire.",
},
'steam': {
  'name': 'Steam',
  'outline_color': '#A7DAEB',
  'text': "Thick steam from the water",
},
'ice': {
  'name': 'Ice',
  'outline_color': '#A5F2F3',
},
'fresh_herb': {
  'name': 'Green Herb',
  'outline_color': '#B2D490',
},
'red_herb': {
  'name': 'Red Herb',
  'outline_color': '#9E1C23',
},
'weak_potion': {
  'name': 'Weak Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(199, 242, 210, 0.4)',
  'is_potion': true,
},
'weak_red_potion': {
  'name': 'Weak Red Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(242, 70, 70, 0.4)',
  'is_potion': true,
},
'potent_potion': {
  'name': 'Mild Potion',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(80, 105, 17, 0.6)',
  'is_potion': true,
},
'distilled_water': {
  'name': 'Distilled Water',
  'outline_color': '#86CDDB',
},
'magic_ore': {
  'name': 'Magic Ore',
  'outline_color': '#C436D1',
  'text': "A strange glowing rock from the nearby caves. Can be used to create more animate golems.",
},
'wormwood': {
  'name': 'Wormwood',
  'outline_color': '#AFD490',
  'text': "Fresh <i>artemisia absinthium</i>.",
},
'absinthe': {
  'name': 'Absinthe',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(144, 214, 90, 0.3)',
  'is_potion': true,
  'text': "Quite alchoholic and not very good.",
},
'bitter_base': {
  'name': 'Bitter base',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(144, 214, 90, 0.3)',
  'is_potion': true,
  'text': "Mashed wormwood and water.",
},
'kingly_rosemary': {
  'name': "Kingly Rosemary",
  'outline_color': '#0B8C07',
  'text': "A very expensive and flavorful herb. Formally known as <i>rosmarinus officinalis regalis</i>.",
},
'rosemary_tea': {
  'name': 'Rosemary Tea',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(67, 191, 110, 0.2)',
  'is_potion': true,
  'text': "Best served cool.",
},
'kingly_absinthe': {
  'name': 'Kingly Absinthe',
  'outline_color': '#D633E8',
  'potion_color': 'rgba(67, 191, 110, 0.2)',
  'is_potion': true,
  'text': "Bitter but satisfying. Beloved by royalty.",
},
'goats_eye': {
  'name': "Goat's Eye",
  'outline_color': '#000000',
  'text': "Despite being detached, still peers into your soul."
},
'newt_tongue': {
  'name': "Newt Tongue",
  'outline_color': '#000000',
  'text': "The tongue of a newt. So fresh that it's still wriggling."
},
'empowered_kingly_absinthe': {
  'name': 'Empowered Kingly Absinthe',
  'outline_color': '#D633E8',
  'potion_color': 'rgba(67, 191, 110, 0.9)',
  'is_potion': true,
  'text': "Wow-wee!",
},
'glowing_base': {
  'name': 'Glowing base',
  'outline_color': '#71F043',
  'potion_color': 'rgba(67, 162, 240, 0.2)',
  'is_potion': true,
  'text': "The goat's eye seems to love the alcohol.",
},
'cancer_cure': {
  'name': 'Cancer cure',
  'outline_color': '#B6FAF9',
  'potion_color': 'rgba(193, 219, 61, 0.4)',
  'is_potion': true,
  'text': "A potion with a very complex flavor that flushes the body of any unwanted growths.",
},
'basic_poison': {
  'name': 'Basic Poison',
  'outline_color': '#C7E7F2',
  'potion_color': 'rgba(135, 72, 9, 0.3)',
  'is_potion': true,
  'text': "Despite being made of seemingly-innocuous ingredients, this potion will make anyone who drinks it very ill.",
},
'fire_starter': {
  'name': 'Fire Starter',
  'outline_color': '#BF240F',
  'potion_color': 'rgba(247, 107, 47, 0.3)',
  'is_potion': true,
  'text': "This potion reacts strongly with air to start a fire very easily.",
},



// DISPLAY ONLY, THESE INGREDIENTS SHOULD NEVER BE DISCOVERED OR USED
// NOW I UNDERSTAND HOW GAMES BECOME SUCH A CLUSTERFUCK OF UNUSED INTERNAL SHIT...
'golem': {
  'name': 'Golem',
  'outline_color': '#000000',
}

}
function ingredientName(name) {
  return ALL_INGREDIENTS[name]['name'];
}
function unlockIngredient(name) {
  if (PLAYER_DATA['UNLOCKED_INGREDIENTS'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_INGREDIENTS'].push(name);
    getIngredientQuantity(name);
  }
}

var ALL_ACTIONS = {
  'gather_water': {
    'name': 'Gather water',
    'gather_text': 'Gathering water...',
    'desc': 'Send a golem to get some water from the nearby stream. +1 water, +1 XP.',
    'time': 1,
    'energycost': 15,
    'output': 'water',
    'quantity': 1,
    'xp': 1,
  },
  'gather_coal': {
    'name': 'Mine coal',
    'gather_text': 'Mining coal...',
    'desc': 'Send a golem to mine coal in the cave. +1 coal, +2 XP.',
    'time': 4,
    'energycost': 30,
    'output': 'coal',
    'quantity': 1,
    'xp': 2,
  },
  'gather_flint': {
    'name': 'Gather flint',
    'gather_text': 'Gathering flint...',
    'desc': 'Send a golem to scavenge for a piece of flint in the cave. +1 flint, +2 XP.',
    'time': 4,
    'energycost': 40,
    'output': 'flint',
    'quantity': 1,
    'xp': 2,
  },
  'gather_ice': {
    'name': 'Gather ice',
    'gather_text': 'Gathering ice...',
    'desc': 'Send a golem to gather ice from the frozen lake. +1 ice, +3 XP.',
    'time': 1,
    'energycost': 300,
    'output': 'ice',
    'quantity': 1,
    'xp': 3,
  },
  'gather_magic_ore': {
    'name': 'Mine Magic ore',
    'gather_text': 'Mining for magic ore...',
    'desc': 'Send a golem to mine magic ore in the cave. +1 magic ore, +3 XP.',
    'time': 5,
    'energycost': 500,
    'output': 'magic_ore',
    'quantity': 1,
    'xp': 3,
  },
  'gather_fresh_herb': {
    'name': 'Gather fresh green herb',
    'gather_text': 'Foraging for a fresh green herb...',
    'desc': 'Send a golem to find a fresh, green herb. +1 fresh herb, +5 XP.',
    'time': 4,
    'energycost': 700,
    'output': 'fresh_herb',
    'quantity': 1,
    'xp': 5,
  },
  'gather_red_herb': {
    'name': 'Gather fresh red herb',
    'gather_text': 'Foraging for a red herb...',
    'desc': 'Send a golem to find a fresh, red herb. +1 red herb, +5 XP.',
    'time': 4,
    'energycost': 1000,
    'output': 'red_herb',
    'quantity': 1,
    'xp': 5,
  },
  'gather_wormwood': {
    'name': 'Gather wormwood',
    'gather_text': 'Foraging for wormwood...',
    'desc': 'Send a golem to find a wormwood. +1 wormwood, +10 XP.',
    'time': 7,
    'energycost': 5000,
    'output': 'wormwood',
    'quantity': 1,
    'xp': 10,
  },
  'gather_kingly_rosemary': {
    'name': 'Gather kingly rosemary',
    'gather_text': 'Gathering kingly rosemary...',
    'desc': 'Send a golem to gather this rare herb. +1 kingly rosemary, +10 XP.',
    'time': 4,
    'energycost': 10000,
    'output': 'kingly_rosemary',
    'quantity': 1,
    'xp': 10,
  },
  'gather_goats_eye': {
    'name': "Fetch a goat's eye.",
    'gather_text': "Fetching a goat's eye...",
    'desc': 'Send a golem to pluck the eye from a nearby goat, leaving the goat alive and well, of course. This is an ethical factory.<br>+1 goat\'s eye, +10 XP.',
    'time': 8,
    'energycost': 200000,
    'output': 'goats_eye',
    'quantity': 1,
    'xp': 10,
  },
  'gather_newt_tongue': {
    'name': "Fetch newt tongue.",
    'gather_text': "Fetching a newt tongue...",
    'desc': 'Send a golem to kill a newt and get it\'s tongue. +1 newt tongue, +15 XP.',
    'time': 7,
    'energycost': 1000000,
    'output': 'newt_tongue',
    'quantity': 1,
    'xp': 15,
  },
}
function unlockAction(name) {
  if (PLAYER_DATA['UNLOCKED_ACTIONS'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_ACTIONS'].push(name);
    PLAYER_DATA['AUTOMATED_ACTIONS'][name] = 0;
  }
}


var ALL_RESEARCH = {
  'powerful_cranks': {
    'name': 'Powerful cranks',
    'desc': '+1 energy per crank',
    'base_price': 10,
    'currency': 'ENERGY',
  },
  'auto_cranker': {
    'name': 'Auto-cranker',
    'desc': 'Magic turns the crank. Generate 1 energy per second.',
    'base_price': 50,
    'currency': 'ENERGY',
  },
  'fluxball': {
    'name': 'Fluxball',
    'desc': 'You pour some energy into it, it gives back. Sitting on a table, this generates 5 energy per second.',
    'base_price': 500,
    'currency': 'ENERGY',
  },
  'fast_auto_cranker': {
    'name': 'Fast auto-cranker',
    'desc': 'A powerful spirit is summoned to help crank. Generates 10 energy per second.',
    'base_price': 1000,
    'currency': 'ENERGY',
  },
  'small_turbine': {
    'name': 'Small Turbine',
    'desc': 'Sits in the yard. Generates 50 energy per second.',
    'base_price': 1,
    'currency': 'GOLD',
  },
  'power_syphon': {
    'name': 'Power syphon',
    'desc': 'Illegally sap some energy from the earth. "Generates" 25 energy per second.',
    'base_price': 2000,
    'currency': 'ENERGY',
  },
  'solar_panel': {
    'name': 'Solar Panel',
    'desc': 'A solar panel made by the smartest men in town. Generates 600 energy per second.',
    'base_price': 50,
    'currency': 'GOLD',
  },
  'large_solar_panel': {
    'name': 'Large solar Panel',
    'desc': 'Straight from the royal scientists! Generates 2000 energy per second.',
    'base_price': 100,
    'currency': 'GOLD',
  },
  'electric_rift': {
    'name': 'Electric rift',
    'desc': 'Opens a hole in the universe through which energy can flow. Generates 3000 energy per second.',
    'base_price': 1000000,
    'currency': 'ENERGY',
  },
  'nuclear_reactor': {
    'name': 'Nuclear Reactor',
    'desc': 'A nuclear fission-powered reactor. Generates 10000 energy per second.',
    'base_price': 1000,
    'currency': 'GOLD',
  },
  'small_psuedo_star': {
    'name': 'Small Psuedo-star',
    'desc': 'The energy congeals into a small star. Generates 10000 energy per second.',
    'base_price': 10000000,
    'currency': 'ENERGY',
  },
  'algae_plantation': {
    'name': 'Algae Plantation',
    'desc': 'Very new and eco-friendly. Generates 200000 energy per second.',
    'base_price': 30000,
    'currency': 'GOLD',
  }
}

function getEnergyPerSecond() {
  var eps = 0;
  for (var key in PLAYER_DATA['RESEARCHED']) {
    switch (key) {
      case 'auto_cranker':
      eps += PLAYER_DATA['RESEARCHED'][key][0];
      break;
      case 'fluxball':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 5;
      break;
      case 'fast_auto_cranker':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 10;
      break;
      case 'small_turbine':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 50;
      break;
      case 'power_syphon':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 25;
      break;
      case 'solar_panel':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 600;
      break;
      case 'large_solar_panel':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 2000;
      break;
      case 'electric_rift':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 3000;
      break;
      case 'nuclear_reactor':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 10000;
      break;
      case 'small_psuedo_star':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 10000;
      break;
      case 'algae_plantation':
      eps += PLAYER_DATA['RESEARCHED'][key][0] * 200000;
      break;
    }
  }
  return Math.round(eps);
}


function unlockResearch(name) {
  if (PLAYER_DATA['UNLOCKED_RESEARCH'].indexOf(name) < 0) {
    PLAYER_DATA['UNLOCKED_RESEARCH'].push(name);
    if (!(name in PLAYER_DATA['RESEARCHED'])) {
      PLAYER_DATA['RESEARCHED'][name] = [0, ALL_RESEARCH[name].base_price];
    }
  }
}
