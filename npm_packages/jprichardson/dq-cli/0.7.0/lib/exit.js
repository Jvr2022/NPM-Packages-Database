var streams = require('./streams')

// opts.config is unused for now, should be commander program object and not anythign to do with ./lib/config, very confusing, I know
function exit (code, opts) {
  if (opts) {
    var s = streams(opts.config)
    s.error.write(opts.error + '\n')
  }

  process.exit(code)
}

module.exports = exit
