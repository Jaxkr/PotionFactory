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
