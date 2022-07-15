const Koa = require('koa')
const servertime = require('koa2-servertime')

const app = new Koa()

app.use(servertime())

app.use(function (ctx) {
  const fetchPromise = ctx.state.startTimePromise('fetch', 'Fetching data', delay(2000))
  const dbPromise = ctx.state.startTimePromise('db', 'Database Query', delay(1000))
  const cachePromise = ctx.state.startTimePromise('cache', 'Cache Query', delay(500))

  return Promise.all([fetchPromise, dbPromise, cachePromise]).then(function () {
    ctx.body = 'Hello World'
  })
})

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

app.listen(3000, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000')
})
