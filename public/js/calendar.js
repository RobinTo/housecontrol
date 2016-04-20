var calendarController = (function(){
	
	function goToCalendar(){
		document.getElementById("imagediv").style.display = "none";
		document.getElementById("calendardiv").style.display = "block";
		document.getElementById("frontpage").style.display = "none";
		config.setCurrentView(VIEWS.CALENDAR);
	}

	return {
		goToCalendar : goToCalendar
	}
})();