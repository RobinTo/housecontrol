// Data structure used in rfoutlets.
var outlet = function(name, onCode, offCode, toggleCode){
  return{
    name: name,
    onCode: onCode,
    offCode: offCode,
    toggleCode: toggleCode
  }
}

var rfoutlets = (function(){
  var outlets = [
    outlet("Outlet one", 1561, 1621, null),
    outlet("Outlet two", 1561, 1621, null),
    outlet("Outlet three", 1561, 1621, null),
  ];

  function init(){
    // This should control the rf outlet switches.

    $.get('/rfoutlet', function(response){
      outlets = response;
      console.log(outlets);
    
      var $card = $('#outletControls');
      _renderOutlets($card);
    });
  }

  function _renderOutlets($card){
    $card.empty();
    for(var i = 0; i < outlets.length; i++){
      $card.append('<div>' + outlets[i].name + '</div>');
    }
  }

  return {
    init: init,
    getOutlets : function(){
      return outlets;
    },
    addOutlet : function(name, onCode, offCode, toggleCode){
      $.post('/rfoutlet/'+name+'/'+onCode+'/'+offCode+'/'+toggleCode);
      outlets.push(outlet(name, onCode, offCode, toggleCode));
    },
    removeOutlet : function(name){
      var indexToRemove = null;
      for(var i = 0; i < outlets.length; i++){
        if(outlets[i].name === name){
          indexToRemove = i;
          break;
        }
      }
      outlets.splice(indexToRemove, 1);
    }
  }
})();
