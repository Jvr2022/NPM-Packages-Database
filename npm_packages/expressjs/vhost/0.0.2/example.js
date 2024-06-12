var vhost = require('vhost');
var stack = require('stack');

var foo = function(req, res) {
  // Do something...
}

var bar = function(req, res) {
  // Do something else...
}

var handler = stack(
  // Only for top-level 'foo.com'
  vhost('foo.com', foo),
  // For all subdomains at 'bar.com'
  vhost('*.bar.com', bar)
);

var server = require('http').createServer(handler);
