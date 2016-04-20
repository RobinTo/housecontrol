var express = require('express');
var app = express();
var request = require('request');
const spawn = require('child_process').spawn;
var fs = require('fs');
var secrets = require('./secrets.js');

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/imagelist', function(req, res){
	fs.readdir("./public/images/", function(err, files){
		if(err){
			res.json({error: "Error reading files, try again."});
		} else {
			files = files.filter(function(f){
				return f.indexOf('.png') >= 0 || f.indexOf('.jpg') >= 0 || f.indexOf('.jpeg') >= 0;
			});
			res.json(files);
		}
	});
});

app.get('/weather', function(req, res){
  request.get('http://api.openweathermap.org/data/2.5/weather?q=Farsund&units=metric&appid=' + secrets.weatherApiKey, function(err, response, body){
    if(!err && response.statusCode === 200){
      var weather = JSON.parse(body);
      res.json(weather);
    } else {
      res.json({error: "Kunne ikke hente været, er jeg koblet til internett?"});
    }
  });
});

app.get('/nodev', function(req, res){
	var ls = spawn('node', ['-v']);

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

});
