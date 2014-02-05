jQuery(document).ready(function($) {
	
	
	
	/* Isotope initialozation */
	
	$('#isotope-container').isotope({
		animationEngine: 'css',
		itemSelector : '.isotope-item',
		/* layoutMode : '' */
	});
	
	
	$(window).load(function() {
		$('#isotope-container').isotope('reLayout');
	});
	
	
	$('.isotope-option a').click(function(){
		$(this).closest('ul').find('li.current').removeClass('current');
		var selector = $(this).attr('data-filter');
		$('#isotope-container').isotope({ filter: selector });
		$(this).parent().addClass('current');
		return false;
	});
	
	
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
	$("#team-carousel").owlCarousel({
		items : 5,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet :	[768,2],
		itemsMobile :	[479,1],
		pagination :	false,
		
		theme:			"team-theme",
		
		/* slideSpeed:		300, */
		dragBeforeAnimFinish: false
	});
	
	$("#services-carousel").owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		itemsTablet :	[768,1],
		itemsMobile :	[479,1],
		navigation :	true,
		navigationText: false,
		pagination :	false,
		
		theme:			"services-theme",
		
		/* slideSpeed:		300, */
		dragBeforeAnimFinish: false
	});
	
	$("#testimonial-carousel").owlCarousel({
		navigation :	false,
		pagination :	true,
		mouseDrag:		false,
		touchDrag:		false,
		autoPlay:		5000, 
		/* stopOnHover:	true,  */
		singleItem : true,
		transitionStyle : "fade",
		
		theme:			"tesimonials-theme", 
		
		/* slideSpeed:		300, */
		
	});
	
	$("#tweets-carousel").owlCarousel({
		navigation :	false,
		pagination :	false,
		mouseDrag:		false,
		touchDrag:		false,
		autoPlay:		5000, 
		/* stopOnHover:	true,  */
		singleItem : true,
		transitionStyle : "fade"
		
		/* autoHeight:		true */
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
				jQuery(this).initCounter(20);
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