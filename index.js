const WAITING = Symbol('then-waiting')
const ERROR = Symbol('error')
const VALUE = Symbol('value')

module.exports = class Doneable {
  constructor (callback) {
    this.callback = callback || noop
    this.isDone = false
    this[ERROR] = null
    this[VALUE] = null
    this[WAITING] = null
  }

  then (resolve, reject) {
    if (this.isDone) {
      if (this[ERROR]) reject(this[ERROR])
      else resolve(this[VALUE])
      return
    }

    if (!this[WAITING]) this[WAITING] = []
    this[WAITING].push([resolve, reject])
  }

  done (err, value) {
    if (this.isDone === true) return
    this.isDone = true
    this[ERROR] = err
    this[VALUE] = value
    this.callback(err, value)

    if (this[WAITING] !== null) {
      for (const [resolve, reject] of this[WAITING]) this.then(resolve, reject)
      this[WAITING] = null
    }
  }
}

function noop () { }
