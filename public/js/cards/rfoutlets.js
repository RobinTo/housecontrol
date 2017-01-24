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
    outlet("Outlet one", 1381717, 1381716, null),
    outlet("Outlet two", 1394005, 1394004, null),
    outlet("Outlet three", 1397077, 1397076, null),
  ];

  var $card;

  function init(){
    // This should control the rf outlet switches.
    $card = $('#outletControls');

    _renderOutlets($card);
    /*
    _loadOutlets(function(response){
      outlets = response;
      console.log(outlets);

    });*/
  }

  function _renderOutlets($card){
    $card.empty();
    for(var i = 0; i < outlets.length; i++){
      var $outlet = $('<div id="outlet'+i+'" class="outlet"></div>');
      $outlet.append('<div class="toggle" data="'+outlets[i].onCode+'">On</div>');
      $outlet.append('<div class="toggle" data="'+outlets[i].offCode+'">Off</div>');
      $outlet.find('.toggle').on('click', function(e){
        $.post('/rfoutlet/'+$(e.target).attr('data'));
      });
      $card.append($outlet);
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
