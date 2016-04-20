var frontpage = (function(){

	var sleepTimeout = null; // The timeout used to wait for going to view, reset each time in document click listener.

	function init(){
		config.loadSettings();
		_goToHousecontrol();
		_getWeather();
		_getMotd();
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

		_bindOutlets();
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

	function _bindOutlets(){
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

	function _getMotd(){
		var motdUrl = '../motd';
		utils.ajaxGet(motdUrl, function(response){
			var motdObject = JSON.parse(response);

			if(motdObject.error){
				document.getElementById("motd").innerHTML = motdObject.error;
				return;
			}

			document.getElementById("motd").innerHTML = motdObject.message;
		});
	}

	function _getWeather(){
		var weatherUrl = "../weather?city=Farsund";

		utils.ajaxGet(weatherUrl, function(response){
			var responseObject = JSON.parse(response);

			if(responseObject.error){
				document.getElementById("weatherIcon").className = "wi wi-refresh";
				document.getElementById("weatherDescription").innerHTML = "";
				document.getElementById("weatherTemperature").innerHTML = responseObject.error;
				return;
			}

			var weather = responseObject.weather;


			var iconToSet = weatherCodeToIcon[weather[0].id];
					weatherDesc = weatherCodeToDesc[weather[0].id];

			for(var i = 1; i< weather.length; i++){
				if(i === weather.length-1){
					weatherDesc += " og " + weatherCodeToDesc[weather[i].id]
				} else {
					weatherDesc += ", " + weatherCodeToDesc[weather[i].id]
				}
			}

			document.getElementById("weatherIcon").className = "wi " + iconToSet;
			document.getElementById("weatherDescription").innerHTML = weatherDesc;
			document.getElementById("weatherTemperature").innerHTML = responseObject.main.temp.toFixed(0) + " grader";
		});
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
