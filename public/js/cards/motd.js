var motd = (function(){

  var motdTimer;

  function init(){
    _getMotd();
  }

  function _getMotd(){
    clearTimeout(motdTimer);
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
    setTimeout(_getMotd, 3600000); // Check again in one hour.
  }

  return {
    init: init
  }
})();
