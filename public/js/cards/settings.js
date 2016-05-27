var settings = (function(){

  function init(){
    // Bind settings and stuff.

    var powerButton = document.getElementById("powerSettingsButton");

    powerButton.onclick = function(){
    	$.post('/shutdown').done(function(){
    		// Well, what can you do. We're shutting down.
    	});
    }
  }

  return {
    init: init,

  }
})();
