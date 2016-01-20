var commands = require('./commands.js')
var fs = require('fs');
var request = require('request');

//Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {

  var cmd = data.toString().trim();

  //Spliting user input by white space
  var splitData = cmd.split(" ");

  //Spliting user input by white space
  var splitByPipe = cmd.split(/\s*\|\s*/g)

  var command = splitData[0];
  var file = splitData[1]; 

  var secondCommand = splitByPipe[1]; 
  //console.log("1",splitData[0],"2",splitData[1],"3",splitByPipe[1]);
  commands[command](undefined, file, done);

  function done(output) {
  	if(secondCommand) {
  		var n = secondCommand;
  		secondCommand = undefined;
  		commands[n](output, undefined, done);
  	} else {
  		process.stdout.write(output);
		process.stdout.write('\nprompt > '); 
  	}

}


});

