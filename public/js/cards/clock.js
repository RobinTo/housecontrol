var clock = (function(){
  function init(){
    _startTime();
  }
  function _startTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      m = checkTime(m);
      document.getElementById('clockText').innerHTML = h + ":" + m;
      var t = setTimeout(_startTime, 5000);
  }
  function checkTime(i) {
      if (i < 10) {i = "0" + i};
      return i;
  }
  return {
    init: init
  }
})();
