var equal = require('deep-is')

module.exports = function(obj) {
  return new DataRev(obj)
}

function DataRev (obj) {
  var now = new Date()
  this.createdAt = now.toISOString()
  this.updatedAt = now.toISOString()

  this.revisions = {}
  this.original = clone(obj)
  this.current = this.original
}

DataRev.prototype.rev = function(newObj) {
  newObj = clone(newObj)
  this.updatedAt = new Date().toISOString()
  this.revisions[this.updatedAt] = getRevision(this.current, newObj)
  this.current = newObj
}

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getRevision (oldObj, newObj) {
  oldObj = clone(oldObj)
  newObj = clone(newObj)

  var revs = []
  
  function compare (oldO, newO, path) {
    var oldKeys = Object.keys(oldO).sort()
    var newKeys = Object.keys(newO).sort()

    var checked = {}

    newKeys.forEach(function(key) {
      if (oldO[key]) {
        if (!equal(oldO[key], newO[key])) {
          if (isObj(oldO[key]) && isObj(newO[key]))
            compare(oldO[key], newO[key], path + '.' + key)
          else 
            revs.push({p: path + '.' + key, old: oldO[key], val: newO[key], m: 'R'})
        }
      } else
        revs.push({p: path + '.' + key, val: newO[key], m: '+'})

      checked[key] = true
    })

    oldKeys.forEach(function(key) {
      if (checked[key]) return

      if (newO[key]) {
        if (!equal(oldO[key], newO[key])) {
          if (isObj(oldO[key]) && isObj(newO[key]))
            compare(oldO[key], newO[key], path + '.' + key)
          else 
            revs.push({p: path + '.' + key, old: oldO[key], val: newO[key], m: 'R'})
        }
      } else
        revs.push({p: path + '.' + key, val: oldO[key], m: '-'})
    })
  }
  compare(oldObj, newObj, '')

  return revs
}

function isObj (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

