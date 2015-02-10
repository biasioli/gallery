var gallery = function(options){
	options = $.extend({
		arrows: false
	}, options);

	var images = options.images;
	var container = $(options.container);
	var wrapper = $('<div id="gallery-wrapper">');
	var thumbs_container = $('<div id="gallery-thumbs">');
	var image_sequence = [];
	var current_image;
	var current_position = 0;

	container.append(wrapper);
	

	$.each(images, function( position, obj ){
		var image_path = obj.src;
		var thumb_path = obj.thumb;
		var thumb;

		var image_div = $('<div class="gallery-image" style="background-image: url(\''+ image_path +'\');">');
		if (position === 0) {
			image_div.addClass('visible');
			current_image = image_div;
		}
		wrapper.append(image_div);

		if (thumb_path === undefined) {
			thumb = $('<div class="gallery-thumbs-resize" style="background-image: url(\''+ image_path +'\');"></div>');
		} else {
			thumb = $('<div class="gallery-thumbs-original" style="background-image: url(\''+ thumb_path +'\');"></div>');
		}
		image_sequence.push([image_div, thumb]);
		thumb.click(function(){
			current_image.removeClass('visible');
			image_div.addClass('visible');
			current_image = image_div;
			current_position = position;
		});
		thumbs_container.append(thumb);
	});
	wrapper.append(thumbs_container);

	if ( options.arrows === true ) {
		var next_arrow = $('<span class="arrow next">&gt;</span>');
		var previous_arrow = $('<span class="arrow previous">&lt;</span>');
		wrapper.append(next_arrow);
		wrapper.append(previous_arrow);

		next_arrow.click(function (){
			var next_image = image_sequence[(current_position+1) % image_sequence.length][0];
			current_image.removeClass('visible');
			next_image.addClass('visible');
			current_image = next_image;
			current_position = (current_position+1) % image_sequence.length;

		});
	}




}