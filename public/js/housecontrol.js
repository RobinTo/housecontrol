var frontpage = (function(){

	var sleepTimeout = null; // The timeout used to wait for going to view, reset each time in document click listener.

	function init(){
		goToHousecontrol();
		imageController.init();
		settingsController.init();

		weather.init(); // Weather card.
		inside.init(); // Inside climate card.
		ruter.init();		// ruter card.
		clock.init();		// Clock card.
		clock.init();
		settings.init();
		rfoutlets.init();

		_bindEvents();

		_onTap();
	}

	function _bindEvents(){
		var containers = document.getElementsByClassName("clickToFrontPage");
		for(var i=0; i < containers.length; i++){
			var container = containers[i];
			container.addEventListener('click', function(){
				goToHousecontrol();
			}, false);
		}

		document.addEventListener('mouseup', function(){
			_onTap();
		});
		document.addEventListener('dragend', function(){
			onTap();
		});
	}

	function goToHousecontrol(){
		document.getElementById("imagediv").style.display = "none";
		document.getElementById("settingsdiv").style.display = "none";
		document.getElementById("frontpage").style.display = "block";
		config.setCurrentView(VIEWS.FRONT);
	}

	function _onTap(){
		console.log("Calling on tap");
		clearTimeout(sleepTimeout);
		sleepTimeout = setTimeout(function(){

			if(config.getCurrentView() === VIEWS.SETTINGS){
				// If we are currently in settings don't interrupt by going back to front page.
				return;
			}

			switch(config.getPreferedView()){
				case VIEWS.FRONT:
					goToHousecontrol();
					break;
				case VIEWS.IMAGES:
					imageController.goToImages();
					break;
				case VIEWS.CALENDAR:
					calendarController.goToCalendar();
					break;
				default:
					imageController.goToImages();
			}
		}, config.getTimeFromTapToDefault());
	}

	return {
		init: init,
		goToHousecontrol: goToHousecontrol
	}
})();

// APPLICATION ENTRY POINT
document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOMContentLoaded, initializing application");
	frontpage.init();
});
