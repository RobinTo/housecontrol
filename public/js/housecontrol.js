var frontpage = (function(){

	var sleepTimeout = null; // The timeout used to wait for going to view, reset each time in document click listener.

	function init(){
		config.loadSettings();
		imageController.goToImages();

		_bindEvents();
	}

	function _bindEvents(){
		var containers = document.getElementsByClassName("containerDiv");
		for(var i=0; i < containers.length; i++){
			var container = containers[i];
			container.addEventListener('click', function(){
				_goToHousecontrol();
			}, false);
		}

		document.addEventListener('click', function(){
			_onTap();
		});

		document.getElementById("outlet1On").addEventListener('click', function(){
			// Turn outlet 1 on
			document.getElementById("outlet1On").style.background = "red";
			document.getElementById("outlet1Off").style.background = "white";
		});
		document.getElementById("outlet1Off").addEventListener('click', function(){
			// Turn outlet 1 of
			document.getElementById("outlet1Off").style.background = "red";
			document.getElementById("outlet1On").style.background = "white";
		});
		document.getElementById("outlet2On").addEventListener('click', function(){
			// Turn outlet 2 on
			document.getElementById("outlet2On").style.background = "red";
			document.getElementById("outlet2Off").style.background = "white";
		});
		document.getElementById("outlet2Off").addEventListener('click', function(){
			// Turn outlet 2 off
			document.getElementById("outlet2Off").style.background = "red";
			document.getElementById("outlet2On").style.background = "white";
		});
		document.getElementById("outlet3On").addEventListener('click', function(){
			// Turn outlet 3 on
			document.getElementById("outlet3On").style.background = "red";
			document.getElementById("outlet3Off").style.background = "white";
		});
		document.getElementById("outlet3Off").addEventListener('click', function(){
			// Turn outlet 3 off
			document.getElementById("outlet3Off").style.background = "red";
			document.getElementById("outlet3On").style.background = "white";
		});
	}

	function _goToHousecontrol(){
		document.getElementById("imagediv").style.display = "none";
		document.getElementById("calendardiv").style.display = "none";
		document.getElementById("frontpage").style.display = "block";
		config.setCurrentView(VIEWS.FRONT);
	}

	function _onTap(){
		clearTimeout(sleepTimeout);
		sleepTimeout = setTimeout(function(){
			switch(config.getPreferedView){
				case VIEWS.FRONT:
					_goToHousecontrol();
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
		}, timeFromClickToPreferdView);
	}

	return {
		init: init
	}
})();

// APPLICATION ENTRY POINT
document.addEventListener("DOMContentLoaded", function(event) { 
	console.log("DOMContentLoaded, initializing application");
	frontpage.init();
});