/*!
 * Artscore Studio Preload jQuery Plugin v0.1.0 (https://github.com/artscorestudio/jquery-asfPreload)
 * Copyright 2012-2014 Artscore Studio (http://www.artscore-studio.fr)
 * Licensed under MIT License (https://github.com/artscorestudio/jquery-asfPreload/blob/master/LICENSE)
 */

if (typeof jQuery === "undefined") { throw new Error("AsfPreload requires jQuery") }

;(function($,window,document,undefined){
	
	// Defaults
	var pluginName = 'asfPreload', 
		defaults = {
			percent: 0,                                                 // Starting percent
			imgFolder: 'Resources/artscorestudio/jquery-preload/img/',  // Images Folder
			preloadEmptyImg: 'preload-empty.png',                       // Empty loading image
			preloadFullImg: 'preload-full.png',                         // Full loading image
			speed: 200,                                                 // Speed of loading
			PIStep: 0.10,                                               // PI step
			limit: 100,                                                 // Limit of number (ex. : 140 : restart the animation with 40)
			loop: false,                                                // Loop the animation
			showPercent: true,                                          // Show percent number
			progressBarStyle: 'circle',                                 // Circle or horizontalBar
			backgroundColor: 'rgba(23,23,23,1)',                        // Background of the canvas
			onProgress: function(event, percent){},                     // onProgress Callback
			onComplete: function(event){}                               // onComplete Callback
		},
		availablePBarStyles = ['horizontalBar', 'circle'], base = null, eventName = 'asfPBar-';
	
	// Plugin constructor
	function Plugin(element, options) {
		base = this;
		base.$element = $(element);
		
		// Merge customs options and defaults options
		base.options = $.extend({}, defaults, options);
		
		base._defaults = defaults;
		base._name = pluginName;
		base._availablePBarStyles = availablePBarStyles;
		base._eventName = eventName;
		
		base.init(base);
	}
	
	// Plugin Prototype
	Plugin.prototype = {
		init: function() {
			// Initialization of wrapper's CSS properties
			base.$element.css({
				width: $(window).width(),
				height: $(window).height(),
				background: base.options.background
			});

			// Create loading animation DOM elements
			base.createElements();
			
			// Initialize events
			this.setEvents();

			// Create effect
			base.$progressBar.animate({
				opacity: 1
			}, 500, function(){
				
			});
			
			// Get canvas context and set his background color 
			base.ctx = base.$ctx[0].getContext('2d');
			base.ctx.fillStyle = base.options.backgroundColor;
			
			// misc
			base.options.percent = base.options.percent%100;
			base.i = (base.options.percent*(Math.PI*2))/100;
			base.j=0;
			base.stop = 0;
			
			// Call draw method
			base.draw();
			
			// onResize
			base.onResize();
		},
		
		onResize: function() {
			$(window).resize(function(){
				var nWidth = $(window).width(), nHeight = $(window).height();
				base.$element.css({
					width: $(window).width(),
					height: $(window).height()
				});
				base.$progressBar.css({
					'marginLeft': (base.$element.width() - base.width) / 2 + base.marginLeft,
					'marginTop': (base.$element.height() - base.height) / 2 + base.marginTop,
					opacity: 1
				});
			});
		},
		
		setEvents: function() {
			base.$element.bind(base._eventName + 'onInit');
			
			base.$element.bind(base._eventName + 'onProgress', base.options.onProgress);
			
			base.$element.bind(base._eventName + 'onComplete', base.options.onComplete);
			
			base.$element.bind(base._eventName + 'start', function(event){
				base.command.start();
			});
			
			base.$element.bind(base._eventName + 'stop', function(event){
				base.command.stop();
			});
			
			base.$element.bind(base._eventName + 'reset', function(event){
				base.command.reset();
			});
			
			base.$element.bind(base._eventName + 'destroy', function(event){
				base.command.destroy();
			});
			
			base.$element.bind(base._eventName + 'options', function(event, options){
				base.command.options(options);
			});
		},
		
		createElements: function() {
			// Main container
			base.$progressBar = $('<div />').addClass('asfPreload');
			var checkPBarStyle = base.checkPBarStyle();
			if (base.options.progressBarStyle === '' || base.options.progressBarStyle === undefined || checkPBarStyle === false) {
				throw 'The style of progress bar is unavailable ("horizontalBar" or "circle" are available)';
			}
			base.$progressBar.addClass(base.options.progressBarStyle);
			
			// Preload image 1
			base.preloadEmptyImg = new Image();
			base.preloadEmptyImg.src = base.options.imgFolder + base.options.preloadEmptyImg;
			
			// Preload image 2
			base.preloadFullImg = new Image();
			base.preloadFullImg.src = base.options.imgFolder + base.options.preloadFullImg;
			
			// Get image size
			base.width = base.preloadEmptyImg.width;
			base.height = base.preloadEmptyImg.height;
			
			base.marginTop = parseInt(base.$progressBar.css('marginTop').replace('ems', ''));
			base.marginLeft = parseInt(base.$progressBar.css('marginLeft').replace('ems', ''));
			
			base.$progressBar.css({
				'marginLeft': (base.$element.width() - base.width) / 2 + base.marginLeft,
				'marginTop': (base.$element.height() - base.height) / 2 + base.marginTop,
				opacity: 0
			});

			// Percent div
			base.$percent = $('<div />').addClass('percent');
			base.$percent;
			
			// Canvas area
			base.$ctx = $('<canvas />');
			base.$ctx.attr('width',base.width);
			base.$ctx.attr('height',base.height);
			
			// append to target
			base.$element.prepend(base.$progressBar);
			base.$progressBar.append(base.$percent);
			base.$progressBar.append(base.$ctx);
		},

		draw: function() {
			if (base) {
				base.$element.trigger(base._eventName + 'onInit', [base.options.percent]);
				
				if ( base.width === 0 || base.height === 0 ) {
					base.reloadImages();
				}
				
				if (base.options.showPercent === false) {
					base.$percent.hide();
				} else {
					base.$percent.show();
				}
				
				if(base.stop != 1 && (base.options.percent - 1) <= base.options.limit){
					if(base.options.loop === true){
						base.options.limit=121;
					}
					if(base.options.percent >= 100 && base.options.percent <= base.options.limit){
						base.i=0;
						base.options.limit = base.options.limit - 100;
					}
	
					base.coreDraw();
	
					base.i = base.i + base.options.PIStep;
					base.options.percent = base.i * 100 / (Math.PI*2);
	
					if(base.options.percent <= base.options.limit){
						setTimeout(base.draw, base.options.speed);
						base.$percent.html(base.options.percent.toFixed(0));
						
						base.$element.trigger(base._eventName + 'onProgress', [base.options.percent.toFixed(0)]);
					} else {
						base.$percent.html(base.options.limit);
						base.coreDraw();
						base.$element.trigger(base._eventName + 'onProgress', [base.options.limit]);
						base.$element.trigger(base._eventName + 'onComplete');
					}
	
					base.options.percent++;
				}
			}
		},
		
		coreDraw: function() {
			base.ctx.clearRect(0,0,base.width,base.height);
			base.ctx.save();
			base.ctx.drawImage(base.preloadEmptyImg,0,0);
			base.ctx.beginPath();
			base.ctx.lineWidth = 5;
			base.ctx.arc(base.width/2,base.height/2,base.height/2,base.i-Math.PI/2,base.j-Math.PI/2,true);
			base.ctx.lineTo(base.width/2,base.height/2);
			base.ctx.closePath();
			base.ctx.fill();
			base.ctx.clip();
			base.ctx.drawImage(base.preloadFullImg,0,0);
			base.ctx.restore();
		},
		
		destroy: function() {
			base.$progressBar.animate({
				opacity: 0,
			}, 500, function(){
				base.$progressBar.remove();
				base.stop = 1;
			});
		},
		
		checkPBarStyle: function() {
			var self = base, checked = false;
			$.each(base._availablePBarStyles, function(index, styleName){
				if (String(styleName) == String(self.options.progressBarStyle)) {
					checked = true;
				}
			});
			return checked;
		},
		
		reloadImages: function() {
			// Preload image 1
			base.preloadEmptyImg = new Image();
			base.preloadEmptyImg.src = base.options.imgFolder + base.options.preloadEmptyImg;
			
			// Preload image 2
			base.preloadFullImg = new Image();
			base.preloadFullImg.src = base.options.imgFolder + base.options.preloadFullImg;
			
			// Get image size
			base.width = base.preloadEmptyImg.width;
			base.height = base.preloadEmptyImg.height;
			
			base.$progressBar.css({
				'marginLeft': ($(base.element).width() - base.width) / 2 + base.marginLeft,
				'marginTop': ($(base.element).height() - base.height) / 2 + base.marginTop,
			});
			
			base.$ctx.attr('width', base.width);
			base.$ctx.atrr('height', base.height);
			
			base.ctx = base.$ctx[0].getContext('2d');
			base.ctx.fillStyle = base.options.backgroundColor;
		},
		
		command: {
			start: function() {
				base.stop = 0;
				base.draw();
			},
			stop: function() {
				base.stop = 1;
			},
			reset: function() {
				base.options.percent = 0;
				base.i = 0;
				base.draw();
			},
			destroy : function(){
				base.destroy();
			},
			options: function(options){
				base.options = $.extend({}, base.options, options);
				if(options.preloadEmptyImg || options.preloadFullImg){
					base.reloadImages();
					base.coreDraw();
				}
				base.draw();
				return base.options;
			}
		}		
	};
	
	$.fn[pluginName] = function(options) {
		return this.each(function(){
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
	
	$.fn[pluginName].getStartEventName = function() {
		return eventName + 'start';
	}
	
	$.fn[pluginName].getStopEventName = function() {
		return eventName + 'stop';
	}
	
	$.fn[pluginName].getResetEventName = function() {
		return eventName + 'reset';
	}
	
	$.fn[pluginName].getDestroyEventName = function() {
		return eventName + 'destroy';
	}
	
	$.fn[pluginName].getOptionsEventName = function() {
		return eventName + 'options';
	}
	
})(jQuery,window,document);
