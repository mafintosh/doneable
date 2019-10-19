# doneable

Easily extend a stateful callback based operation into a thenable that can await'ed.

```
npm install doneable
```

## Usage

``` js
const Doneable = require('doneable')

class Operation extends Donable {
  constructor (args, callback) {
    super(callback)
    this.destroyed = false

    // do a bunch of stuff
    setImmediate(() => {
      if (this.destroyed) return this.done(new Error('Was aborted'))
      this.done(null, 'value')
    })
  }

  destroy () {
    this.destroyed = true
  }
}

const op = new Operation(..., function (err, val) {
  console.log('Optional callback', err, val)
})

// but you can also await it
console.log(await op) // returns 42
```

## License

MIT
