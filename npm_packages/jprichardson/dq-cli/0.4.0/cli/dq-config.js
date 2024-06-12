var program = require('commander')
var args = require('../lib/args')
var cfg = require('../lib/config')
var exit = require('../lib/exit')
var streams = require('../lib/streams')
var writeStream = require('../lib/write-stream')

function dqConfig (/** process.argv **/) {
  args(program, arguments)
  var s = streams(program)

  if (!program.config) exit(1, {config: program, error: new Error('Must specifiy --config parameter.')})

  // read config (only config is passed)
  if (program.config && program.rawArgs.length === 4) {
    var cfgData = cfg.readSync(program.config)
    if (!cfgData) exit(1, {config: program, error: new Error('Configuration does not exist or error parsing JSON.')})
    writeStream(s.output, JSON.stringify(cfgData, null, 2))
  } else {
    var data = cfg.argsToData(program)
    cfg.writeSync(program.config, data)
    writeStream(s.output, 'Configuration updated.')
  }
}

module.exports = dqConfig
