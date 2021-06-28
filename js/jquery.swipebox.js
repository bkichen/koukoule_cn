;( function ( window, document, $, undefined ) {

	$.swipebox = function( elem, options ) {

		// Default options
		var ui,
			defaults = {
				useCSS : true,
				useSVG : false,
				initialIndexOnArray : 0,
				hideBarsDelay : 1000,
				videoMaxWidth : 1140,
				vimeoColor : 'cccccc',
				download:'保存图片',
				beforeOpen: null,
				afterOpen: null,
				afterClose: null,
				loopAtEnd: false,
				autoplayVideos: false
			},

			plugin = this,
			elements = [], // slides array [ { href:'...', title:'...' }, ...],
			$elem,
			selector = elem.selector,
			$selector = $( selector ),
			isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
			isTouch = isMobile !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints,
			winWidth = window.innerWidth ? window.innerWidth : $( window ).width(),
			winHeight = window.innerHeight ? window.innerHeight : $( window ).height(),
			screenRatio = winWidth / winHeight,
			currentX = 0,
			/* jshint multistr: true */
			html = '<div id="mask"></div>\
			<div id="swipebox-overlay">\
					<div id="swipebox-container">\
						<div id="swipebox-slider">\
							\
						</div>\
						<div id="swipebox-bottom-bar">\
							<div id="swipebox-arrows">\
								<a id="swipebox-prev"></a>\
								<a id="swipebox-next"></a>\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
					</div>\
			</div>';
			/*
			if(/iphone|ipad/i.test(navigator.userAgent)){//苹果设备
				html += '<a id="swipebox-download" style="margin-left:-50px"></a>';
			}else{
				html += '<a id="swipebox-download" style="margin-left: -120px;"></a><a href="http://nz.qqtn.com/zbsq/Apk/gxtx_qqtn.apk" class="m-she" style="margin-left:30px">设为头像</a>';
			}
			*/
			html += '<a id="swipebox-download" style="margin-left:-50px"></a>';
		plugin.settings = {};

		$.swipebox.close = function () {
			ui.closeSlide();
			
		};

		$.swipebox.extend = function () {
			return ui;
		};

		plugin.init = function() {

			plugin.settings = $.extend( {}, defaults, options );

			if ( $.isArray( elem ) ) {

				elements = elem;
				ui.target = $( window );
				ui.init( plugin.settings.initialIndexOnArray );

			} else {

				$( document ).on( 'click', selector, function( event ) {
					if ( event.target.parentNode.className === 'slide current' ) {

						return false;
					}
					if ( ! $.isArray( elem ) ) {
						ui.destroy();
						$elem = $( selector );
						ui.actions();
					}

					elements = [];
					var index , relType, relVal;

					// Allow for HTML5 compliant attribute before legacy use of rel
					if ( ! relVal ) {
						relType = 'data-rel';
						relVal  = $( this ).attr( relType );
					}

					if ( ! relVal ) {
						relType = 'rel';
						relVal = $( this ).attr( relType );
					}
					//get node
					$elem = $( selector );
					
					$elem.each( function() {

						var title = null,
							href = null;

						if ( $( this ).attr( 'title' ) ) {
							title = $( this ).attr( 'title' );
						}


						if ( $( this ).find('img') ) {
							href = $( this ).find('img').attr( 'data-original' );
						}

						elements.push( {
							href: href,
							title: title
						} );
					} );
					//get index
					index = $elem.index( $( this ) );
					event.preventDefault();
					event.stopPropagation();
					ui.target = $( event.target );
					ui.init( index );
					//download css
					$("#swipebox-download").css({
						//left: (winWidth/2 - 50) + 'px'
					})
				} );
			}
		};

		ui = {

			/**
			 * Initiate Swipebox
			 */
			init : function( index ) {
				if ( plugin.settings.beforeOpen ) {
					plugin.settings.beforeOpen();
				}

				$.swipebox.isOpen = true;
				this.build();
				this.openSlide( index );
				this.openMedia( index );
				this.preloadMedia( index+1 );
				this.preloadMedia( index-1 );
				if ( plugin.settings.afterOpen ) {
					plugin.settings.afterOpen();
				}
				this.download(index);
			},
			download : function(index){
				plugin.settings.download = defaults.download;
				$('#swipebox-download').html(plugin.settings.download);
				if ( elements[ index ] !== undefined ) {
					src = elements[ index ].href;
				}
				$('#swipebox-download').attr('href',src);
				$('#swipebox-download').attr('download','');
				var disabledImg = '<img src='+ src +' style="display:none;border:none">';
				$('#swipebox-download').append(disabledImg);
				
			},
			/**
			 * Built HTML containers and fire main functions
			 */
			build : function () {
					
				var $this = this, bg;

				$( 'body' ).append( html );

				
				bg = $( '#swipebox-close' ).css( 'background-image' );
				$( '#swipebox-close' ).css( {
					'background-image' : bg
				} );

				//prev next
				$('#swipebox-prev').css({
					top: winHeight/2 - 25 + 'px',
					left: '4px'
				})
				$('#swipebox-next').css({
					top: winHeight/2 - 25 + 'px',
					right : '4px'
				})

				elements.length = elements.length ;
				
				$( '#swipebox-slider' ).css({
					width: elements.length * winWidth + 'px'
				})

				$.each( elements,  function() {
					$( '#swipebox-slider' ).append( '<div class="slide" style="width:'+ winWidth +'px;height:'+ winHeight+'px;"></div>' );

					

				} );
				
				$this.setDim();
				$this.actions();

				if ( isTouch ) {
					$this.gesture();
				}
				var bars = $('#swipebox-bottom-bar');

				bars.css({
					top: winHeight/2 - 25 + 'px'
				})
				$this.animBars();
				$this.resize();
			},

			/**
			 * Set dimensions depending on windows width and height
			 */
			setDim : function () {

				var width, height, sliderCss = {};

				// Reset dimensions on mobile orientation change
				if ( 'onorientationchange' in window ) {

					window.addEventListener( 'orientationchange', function() {
						if ( window.orientation === 0 ) {
							width = winWidth;
							height = winHeight;
						} else if ( window.orientation === 90 || window.orientation === -90 ) {
							width = winHeight;
							height = winWidth;
						}
					}, false );


				} else {

					width = window.innerWidth ? window.innerWidth : $( window ).width();
					height = window.innerHeight ? window.innerHeight : $( window ).height();
				}

				sliderCss = {
					width : width,
					height : height
				};

				$( '#swipebox-overlay' ).css( sliderCss );
			},

			/**
			 * Reset dimensions on window resize envent
			 */
			resize : function () {
				var $this = this;

				$( window ).resize( function() {
					$this.setDim();
				} ).resize();
			},

			/**
			 * Check if device supports CSS transitions
			 */
			supportTransition : function () {

				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split( ' ' ),
					i;

				for ( i = 0; i < prefixes.length; i++ ) {
					if ( document.createElement( 'div' ).style[ prefixes[i] ] !== undefined ) {
						return prefixes[i];
					}
				}
				return false;
			},

			/**
			 * Check if CSS transitions are allowed (options + devicesupport)
			 */
			doCssTrans : function () {
				if ( plugin.settings.useCSS && this.supportTransition() ) {
					return true;
				}
			},

			/**
			 * Touch navigation
			 */
			gesture : function () {

				var $this = this,
					index,
					hDistance,
					vDistance,
					hDistanceLast,
					vDistanceLast,
					hDistancePercent,
					vSwipe = false,
					hSwipe = false,
					hSwipMinDistance = 10,
					vSwipMinDistance = 50,
					startCoords = {},
					endCoords = {},
					bars = $( '#swipebox-bottom-bar' ),
					slider = $( '#swipebox-slider' );
				//when touching hide bars
					$this.hideBars();

				$( '#swipebox-overlay' ).bind( 'touchstart', function( event ) {

					$( this ).addClass( 'touching' );
					index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
					endCoords = event.originalEvent.targetTouches[0];
					startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
					startCoords.pageY = event.originalEvent.targetTouches[0].pageY;

					$( '#swipebox-slider' ).css( {
						'-webkit-transform' : 'translate3d(' + currentX * winWidth +'px, 0, 0)',
						'transform' : 'translate3d(' + currentX * winWidth +'px, 0, 0)'
					} );
					

					var downnode = endCoords.target.parentNode;
					if($(downnode).hasClass('downloadApp')){
						$(downnode).unbind('touchstart')
						$(downnode).unbind('touchmove')
						$(downnode).unbind('touchend')
						window.location.href = "http://nz.qqtn.com/zbsq/Apk/gxtx_qqtn.apk";
					}

					$( '.touching' ).bind( 'touchmove',function( event ) {
					
						endCoords = event.originalEvent.targetTouches[0];

						if ( ! hSwipe ) {
							vDistanceLast = vDistance;
							vDistance = endCoords.pageY - startCoords.pageY;
							if ( Math.abs( vDistance ) >= vSwipMinDistance || vSwipe ) {
								var opacity = 0.75 - Math.abs(vDistance) / slider.height();

								slider.css( { 'top': vDistance + 'px' } );
								slider.css( { 'opacity': opacity } );

								vSwipe = true;
							}
						}

						hDistanceLast = hDistance;
						hDistance = endCoords.pageX - startCoords.pageX;
						hDistancePercent = hDistance * 100 / winWidth;

						if ( ! hSwipe && ! vSwipe && Math.abs( hDistance ) >= hSwipMinDistance ) {
							$( '#swipebox-slider' ).css( {
								'-webkit-transition' : '',
								'transition' : ''
							} );
							hSwipe = true;
						}
						if ( hSwipe ) {

							// swipe left
							//if ( 0 < hDistance ) {

								// first slide
								if ( 0 === index ) {
							
									$( '#swipebox-overlay' ).addClass( 'leftSpringTouch' );
								} else {
									// Follow gesture
									$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
									$( '#swipebox-slider' ).css( {
										'-webkit-transform' : 'translate3d(' + ( currentX  )* winWidth +'px, 0, 0)',
										'transform' : 'translate3d(' + ( currentX  )* winWidth + 'px, 0, 0)'
									} );
								}

							// swipe rught
							//} else if ( 0 > hDistance ) {
								
								// last Slide
								if ( elements.length == index +3  ) {
							
									$( '#swipebox-overlay' ).addClass( 'rightSpringTouch' );
								} else {
									$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
									$( '#swipebox-slider' ).css( {
										'-webkit-transform' : 'translate3d(' + ( currentX  )*winWidth +'px, 0, 0)',
										'transform' : 'translate3d(' + ( currentX  )*winWidth + 'px, 0, 0)'
									} );
								}

							//}
						}
					} );

					return false;

				} ).bind( 'touchend',function( event ) {
					event.preventDefault();
					event.stopPropagation();

					$( '#swipebox-slider' ).css( {
						'-webkit-transition' : '-webkit-transform 0.4s ease',
						'transition' : 'transform 0.4s ease'
					} );

					vDistance = endCoords.pageY - startCoords.pageY;
					hDistance = endCoords.pageX - startCoords.pageX;
					hDistancePercent = hDistance*100/winWidth;
					
					// Swipe to bottom to close
					if ( vSwipe ) {
						vSwipe = false;
						if ( Math.abs( vDistance ) >= 2 * vSwipMinDistance && Math.abs( vDistance ) > Math.abs( vDistanceLast ) ) {
							var vOffset = vDistance > 0 ? slider.height() : - slider.height();
							slider.animate( { top: vOffset + 'px', 'opacity': 0 },
								300,
								function () {
									$this.closeSlide();
								} );
						} else {
							slider.animate( { top: 0, 'opacity': 1 }, 300 );
						}

					} else if ( hSwipe ) {

						hSwipe = false;

						// swipeLeft
						if( hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {

							$this.getPrev();

						// swipeRight
						} else if ( hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {

							$this.getNext();
						}

					} else { // Top and bottom bars have been removed on touchable devices
						// tap
		
							$this.showBars();
						 	$this.setTimeout();
						
					}

					$( '#swipebox-slider' ).css( {
						'-webkit-transform' : 'translate3d(' + currentX*winWidth + 'px, 0, 0)',
						'transform' : 'translate3d(' + currentX*winWidth + 'px, 0, 0)'
					} );

					$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
					$( '.touching' ).off( 'touchmove' ).removeClass( 'touching' );
				} );
			},

			/**
			 * Set timer to hide the action bars
			 */
			setTimeout: function () {
				if ( plugin.settings.hideBarsDelay > 0 ) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout( function() {
							$this.hideBars();
						},

						plugin.settings.hideBarsDelay
					);
				}
			},

			/**
			 * Clear timer
			 */
			clearTimeout: function () {
				window.clearTimeout( this.timeout );
				this.timeout = null;
			},

			/**
			 * Show navigation and title bars
			 */
			showBars : function () {
				var bars = $( '#swipebox-bottom-bar' );
					bars.show();
			},

			/**
			 * Hide navigation and title bars
			 */
			hideBars : function () {
				var bars = $( '#swipebox-bottom-bar' );
				bars.hide();
			},

			/**
			 * Animate navigation and top bars
			 */
			animBars : function () {
				var $this = this;
				
				$this.setTimeout();

				$('#swipebox-overlay').on('click',function() {	

				 		$this.showBars();
				 		$this.setTimeout();
				  } );
			},
			actions : function () {
				var $this = this,
					action = 'touchend click';

				
					$( '#swipebox-prev' ).bind( action, function( event ) {
						if($('#swipebox-prev').hasClass('disabled')) return false;
						console.log(event)
						event.preventDefault();
						event.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					} );

					$( '#swipebox-next' ).bind( action, function( event ) {
						if($('#swipebox-next').hasClass('disabled')) return false;
							event.preventDefault();
							event.stopPropagation();
							$this.getNext();
							$this.setTimeout();
					} );
					
				
				
				$( '#swipebox-close' ).bind( action, function() {
					$this.closeSlide();
				} );
			},

			/**
			 * Set current slide
			 */
			setSlide : function ( index, isFirst ) {

				isFirst = isFirst || false;

				var slider = $( '#swipebox-slider' );

				currentX = -index;
				
				if ( this.doCssTrans() ) {
					slider.css( {
						'-webkit-transform' : 'translate3d(' + (-index*winWidth)+'px, 0, 0)',
						'transform' : 'translate3d(' + (-index*winWidth)+'px, 0, 0)'
					} );
				} else {
					slider.animate( { left : ( -index*winWidth )+'px' } );
				}

				$( '#swipebox-slider .slide' ).removeClass( 'current' );
				$( '#swipebox-slider .slide' ).eq( index ).addClass( 'current' );
				this.setTitle( index );
				this.download( index );
				if ( isFirst ) {
					slider.fadeIn();
				}

				$( '#swipebox-prev, #swipebox-next' ).removeClass( 'disabled' );
				if ( index === 0 ) {
					$( '#swipebox-prev' ).addClass( 'disabled' );
				} else if ( index === elements.length -1  && plugin.settings.loopAtEnd !== true ) {
					$( '#swipebox-next' ).addClass( 'disabled' );
					//plugin.settings.download = '下一组';
					//$('#swipebox-download').html(plugin.settings.download);
					//$('#swipebox-download').removeAttr("download");
				//var next_href = $('.pageBtn .y').attr('href');
					//$('#swipebox-download').attr('href',next_href);

				}
			},

			/**
			 * Open slide
			 */
			openSlide : function ( index ) {
				$( 'html' ).addClass( 'swipebox-html' );
				if ( isTouch ) {
					$( 'html' ).addClass( 'swipebox-touch' );
				} else {
					$( 'html' ).addClass( 'swipebox-no-touch' );
				}
				$( window ).trigger( 'resize' ); // fix scroll bar visibility on desktop
				this.setSlide( index, true );
			},

			/**
			 * Set a time out if the media is a video
			 */
			preloadMedia : function ( index ) {
				var $this = this,
					src = null;
				if ( elements[ index ] !== undefined ) {
					src = elements[ index ].href;
				}
					setTimeout( function() {
						$this.openMedia( index );
					}, 1000);
			},

			/**
			 * Open
			 */
			openMedia : function ( index ) {
				var $this = this,
					src,
					slide;
				if ( elements[ index ] !== undefined ) {
					src = elements[ index ].href;
				}
				if ( index < 0 || index > elements.length ) {
					return false;
				}

				slide = $( '#swipebox-slider .slide' ).eq( index );

				slide.addClass( 'slide-loading' );
				
				
					$this.loadMedia( src, function() {
						slide.removeClass( 'slide-loading' );
						slide.html( this );
						if($(this).height() > winHeight){
							$(this).height(winHeight)
						}
						$(this).css({
							//marginTop : (winHeight/2 - $(this).height()/2) +'px'
						});
					} );
				
			},

			/**
			 * Set link title attribute as caption
			 */
			setTitle : function ( index ) {
				var title = null;

				$( '#swipebox-title' ).empty();

				if ( elements[ index ] !== undefined ) {
					title = elements[ index ].title;
				}

				if ( title ) {
					$( '#swipebox-top-bar' ).show();
					$( '#swipebox-title' ).append( title );
				} else {
					$( '#swipebox-top-bar' ).hide();
				}
			},
			/**
			 * Load image
			 */
			loadMedia : function ( src, callback ) {	
					var img = $( '<img>' ).on( 'load', function(src) {
						callback.call( img );
					} );
					img.attr( 'src', src );
			},

			/**
			 * Get next slide
			 */
			getNext : function () {
				var $this = this,
					src,
					index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
					$this.clearTimeout();
				if ( index + 1 < elements.length ) {
					index++;
					$this.setSlide( index );
					$this.preloadMedia( index+1 );
				} else {
					if ( plugin.settings.loopAtEnd === true ) {
						index = 0;
						$this.preloadMedia( index );
						$this.setSlide( index );
						$this.preloadMedia( index + 1 );
					} else {
						$( '#swipebox-overlay' ).addClass( 'rightSpring' );
						setTimeout( function() {
							$( '#swipebox-overlay' ).removeClass( 'rightSpring' );
						}, 500 );
					}
				}
			},

			/**
			 * Get previous slide
			 */
			getPrev : function () {
				var index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) ),
					src;
					var $this = this;
					$this.clearTimeout();
				if ( index > 0 ) {
					index--;
					this.setSlide( index );
					this.preloadMedia( index-1 );
				} else {
					$( '#swipebox-overlay' ).addClass( 'leftSpring' );
					setTimeout( function() {
						$( '#swipebox-overlay' ).removeClass( 'leftSpring' );
					}, 500 );
				}
			},

			/**
			 * Close
			 */
			closeSlide : function () {
				$( 'html' ).removeClass( 'swipebox-html' );
				$( 'html' ).removeClass( 'swipebox-touch' );
				$( window ).trigger( 'resize' );
				this.destroy();
			},

			/**
			 * Destroy the whole thing
			 */
			destroy : function () {
				$( window ).unbind( 'keyup' );
				$( 'body' ).unbind( 'touchstart' );
				$( 'body' ).unbind( 'touchmove' );
				$( 'body' ).unbind( 'touchend' );
				$( '#swipebox-slider' ).unbind();
				$( '#swipebox-overlay' ).remove();
				$( '#mask' ).remove();
				$( '#swipebox-download' ).remove();
				$( '.m-she' ).remove();
				if ( ! $.isArray( elem ) ) {
					elem.removeData( '_swipebox' );
				}

				if ( this.target ) {
					this.target.trigger( 'swipebox-destroy' );
				}

				$.swipebox.isOpen = false;

				if ( plugin.settings.afterClose ) {
					plugin.settings.afterClose();
				}
			}
		};

		plugin.init();
	};

	$.fn.swipebox = function( options ) {

		if ( ! $.data( this, '_swipebox' ) ) {
			var swipebox = new $.swipebox( this, options );
			this.data( '_swipebox', swipebox );
		}
		return this.data( '_swipebox' );

	};

}( window, document, jQuery ) );