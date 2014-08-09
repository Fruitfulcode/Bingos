//$.noConflict();

/* Variables for Heights */
var menu_appear_height;
var menu_disappear_height;
var header_right_margin=0;
var header_image_height = 0; 
var slider_height = 0;
var menu_show_top = false;

/* Focus variable - check if input focused */
var input_focused = false;

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

/* FadeIn / FadeOut */
(function($) {
    var default_fade_config = {
        fadeIn: 1000,
        stay: 5000,
        fadeOut: 1000
    };

    function fade(index, $elements, config) {
        $elements.eq(index)
		.fadeTo(config.fadeIn,1)
		.delay(config.stay)
		.fadeTo(config.fadeOut, 0, function() {
		  fade((index + 1) % $elements.length, $elements, config);
		});
	} 
    
	
    $.fn.fadeLoop = function(config) {     
		
		$(this).each(function(){
			var fadeSlides = $(this).find('.fade-slide');
			
			fade(0, fadeSlides, $.extend({}, default_fade_config, config));
			return this;
		});
    };
	
	/* Dots slider */
	var default_dots_config = {
        fadeIn: 1000,
        stay: 5000,
        fadeOut: 1000
    };
	
	function showOne(index, $elements, config) {
        $elements.eq(index)
		.fadeTo(config.fadeIn,1);
	} 
	
	$.fn.dotsSlider = function(config) {     
		
		$(this).each(function(){
			
			var dotsSlides = $(this).find('.slide');
			var slidesNum = dotsSlides.length;
			
			//alert(slidesNum);
			if (slidesNum == false) {
				return false;
			} else if (slidesNum == 1) {
				dotsSlides.css('opacity', '1');
				return false;
			} else {
				var dotsBlock = '<ul class="dots-nav white">';
				var i=1;
				while(i <= slidesNum){
					if (i==1){
						dotsBlock += '<li><a class="active" href="#">' + i + '</a></li>';
					} else {
						dotsBlock += '<li><a href="#">' + i + '</a></li>';
					}
					i++;
				}
				dotsBlock += '</ul>';
				
				$(this).append(dotsBlock);
				
				showOne(0, dotsSlides, $.extend({}, default_fade_config, config));
				
				return this;
			}
			
		});
    }; 
	

}(jQuery));

function set_height_elements_via_padding($elements) {
	//$elements.css('display','block');
	var max_height = max_height_calc($elements);
	//$elements.css('display','');
	padding_height_set($elements,max_height);
}

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

// padding set for equal height
function padding_height_set(selector,max_height) {
	selector.each(function(){
		var cur_height = jQuery(this).height();
		var padding = (cur_height <= max_height) ? (max_height-cur_height)/2 : false ;
		if (padding) {
			jQuery(this).css("padding-top", padding + "px");
			jQuery(this).css("padding-bottom", padding + "px");
		}
	});
}


/* isotop resize relayout timeout */
function isotope_relayout(selector){
    selector.isotope('reLayout');
}

function article_border(article_selector){
	article_selector.each(function(){
		header = jQuery(this).find('.entry-header');
		content = jQuery(this).find('.entry-content');
		
		header.css('height', 'auto');
		max_height = max_height_of_two(header,content);
		header.height(max_height);
	});
}

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
	iPad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
	iPhone: function() {
        return navigator.userAgent.match(/iPhone/i);
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

// Detects IE
var isIE = {
    any: function() {
        return navigator.userAgent.match(/MSIE/i);
    }
};

/* Smooth Scroll Settings for Desktop */
(function($){
	
	var $window = $(window);		//Window object
	
	var scrollTime = 0.5;	//1.2		//Scroll time
	var scrollDistance = 150; //170		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
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
	
})(jQuery);


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
				
		/* Tweets fadein/fadeout init */
		if ($("#tweets-carousel").length ) {
			// set equal height to tweets
			set_height_elements_via_padding($('#tweets-carousel .block-with-quotes'));
			// Fade in / fade out tweets
			$('#tweets-carousel').fadeLoop({
				fadeIn: 500, 
				stay: 4000, 
				fadeOut: 500
			});
		}
			
		var $testimonils_selector = $('#testimonial-slider .slides li');
   })
})(jQuery);   


