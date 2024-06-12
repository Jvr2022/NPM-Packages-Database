var http = require('http');
var urlrouter = require('../');

var router = urlrouter(function (app) {
  app.get('/', function (req, res) {
    res.end('GET home page' + req.url + ' , headers: ' + JSON.stringify(req.headers));
  });

  app.get('/foo', function (req, res) {
    res.end('GET ' + req.url + ' , headers: ' + JSON.stringify(req.headers));
  });

  app.post('/new', function (req, res) {
    res.write('POST ' + req.url + ' start...\n\n');
    var counter = 0;
    req.on('data', function (data) {
      counter++;
      res.write('data' + counter + ': ' + data.toString() + '\n\n');
    });
    req.on('end', function () {
      res.end('POST ' + req.url + ' end.\n');
    });
  });

  app.put('/update', function (req, res) {
    res.end('PUT ' + req.url + ' , headers: ' + JSON.stringify(req.headers));
  });

  app.delete('/remove', function (req, res) {
    res.end('DELETE ' + req.url + ' , headers: ' + JSON.stringify(req.headers));
  });

  app.options('/check', function (req, res) {
    res.end('PUT ' + req.url + ' , headers: ' + JSON.stringify(req.headers));
  });
});

http.createServer(router).listen(3000);