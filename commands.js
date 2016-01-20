//var bash = require('./bash.js')
var fs = require('fs');

var request = require('request');

exports.pwd = function(stdin,file,done) {

 	if(stdin === undefined) {
 		done(process.cwd());
 	} 
	
 }

 exports.date = function(stdin,file,done) {
    	var newDate = new Date;
  		done(newDate.toString());
 }

exports.ls = function(stdin,file,done) {

	fs.readdir('.', function(err, files) {
		var outputString = "";
  		if (err) throw err;
  		files.forEach(function(file) {
    		outputString += (file.toString() + "\n");
  		})
  		done(outputString);
	});
};

exports.echo = function(stdin,file,done) {
	done(file);
}

exports.cat = function(stdin,file,done) {
	if(file) {
		fs.readFile(file, (err, data) => {
	  		if (err) throw err;
	  			done(data);
		});		
	} else {
		done(stdin);
	}
}


exports.head = function(stdin,file,done) {
	if(file) {
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
				done(outputString);
		});

	} else {

			var count = 1;
			stdin = stdin.toString();

			var slicePosition = 0;

			for(var i = 0; i < stdin.length; i++) {
				if(stdin[i] === '\n') {
					count++;
				}
				if(count === 6) {
					slicePosition = i;
					break;
				}
			}

			var outputString = stdin.slice(0,slicePosition);
				done(outputString);
		
	}
}

exports.tail = function(stdin,file,done) {
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
	  			bash.done(outputString);
				});
}


exports.wc = function(stdin,file,done) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		var count = 1;
		data = data.toString();
		for(var i = 0; i < data.length; i++) {
			if(data[i] === '\n') {
				count++;
			}
		}

		bash.done(count.toString());
	});
}

exports.sort = function(stdin,file,done) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		data = data.toString();
		
		var dataArr = data.split('\n');
		var outputString = dataArr.sort().join('\n');

		bash.done(outputString);

	});
}

exports.uniq = function(stdin,file,done) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) throw err;
		data = data.toString();
		
		var dataArr = data.split('\n').sort();

		for(var i = 0; i < dataArr.length; i++) {
	    	if(dataArr[i] === dataArr[i+1]) {
	        	dataArr = dataArr.slice(0, i).concat(dataArr.slice(i+1));
	    	}
	
		}

		var outputString = dataArr.join('\n');


		bash.done(outputString);
	});

}


/*
Now that you have request available to require, implement the curl command. It should make an HTTP GET request to a given URL, and print out the HTTP response body.
*/

exports.curl = function(webAddress) {
	request(webAddress, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    bash.done(body);
	  }
	});
}