/* Tweeters block Settings */
var tweet_timer = 0;
function showTweets() {

	clearInterval(tweet_timer); // stop the setInterval()

	if ( jQuery('#tweets-carousel .block-with-quotes.on').next().length ) {
		jQuery.when(
			jQuery('#tweets-carousel .block-with-quotes.on').fadeOut()
		).then(function () { 
			jQuery('#tweets-carousel .block-with-quotes.on').removeClass('on').next().fadeIn().addClass('on');		
		});					
	} else {
		jQuery.when(
			jQuery('#tweets-carousel .block-with-quotes.on').fadeOut().removeClass('on')
		).then(function () { 
			jQuery('#tweets-carousel .block-with-quotes:first').fadeIn().addClass('on');
		});
	}
	tweet_timer = setInterval(showTweets, 5000);
}

/* Smooth Anchor Scroll */
function smooth_anchor(selector){
	var href = selector.attr("href");
	href_array = href.split('#');
	if ( href === "#" ) { // top of page
		offsetTop = 0;
	} else if ( href_array[0].length > 0 ) { // another html page
		return false; 
	} else if ( href_array[1].length > 0 ) {
		offsetTop = jQuery('#'+href_array[1]).offset().top+1; // offset of block on current page
	} else {
		return false; // incorrect href
	}
	jQuery('html, body').stop().animate({ 
	  scrollTop: offsetTop
	}, 1000);
	return true;
}

/* Modal function */
function modal_func(selector){
	var href = selector.attr("href");
	href_array = href.split('#');
	if ( href === "#" ) { // top of page
		return false; 
	} else if ( href_array[0].length > 0 ) { // another html page
		return false; 
	} else if ( href_array[1].length > 0 ) {
		jQuery('#'+href_array[1]).modal({autoResize:true, opacity:70, overlayClose:true, zIndex:99999});
	} else {
		return false; // incorrect href
	}
	
	return true;
}

