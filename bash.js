//console.log(process.argv[2])

var commands = require('./commands.js')
var fs = require('fs');


//Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline
  var splitData = cmd.split(" ");
  var command = splitData[0];
  var file = splitData[1];
  commands[command](file);

});

