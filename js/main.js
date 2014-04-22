/* Variables for Heights */
var menu_appear_height;
var menu_disappear_height;

/* Smooth Scroll Settings for Desktop */
$(function(){
	
	var $window = $(window);		//Window object
	
	var scrollTime = 0.25;	//1.2		//Scroll time
	var scrollDistance = 180; //170		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
	if( !isMobile.any() ) {
		$window.on("mousewheel DOMMouseScroll", function(event){
			event.preventDefault();	
											
			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);
				
			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
					autoKill: true,
					overwrite: 5							
				});
		});
	}
	
});


(function($){  
   $(window).load(function(){
       /* Isotope initialization */
		$('#isotope-container').isotope({
			itemSelector : '.isotope-item'
		});
		
		/* Article border */
		if ( $('article').length > 0 ){
			article_selector = jQuery('article');
			
			article_border(article_selector);
			
		}
   })
})(jQuery);   

jQuery(document).ready(function($) {
	
	/* Select */
	$('.selectpicker').selectpicker();
	
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
	
	if (document.body.clientWidth < 650 && $('#team-carousel .owl-wrapper').length ){
		$('#team-carousel .owl-wrapper').css({ "-webkit-transform" : "translate3d(-480px, 0px, 0px)","-webkit-transition" : "all 200ms ease", "transition" : "all 200ms ease" });
	}
	
	$("#services-carousel").owlCarousel({
		singleItem : true,
		navigation :	true,
		navigationText: false,
		pagination :	false,
		touchDrag :		false,
		mouseDrag :		false,
		
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
		transitionStyle : "fade",  
		responsiveBaseWidth: "#testimonials .container",
		
		theme:			"testimonials-theme",
		
		slideSpeed:		200
		
	});
	
	$("#tweets-carousel").owlCarousel({
		navigation :	false,
		pagination :	false,
		mouseDrag:		false,
		touchDrag:		false,
		autoPlay:		false, 
		/* stopOnHover:	true,  */
		singleItem : true,
		transitionStyle : "fade",
		
		theme:			"tweets-theme",
		
		slideSpeed:		200
		
	});
	
	/* Validation of Contact Form */
	$('#submit').click(function(){
        if ($("#contact-form").length ) {
			$("#contact-form").validate({
				submitHandler: function() {
					$.post("contact.php", $("#contact-form").serialize(),  function(response) {
						$('#form-status').html(response);
					});
					return false;
				}
			});
		}
		
		if ($("#test-form").length ) {
			$("#test-form").validate({
				submitHandler: function() {
					$.post("contact-test.php", $("#test-form").serialize(),  function(response) {
						$('#form-status').html(response);
					});
					return false;
				}
			});
		}
    });
		
	/* Focus on contact form */
	$('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea').focusin(function(){
		$(this).parent().addClass('focus');
	});
	$('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea').focusout(function(){
		$(this).parent().removeClass('focus-error').removeClass('focus');
	});

	/*== Mobile menu ==*/
	/* Mobile menu switch */
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
	/* Sub-menu button */
	$('#menu-mobilemenu li.menu-item-has-children .submenu-button').on("click", function(e){
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
	/* Hide mobile menu after click */
	$('#menu-mobilemenu li a').on("click", function(e){
		if ( $('#menu-mobilemenu').hasClass('active') ){
			$('#menu-mobilemenu').removeClass('active');
			$('#mob-menu-switch').removeClass('active');
			$('#menu-mobilemenu').slideUp(0);
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
	
	
	/*== Isotope Toggles ==*/
	
	$('.toggles .panel-title a').on("click", function(e){
		link_to_toggle = $(this).attr('href');
		if ($(this).hasClass('collapsed')) {
			$(this).closest('.toggles').find(link_to_toggle).collapse('toggle').addClass('in');
			$(this).removeClass('collapsed');
		} else {
			$(this).closest('.toggles').find(link_to_toggle).collapse('toggle').removeClass('in');
			$(this).addClass('collapsed');
		}
		e.preventDefault();
	});
	
	/*== Isotope Tabs ==*/
	$('#my-tab-list a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

		
	/* Calculate header offset */
	var header_offset = jQuery('#site-header').offset().top;
	var header_image_height = 0; 
	if (jQuery('#header-top-image').length)	{ header_image_height = jQuery('#header-top-image').height(); }
	var slider_height = 0;
	if (jQuery('#slider').length) { slider_height = jQuery('#slider').height(); }
	
	menu_appear_height = header_image_height + slider_height;
	menu_disappear_height = menu_appear_height + 1200;
	
	/* Check if page height is small */
	/* var page_height = $('body').height();
	if ( page_height < $(window).outerHeight() ) {
		$('#site-header').css({ 
			"position":"relative", 
			"visibility":"visible",
			"opacity":"1",
			"filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
			"margin-top":"27px",
			"margin-bottom":"27px"
		});
	} */
	
	/* Mobile devices */
	if( isMobile.any() ) {
		$('#container').removeClass('not-mobile');
	};
	
	
	
}); // end of document.ready

// Detects devices
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

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

// find max height of two blocks
function max_height_of_two(selector1, selector2) {
	var max_height = 0;
	selector1_height = selector1.height();
	selector2_height = selector2.height();
	max_height = (selector1_height > selector2_height) ? selector1_height : selector2_height;
	return max_height;
}

// set height
function height_set(selector,height) {
	selector.each(function(){
		jQuery(this).css("height", height + "px");
	});
}

/* isotop resize relayout timeout */
function isotope_relayout(selector){
    selector.isotope('reLayout');
}

jQuery(window).bind('resize', function() {	
	
	/* Isotope relayout */
	var isotope_update_timeout;
	
	var isotope_selector = jQuery('#isotope-container');
	
	if (isotope_selector.length > 0 ){
		clearTimeout(isotope_update_timeout);
		isotope_update_timeout = setTimeout(function() {
			isotope_relayout(isotope_selector);
		}, 100);
	}
	
	/* Article border */
	var article_resize_timeout;
	
	if ( jQuery('article').length > 0 ){
		article_selector = jQuery('article');
		clearTimeout(article_resize_timeout);
		article_resize_timeout = setTimeout(function() {
			article_border(article_selector);
		}, 100);
	}
	
});

/* Variables for SCROLL Events */
var counters_finished = false;
var progresses_finished = false;
var progresses_2_finished = false;
var lastScrollTop = 0;

jQuery(window).on('scroll', function() {	
	/* run Counters on elements appear */
	if (jQuery('.counter-number').length > 0 && document.body.clientWidth > 1024 ) {
		if(jQuery(".counter-number").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !counters_finished && jQuery(".counter-number").offset().top + jQuery(".counter-number").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.counter-number').each(function(){
				jQuery(this).initCounter(20);
			});
			counters_finished = true;		
		} 
	}
	
	
	/* run Progress bars on elements appear */
	if (jQuery('#skills-block').length > 0 && document.body.clientWidth > 1024 ) {
		if(jQuery("#skills-block").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !progresses_finished && jQuery("#skills-block").offset().top + jQuery("#skills-block").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.progress-bar').each(function(){
				jQuery(this).children('.sr-only').percentCounter(20);
			});
			progresses_finished = true;		
		} 
	}
	
	/* run Progress bars on elements appear */
	if (jQuery('#skills-block').length > 0 && document.body.clientWidth > 1024 ) {
		if(jQuery("#skills-block").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !progresses_2_finished && jQuery("#skills-block").offset().top + jQuery("#skills-block").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.progress-bar').each(function(){
				jQuery(this).styleCounter(20);
			});
			progresses_2_finished = true;		
		} 
	}
	
	
	/* Show / Hide Header */
	var currScroll = $(this).scrollTop();
	
	if (currScroll > lastScrollTop){	// Scroll Down
		if ( (jQuery(window).scrollTop() > menu_appear_height) && (jQuery(window).scrollTop() < menu_disappear_height) ) {	
			if (!(jQuery('#site-header').hasClass('show')))	{	jQuery('#site-header').addClass('show'); }
			
		} else {
			if ( (jQuery('#site-header').hasClass('show')) && !jQuery('#site-header #mob-menu-switch').hasClass('active') )		jQuery('#site-header').removeClass('show');
		}
	} else { 	// Scroll UP
		if (jQuery(window).scrollTop() > menu_appear_height)  {	
			if (!(jQuery('#site-header').hasClass('show')))		jQuery('#site-header').addClass('show');
		} else {
			if ( (jQuery('#site-header').hasClass('show')) && !jQuery('#site-header #mob-menu-switch').hasClass('active') )		jQuery('#site-header').removeClass('show');
		}
	}
	lastScrollTop = currScroll;
	
	
	
	
});


