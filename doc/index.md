jQuery asfPreload Plugin Documentation
======================================

Prerequisites
-------------

This plugin is a jQuery plugin so you must download it. 

Installation instructions
-------------------------

Translations
------------

For the moment, the plugin don't require translations.

Installation
------------

You have 2 ways for installing asfPreload.

### Download an Archive File

To quickly test asfPreload plugin, you can also download an [archive][2] and unpack it somewhere under your web server root directory.

### Use Composer (*recommended*)

As jQuery asfPreload Plugin uses [Composer][1] to manage its dependencies, the recommended way
to create a new project is to use it.

If you don't have Composer yet, download it following the instructions on
http://getcomposer.org/ or just run the following command:

    curl -s http://getcomposer.org/installer | php

[create_json_file]
#### Create a composer.json file

For installing asfPreload, create a json file in your web server root directory and write in :

```json
{
    require: {
        "artscorestudio/jquery-asfPreload": "*"
    }
}

And that's it !

[use_component]
#### Install with Component system

For installing asfPreload with [https://github.com/RobLoach/components-installer][RobLoach/component-installer], create a json file in your web server root directory and write in :

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

[1]:  http://getcomposer.org/
[2]:  https://github.com/artscorestudio/jquery-asfPreload/archive/master.zip
