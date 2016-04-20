var express = require('express');
var app = express();
const spawn = require('child_process').spawn;
var fs = require('fs');

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


