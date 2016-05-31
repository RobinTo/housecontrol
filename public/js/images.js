var imageController = (function(){

	var imageTimeout = null;
	
	var currentImage = 0,
			images = [
				"placeholder/placeholder.jpg"
			];

	function init(){
		_loadImages();

		_bindEvents();
	}

	function _bindEvents(){
		var left = document.getElementById("imageLeftController");
		var right = document.getElementById("imageRightController");

		left.onclick = function(event){
			document.getElementById("image").src = "./images/"+_getPreviousImage();
			_startImageTimeout(60000);
			event.stopPropagation();
		}

		right.onclick = function(event){
			document.getElementById("image").src = "./images/"+_getNextImage();
			_startImageTimeout(60000);
			event.stopPropagation();
		}
	}

	function _loadImages(){
		utils.ajaxGet('../imagelist', function(result){
			if(!result.hasOwnProperty("error")){
				var imageList = JSON.parse(result);
				if(Array.isArray(imageList) && imageList.length > 0){
					images = imageList;
				}
			}
		});
	}

	function goToImages(){
		document.getElementById("imagediv").style.display = "block";
		document.getElementById("settingsdiv").style.display = "none";
		document.getElementById("frontpage").style.display = "none";
		config.setCurrentView(VIEWS.IMAGES);
		_startImageTimeout();
	}


	function _startImageTimeout(timeToWait){
		if(!timeToWait || typeof timeToWait !== "number"){
			timeToWait = config.getTimeBetweenImages();
		}

		clearTimeout(imageTimeout);
		if(config.getCurrentView() === VIEWS.IMAGES){
			imageTimeout = setTimeout(function(){
				console.log("Changing image");
				document.getElementById("image").src = "./images/"+_getNextImage();
				_startImageTimeout();
			}, timeToWait);
		}
	}

	function _getPreviousImage(){
		currentImage--;
		if(currentImage < 0){
			currentImage = images.length-1;
		}
		return images[currentImage];
	}

	function _getNextImage(){
		currentImage++;
		if(currentImage > images.length-1){
			currentImage = 0;
		}
		return images[currentImage];
	}

	return {
		init : init,
		goToImages : goToImages
	}
})();
