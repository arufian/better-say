/**
 * better-say
 *
 * Copyright (c) 2014 Alfian Busryo
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var request = require('request');
var stdin = process.openStdin(); 
var spawn = require('child_process').spawn,
	child;

var username = process.env['USER'];

if (process.platform !== 'darwin') {
	process.stdout.write('current version is exclusive only for Mac OSX users\n');
	process.exit(1);
}

var cli = function(command, options, callback) {
	var child = spawn(command, options);
	child.stdin.setEncoding('ascii');
	child.stderr.setEncoding('ascii');

	if(callback.error){
		child.stderr.on('data', callback.error);
	}
	if(callback.stdout){
		child.stdout.on('data', callback.stdout);
	}
	if(callback.finish){
		child.on('close', callback.finish);
	}
	return child;
}

var speechList = [];
var tts = function(voice, isWrite, callback) {
	var self = this;
	var tmpStr = speechList.shift();
	var options = ['-v', voice, tmpStr];
	cli('say', options,  {
		finish:  function(code) {
			if(isWrite) console.log(tmpStr);
			if(speechList.length > 0){
				tts(voice, isWrite, callback);
			} else if(callback){
				callback();
			}
			return;
		},
		error: function() {
			console.log('oops! something happened');
		}
	});
}

module.exports = {
	/**
	 * Make your computer speak better with multiple sentences
	 *
	 * @param  {Array} | {String} Array list of sentences or filepath
	 * @param  {Object<voice, writetext, callback>} options 
	 */
	speak: function(sentences, options) {
		var voice = options.voice, callback = options.callback,
			iswrite = options.writetext;
		for (var i=0; i<sentences.length; i++) {
			speechList.push(sentences[i]);
		};
		tts(voice, iswrite, callback);
	}
}