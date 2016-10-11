var ruter = (function(){

  var ruterTimer;

  function init(){
    _getRuter();
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
      for(var i = 0; i < ruterObject.length; i++){
        var r = ruterObject[i],
            monitor = r.MonitoredVehicleJourney.MonitoredCall;

        var newDiv = document.createElement("div");

        var dateString = ((new Date(monitor.ExpectedArrivalTime).getTime() - new Date().getTime())/1000/60).toFixed(0);

        var textString = r.MonitoredVehicleJourney.DestinationName + " om " + dateString + " min";
        newDiv.appendChild(document.createTextNode(textString));
        ruterList.appendChild(newDiv);
      }
    });
    setTimeout(_getRuter, 15000); // Check again in 30 seconds.
  }

  return {
    init: init
  }
})();
