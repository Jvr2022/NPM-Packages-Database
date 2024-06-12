var crypto = require('crypto')
var uid = require('uid')

var ignoreMethods = {
  GET: true,
  HEAD: true,
  OPTIONS: true
}

exports.get = function () {
  var csrf = this._csrf
  if (csrf)
    return csrf

  var salt = uid()

  return this._csrf = salt + ';'
    + createHash(salt, this.session.secret)
}

exports.set = function (req, res, next) {
  var secret = req.session.secret
  if (secret)
    return next()

  crypto.pseudoRandomBytes(24, function (err, buf) {
    if (err)
      return next(err)

    req.session.secret = buf.toString('base64')
    next()
  })
}

exports.check = function (req, res, next) {
  if (ignoreMethods[req.method])
    return next()

  check(req, res, next, req.headers['x-csrf-token']
    || (req.body && req.body._csrf)
  )
}

exports.checkBody = function (req, res, next) {
  if (ignoreMethods[req.method])
    return next()

  check(req, res, next, req.body && req.body._csrf)
}

exports.checkHeader = function (req, res, next) {
  if (ignoreMethods[req.method])
    return next()

  check(req, res, next, req.headers['x-csrf-token'])
}

function check(req, res, next, value) {
  if (!value)
    return next(passError(403))

  var secret = req.session.secret
  if (!secret)
    return next(passError(403))

  var frags = value.split(';')
  var salt = frags[0]
  var hash = frags[1]
  if (!hash || createHash(salt, secret) !== hash)
    return next(passError(403))

  next()
}

function createHash(salt, secret) {
  return crypto.createHash('sha1')
    .update(salt + ';' + secret)
    .digest('base64')
}

function passError(status) {
  var err = new Error()
  err.status = status
  return err
}