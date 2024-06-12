function streams (config) {
  // stdin|stdout for now
  return {
    error: process.stderr,
    input: process.stdin,
    output: process.stdout
  }
}

module.exports = streams
