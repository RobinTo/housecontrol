var weather = (function(){

  var weatherTimeout,
      myCity = "Lørenskog",
      latestWeatherResponse = {};

  function init(){
    _getWeather(myCity);
  }

  function _getWeather(city){
    clearTimeout(weatherTimeout);
		var weatherUrl = "../weather?city=" + city;

		utils.ajaxGet(weatherUrl, function(response){
			var responseObject = JSON.parse(response);

			if(responseObject.error){
				document.getElementById("weatherIcon").className = "wi wi-refresh";
				document.getElementById("weatherDescription").innerHTML = "";
				document.getElementById("weatherTemperature").innerHTML = responseObject.error;
				return;
			}

			// As defined in config.js
			// For a more detailed view.
			latestWeatherResponse.city = city;
			latestWeatherResponse.weather = responseObject;

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
			document.getElementById("weatherTemperature").innerHTML = responseObject.main.temp.toFixed(0) + "&deg;";
		});
    // Set timeout to retrieve weather again in one hour.
    weatherTimeout = setTimeout(function(){
      getWeather(city);
    }, 3600000); // 60*60*1000
	}

  return{
    init: init,
    getMyCity : function(){
      return myCity;
    },
    setMyCity : function(newCity){
      myCity = newCity;
    }
  }
})();
