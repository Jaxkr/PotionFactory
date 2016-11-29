function doResearch(name) {
  var currency = ALL_RESEARCH[name].currency;
  if (name in PLAYER_DATA['RESEARCHED']) {
    if (PLAYER_DATA[currency] >= PLAYER_DATA['RESEARCHED'][name][1]) {
      PLAYER_DATA['RESEARCHED'][name][0] += 1;
      PLAYER_DATA[currency] -= PLAYER_DATA['RESEARCHED'][name][1];
      PLAYER_DATA['RESEARCHED'][name][1] = Math.ceil(ALL_RESEARCH[name].base_price * Math.pow(1.21, PLAYER_DATA['RESEARCHED'][name][0]));
    } else {
      $.growl.error({title: 'Not enough ' + currency.toLowerCase() + '.', message: "You don't have enough " + currency.toLowerCase() + " to research that."});
    }
  }
  refreshResearchInfo();
  refreshInfo();
  displayClicker();
}


function refreshResearchInfo() {
  for (var key in PLAYER_DATA['RESEARCHED']) {
    $('#' + key + '-researched').html(PLAYER_DATA['RESEARCHED'][key][0]);
    $('#' + key + '-researchcost').html(PLAYER_DATA['RESEARCHED'][key][1]);
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
