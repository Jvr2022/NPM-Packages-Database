var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

var AMOUNT = 1000

function dqExport (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)
  var config = cfg.readConfigSync(program)

  dq.connect(config, function (err, q) {
    if (err) exit(1, err)

    function again () {
      q.deq(AMOUNT, function (err, items) {
        if (err) writeStream(s.error, {config: program, error: err})
        if (items == null || items.length === 0) exit(0)
        items.forEach(function (item) {
          writeStream(s.output, item)
        })
        again()
      })
    }
    again()
  })
}

module.exports = dqExport
