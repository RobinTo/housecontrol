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

  var $card;

  function init(){
    // This should control the rf outlet switches.
    $card = $('#outletControls');

    _loadOutlets(function(response){
      outlets = response;
      console.log(outlets);
    
      _renderOutlets($card);
    });
  }

  function _renderOutlets($card){
    $card.empty();
    for(var i = 0; i < outlets.length; i++){
      $card.append('<div>' + outlets[i].name + '</div>');
    }
  }

  function _loadOutlets(callback){
    $.get('/rfoutlet', callback);
  }

  return {
    init: init,
    getOutlets : function(){
      return outlets;
    },
    addOutlet : function(name, onCode, offCode, toggleCode){
      $.post('/rfoutlet/'+name+'/'+onCode+'/'+offCode+'/'+toggleCode).done(function(){
        _loadOutlets(function(response){
          outlets = response;
          _renderOutlets($card);
        });
      });
    },
    removeOutlet : function(name){
      
      $.delete('/rfoutlet/'+name).done(function(){
        _loadOutlets(function(response){
          outlets = response;
          _renderOutlets($card);
        });
      });
    }
  }
})();
