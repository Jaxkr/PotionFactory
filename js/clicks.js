$('#turn-crank').click(function() {
  PLAYER_DATA['ENERGY'] += PLAYER_DATA['RESEARCHED']['powerful_cranks'][0] + 1;
  refreshInfo();
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
