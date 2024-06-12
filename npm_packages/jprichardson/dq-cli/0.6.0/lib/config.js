var fs = require('fs')
var path = require('path-extra')
var util = require('./util')

function argsToData (program) {
  return JSON.parse(JSON.stringify({
    host: program.host ? program.host : undefined,
    port: program.port ? program.port : undefined,
    password: program.auth ? program.auth : undefined,
    name: program.name ? program.name : undefined
  }))
}

function fileFromName (name) {
  var dir = path.join(path.homedir(), '.dq')
  return path.join(dir, name + '.json')
}

function readConfigSync (program, name) {
  var cfgData = readSync(name || program.config)
  var argData = argsToData(program)

  if (cfgData) {
    return util.assign(cfgData, argData)
  } else {
    return argData
  }
}

function readSync (name) {
  if (!name) return null

  var file = fileFromName(name)

  try {
    var text = fs.readFileSync(file, 'utf8')
  } catch (err) {
    return null
  }

  try {
    var data = JSON.parse(text)
  } catch (err) {
    return null
  }

  return data
}

function writeSync (name, data) {
  var file = fileFromName(name)
  var dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
}

module.exports = {
  argsToData: argsToData,
  fileFromName: fileFromName,
  readConfigSync: readConfigSync,
  readSync: readSync,
  writeSync: writeSync
}
