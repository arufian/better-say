better-say
=========

Make your computer speak, and even better with multiple sentences.


## Installation

	npm install better-say --save

## Usage
	
	var speak = require('better-say');
	speak.speak([
		'hello', 
		'this system is using better-say', 
		'for the current version, better-say can speak with many input sentences'
	], {
		voice: 'Vicki',
		callback: function() {
	        console.log('this is a callback');
		},
		writetext: true
	});

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release