jQuery(document).ready(function($) {

	if (isIE.any()) {
		$("body").queryLoader2({
			percentage:	true
		});
	} else {
		window.addEventListener('DOMContentLoaded', function() {
			$("body").queryLoader2({
				percentage:	true
			});
		});
	}
	
	
	/* On Orientation Change */
	if (isMobile.any() )	{
		window.addEventListener("orientationchange", function(){
			if (jQuery('#hidden-works-menu').hasClass('active') ) {
				jQuery('#hidden-works-menu').removeClass('active');
				jQuery('li.option-select > a').removeClass('active');
				jQuery('#hidden-works-menu').slideUp(0);
			}
			if (jQuery('#hidden-mobile-menu').hasClass('active') ) {
				jQuery('#hidden-mobile-menu').removeClass('active');
				jQuery('#mob-menu-switch').removeClass('active');
				jQuery('#hidden-mobile-menu').slideUp(0);
			}
		});
	}

	if ( $('#slider').length ) {
		/* Slider initialization */
		$(function() {
			var slider_function = (function() {
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

			slider_function.init();
		});
	}
	
	/* Select */
	$('.selectpicker').selectpicker();
	
	/* Slides */
	if ( $('#slides').length ) {
		$('#slides').superslides({
			inherit_width_from : "#slider-wrapper",
			inherit_height_from : "#slider-wrapper"
		});
	}
	
	// Bind click handler to Button
	// so we can get a fancy scroll animation
	$('#slider .double-button').click(function(e){
		if (!isMobile.any() && smooth_anchor($(this))) {
			e.preventDefault();
		}
	});
	
	$('.main-navigation .menu li a').click(function(e){
		if (!isMobile.any() && smooth_anchor($(this))) {
			e.preventDefault();
		}
	});
	
	$('#hidden-mobile-menu .nav-menu li a').click(function(e){
		if (!isMobile.any() && smooth_anchor($(this))) {
			e.preventDefault();
		}
	});
	
	// Bind click handler to Button
	// so we can get a Modal Window
	$('#works .isotope-item a.double-button').click(function(e){
		modal_func($(this));
		e.preventDefault();
	});
		
	/* Carousel initialozation */
	$("#team-carousel").owlCarousel({
		items : 5,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet :	[768,2],
		itemsMobile :	[620,1],
		itemsScaleUp :	false,
		pagination :	false,
		dragBeforeAnimFinish: false,
		theme:			"team-theme",
		dragBeforeAnimFinish: false
		
	});
	// Team second on mobile
	if ($('#team-carousel').length && document.body.clientWidth < 640) {
		var owl = $('#team-carousel').data('owlCarousel'); 
		owl.next();
	}
	

	$("#services-carousel").owlCarousel({
		singleItem : true,
		navigation :	true,
		navigationText: false,
		pagination :	false,
		touchDrag :		false,
		mouseDrag :		false,
		slideSpeed:		700,
		theme:			"services-theme",
		dragBeforeAnimFinish: false
	});
		 
	if ($(".slider-dots").length){
		$(".slider-dots").dotsSlider({
			fadeIn: 500, 
			stay: 4000, 
			fadeOut: 500
		}); 
	}
	
	if ($("#testimonial-slider").length){
		$("#testimonial-slider").dotsSlider({
			fadeIn: 500, 
			stay: 4000, 
			fadeOut: 500
		}); 
	}
		
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
		
		if ($("#elements-form").length ) {
			$("#elements-form").validate({
				submitHandler: function() {
					$.post("contact-elements.php", $("#elements-form").serialize(),  function(response) {
						$('#form-status').html(response);
					});
					return false;
				}
			});
		}
		
		if ($("#comment-form").length ) {
			$("#comment-form").validate({
				submitHandler: function() {
					$.post("comment.php", $("#comment-form").serialize(),  function(response) {
						$('#form-status').html(response);
					});
					return false;
				}
			});
		}
    });
		
	/* Focus on contact form */
	$('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea, .comment-form input[type="text"], .comment-form input[type="email"], .comment-form textarea').focusin(function(){
		$(this).parent().addClass('focus');
		input_focused = true;
	});
	$('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea, .comment-form input[type="text"], .comment-form input[type="email"], .comment-form textarea').focusout(function(){
		$(this).parent().removeClass('focus-error').removeClass('focus');
		input_focused = false;
	});

	/* Menu for iPad */
	$('.main-navigation li.menu-item-has-children a').on("click", function(e){
		if (isMobile.any() ) {
			$li = $(this).parent();
			if ($li.hasClass('hover')) {
				$li.removeClass('hover');
			} else {
				$li.addClass('hover');
			}
			
			e.preventDefault();
		}
	});
	$(document).bind( "touchend", function(e){
		var menu_container = $('#main-header .main-navigation');
		
		if (!menu_container.is(e.target) // if the target of the click isn't the container...
			&& menu_container.has(e.target).length === 0   // ... nor a descendant of the container
			&& menu_container.find('li.hover').length ) 
		{
			$('.main-navigation li.hover').removeClass('hover');
		}
	});
	
	/*== Mobile menu ==*/
		
	/* Mobile menu switch */
	$('a#mob-menu-switch').on("click", function(e){
		if ( $('#hidden-mobile-menu').hasClass('active') ){
			$('#hidden-mobile-menu').removeClass('active');
			$(this).removeClass('active');
			$('#hidden-mobile-menu').slideUp();
		} else {
			$('#hidden-mobile-menu').addClass('active');
			$(this).addClass('active');
			$('#hidden-mobile-menu').slideDown();
		}
		e.preventDefault();
	});
	
	$('#mob-menu-alt-switch').on("click", function(e){
		$('#site-header').addClass('show');
		$('#mob-menu-alt-switch').removeClass('active');
		if ( $('nav.main-navigation').css('display') == 'none' ) {
			$('a#mob-menu-switch').click();
		}
		e.preventDefault();
	});
	
	$('#header-hide-btn').on("click", function(e){
		$('#site-header').removeClass('show');
		$('#mob-menu-alt-switch').addClass('active');
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
		if ( $('#hidden-mobile-menu').hasClass('active') ){
			$('#hidden-mobile-menu').removeClass('active');
			$('#mob-menu-switch').removeClass('active');
			$('#hidden-mobile-menu').slideUp(0);
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
	//var header_image_height = 0; 
	if (jQuery('#header-top-image').length)	{ header_image_height = jQuery('#header-top-image').height(); }
	//var slider_height = 0;
	if (jQuery('#slider').length) { slider_height = jQuery('#slider').height(); }
	
	menu_appear_height = header_image_height + slider_height;
	menu_disappear_height = menu_appear_height + 1200;
	
	/* Menu on TOP without Slider */
	if (header_image_height > 0 && slider_height == 0 ) {
		menu_show_top = true;
		jQuery('#site-header').addClass('show-top');
		jQuery('#hidden-mobile-menu').addClass('absolute');
		menu_appear_height = jQuery('#site-header').css('padding-top');
		menu_appear_height = menu_appear_height.replace(/\D/g,'');
	}
	
	/* Calc if there is place for button */
	header_container = jQuery('#main-header .container');
	h_margin = header_container.css('margin-right').slice(0,-2)*1;
	h_padding = header_container.css('padding-right').slice(0,-2)*1;
	header_right_margin = h_margin + h_padding;
	if (header_right_margin > 65) {
		jQuery('#header-hide-btn').addClass('show');
	} else if (jQuery('#header-hide-btn').has('show')) {
		jQuery('#header-hide-btn').removeClass('show');
	}
	
	$("#jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
            title: "Looking for the summer",
            mp3: "audio/summer.mp3"
          });
        },
        swfPath: "js/jplayer/Jplayer.swf",
		solution: "html,flash",
        supplied: "mp3"
    });
	
	
	/* Mobile devices */
	if( isMobile.any() ) {
		$('#container').removeClass('not-mobile');
	};
	
	
	/* Part of dotsSlider - Should be at the end of Document.ready */
	$('.dots-nav li a').on("click", function(e){
		if (!($(this).hasClass('active'))) {
			/* Config speed*/
			fadeIn_time = 500;
			fadeOut_time = 500;
			
			/* Vars */
			index = parseInt($(this).html());
			index = index - 1;
			var pastActive = $(this).closest('.dots-nav').find('a.active');
			var sliderBlock = $(this).closest('.slider-dots');
			var dotsSlides = sliderBlock.find('.slide');
			var slidesNum = dotsSlides.length;
			
			/* Remove class .active */
			pastActive.removeClass('active');
			
			/* Hide current */
			dotsSlides.each(function(){
				var opacity_val = $(this).css('opacity');
				if (opacity_val == '1') $(this).fadeTo(fadeOut_time,0);
			});
			
			/* Show selected */
			dotsSlides.eq(index).delay(fadeOut_time).fadeTo(fadeIn_time,1);
			
			$(this).addClass('active');
		}
		e.preventDefault();
	}); 
	
	/* run Header animation on appear */
	if (jQuery('.with-animation').length && !isMobile.any() ) {
		jQuery('.with-animation')
			  .scrolledIntoView()
			  .on('scrolledin', function () { 
				  if (!jQuery(this).hasClass('was-animated')) {
					  jQuery(this).addClass('animated fadeInDown');
					  jQuery(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						  jQuery(this).removeClass('animated fadeInDown');
					  });
					  jQuery(this).addClass('was-animated');
				  }
			  })
			  .on('scrolledout', function () { // out 
			  });
	}
	
}); // end of document.ready

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
	/* Hide menus on not Mobile */
	if (document.body.clientWidth > 758 && jQuery('#hidden-mobile-menu').hasClass('active')) {
		jQuery('#hidden-mobile-menu').removeClass('active');
		jQuery('#mob-menu-switch').removeClass('active');
		jQuery('#hidden-mobile-menu').slideUp(0);
	}
	if (document.body.clientWidth > 758 && jQuery('#hidden-works-menu').hasClass('active')) {
		jQuery('#hidden-works-menu').removeClass('active');
		jQuery('li.option-select > a').removeClass('active');
		jQuery('#hidden-works-menu').slideUp(0);
	}
	
	/* Calc if there is place for button */
	if (document.body.clientWidth > 758) {
		header_container = jQuery('#main-header .container');
		h_margin = header_container.css('margin-right').slice(0,-2)*1;
		h_padding = header_container.css('padding-right').slice(0,-2)*1;
		header_right_margin = h_margin + h_padding;
		if (header_right_margin > 65) {
			jQuery('#header-hide-btn').addClass('show');
		} else if (jQuery('#header-hide-btn').has('show')) {
			jQuery('#header-hide-btn').removeClass('show');
		}
	} else if (jQuery('#header-hide-btn').has('show')) {
		jQuery('#header-hide-btn').removeClass('show');
	}
	
	/* Menu on TOP without Slider */
	if (slider_height == 0 ) {
		menu_appear_height = jQuery('#site-header').css('padding-top');
		menu_appear_height = menu_appear_height.replace(/\D/g,'');
		//alert(menu_appear_height);
	}
		
});

