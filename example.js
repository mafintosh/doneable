const Doneable = require('./')

const d = new Doneable(function (err, value) {
  console.log('callback called', err, value)
})

setTimeout(function () {
  d.done(null, 42)
}, 1000)

main().catch(console.error)

async function main () {
  console.log(await d)
  console.log(await d)
  console.log(await d)
}
