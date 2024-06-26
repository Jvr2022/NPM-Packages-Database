# cors

CORS is a node.js package for providing a [connect](http://www.senchalabs.org/connect/)/[express](http://expressjs.com/) middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

[![build status](https://secure.travis-ci.org/TroyGoode/node-cors.png)](http://travis-ci.org/TroyGoode/node-cors)

## Installation

```bash
$ npm install cors
```

## Usage

### Simple Usage (Enable *All* CORS Requests)

```javascript
var express = require('express')
  , cors = require('cors')
  , app = express();

app.get('/products/:id', cors(), function(req, res, next){
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
```

### Configuring CORS

```javascript
var express = require('express')
  , cors = require('cors')
  , app = express();

var corsOptions = {
  origin: 'http://example.com'
};

app.get('/products/:id', cors(corsOptions), function(req, res, next){
  res.json({msg: 'This is CORS-enabled for only example.com.'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
```

### Configuring CORS Asynchronously

```javascript
var express = require('express')
  , cors = require('cors')
  , app = express();

var whitelist = ['http://example1.com', 'http://example2.com'];
var corsOptionsDelegate = function(req, callback){
  var corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.get('/products/:id', cors(corsOptionsDelegate), function(req, res, next){
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
```

## Options

For details on the effect of each CORS header, [read this article on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/cors/).

* `options.origin`: Configures the **Access-Control-Allow-Origin** CORS header. Expects a string (ex: "http://example.com"). Set to `true` to reflect the [request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined by `req.header('Origin')`. Set to `false` to disable CORS.
* `options.methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `options.headers`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization]`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `options.credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `options.maxAge`: Configures the **Access-Control-Allow-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `options.enablePreflight`: By default, a request that runs through this middleware with a method of `OPTIONS` will short-circuit with a `204` response to the client after the CORS headers have been written. Set this option to `false` to disable this feature.

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Troy Goode](https://github.com/TroyGoode) ([troygoode@gmail.com](mailto:troygoode@gmail.com))
