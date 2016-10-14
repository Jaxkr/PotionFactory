var ACTION_QUEUE = [];

var GOLEM_NAMES = ['Goll',
'Krak',
'Tuah',
'Dub',
'Tim',
'Vinkirk',
'Javve',
'Ghurbolk',
'Driskan',
'Fraggih'];

function showGolemActions() {
  $('#golemactions').html('');
  for (var i = 0; i < Math.min(CURRENT_ACTIONS.length, 10); i++) {
    var currentPercentage = Math.floor(((CURRENT_ACTIONS[i][1] - CURRENT_ACTIONS[i][2]) / (CURRENT_ACTIONS[i][1])) * 100);
    var golem_name = GOLEM_NAMES[i];
    var golem_text = golem_name + ' the golem: ' + ALL_ACTIONS[CURRENT_ACTIONS[i][0]].gather_text + ' ' + currentPercentage + '%';
    $('#golemactions').append('<div style="position: relative" id="' + golem_name + '-progressbar"><span style="font-size: 11px; position:absolute; margin-left:10px; margin-top:4px; font-family: \'Volkhov\', serif;">' + golem_text + '</div>');
    $('#' + golem_name + '-progressbar').progressbar({'value': currentPercentage});
  }
  if (CURRENT_ACTIONS.length > 10) {
    $('#golemactions').append('And ' + (CURRENT_ACTIONS.length - 10) + ' more golems at work.')
  }

  $('#golemqueue').html('<p>' + ACTION_QUEUE.length + ' actions in queue.</p>');
  /*
  if (ACTION_QUEUE.length > 0 && CURRENT_ACTIONS.length == PLAYER_DATA['NUM_GOLEMS']) {
  var golem_queue_string = '<p><u>In queue:</u><br>';
  for (var i = 0; i < ACTION_QUEUE.length; i++) {
  golem_queue_string += (i+1) + ': ' + ALL_ACTIONS[ACTION_QUEUE[i]].name + '<br>';
}
$('#golemqueue').html(golem_queue_string);
}
*/

}

function showGolemAuto() {
  if (GOLEMS_ARE_ENABLED) {
    var golem_auto_string = '<p><b>Automated Golem Actions:</b><br>';
    for (var key in PLAYER_DATA['AUTOMATED_ACTIONS']) {
      if (PLAYER_DATA['AUTOMATED_ACTIONS'][key] > 0) {
        golem_auto_string += '<span style="cursor: default" title="Appx. ' + PLAYER_DATA['AUTOMATED_ACTIONS'][key] / ALL_ACTIONS[key].time + ' per second">';
        golem_auto_string += (ALL_ACTIONS[key].gather_text.slice(0,-3) + ': '+ PLAYER_DATA['AUTOMATED_ACTIONS'][key] + ' golem(s)');
        golem_auto_string += '</span> <span class="removeauto">[remove]</span><br>';
      }
    }
    for (var key in PLAYER_DATA['AUTOMATED_RECIPES']) {
      if (PLAYER_DATA['AUTOMATED_RECIPES'][key] > 0) {
        golem_auto_string += '<span style="cursor: default">';
        var capable_of = getCapableOf(key);
        if (capable_of >= PLAYER_DATA['AUTOMATED_RECIPES'][key]) {
          golem_auto_string += '<span style="color: green;">&check;</span> ';
        } else if (capable_of < PLAYER_DATA['AUTOMATED_RECIPES'][key] && capable_of != 0) {
          golem_auto_string += '<span style="color: #786200;">~</span> ';
        } else if (capable_of == 0){
          golem_auto_string += '<span style="color: red;">&cross;</span> ';
        }
        golem_auto_string += '<span title="' + PLAYER_DATA['AUTOMATED_RECIPES'][key]+ ' golem(s).">';
        golem_auto_string += 'Crafting ' + ALL_INGREDIENTS[ALL_RECIPES[key][2][0]].name + ': ' + PLAYER_DATA['AUTOMATED_RECIPES'][key] + ' per second';
        golem_auto_string += '</span> <span class="removeauto">[remove]</span><br>';
      }
    }

  } else {
    golem_auto_string = '<p><b>GOLEMS ARE PAUSED</b></p>';
  }


  if (golem_auto_string.length > 38) {
    $('#golemauto').show();
  }
  golem_auto_string += '</p>';
  $('#golemautoinner').html(golem_auto_string);
}
