(function(){

	// check if this page is already goatseourced
	if(typeof goatseourced !== 'undefined' && goatseourced === true) {
		return;
	}
	goatseourced = true;

	// Check if jQuery is loaded
	if(typeof window.jQuery != 'undefined') {
		jQuery(document).ready(goatseource);
	} else {
		// Check for conflicts
		var conflict = typeof window.$ != 'undefined';
		// Create the script and point to Google API
		var script = document.createElement('script');
		script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
		// Add the script to the 'head' for processing
		document.getElementsByTagName('head')[0].appendChild(script);
		// Create a way to wait until script loading
		var attempts = 15;
		(function(){
			// Check again if jQuery is undefined
			if(typeof window.jQuery == 'undefined') {
				if(--attempts > 0) {
					// Calls himself in a few milliseconds
					window.setTimeout(arguments.callee, 250);
				}
			} else {
				jQuery(document).ready(goatseource);
			}
		})();
	}

	function goatseource() {
		alert($(window).height());

		var host = 'http://jamesmoss.co.uk/goatseource/';
			
		var html = '<div id="goatseource">';
			html+= '	<div class="goatseource-animation">';
			html+= '		<img src="'+host+'left-arm.png" class="goatseource-left" width="833" height="400" alt="" />';
			html+= '		<img src="'+host+'right-arm.png" class="goatseource-right" width="833" height="400" alt="" />';
			html+= '		<div class="goatseource-mask">';
			html+= '			<div class="goatseource-source"></div>';
			html+= '		</div>';
			html+= '	</div>';
			html+= '</div>';

		var container  = jQuery(html),
			inner      = container.find('.goatseource-animation'),
			leftArm    = container.find('.goatseource-left'),
			rightArm   = container.find('.goatseource-right'),
			mask       = container.find('.goatseource-mask'),
			source     = container.find('.goatseource-source'),
			pageSource = '<html>\n' + $('html').html() + '\n</html>';

		// inject our CSS
		jQuery('<link rel="stylesheet" type="text/css" href="'+host+'goatseource.css?v=1" />').appendTo(jQuery('head'));

		// try and remove ourselves from the HTML that gets displayed
		pageSource = pageSource.replace('<script src="'+host+'goatseource.js"></script>', '');

		// display the page's source
		source.text(pageSource);
		container.appendTo(jQuery('body'));

		// vertically align the animation
		var offset = jQuery(window).height() - 500;
		if(offset < 0) offset = 0;
		inner.css('margin-top', (offset / 2)+'px' );
		
		// animate it all
		inner.hide().fadeIn(600, function() {
			// animate the stretch
			mask.animate({width:500, height: 400});
			source.animate({marginLeft: 0});
			leftArm.animate({left:-770, top: 100});
			rightArm.animate({left: 440, top: 100});

			container.click(function(){
				goatseourced = false;
				container.remove();
			});

			// scrolly effect for long sources
			if(source.outerHeight() > 400) {
				var maxOffset = source.outerHeight() - 400;
				var offset    = source.offset().top;

				mask.mousemove(function(e){

					var pos = (e.pageY - offset) / 400;

					if(pos > 0 && pos <= 1) {
						source.css('margin-top', 0-Math.floor(pos * maxOffset));
					}
				});
			}
		});
		
	}


})();