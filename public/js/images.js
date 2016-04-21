var imageController = (function(){

	var imageTimeout = null;
	var currentImage = 0;

	function goToImages(){
		document.getElementById("imagediv").style.display = "block";
		document.getElementById("settingsdiv").style.display = "none";
		document.getElementById("frontpage").style.display = "none";
		config.setCurrentView(VIEWS.IMAGES);
		_startImageTimeout();
	}


	function _startImageTimeout(){
		clearTimeout(imageTimeout);
		if(config.getCurrentView() === VIEWS.IMAGES){
			imageTimeout = setTimeout(function(){
				console.log("Changing image");
				document.getElementById("image").src = "./images/"+_getNextImage();
				_startImageTimeout();
			}, timeBetweenImages);
		}
	}

	function _getNextImage(){
		currentImage++;
		if(currentImage > images.length-1){
			currentImage = 0;
		}
		return images[currentImage];
	}

	return {
		goToImages : goToImages
	}
})();
