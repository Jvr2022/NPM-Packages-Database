var remote
// Check if electron version is >0.35.0
var electronV = process.versions['electron'].split('.')
if (parseInt(electronV[1], 10) >= 35 && electronV[0] === '0') {
  var electron = require('electron')
  remote = electron.remote
} else {
  remote = require('remote')
}
var remoteConsole = remote.require('console')

// we have to do this so that mocha output doesn't look like shit
console.log = function () {
  remoteConsole.log.apply(remoteConsole, arguments)
}

console.dir = function () {
  remoteConsole.dir.apply(remoteConsole, arguments)
}

// if we don't do this, we get socket errors and our tests crash
Object.defineProperty(process, 'stdout', {
  value: {
    write: function (msg) {
      remoteConsole.log.apply(remoteConsole, arguments)
    }
  }
})
