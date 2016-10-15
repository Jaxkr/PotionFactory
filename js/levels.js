function updateXPBar() {
  var currentLevelPercentage = (PLAYER_DATA['EXPERIENCE'] / PLAYER_DATA['EXPERIENCE_BAR_SIZE']) * 100;
  var progressbarcolor = '#8B41B5';
  var xpbar = $('#xpbar');
  xpbar.progressbar({'value': currentLevelPercentage});
  progressbarValue = xpbar.find( ".ui-progressbar-value" );
  progressbarValue.css({"background": progressbarcolor});
  $('#current-xp').html(PLAYER_DATA['EXPERIENCE']);
  $('#xp-bar-size').html(PLAYER_DATA['EXPERIENCE_BAR_SIZE']);
  $('#level-display').html(PLAYER_DATA['LEVEL']);
  if (currentLevelPercentage >= 100) {
    var overflow_xp = PLAYER_DATA['EXPERIENCE'] - PLAYER_DATA['EXPERIENCE_BAR_SIZE'];
    levelUp(overflow_xp);
  }
}
function levelUp(overflow) {
  PLAYER_DATA['LEVEL'] += 1;
  $.growl.notice({title: "Level up!", message: 'You have reached level ' + PLAYER_DATA['LEVEL'] + '.'});
  logMessage('<b>Level up! You have reached level ' + PLAYER_DATA['LEVEL'] + '.</b>');
  PLAYER_DATA['EXPERIENCE'] = 0;
  PLAYER_DATA['EXPERIENCE_BAR_SIZE'] = Math.ceil(5 * (Math.pow(1.25, PLAYER_DATA['LEVEL'] - 1)));
  grantLevelRewards(PLAYER_DATA['LEVEL']);
  givexp(overflow);
  updateXPBar();

}

function grantLevelRewards(level) {
  switch(level) {
    case 2:
      logMessage('<b>Your golems have discovered how to gather coal!</b>');
      unlockIngredient('coal');
      unlockAction('gather_coal');
      break;
    case 3:
      logMessage('<b>While on an expedition, one of your golems found a small piece of steel.</b>');
      unlockIngredient('steel');
      var steel_qty = getIngredientQuantity('steel');
      PLAYER_DATA['INGREDIENT_QUANTITIES']['steel'] = steel_qty + 1;
      break;
    case 4:
      logMessage('<b>Your golems now know how to find flint in the caves!</b>');
      logMessage('Try hitting the flint and steel together...');
      unlockIngredient('flint');
      unlockAction('gather_flint');
      break;
    case 5:
      logMessage('<b>Your golems can now collect ice.</b>');
      unlockIngredient('ice');
      unlockAction('gather_ice');
      break;
    case 6:
      logMessage('<b>You can now research the mysterious fluxball.</b>');
      unlockResearch('fluxball');
      logMessage("<b>Your golems can now gather magic ore! With the right <i>spark</i>, this can be used to make more golems!</b>");
      unlockIngredient('magic_ore');
      unlockAction('gather_magic_ore');
      break;
    case 7:
      logMessage('<b>Orders can now come in from town! Watch for potion orders from town that you can fill to earn gold!</b>');
      PLAYER_DATA['UNLOCKED_PANES'].push('orders');
      newOrder();
      showPanes();
      $.growl({title: "Town orders are now unlocked!", message: "Watch for potion orders from town that you can fill to earn gold!"});
      break;
    case 8:
      logMessage('<b>You can now research a fast auto-cranker and a small turbine.</b>');
      unlockResearch('fast_auto_cranker');
      unlockResearch('small_turbine');
      break;
    case 9:
      logMessage('<b>Your golems can now forage for fresh herbs!</b>');
      unlockIngredient('fresh_herb');
      unlockAction('gather_fresh_herb');
      break;
    case 10:
      logMessage('<b>A band of misfit golems have joined your team! Use them to automate gathering actions and crafting!</b>');
      $.growl({title: "Some vagabond golems joined your crew!", message: "A band of misfit golems have joined your team! Use them to automate gathering actions and crafting!"});
      PLAYER_DATA['NUM_GOLEMS'] += 10;
      break;
    case 11:
      logMessage('<b>Your golems can now forage for red herbs!</b>');
      unlockIngredient('red_herb');
      unlockAction('gather_red_herb');
      break;
    case 13:
      logMessage("<b>Solar panel unlocked!</b>");
      unlockResearch('solar_panel');
      break;
    case 14:
      logMessage("<b>Your golems now gather wormwood.</b>");
      unlockAction('gather_wormwood');
      unlockIngredient('wormwood');
      break;
    case 16:
      logMessage("<b>Your golems can now gather the rare herb kingly rosemary.");
      unlockIngredient('kingly_rosemary');
      unlockAction('gather_kingly_rosemary');
      break;
    case 20:
      logMessage("<b>Your golems can now hunt for the eyes of goats.</b>");
      unlockIngredient('goats_eye');
      unlockAction('gather_goats_eye');
      break;
    case 25:
      logMessage("<b>You can now research an electric rift!</b>");
      unlockResearch("electric_rift");
      break;
    case 33:
      logMessage("<b>Large solar panel is now available for purchase!</b>");
      unlockResearch('large_solar_panel');
      break;
  }
  displayIngredients();
  displayActions();
  displayResearch();
  refreshResearchInfo();
}

function givexp(n) {
  PLAYER_DATA['EXPERIENCE'] += n;
}
