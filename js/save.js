var save_encryption_key = 'uv8EHXRRpxmaWM3R';
var save_version = 4; // this allows for invalidation of old save formats.


function saveGame() {
  PLAYER_DATA['LAST_SAVED'] = Math.round(new Date().getTime() / 1000);
  PLAYER_DATA['SAVE_VERSION'] = save_version;
  var player_data_string = JSON.stringify(PLAYER_DATA);
  player_data_string = btoa(player_data_string);
  var encrypted_data_string = GibberishAES.enc(player_data_string, "uv8EHXRRpxmaWM3R");
  localStorage.setItem("playerdata", encrypted_data_string);
}

function loadGame() {
  if (localStorage.getItem("playerdata")) {
    try {
      var decrypted_data = GibberishAES.dec(localStorage.getItem("playerdata"), save_encryption_key);
    }
    catch(e) {
      deleteData();
    }
    var player_data_obj = JSON.parse(atob(decrypted_data));
    PLAYER_DATA = player_data_obj;

    if (PLAYER_DATA['SAVE_VERSION'] != save_version) {
      alert('You are using an incompatible save. So sorry! Clearing your save data...');
      deleteData();
    }

  } else {
    logMessage('No save data found. Creating save data...');
    saveGame();
  }
}
var SHOULD_SAVE = true;

function deleteData() {
  localStorage.clear();
  SHOULD_SAVE = false;
  location.reload();
}


setInterval(saveGame, 30000);

window.onbeforeunload = function (e) {
  if (SHOULD_SAVE)
  saveGame();
};
