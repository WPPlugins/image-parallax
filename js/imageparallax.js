(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Image-Parallax/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.2
	
    // Contributions by: WebMaestro.FR
	
	var parallaxCount = 0;
	var imageWidths = new Array();
	var imageHeights = new Array();
	var parallaxImages = new Array();
	
	$.fn.imageparallax = function () {

		return this.each(function () {
			
			$This = $(this).attr({
				id: "parallax_" + parallaxCount,
				rel: parallaxCount
			});
			
			var imageArray = new Array();

			var w = $This.width();
			var h = $This.height();
			
			var horizontal = $This.hasClass('horizontal');
			var vertical = $This.hasClass('vertical');
			var intensity = parseInt($(this).attr('class').replace(/[^\d]/g, ""), 10) / 10;
			
			$This.find("img").each(function(i) {
				$(this).attr({
					id: "parallax_" + parallaxCount + "_" + i,
					title: ""
				});
				imageArray[i] = $(this).attr("src");
			});
			
			var numberOfLayers = imageArray.length;
			
			for (var i = 0; i < numberOfLayers; i++) {

				var imageWidth = parseInt(w * (1 + intensity*(i / numberOfLayers)), 10);
				var imageHeight = parseInt(h * (1 + intensity*(i / numberOfLayers)), 10);

				var imageTop = parseInt((imageHeight - h) / 2, 10) * -1;
				var imageLeft = parseInt((imageWidth - w) / 2, 10) * -1;
				
				$("#" + "parallax_" + parallaxCount + "_" + i).width(imageWidth).height(imageHeight).css({
					top: imageTop + "px",
					left: imageLeft + "px"
				});
			}
			
			parallaxImages[parallaxCount] = imageArray;
			imageWidths[parallaxCount] = w;
			imageHeights[parallaxCount] = h;
			
			$(this).mousemove( function (e) {
			
				var offset = $(this).offset();
				var x = parseInt(e.pageX - offset.left, 10);
				var y = parseInt(e.pageY - offset.top, 10);
				
				var thisElement = $(this).attr("rel");
				var imageArray = parallaxImages[thisElement];
				
				var originalWidth = imageWidths[thisElement];
				var originalHeight = imageHeights[thisElement];
				
				var ratioW = x / originalWidth;
				var ratioH = y / originalHeight;
				
				for (var i = 1; i < imageArray.length; i++) {
					var $Img = $("#" + "parallax_" + thisElement + "_" + i);
					
					var myWidth = $Img.width();
					var myHeight = $Img.height();
					
					var imageLeft = (myWidth - originalWidth) * -1;
					var imageTop = (myHeight - originalHeight) * -1;
					
					var myX = parseInt(imageLeft - ratioW * imageLeft, 10);
					var myY = parseInt(imageTop - ratioH*imageTop, 10);

					if (horizontal) {
						$Img.css({ left: myX + "px" });
					}
					
					if (vertical) {
						$Img.css({ top: myY + "px" });
					}
					
				}
				
			});
			
			parallaxCount++;
		});
	};
})(jQuery);

jQuery(document).ready(function($) {
	$('.parallax-layers').imageparallax();
});