jQuery asfPreload Plugin Documentation
======================================

This plugin display a loading animation during the loading of a page. This jQuery plugin is based on [Arthur Tomaszewski CProgress jQuery Plugin][1] distributed under MIT License.
 

Prerequisites
-------------

This jQuery plugin was developed with jQuery 2.1.1 minimum. No support for version lower than 2.1.1.  

Translations
------------

For the moment, the plugin don't require translations.

Installation instructions
-------------------------

You have 2 ways for installing asfPreload.

### Download an Archive File

To quickly test asfPreload plugin, you can also download an [archive][3] and unpack it somewhere under your web server root directory.
All the files are located under the *dist/* folder.

Include css file in your head section :

```html

	<!DOCTYPE html>
	<html lang="fr">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Artscore Studio jQuery Preload Plugin</title>
			
			<!-- Artsocre Studio jQuery Preload plugin -->
			<link href="__PATH_PLUGIN_FOLDER__/dist/css/jquery-asfPreload.min.css" rel="stylesheet" />
		</head>
	...
```

Include javascript files in the bottom of your page

```html

	<!-- jQuery (necessary for asfPreload plugin) -->
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>

    <!-- Artscore Studio jQuery Plugin : preload plugin -->
    <script src="__PATH_PLUGIN_FOLDER__/dist/js/jquery-asfPreload.min.js"></script>
</body>
</html>
```

Now, you can use it ! [Using asfPreload Plugin](blob/master/doc/using-plugin.md)

### Use Composer (*recommended*)

As jQuery asfPreload Plugin uses [Composer][2] to manage its dependencies, the recommended way
to create a new project is to use it.

If you don't have Composer yet, download it following the instructions on
http://getcomposer.org/ or just run the following command:

    curl -s http://getcomposer.org/installer | php

#### Create a composer.json file

For installing asfPreload, create a json file in your web server root directory and write in :

```javascript
{
    require: {
        "artscorestudio/jquery-asfPreload": "*"
    }
}
```

And that's it ! Now, you can use it ! [Using asfPreload Plugin](blob/master/doc/use-plugin.md)

> *DON'T FORGET TO INSTALL JQUERY WITH YOUR OWN WAY !!!!*\n
> You can install it with the method bellow or a other with Composer.

#### Install with Component system

For installing asfPreload with [RobLoach/component-installer][4], create a json file in your web server root directory and write in :

```json
{
    require: {
        "robloach/component-installer" : "*",
        "components/jquery" : "2.1.*",
        "components/jquery-asfpreload": "*"
    },
    repository: [{
        "name": "components/jquery-asfPreload",
	"dist": {
	    "url": "https://github.com/artscorestudio/jquery-asfPreload.git",
	    "type": "git"
	},
	"type": "component",	
	"require": {
	    "robloach/component-installer": "*"
	},
	"extra": {
	    "component": {
	        "scripts": [
		    "js/jquery-asfPreload.js"
		],
		"styles": [
		    "css/jquery-asfPreload.css"
		],
		"files": [
		    "img/*.png"
		]
	    }
	}
    }]
}
```

[1]:  http://p.ar2oor.pl/cprogress/
[2]:  http://getcomposer.org/
[3]:  https://github.com/artscorestudio/jquery-asfPreload/archive/master.zip
[4]:  https://github.com/RobLoach/components-installer