function article_border(article_selector){
	article_selector.each(function(){
		header = jQuery(this).find('.entry-header');
		content = jQuery(this).find('.entry-content');
		
		header.css('height', 'auto');
		max_height = max_height_of_two(header,content);
		header.height(max_height);
	});
}

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
			  window.clearInterval(timer1); // stop firing the timer 
			}
		}
		var timer1 = window.setInterval(updateCounter, interval, showing_number); // timer interval
	},
	
	percentCounter: function (interval) {
		interval = typeof(interval) != 'undefined' ? interval : 5;
		var counterElement = jQuery(this);
		var final_number = parseInt(counterElement.html());
		var showing_number = 0;
		function updateCounter()
		{
			if(showing_number <= final_number)
			{
				counterElement.html(showing_number+'%');
				showing_number++;
			}
			else
			{
			  window.clearInterval(timer2); // stop firing the timer 
			}
		}
		var timer2 = window.setInterval(updateCounter, interval, showing_number); // timer interval
	},
	
	styleCounter: function (interval) {
		interval = typeof(interval) != 'undefined' ? interval : 5;
		var counterElement = jQuery(this);
		var final_number = parseInt(counterElement.attr('aria-valuenow'));
		var showing_number = 0;
		function updateCounter()
		{
			if(showing_number <= final_number)
			{
				counterElement.css('width', showing_number+'%');
				showing_number++;
			}
			else
			{
			  window.clearInterval(timer3); // stop firing the timer 
			}
		}
		var timer3 = window.setInterval(updateCounter, interval, showing_number); // timer interval
	}
	
});