/* Variables for SCROLL Events */
var counters_finished = false;
var progresses_finished = false;
var progresses_2_finished = false;
var lastScrollTop = 0;



jQuery(window).on('scroll', function() {	
	/* run Counters on elements appear */
	if (jQuery('.counter-number').length > 0 && !isMobile.any() ) {
		if(jQuery(".counter-number").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !counters_finished && jQuery(".counter-number").offset().top + jQuery(".counter-number").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.counter-number').each(function(){
				jQuery(this).initCounter(20);
			});
			counters_finished = true;		
		} 
	}
	
	/* run Progress bars on elements appear */
	if (jQuery('#skills-block').length > 0 && !isMobile.any() ) {
		if(jQuery("#skills-block").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !progresses_finished && jQuery("#skills-block").offset().top + jQuery("#skills-block").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.progress-bar').each(function(){
				jQuery(this).children('.sr-only').percentCounter(20);
				jQuery(this).styleCounter(20);
			});
			progresses_finished = true;		
		} 
	}
	
	/* run Progress bars on elements appear */
	/* if (jQuery('#skills-block').length > 0 && !isMobile.any() ) {
		if(jQuery("#skills-block").offset().top < (jQuery(window).scrollTop() + jQuery(window).outerHeight()) && !progresses_2_finished && jQuery("#skills-block").offset().top + jQuery("#skills-block").outerHeight() > (jQuery(window).scrollTop() ) ) {
			
			jQuery('.progress-bar').each(function(){
				
			});
			progresses_2_finished = true;		
		} 
	} */
	
	
	/* Show / Hide Header */
	var currScroll = jQuery(this).scrollTop();
	
	if (currScroll > lastScrollTop){	// Scroll Down
		if ( (jQuery(window).scrollTop() > menu_appear_height) && (jQuery(window).scrollTop() < menu_disappear_height) ) {	
			if (!(jQuery('#site-header').hasClass('show')))	{	
				jQuery('#site-header').addClass('show');
				if (jQuery('#mob-menu-alt-switch').hasClass('active')) jQuery('#mob-menu-alt-switch').removeClass('active');
			}
		} else {
			if ( (jQuery('#site-header').hasClass('show')) && !jQuery('#site-header #mob-menu-switch').hasClass('active') )	{	
				jQuery('#site-header').removeClass('show');
				jQuery('#mob-menu-alt-switch').addClass('active');
			}
		}
		
		
		if ( (jQuery(window).scrollTop() > menu_disappear_height) ) {	
			if (!(jQuery('#site-header').hasClass('show')))	{	
				jQuery('#mob-menu-alt-switch').addClass('active');
			}
		}
		
		if ( (jQuery(window).scrollTop() > menu_appear_height && menu_show_top) ) {	
			jQuery('#hidden-mobile-menu').removeClass('absolute');
			jQuery('#site-header').removeClass('show-top'); 
		}
	} else { 	// Scroll UP
		if (input_focused == false && jQuery(window).scrollTop() > menu_appear_height)  {	
			if (!(jQuery('#site-header').hasClass('show')))	{
				jQuery('#site-header').addClass('show');
				jQuery('#mob-menu-alt-switch').removeClass('active');
			}
		} else {
			if (menu_show_top) { 
				jQuery('#hidden-mobile-menu').addClass('absolute'); 
				jQuery('#site-header').addClass('show-top');
			}
			if ( (jQuery('#site-header').hasClass('show'))  )	{
				jQuery('#site-header').removeClass('show');
			}
			if ( jQuery('#hidden-mobile-menu').hasClass('active') && slider_height) {
				jQuery('#hidden-mobile-menu').slideUp(0);
				jQuery('#hidden-mobile-menu').removeClass('active');
				jQuery('#mob-menu-switch').removeClass('active');
			}
		}
	}
	lastScrollTop = currScroll;
	
});

