// Modified from "connect" to work nicely with "stack", "connect" or the regular "http" server.
// Pass a regular 'handler' function instead of a 'server' instance.

module.exports = function vhost(hostname, handler){
  var regexp = new RegExp('^' + hostname.replace(/\./g, '\\.').replace(/[*]/g, '(.*?)') + '$');

  return function vhost(req, res, next){
    // In the case of a regular 'http.Server', there will be no 'next', so define one just in case
    next = next || function() { res.writeHead(404); res.end("Not Found"); };
    // An HTTP/1.0 request won't have a 'Host' header...
    if (!req.headers.host) return next();
    var host = req.headers.host.split(':')[0];
    if (req.subdomains = regexp.exec(host)) {
      req.subdomains = req.subdomains.slice(1);
      handler.call(this, req, res, next);
    } else {
      next();
    }
  };
};
