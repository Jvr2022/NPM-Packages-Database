var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

function dqExport (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)

  // program contains config
  dq.connect(program, function (err, q) {
    if (err) exit(1, err)

    function again () {
      q.deq(function (err, item) {
        if (err) writeStream(s.error, {config: program, error: err})
        if (item == null) exit(0)
        writeStream(s.output, item)
        again()
      })
    }
    again()
  })
}

module.exports = dqExport
