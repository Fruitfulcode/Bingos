(function($){  
   $(window).load(function(){
       /* Isotope initialozation */
		$('#isotope-container').isotope({
			itemSelector : '.isotope-item'
		});
   })
})(jQuery);   

jQuery(document).ready(function($) {
	
	
	
	/* Button hide */
	if (document.body.clientWidth < 992){
		$('.isotope-item').hover(
			function(){
				$(this).find('.double-button').css("display", "inline-block");
			},
			function(){
				$(this).find('.double-button').fadeOut(300);
			}
		);
	}
	
	if (document.body.clientWidth >= 992){
		$('.isotope-item').each(function(){
			$(this).find('.double-button').css("display", "inline-block");
		});
	}
	
	
	/* isotope category filter*/
	$('.isotope-option li.all a, .isotope-option li.option a').on("click", function(){
		$(this).closest('ul').find('li.current').removeClass('current');
		$('#hidden-works-menu').find('li.current').removeClass('current');
		var selector = $(this).attr('data-filter');
		$('#isotope-container').isotope({ filter: selector });
		$(this).parent().addClass('current');
		
		if ( $('#hidden-works-menu').hasClass('active') ){
			$('#hidden-works-menu').removeClass('active');
			$(this).removeClass('active');
			$('#hidden-works-menu').slideUp(50);
		}
		
		return false;
	});
	
	$('#hidden-works-menu li a').on("click", function(){
		$(this).closest('ul').find('li.current').removeClass('current');
		$('.isotope-option li.all').removeClass('current');
		var selector = $(this).attr('data-filter');
		$('#isotope-container').isotope({ filter: selector });
		$(this).parent().addClass('current');
		
		if ( $('#hidden-works-menu').hasClass('active') ){
			$('#hidden-works-menu').removeClass('active');
			$('li.option-select > a').removeClass('active');
			$('#hidden-works-menu').slideUp(50);
		}
		
		return false;
	});
	
	/* Mobile menu */
	$('a#mob-menu-switch').on("click", function(e){
		if ( $('#menu-mobilemenu').hasClass('active') ){
			$('#menu-mobilemenu').removeClass('active');
			$(this).removeClass('active');
			$('#menu-mobilemenu').slideUp();
		} else {
			$('#menu-mobilemenu').addClass('active');
			$(this).addClass('active');
			$('#menu-mobilemenu').slideDown();
		}
		e.preventDefault();
	});
	
	$('#hidden-mobile-menu li.menu-item-has-children .submenu-button').on("click", function(e){
		if ( $(this).parent().hasClass('menu-item-has-children') ) {
			if ( $(this).parent().hasClass('active-parent') ) {
				$(this).parent().removeClass('active-parent');
				$(this).parent().children('ul.sub-menu').slideUp();
			} else {
				$(this).parent().addClass('active-parent');
				$(this).parent().children('ul.sub-menu').slideDown();
			}
			e.preventDefault();
		}
	});
	
	/* Isotope Mobile menu */
	$('li.option-select > a').on("click", function(e){
		if ( $('#hidden-works-menu').hasClass('active') ){
			$('#hidden-works-menu').removeClass('active');
			$(this).removeClass('active');
			$('#hidden-works-menu').slideUp();
		} else {
			$('#hidden-works-menu').addClass('active');
			$(this).addClass('active');
			$('#hidden-works-menu').slideDown();
		}
		e.preventDefault();
	});
	
	/* Slider */
	$.Slitslider.defaults   = {
		// transitions speed
		speed : 800,
		// if true the item's slices will also animate the opacity value
		optOpacity : false,
		// amount (%) to translate both slices - adjust as necessary
		translateFactor : 230,
		// maximum possible angle
		maxAngle : 25,
		// maximum possible scale
		maxScale : 2,
		// slideshow on / off
		autoplay : false,
		// keyboard navigation
		keyboard : false,
		// time between transitions
		interval : 5900,
		// callbacks
		onBeforeChange : function( slide, idx ) { return false; },
		onAfterChange : function( slide, idx ) { return false; }
	};
	
	
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
		itemsMobile :	[630,1],
		itemsScaleUp :	false,
		pagination :	false,
		
		dragBeforeAnimFinish: false,
		
		theme:			"team-theme",
		
		/* slideSpeed:		300, */
		dragBeforeAnimFinish: false
	});
	
	if (document.body.clientWidth < 650){
		$('#team-carousel .owl-wrapper').css({ "-webkit-transform" : "translate3d(-480px, 0px, 0px)","-webkit-transition" : "all 200ms ease", "transition" : "all 200ms ease" });
	}
	
	$("#services-carousel").owlCarousel({
		singleItem : true,
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
		autoPlay:		false, 
		/* stopOnHover:	true,  */
		singleItem : true,
		transitionStyle : "fadeUp", 
		
		theme:			"testimonials-theme",
		
		slideSpeed:		300
		
	});
	
	$("#tweets-carousel").owlCarousel({
		navigation :	false,
		pagination :	false,
		mouseDrag:		false,
		touchDrag:		false,
		autoPlay:		false, 
		/* stopOnHover:	true,  */
		singleItem : true,
		transitionStyle : "fadeUp",
		
		theme:			"tweets-theme",
		
		slideSpeed:		300
		
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


// find max height of blocks
function max_height_calc(selector) {
	var max_height = 0;
	var current_height= 0;
	selector.each(function(){
		current_height = jQuery(this).height();
		max_height = (current_height > max_height) ? current_height : max_height;
	});
	return max_height;
}

// set height
function height_set(selector,height) {
	selector.each(function(){
		jQuery(this).css("height", height + "px");
	});
}

// get number of rows of text
function getRows(selector) {
    var height = $(selector).height();
    var line_height = $(selector).css('line-height');
    line_height = parseFloat(line_height)
    var rows = height / line_height;
    return Math.round(rows);
}

/* isotop resize relayout timeout */
function isotope_relayout(selector){
    selector.isotope('reLayout');
}

jQuery(window).bind('resize', function() {	

	var isotope_update_timeout;
	
	var isotope_selector = jQuery('#isotope-container');
	
	if (isotope_selector.length > 0 ){
		clearTimeout(isotope_update_timeout);
		isotope_update_timeout = setTimeout(function() {
			isotope_relayout(isotope_selector);
		}, 100);
	}
	
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