
/*!
 * Express - response
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , http = require('http')
  , path = require('path')
  , connect = require('connect')
  , utils = connect.utils
  , parseRange = require('./utils').parseRange
  , res = http.ServerResponse.prototype
  , send = connect.static.send
  , join = require('path').join
  , mime = require('mime');

/**
 * Send a response with the given `body` and optional `headers` and `status` code.
 *
 * Examples:
 *
 *     res.send();
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *     res.send('Sorry, cant find that', 404);
 *     res.send('text', { 'Content-Type': 'text/plain' }, 201);
 *     res.send(404);
 *
 * @param {String|Object|Number|Buffer} body or status
 * @param {Object|Number} headers or status
 * @param {Number} status
 * @return {ServerResponse}
 * @api public
 */

res.send = function(body, headers, status){
  // allow status as second arg
  if ('number' == typeof headers) {
    status = headers,
    headers = null;
  }

  // default status
  status = status || this.statusCode;

  // allow 0 args as 204
  if (!arguments.length) body = status = 204;

  // determine content type
  switch (typeof body) {
    case 'number':
      if (!this.header('Content-Type')) {
        this.contentType('.txt');
      }
      body = http.STATUS_CODES[status = body];
      break;
    case 'string':
      if (!this.header('Content-Type')) {
        this.charset = this.charset || 'utf-8';
        this.contentType('.html');
      }
      break;
    case 'object':
      if (Buffer.isBuffer(body)) {
        if (!this.header('Content-Type')) {
          this.contentType('.bin');
        }
      } else {
        if (!this.header('Content-Type')) {
          this.contentType('.json');
        }
        body = JSON.stringify(body);
        if (this.req.query.callback && this.app.set('jsonp callback')) {
          this.header('Content-Type', 'text/javascript');
          body = this.req.query.callback.replace(/[^\w$.]/g, '') + '(' + body + ');';
        }
      }
      break;
  }

  // populate Content-Length
  if (!this.header('Content-Length')) {
    this.header('Content-Length', Buffer.isBuffer(body)
      ? body.length
      : Buffer.byteLength(body));
  }

  // merge headers passed
  if (headers) {
    var fields = Object.keys(headers);
    for (var i = 0, len = fields.length; i < len; ++i) {
      var field = fields[i];
      this.header(field, headers[field]);
    }
  }

  // strip irrelevant headers
  if (204 === status) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
  }

  // respond
  this.statusCode = status;
  this.end('HEAD' == this.req.method ? undefined : body);
};

/**
 * Transfer the file at the given `path`. Automatically sets 
 * the _Content-Type_ response header field. `next()` is called
 * when `path` is a directory, or when an error occurs.
 *
 * Options:
 *
 *   - `maxAge` defaulting to 0
 *   - `root`   root directory for relative filenames
 *
 * @param {String} path
 * @param {Object|Function} options or fn
 * @param {Function} fn
 * @api public
 */

res.sendfile = function(path, options, fn){
  options = options || {};

  // support function as second arg
  if ('function' == typeof options) {
    fn = options;
    options = {};
  }

  options.path = path;
  options.callback = fn;
  send(this.req, this, this.req.next, options);
};

/**
 * Set _Content-Type_ response header passed through `mime.lookup()`.
 *
 * Examples:
 *
 *     var filename = 'path/to/image.png';
 *     res.contentType(filename);
 *     // res.headers['Content-Type'] is now "image/png"
 *
 *     res.contentType('.html');
 *     res.contentType('html');
 *     res.contentType('json');
 *     res.contentType('png');
 *
 * @param {String} type
 * @return {String} the resolved mime type
 * @api public
 */

res.contentType = function(type){
  return this.header('Content-Type', mime.lookup(type));
};

/**
 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
 *
 * @param {String} filename
 * @return {ServerResponse}
 * @api public
 */

res.attachment = function(filename){
  this.header('Content-Disposition', filename
    ? 'attachment; filename="' + path.basename(filename) + '"'
    : 'attachment');
  return this;
};

/**
 * Transfer the file at the given `path`, with optional 
 * `filename` as an attachment and optional callback `fn(err)`.
 *
 * @param {String} path
 * @param {String|Function} filename or fn
 * @param {Function} fn
 * @return {Type}
 * @api public
 */

res.download = function(path, filename, fn){
  var self = this;

  // support callback as second arg
  if ('function' == typeof filename) {
    fn = filename;
    filename = null;
  }

  // transfer the file
  this.attachment(filename || path).sendfile(path, function(err){
    if (err) self.removeHeader('Content-Disposition');
    if (fn) return fn(err);
    if (err) {
      self.req.next('ENOENT' == err.code
        ? null
        : err);
    }
  });
};

