var settings = (function(){

  function init(){
    // Bind settings and stuff.

    var powerButton = document.getElementById("powerSettingsButton"),
    	imageButton = document.getElementById("imageSettingsButton"),
    	settingsButton = document.getElementById("settingsSettingsButton");

    powerButton.onclick = function(){
    	$.post('/shutdown').done(function(){
    		// Well, what can you do. We're shutting down.
    	});
    }

    imageButton.onclick = function(event){
    	imageController.goToImages();
    }

    settingsButton.onclick = function(){
    	settingsController.goToSettings();
    }
  }

  return {
    init: init,

  }
})();
