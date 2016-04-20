var utils = (function(){
  function ajaxGet(url, callback){
  var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               callback(xmlhttp.responseText);
           }
           else {
              callback({error: "There was an error"});
           }
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  return {
    ajaxGet : ajaxGet
  };

})();