var ruter = (function(){

  var ruterTimer;

  function init(){
    _getRuter();
  }

  function _formatTimeNumber(number){
    if(parseInt(number) < 10){
      hours = "0"+hours;
    }
    return number;
  }

  function _getRuter(){
    console.log("Henter ruter fra Skåreråsen");
    clearTimeout(ruterTimer);
    var ruterUrl = '../ruter';
    utils.ajaxGet(ruterUrl, function(response){
      var ruterObject = JSON.parse(response);

      if(ruterObject.error){
        document.getElementById("ruterMessage").innerHTML = ruterObject.error;
        return;
      }
      document.getElementById("ruterMessage").innerHtml = "Avganger fra Skåreråsen";
      var ruterList = document.getElementById("ruterList");
      ruterList.innerText = "";
      for(var i = 0; i < ruterObject.length && i < 6; i++){
        var r = ruterObject[i],
            monitor = r.MonitoredVehicleJourney.MonitoredCall;

        var timeDiv = document.createElement("div"),
            locDiv = document.createElement("div");

        timeDiv.className = "time";
        locDiv.className = "name";

        var dateString = ((new Date(monitor.ExpectedArrivalTime).getTime() - new Date().getTime())/1000/60).toFixed(0);

        if(dateString === "0"){
          dateString = "nå";
        } else if(parseInt(dateString) >= 15){
          dateString = _formatTimeNumber(new Date(monitor.ExpectedArrivalTime).getHours()) +":"+_formatTimeNumber(new Date(monitor.ExpectedArrivalTime).getMinutes());
        }else {
          dateString += " min"
        }
        locDiv.appendChild(document.createTextNode(r.MonitoredVehicleJourney.DestinationName))
        timeDiv.appendChild(document.createTextNode(dateString));
        ruterList.appendChild(locDiv)
        ruterList.appendChild(timeDiv);
      }
    });
    setTimeout(_getRuter, 15000); // Check again in 30 seconds.
  }

  return {
    init: init
  }
})();
