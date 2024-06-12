// Modified from "connect" to work nicely with "stack".
// Pass a regular 'handler' function instead of a 'server' instance.

module.exports = function vhost(hostname, handler){
  var regexp = new RegExp('^' + hostname.replace(/[*]/g, '(.*?)') + '$');

  return function vhost(req, res, next){
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
