var crypto = require('crypto')

var ignoreMethods = {
  GET: true,
  HEAD: true,
  OPTIONS: true
}

exports.set = function (req, res, next) {
  if (!req.session || req.session._csrf)
    return next()

  createToken(function (err, csrf) {
    if (!err)
      req.session._csrf = csrf

    next(err)
  })
}

exports.check = function (req, res, next) {
  if (ignoreMethods[req.method])
    return next()

  var value = req.headers['x-csrf-token']
    || (req.body && req.body._csrf)

  next(req.session._csrf === value
    ? null
    : passError(403)
  )
}

exports.checkBody = function (req, res, next) {
  if (ignoreMethods[req.method])
    return next()

  next(req.body && req.session._csrf === req.body._csrf
    ? null
    : passError(403)
  )
}

exports.checkHeader = function (req) {
  if (ignoreMethods[req.method])
    return next()

  next(req.session._csrf === req.headers['x-csrf-token']
    ? null
    : passError(403)
  )
}

function passError(status) {
  var err = new Error()
  err.status = status
  return err
}

function createToken(callback) {
  return crypto.randomBytes(18, function (err, buf) {
    if (err)
      return callback(err)

    callback(null, buf.toString('base64')
      .slice(0, 24)
      .replace(/\//g, '-')
      .replace(/\+/g, '_')
    )
  })
}