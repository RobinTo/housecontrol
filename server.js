var express = require('express');
var app = express();
var request = require('request');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
var fs = require('fs');
var secrets = require('./secrets.js');
var xml = require('xml');

var rfOutlets = [];

readOutlets();

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/ruter', function(req, res){
  request.get("http://reisapi.ruter.no/StopVisit/GetDepartures/2300438", function(err, response, body){
    if(!err && response.statusCode === 200){
      var ruterReiser = JSON.parse(body);
      res.json(ruterReiser);
    } else {
      res.json({error: "Kunne ikke hente ruter reiser"});
    }
  });
});

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
  request.get('http://api.openweathermap.org/data/2.5/weather?q='+req.query.city+'&units=metric&appid=' + secrets.weatherApiKey, function(err, response, body){
    if(!err && response.statusCode === 200){
      var weather = JSON.parse(body);
      res.json(weather);
    } else {
      res.json({error: "Kunne ikke hente været for " + req.query.city + "."});
    }
  });
});

app.get('/ruter', function(req, res){
  request.get('http://robint.pythonanywhere.com/api/ruter/', function(err, response, body){
    if(!err && response.statusCode === 200){
      var ruter = JSON.parse(body);
      res.json(ruter);
    } else {
      res.json({error: "Kunne ikke hente melding."});
    }
  });
});

// This spawns a console with the commands listed.
// Use this to trigger on or off for outlets.
app.get('/rfoutlet', function(req, res){
  readOutlets(function(){
    res.json(rfOutlets);
  });
});

app.post('/rfoutlet/:code', function(req, res){
  res.send("Shutting down.");
  exec('sudo /var/www/rfoutlet/codesend '+req.params.code, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.put('/rfoutlet/:name/:on/:off/:toggle', function(req, res){
  var newOutlet = {
    name: req.params.name,
    onCode: parseInt(req.params.on),
    offCode: parseInt(req.params.off),
    toggleCode: parseInt(req.params.toggle)
  }
  console.log("Trying to save");
  console.log(req.params.name);
  rfOutlets.push(newOutlet);
  saveOutlets();
  res.send("Saved outlet.");
});

app.delete('/rfoutlet/:name', function(req, res){
  var outletToDelete = req.params.name;
  var deletedOutlets = 0;
  for(var i = 0; i < rfOutlets.length; i++){
    if(rfOutlets[i].name === outletToDelete){
      rfOutlets.splice(i, 1);
      deletedOutlets++;
      i--;
    }
  }
  saveOutlets();
  res.send("Deleted " + deletedOutlets + " outlets named " + outletToDelete +".");
});

app.post('/shutdown', function(req, res){
  res.send("Shutting down.");
  exec('sudo halt', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

});


function saveOutlets(){
  fs.writeFile ('./outlets.txt', JSON.stringify(rfOutlets), function(err) {
      if (err) throw err;
      console.log('Wrote rf outlets to file');
  });
}

function readOutlets(callback){

  var fileName = './outlets.txt';

  fs.exists(fileName, function (exists) {
    if(exists)
    {
      fs.readFile(fileName, 'utf8', function (err, data) {
        if (err){
          console.log(err);
          return;
        }

        if(!data || data.length <= 0){
          rfOutlets = [];
          return;
        }

        rfOutlets = JSON.parse(data);
        if(callback){
          callback();
        }
      });
    } else {
      fs.writeFile(fileName, "", { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
      });
    }
  });


}
