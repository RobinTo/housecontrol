var VIEWS = {
	FRONT: "front",
	IMAGES: "image",
	CALENDAR: "calendar"
};
var images = [
	"placeholder/placeholder.jpg"
];
var timeBetweenImages = 30000;
var timeFromClickToPreferdView = 60000;


var config = (function(){
	var currentView,
		preferedView = VIEWS.FRONT;

	function loadSettings() {

		utils.ajaxGet('../imagelist', function(result){
			if(!result.hasOwnProperty("error")){
				var imageList = JSON.parse(result);
				if(Array.isArray(imageList) && imageList.length > 0){
					images = imageList;
				}
			}
		});

	}

	return {
		loadSettings: loadSettings,

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
		}
	}
})();
