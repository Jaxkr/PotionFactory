$('#turn-crank').click(function(event) {
  var clickval = parseInt(PLAYER_DATA['RESEARCHED']['powerful_cranks'][0] + 1)
  PLAYER_DATA['ENERGY'] += clickval;
  refreshInfo();

  var x = event.pageX;
  var y = event.pageY;
  var id = 'damagenum-' + (NUM_PARTICLES);
  var random_offset_x = getRandomInt(0, 5);
  var random_offset_y = getRandomInt(0, 5);
  $("body").append('<div id="' + id + '" style="pointer-events: none; position: absolute; left: ' + ((x+random_offset_x) - 10) + 'px; top: ' + ((y+random_offset_y) - 20) + 'px;">+' + clickval + '</div>');
  NUM_PARTICLES += 1;
  PARTICLES.push(id);

  $('#'+id).fadeOut(2600);
});

$('body').on('click', 'button.action-button', function() { //since the element is dynamic we can't listen to it directly.
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
  prompt('Save data (copy and save):', localStorage.getItem("playerdata"));
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
