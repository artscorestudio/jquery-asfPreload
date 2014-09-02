How to use jQuery asfPreload Plugin
===================================

After the installation of the plugin (see [Installation instructions](index.md)), you can invoke the plugin on custom DOM element.

Add a div for wrap all loading animation.

```html
	<body>
		<div class="wrapper"></div>
	</body>
```

```javascript
	$(document).ready(function(){
		$('#wrapper').asfPreload();
	});
```

Plugin customization
--------------------

You can customize your animation by passing an array of options.

```javascript
	$(document).ready(function(){
		$('#wrapper').asfPreload({
			percent: 0,                                                 // Starting percent
			imgFolder: "dist/img/",  // Images Folder                   // Folder where located images
			preloadEmptyImg: "preload-empty.png",                       // Empty loading image
			preloadFullImg: "preload-full.png",                         // Full loading image
			speed: 200,                                                 // Speed of loading
			PIStep: 0.10,                                               // PI step
			limit: 100,                                                 // Limit of number (ex. : 140 : restart the animation with 40)
			loop: false,                                                // Loop the animation
			showPercent: true,                                          // Show percent number
			progressBarStyle: "circle",                                 // Circle or horizontalBar
			backgroundColor: "rgba(23,23,23,1)",                        // Background of the canvas
			onProgress: function(event, percent){},                     // onProgress Callback
			onComplete: function(event){}                               // onComplete Callback
		});
	});
```

Plugin Events
-------------

You can access to the plugin's events names with commands bellow :

```javascript
	$.fn.asfPreload.getStartEventName()    // Return plugin event name for start animation
	$.fn.asfPreload.getStopEventName()     // Return plugin event name for stop animation
	$.fn.asfPreload.getResetEventName()    // Return plugin event name for restart animation
	$.fn.asfPreload.getDestroyEventName()  // Return plugin event name for destroy animation
	$.fn.asfPreload.getOptionsEventName()  // Return plugin event name for change plugin's options
```

So, you can trigger events for start, stop, etc. animation

```javascript
	$('a.start').click(function(e){
		$('#wrapper').trigger($.fn.asfPreload.getStartEventName());
	});
```

Plugin Callbacks
----------------

You can add extra development during the process with the callback onProgress.

```javascript
	$(document).ready(function(){
		$('#wrapper').asfPreload({
			onProgress: function(event, percent){
				// Do something
			},
		});
	});
```
And do something when the animation is complete.

```javascript
	$(document).ready(function(){
		$('#wrapper').asfPreload({
			onComplete: function(event){
				// Do something
			},
		});
	});
```