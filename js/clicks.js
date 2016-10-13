$('#turn-crank').mousedown(function(event) {
  var clickval = parseInt(PLAYER_DATA['RESEARCHED']['powerful_cranks'][0] + 1);
  PLAYER_DATA['ENERGY'] += clickval;
  refreshInfo();

  var x = event.pageX;
  var y = event.pageY;
  var id = 'damagenum-' + (NUM_PARTICLES);
  var random_offset_x = getRandomInt(-5, 5);
  if (getRandomInt(0,200) == 77) {
    clickval = CLICK_PHRASES[getRandomInt(0, CLICK_PHRASES.length - 1)];
  }
  $("body").append('<div id="' + id + '" style="color: #0C1D3B; font-size: 20px; pointer-events: none; position: absolute; left: ' + ((x - 10) + random_offset_x) + 'px; top: ' + (y - 20) + 'px;">+' + clickval + '</div>');
  NUM_PARTICLES += 1;
  PARTICLES.push(id);

  $('#'+id).fadeOut(1400);

  createParticle('bolt');
});

$('#request-order').click(function() {
  if (PLAYER_DATA['ENERGY'] > 500) {
    PLAYER_DATA['ENERGY'] -= 500;
    if (getRandomInt(0,1) == 0) {
      newOrder(true);
    } else {
      $.growl.warning({title: "Negotiations failed!", message: "You were unable to secure a new potion order from town."});
    }
  } else {
    $.growl.error({title: "Can't get new order.", message: "Not enough energy to perform that action."});
  }
  refreshInfo();
});

$('body').on('click', '.action-button', function() { //since the element is dynamic we can't listen to it directly.
    var action_name = $(this).data("action");
    performAction(action_name);
});
$('body').on('click', 'button.recipe-button', function() {
    var recipe = $(this).data("ingredients").split(',');
    combineIngredients(recipe[0], recipe[1]);
});
$('body').on('click', 'button.automate-recipe', function() {
    var recipe = $(this).data("ingredients")
    automateRecipe(recipe);
});
$('body').on('click', 'button.automate-action', function() {
    var action = $(this).data("action");
    automateAction(action);
});
$('body').on('click', 'div.researchable', function() { //since the element is dynamic we can't listen to it directly.
    var action_name = $(this).data("type");
    doResearch(action_name);
});
$("#enablegolems").change(function() {
    GOLEMS_ARE_ENABLED = this.checked;
});



$('#savegamebutton').click(function() {
  saveGame();
});
$('#exportsave').click(function() {
  saveGame();
  $('#save-export').val(localStorage.getItem("playerdata").replace(/(\r\n|\n|\r)/gm,""));
  $('#save-export').show();
  $.growl({title: "Save exported!", message: "Copy from the text area below."});
  $('#save-export').select();
});
$('#importsave').click(function() {
  var save_string = prompt('Save data?');
  if (save_string) {
    try {
      var decrypted_data = GibberishAES.dec(save_string, save_encryption_key);
      localStorage.setItem("playerdata", save_string);
      SHOULD_SAVE = false;
      location.reload();
    }
    catch(e) {
      alert('invalid save');
    }
  }
});

$('#deletesavedata').click(function() {
  if (confirm('Are you sure you want to delete all save data? This action cannot be undone.')) {
    deleteData();
  }
});

$('#closewelcomeback').click(function() {
  $('#welcomeback').fadeOut();
});
