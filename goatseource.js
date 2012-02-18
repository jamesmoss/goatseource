function goatseource() {

	var html = '<div id="goatseource">';
		html+= '	<div class="animation">';
		html+= '		<img src="left-arm.png" class="left" width="833" height="400" alt="" />';
		html+= '		<img src="right-arm.png" class="right" width="833" height="400" alt="" />';
		html+= '		<div class="mask">';
		html+= '			<div class="source"></div>';
		html+= '		</div>';
		html+= '	</div>';
		html+= '</div>';

	var container  = jQuery(html),
		inner      = container.find('.animation'),
		leftArm    = container.find('.left'),
		rightArm   = container.find('.right'),
		mask       = container.find('.mask'),
		source     = container.find('.source'),
        pageSource = '<html>\n' + $('html').html() + '\n</html>';

    source.text(pageSource);
	container.appendTo($('body'));
	// vertically align the animation
	inner.css('margin-top', ((container.height() - 500) / 2)+'px' );
	

	inner.hide().fadeIn(1000, function(){
		// animate the rest
		mask.animate({width:500, height: 400});
		source.animate({marginLeft: 0});
		leftArm.animate({left:-770});
		rightArm.animate({left: 440});
	});
}


jQuery(function(){
	$('a').click(function(){
		goatseource();
		return false;
	});
});