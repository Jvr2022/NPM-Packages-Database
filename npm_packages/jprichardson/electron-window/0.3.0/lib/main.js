var assert = require('assert')
var path = require('path')
var url = require('url')
var BrowserWindow = require('browser-window')

// retain global references, if not, window will be closed automatically when
// garbage collected
var _windows = {}

function createWindow (options) {
  var window = new BrowserWindow(extend({
    show: false,
    resizable: false,
    frame: true,
    preload: path.join(__dirname, 'renderer-preload')
  }, options))

  _windows[window.id] = window

  // should not need to be called, but just in case
  // window.destroy() is ever called
  window.unref = function () {
    delete _windows[window.id]
  }

  window.once('closed', function () {
    window.unref()
  })

  window.showUrl = function (httpOrFileUrl, args, callback) {
    if (typeof args === 'function') {
      callback = args
      args = null
    }
    assert.strictEqual(typeof args, 'object', 'args must be an object')
    // stringify the args
    args = args ? encodeURIComponent(JSON.stringify(args)) : ''

    window.webContents.once('did-finish-load', function () {
      window.show()
      callback.apply(this, arguments)
    })

    if (httpOrFileUrl.indexOf('http') === 0) {
      var urlData = url.parse(httpOrFileUrl)
      var httpUrl = url.format(extend(urlData, {
        hash: urlData.hash || args ? args : undefined
      }))
      window.loadUrl(httpUrl)
    } else { // presumably a file url
      var fileUrl = url.format({
        protocol: 'file',
        pathname: path.resolve(httpOrFileUrl),
        slashes: true,
        hash: args ? args : undefined
      })

      window.loadUrl(fileUrl)
    }
  }

  return window
}

function extend (target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key]
  })
  return target
}

module.exports = {
  createWindow: createWindow,
  windows: _windows
}
