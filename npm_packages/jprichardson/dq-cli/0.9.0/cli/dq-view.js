var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

var STEP = 1000

function dqView (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)
  var config = cfg.readConfigSync(program)

  dq.connect(config, function (err, q) {
    if (err) exit(1, err)

    var count = 0
    q.count(function (err, total) {
      if (err) exit(1, err)

      function again () {
        q.peak(count, STEP, function (err, res) {
          if (err) writeStream(s.error, {config: program, error: err})
          if (res.length === 0) exit(0)
          res.forEach(function (item) {
            writeStream(s.output, item)
          })
          count += STEP
          again()
        })
      }
      again()
    })
  })
}

module.exports = dqView
