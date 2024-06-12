var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

function dqList (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)
  var config = cfg.readConfigSync(program)

  dq.list(config, function (err, list) {
    if (err) exit(1, err)

    list.forEach(function (item) {
      writeStream(s.output, item)
    })

    exit(0)
  })
}

module.exports = dqList
