var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
// var streams = require('../lib/streams')
// var writeStream = require('../lib/write-stream')

function dqDelete (/** process.argv **/) {
  args(program, arguments)
  // var s = streams(program)
  var config = cfg.readConfigSync(program)

  dq.delete(config, function (err) {
    if (err) exit(1, err)
    // writeStream(s.output, 'success')
  })
}

module.exports = dqDelete