/**
 * Set or get response header `name` with optional `val`.
 *
 * @param {String} name
 * @param {String} val
 * @return {String}
 * @api public
 */

res.header = function(name, val){
  if (val === undefined) {
    return this.getHeader(name);
  } else {
    this.setHeader(name, val);
    return val;
  }
};

/**
 * Clear cookie `name`.
 *
 * @param {String} name
 * @api public
 */

res.clearCookie = function(name){
  this.cookie(name, '', { expires: new Date(1) });
};

/**
 * Set cookie `name` to `val`, with the given `options`.
 *
 * Options:
 *
 *    - `maxAge`   max-age in milliseconds, converted to `expires`
 *
 * Examples:
 *
 *    // "Remember Me" for 15 minutes
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
 *
 *    // save as above
 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 *
 * @param {String} name
 * @param {String} val
 * @param {Options} options
 * @api public
 */

res.cookie = function(name, val, options){
  options = options || {};
  if ('maxAge' in options) options.expires = new Date(Date.now() + options.maxAge);
  var cookie = utils.serializeCookie(name, val, options);
  this.header('Set-Cookie', cookie);
};

/**
 * Redirect to the given `url` with optional response `status`
 * defauling to 302.
 *
 * The given `url` can also be the name of a mapped url, for
 * example by default express supports "back" which redirects
 * to the _Referrer_ or _Referer_ headers or the application's
 * "home" setting. Express also supports "home" out of the box,
 * which can be set via `app.set('home', '/blog');`, and defaults
 * to '/'.
 *
 * Redirect Mapping:
 * 
 *  To extend the redirect mapping capabilities that Express provides,
 *  we may use the `app.redirect()` method:
 * 
 *     app.redirect('google', 'http://google.com');
 * 
 *  Now in a route we may call:
 *
 *     res.redirect('google');
 *
 *  We may also map dynamic redirects:
 *
 *      app.redirect('comments', function(req, res){
 *          return '/post/' + req.params.id + '/comments';
 *      });
 *
 *  So now we may do the following, and the redirect will dynamically adjust to
 *  the context of the request. If we called this route with _GET /post/12_ our
 *  redirect _Location_ would be _/post/12/comments_.
 *
 *      app.get('/post/:id', function(req, res){
 *        res.redirect('comments');
 *      });
 *
 *  Unless an absolute `url` is given, the app's mount-point
 *  will be respected. For example if we redirect to `/posts`,
 *  and our app is mounted at `/blog` we will redirect to `/blog/posts`.
 *
 * @param {String} url
 * @param {Number} code
 * @api public
 */

res.redirect = function(url, status){
  var app = this.app
    , req = this.req
    , base = app.set('home') || '/'
    , status = status || 302
    , body;

  // Setup redirect map
  var map = {
      back: req.header('Referrer', base)
    , home: base
  };

  // Support custom redirect map
  map.__proto__ = app.redirects;

  // Attempt mapped redirect
  var mapped = 'function' == typeof map[url]
    ? map[url](req, this)
    : map[url];

  // Perform redirect
  url = mapped || url;

  // Relative
  if (!~url.indexOf('://')) {
    // Respect mount-point
    if (app.route) {
      url = join(app.route, url);
    }

    // Absolute
    var host = req.headers.host
      , tls = req.connection.constructor.name == 'CleartextStream';
    url = 'http' + (tls ? 's' : '') + '://' + host + url;
  }
  

  // Support text/{plain,html} by default
  if (req.accepts('html')) {
    body = '<p>' + http.STATUS_CODES[status] + '. Redirecting to <a href="' + url + '">' + url + '</a></p>';
    this.header('Content-Type', 'text/html');
  } else {
    body = http.STATUS_CODES[status] + '. Redirecting to ' + url;
    this.header('Content-Type', 'text/plain');
  }

  // Respond
  this.statusCode = status;
  this.header('Location', url);
  this.end(body);
};

/**
 * Assign the view local variable `name` to `val` or return the
 * local previously assigned to `name`.
 *
 * @param {String} name
 * @param {Mixed} val
 * @return {Mixed} val
 * @api public
 */

res.local = function(name, val){
  this._locals = this._locals || {};
  return undefined === val
    ? this._locals[name]
    : this._locals[name] = val;
};

/**
 * Assign several locals with the given `obj`,
 * or return the locals.
 *
 * @param {Object} obj
 * @return {Object|Undefined}
 * @api public
 */

res.locals = function(obj){
  if (obj) {
    for (var key in obj) {
      this.local(key, obj[key]);
    }
  } else {
    return this._locals;
  }
};
