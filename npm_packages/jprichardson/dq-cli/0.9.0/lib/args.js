var pkg = require('../package')

// program is a commander object
function setupArgsAndParse (program, argv) {
  program
    .version(pkg.version)
    .option('-h, --host [host]', 'host of redis server, the default is localhost')
    .option('-a, --auth [password]', 'password of redis server')
    .option('-p, --port [number]', 'port of redis server, the default is 6379')
    .option('-n, --name <queueName>', 'name of the queue')
    .option('-c, --config [config]', 'name of file with configuration')
    .parse([].slice.call(argv)) // in case it's an `arguments` Object, convert to array

  program.password = program.auth

  return program
}

module.exports = setupArgsAndParse
