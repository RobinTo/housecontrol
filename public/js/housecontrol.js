var frontpage = (function(){

	var sleepTimeout = null; // The timeout used to wait for going to view, reset each time in document click listener.

	function init(){
		config.loadSettings();
		_goToHousecontrol();

		weather.init(); // Weather card.
		inside.init(); // Inside climate card.
		motd.init();		// Motd card.
		clock.init();		// Clock card.
		clock.init();
		settings.init();
		rfoutlets.init();

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
	}

	function _goToHousecontrol(){
		document.getElementById("imagediv").style.display = "none";
		document.getElementById("settingsdiv").style.display = "none";
		document.getElementById("frontpage").style.display = "block";
		config.setCurrentView(VIEWS.FRONT);
	}

	function _onTap(){
		clearTimeout(sleepTimeout);
		sleepTimeout = setTimeout(function(){
			switch(config.getPreferedView()){
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

	function _getMotd(){
		var motdUrl = '../motd';
		utils.ajaxGet(motdUrl, function(response){
			var motdObject = JSON.parse(response);

			if(motdObject.error){
				document.getElementById("motdMessage").innerHTML = motdObject.error;
				document.getElementById("motdAuthor").innerHTML = "";
				return;
			}

			document.getElementById("motdMessage").innerHTML = motdObject.message;
			document.getElementById("motdAuthor").innerHTML = motdObject.author;
		});
	}

	function _startTime() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
	    m = checkTime(m);
	    s = checkTime(s);
	    document.getElementById('clockText').innerHTML = h + ":" + m + ":" + s;
	    var t = setTimeout(_startTime, 500);
	}

	function checkTime(i) {
	    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	    return i;
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
