var VIEWS = {
	FRONT: "front",
	IMAGES: "image",
	SETTINGS: "settings"
};


var config = (function(){
	var currentView,
		preferedView = VIEWS.FRONT;

	var timeFromTapToDefault = 6000,
	  	myCity = "Lørenskog",
	  	timeBetweenImages = 5000;

	return {
		setCurrentView : function(newView){
			currentView = newView;
		},
		getCurrentView : function(){
			return currentView;
		},
		setPreferedView : function(newView){
			preferedView = newView;
		},
		getPreferedView : function(){
			return preferedView;
		},
		setTimeBetweenImages : function(newTime){
			timeBetweenImages = newTime;
		},
		getTimeBetweenImages : function(){
			return timeBetweenImages;
		},
		setMyCity : function(newCity){
			myCity = new City;
		},
		getMyCity : function(){
			return myCity;
		},
		getTimeFromTapToDefault : function(){
			return timeFromTapToDefault;
		},
		setTimeFromTapToDefault : function(newTime){
			timeFromTapToDefault = newTime;
		}
	}
})();


var weatherCodeToDesc = {
	200: "Tordenvær, lett regn",
	201: "Tordenvær, regn",
	202: "Tordenvær, mye regn",
	210: "Lett tordenvær",
	211: "Tordenvær",
	212: "Sterk tordenvær",
	221: "Fillete tordenvær",
	230: "Tordenvær, lett yr",
	231: "Tordenvær, yr",
	232: "Tordenvær, mye yr",
	300: "Lett yr",
	301: "Yr",
	302: "Mye yr",
	310: "Lett yr og regn",
	311: "Yr og regn",
	312: "Byger med yr og regn",
	313: "Byger med mye yr og regn",
	314: "Byger med intens yr og regn",
	321: "Byger med yr",
	500: "Lett regn",
	501: "Moderat regn",
	502: "Tungt regn",
	503: "Veldig mye regn",
	504: "Ekstremt mye regn",
	511: "Frysende regn",
	520: "Lette regnbyger",
	521: "Regnbyger",
	522: "Tunge regnbyger",
	531: "Fillete regnbyger",
	600: "Lett snø",
	601: "Snø",
	602: "Tungt snøvær",
	611: "Sludd",
	612: "Sluddbyger",
	615: "Lett regn og snø",
	616: "Regn og snø",
	620: "Lette snøbyger",
	621: "Snøbyger",
	622: "Tunge snøbyger",
	701: "Tåke", // Mist
	711: "Røyk",
	721: "Tåke", // Haze
	731: "Sand og støvhvirvler",
	741: "Tåke", // Fog
	751: "Sand",
	761: "Støv",
	762: "Vulkansk aske?!",
	771: "Bygevær",
	781: "Tornado?!",
	800: "Klart vær",
	801: "Lett skyet",
	802: "Spredte skyer",
	803: "Lett overskyet",
	804: "Overskyet",
	900: "Tornado?!",
	901: "Tropisk storm?!",
	902: "Orkan!",
	903: "Kaldt!",
	904: "Varmt!",
	905: "Mye vind!",
	906: "Hagl",
	951: "Stille",
	952: "Lett bris",
	953: "Svak bris",
	954: "Moderat bris",
	955: "Frisk bris",
	956: "Sterk bris",
	957: "Vind",
	958: "Sterk vind",
	959: "Veldig sterk vind",
	960: "Storm",
	961: "Voldsom storm",
	962: "Orkan!"
};

var weatherCodeToIcon = {
	200: "wi-storm-showers",
	201: "wi-storm-showers",
	202: "wi-storm-showers",
	210: "Lett tordenvær",
	211: "wi-thunderstorm",
	212: "wi-thunderstorm",
	221: "wi-thunderstorm",
	230: "wi-storm-showers",
	231: "wi-storm-showers",
	232: "wi-storm-showers",
	300: "wi-sprinkle",
	301: "wi-sprinkle",
	302: "wi-sprinkle",
	310: "wi-rain-mix",
	311: "wi-rain-mix",
	312: "wi-rain-mix",
	313: "wi-rain-mix",
	314: "wi-rain-mix",
	321: "wi-sprinkle",
	500: "wi-rain",
	501: "wi-rain",
	502: "wi-rain",
	503: "wi-rain",
	504: "wi-rain",
	511: "wi-rain-wind",
	520: "wi-rain",
	521: "wi-rain",
	522: "wi-rain",
	531: "wi-rain",
	600: "wi-snow",
	601: "wi-snow",
	602: "wi-snow",
	611: "wi-sleet",
	612: "wi-sleet",
	615: "wi-snow",
	616: "wi-snow",
	620: "wi-snow",
	621: "wi-snow",
	622: "wi-snow",
	701: "wi-fog", // Mist
	711: "wi-fog",
	721: "wi-fog", // Haze
	731: "wi-dust",
	741: "wi-fog", // Fog
	751: "wi-dust",
	761: "wi-dust",
	762: "wi-volcano",
	771: "wi-thunderstorm",
	781: "wi-tornado",
	800: "wi-day-sunny",
	801: "wi-day-cloudy",
	802: "wi-day-cloudy",
	803: "wi-cloud",
	804: "wi-cloudy",
	900: "wi-tornado",
	901: "wi-meteor",
	902: "wi-hurricane",
	903: "wi-snowflake-cold",
	904: "wi-fire",
	905: "wi-strong-wind",
	906: "wi-sleet",
	951: "wi-barometer",
	952: "wi-windy",
	953: "wi-windy",
	954: "wi-windy",
	955: "wi-windy",
	956: "wi-strong-wind",
	957: "wi-strong-wind",
	958: "wi-strong-wind",
	959: "wi-strong-wind",
	960: "wi-strong-wind",
	961: "wi-strong-wind",
	962: "wi-hurricane"
};
