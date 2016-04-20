var frontpage = (function(){

	var sleepTimeout = null; // The timeout used to wait for going to view, reset each time in document click listener.

	function init(){
		config.loadSettings();
		_goToHousecontrol();
		_getWeather();
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

	function _getWeather(){
		var weatherUrl = "../weather";

		utils.ajaxGet(weatherUrl, function(response){
			var responseObject = JSON.parse(response),
					weather = responseObject.weather[0],
					weatherId = weather.id;

			var iconToSet = "wi-day-sunny";

			if(weatherId >= 200 && weatherId < 300){ // 2xx: Thunderstorm
				iconToSet = "wi-day-thunderstorm";
			} else if (weatherId >= 300 && weatherId < 400){ // 3xx: Sprinkle
				iconToSet = "wi-day-sprinkle";
			} else if (weatherId >= 500 && weatherId < 600){ // 5xx: Rain
				iconToSet = "wi-day-rain";
			} else if (weatherId >= 600 && weatherId < 700){ // 6xx: Snow
				iconToSet = "wi-day-snow";
			} else if (weatherId >= 700 && weatherId < 800){ // 7xx: Atmosphere
				iconToSet = "wi-day-fog";
			} else if (weatherId >= 800 && weatherId < 900){ // 800: Clear, 8xx: Clouds
				iconToSet = weatherId === 800 ? "wi-day-sunny" : "wi-day-cloudy";
			} else if (weatherId >= 900 && weatherId < 910){ // 90x: Extreme
				iconToSet = "wi-hurricane";
			} else if(weatherId >= 910 && weatherId < 1000){ // 9xx: Additional
				iconToSet = "wi-windy";
			}

			document.getElementById("weatherIcon").className = "wi " + iconToSet;
			document.getElementById("weatherDescription").innerHTML = weather.description;
			document.getElementById("weatherTemperature").innerHTML = responseObject.main.temp + " degrees";
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
