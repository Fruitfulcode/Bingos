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