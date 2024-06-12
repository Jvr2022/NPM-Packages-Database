var streams = require('./streams')

function exit (code, opts) {
  if (opts) {
    var s = streams(opts.config)
    s.error.write(opts.error + '\n')
  }

  process.exit(code)
}

module.exports = exit
