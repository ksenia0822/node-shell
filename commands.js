
var fs = require('fs');

exports.pwd = function(file) {
	process.stdout.write(process.cwd());
  	process.stdout.write('\nprompt > '); 

 }

 exports.date = function(file) {
    	var newDate = new Date;
  		process.stdout.write(newDate.toString());
  		process.stdout.write('\nprompt > '); 
 }

exports.ls = function(file) {

	fs.readdir('.', function(err, files) {
  		if (err) throw err;
  		files.forEach(function(file) {
    		process.stdout.write(file.toString() + "\n");
    		process.stdout.write("prompt > ");
  		})
  		
	});
};

exports.echo = function(file) {
	console.log(file);
	process.stdout.write('\nprompt > ');
}

exports.cat = function(file) {
	fs.readFile(file, (err, data) => {
  		if (err) throw err;
  			process.stdout.write(data);
  			process.stdout.write('\nprompt > ');
	});
	
}


exports.head = function(file) {
	fs.readFile(file, 'utf8', (err, data) => {
	  			if (err) throw err;
	  			var count = 1;
	  			data = data.toString();

	  			var slicePosition = 0;

	  			for(var i = 0; i < data.length; i++) {
	  				if(data[i] === '\n') {
	  					count++;
	  				}
	  				if(count === 6) {
	  					slicePosition = i;
	  					break;
	  				}
	  			}

	  			var outputString = data.slice(0,slicePosition);
	  				process.stdout.write(outputString);
				  	process.stdout.write('\nprompt > ');
				});
}

exports.tail = function(file) {
	fs.readFile(file, 'utf8', (err, data) => {
	  			if (err) throw err;
	  			var count = 1;
	  			data = data.toString();
	  			var slicePosition = 0;

	  			for(var i = data.length; i > 0; i--) {
	  				if(data[i] === '\n') {
	  					count++;
	  				}
	  				if(count === 6) {
	  					slicePosition = i+1;
	  					break;
	  				}
	  			}

	  			var outputString = ''
	  			outputString += data.slice(slicePosition);
	  			process.stdout.write(outputString);
				process.stdout.write('\nprompt > ');
				});
}


exports.wc = function(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		var count = 1;
		data = data.toString();
		for(var i = 0; i < data.length; i++) {
			if(data[i] === '\n') {
				count++;
			}
		}

		process.stdout.write(count.toString());
	process.stdout.write('\nprompt > ');
	});
}

exports.sort = function(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		data = data.toString();
		
		var dataArr = data.split('\n');
		var outputString = dataArr.sort().join('\n');

		process.stdout.write(outputString);
		process.stdout.write('\nprompt > ');
	});
}










