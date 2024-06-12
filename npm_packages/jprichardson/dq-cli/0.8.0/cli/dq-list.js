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

    list.sort()
    var maxLen = list.reduce(function (max, current) {
      if (max > current.length) return max
      else return current.length
    }, 0)

    // pad list items
    list = list.map(function (item) {
      return item + Array(maxLen - item.length + 1).join(' ')
    })

    var q = dq.connect(config)

    function countIt () {
      if (list.length === 0) exit(0)
      var name = list.shift()
      q.name = name.trim()
      q.count(function (err, count) {
        if (err) exit(1, err)
        writeStream(s.output, name + ' => ' + count)
        countIt()
      })
    }
    countIt()
  })
}

module.exports = dqList
