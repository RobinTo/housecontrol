var settingsController = (function(){

	function init(){
		_loadSettings();
		_bindEvents();
	}

	function _loadSettings(){

	}

	function _bindEvents(){
		console.log("Binding events");
		document.getElementById('timeBetweenImages').addEventListener('input', function(e){

			var newValue = parseInt(e.target.value);
			if(!newValue || newValue <= 0 || newValue > 3600){
				newValue = 5;
			}
			config.setTimeBetweenImages(newValue*1000); // To seconds
			console.log("Set time between images to " + newValue);
		});

		document.getElementById('done').addEventListener('click', function(){
			frontpage.goToHousecontrol();
		});
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
