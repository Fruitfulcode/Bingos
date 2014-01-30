jQuery(document).ready(function($) {
	
	/* Slider initialization */
	$(function() {
		var Page = (function() {
				var $navArrows = $( '#nav-arrows' ),
				$nav = $( '#nav-dots > span' ),
				slitslider = $( '#slider' ).slitslider( {
					onBeforeChange : function( slide, pos ) {
						$nav.removeClass( 'nav-dot-current' );
						$nav.eq( pos ).addClass( 'nav-dot-current' );
					}
				} ),

				init = function() {
					initEvents();
				},
				initEvents = function() {
					// add navigation events
					$navArrows.children( ':last' ).on( 'click', function() {
						slitslider.next();
						return false;
					} );

					$navArrows.children( ':first' ).on( 'click', function() {
						slitslider.previous();
						return false;
					} );

					$nav.each( function( i ) {
						$( this ).on( 'click', function( event ) {
							var $dot = $( this );
							if( !slitslider.isActive() ) {
								$nav.removeClass( 'nav-dot-current' );
								$dot.addClass( 'nav-dot-current' );
							}
							slitslider.jump( i + 1 );
							return false;
						} );
					} );
				};

				return { init : init };
		})();

		Page.init();
	});

	/* Carousel initialozation */
	$(document).ready(function() {
 
		$("#team-carousel").owlCarousel({
			items : 5,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [979,3],
			itemsTablet :	[768,2],
			itemsMobile :	[479,1],
			pagination :	false

		});
	 
	});
	
	/* Switcher of Color Themes */
	$(".color-switch a").click(function(){
		$rel = $(this).attr('rel');
		if ($rel.length == false)	return false;
		
		var $head = $("head");
		var $colorlink = $head.find("link[rel='stylesheet'][class='color-scheme']");
		var linkElement = '<link rel="stylesheet" class="color-scheme" href="' + $rel + '" type="text/css" media="all">';
		if ($colorlink.length){
		   $colorlink.replaceWith(linkElement);
		}
		else {
		   $head.append(linkElement);
		}
		return false;
	});
	
});

var counters_finished = false;

jQuery(window).bind('scroll', function() {	
	/* run Counters on elements appear */
	if (jQuery('.counter-number').length > 0 && document.body.clientWidth > 1024 ) {
		if(jQuery(".counter-number").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !counters_finished && jQuery(".counter-number").offset().top + jQuery(".counter-number").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.counter-number').each(function(){
				jQuery(this).initCounter(50);
			});
			counters_finished = true;		
		} else {
			return false;
		}
	}
});


/* counter Functions */	
jQuery.fn.extend({	
	
	initCounter: function (interval) {
		interval = typeof(interval) != 'undefined' ? interval : 5;
		var counterElement = jQuery(this);
		var final_number = parseInt(counterElement.html());
		var showing_number = 0;
		function updateCounter()
		{
			if(showing_number <= final_number)
			{
				counterElement.html(showing_number);
				showing_number++;
			}
			else
			{
			  window.clearInterval(timerID); // stop firing the timer 
			}
		}
		var timerID = window.setInterval(updateCounter, interval, showing_number); // timer interval
	}
	
});