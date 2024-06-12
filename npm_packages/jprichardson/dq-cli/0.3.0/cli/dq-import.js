var fs = require('fs')
var os = require('os')
var path = require('path')
var byline = require('byline')
var dq = require('dq')
var program = require('commander')
var args = require('../lib/args')
var exit = require('../lib/exit')
var streams = require('../lib/streams')

function dqImport (/** process.argv **/) {
  program.option('-s, --shuffle', 'insert in random order')
  args(program, arguments)
  var s = streams(program)

  var shouldShuffle = !!program.shuffle

  // program contains config
  dq.connect(program, function (err, q) {
    if (err) exit(1, err)

    if (shouldShuffle) {
      enqData(s.input, 0)
    } else {
      var tmpFile = path.join(os.tmpdir(), Math.random().toString().slice(2) + '-dq.dat')
      countLines(s.input, tmpFile, function (err, total) {
        if (err) exit(1, err)
        enqData(fs.createReadStream(tmpFile), total)
      })
    }

    // now normalize priority from 0 to 1 for any number of lines
    function enqData (input, total) {
      var step = 1 / total
      var count = 0

      var lineStream = byline(input)
      lineStream.on('data', function (line) {
        if (shouldShuffle) {
          q.enq(line.toString(), Math.random())
        } else {
          q.enq(line.toString(), count * step)
        }

        count += 1
      })

      lineStream.on('end', function () {
        setImmediate(function () {
          q.quit()
        })
      })
    }
  })
}

function countLines (input, tmpFile, callback) {
  var ws = fs.createWriteStream(tmpFile)
  var count = 0
  var lineStream = byline(input)
  lineStream.on('data', function (data) {
    count += 1
    ws.write(data)
    ws.write('\n')
  })

  lineStream.on('end', function () {
    setImmediate(function () {
      callback(null, count)
    })
  })
}

module.exports = dqImport
