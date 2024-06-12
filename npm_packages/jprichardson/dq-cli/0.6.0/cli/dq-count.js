var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

function dqCount (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)
  var config = cfg.readConfigSync(program)

  dq.connect(config, function (err, q) {
    if (err) exit(1, err)

    q.count(function (err, count) {
      if (err) writeStream(s.error, {config: program, error: err})
      writeStream(s.output, count)
      q.quit()
    })
  })
}

module.exports = dqCount
