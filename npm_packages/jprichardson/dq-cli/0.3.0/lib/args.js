var pkg = require('../package')

// program is a commander object
function setupArgsAndParse (program, argv) {
  program
    .version(pkg.version)
    .option('-h, --host [host]', 'host of redis server, the default is localhost')
    .option('-a, --auth [password]', 'password of redis server')
    .option('-p, --port [number]', 'port of redis server, the default is 6379')
    .option('-q, --queue <queueName>', 'name of the queue')
    .parse([].slice.call(argv)) // in case it's an `arguments` Object, convert to array

  program.name = program.queue
  program.password = program.auth

  return program
}

module.exports = setupArgsAndParse
