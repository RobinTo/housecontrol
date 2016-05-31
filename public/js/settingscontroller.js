var settingsController = (function(){
	
	function init(){
		_loadSettings();
		_bindEvents();
	}

	function _bindEvents(){

	}

	function _goToSettingsView(){
		console.log("Showing settings view.");
		document.getElementById("settingsdiv").style.display = "block";
		document.getElementById("imagediv").style.display = "none";
		document.getElementById("frontpage").style.display = "none";
		config.setCurrentView(VIEWS.SETTINGS);
	}

	return {
		init : init,
		goToSettings : _goToSettingsView
	}
})();