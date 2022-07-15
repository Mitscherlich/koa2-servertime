# koa2-servertime

[![npm version](https://badgen.net/npm/v/koa2-servertime)](https://npm.im/koa2-servertime) [![npm downloads](https://badgen.net/npm/dm/koa2-servertime)](https://npm.im/koa2-servertime)

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add koa2-servertime
# or
yarn add koa2-servertime
# or
npm i -S koa2-servertime
```

## Usage

Simply add this middleware to your koa application:

```js
const Koa = require('koa')
const ServerTime = require('koa2-servertime')
const app = new Koa()

app.use(ServerTime())

app.use(async (ctx) => {
  // async
  await ctx.startTimePromise('api', 'Fetch Data', fetch(/* ... */))
  await ctx.startTimePromise('db', 'Query Database', db.query(/* ... */))
  await ctx.startTimePromise('cache', 'Get from Cache', cache.get(/* ... */))

  // synchronous
  ctx.startTime('render', 'Render Content')
  ctx.body = render(/* ... */)
  ctx.endTime('render')
})
```

This middleware will give you three apis for collecting timing information:

- `ctx.startTimePromise`: start a timer and return a promise, ended automatically when the promise settled.
- `ctx.startTime`: start a timer
- `ctx.endTime`: end a timer

If you want to disable/enable this middleware, you can simply set `enabled` property to `false` or `true`.

For example, only enable it for development:

```js
app.use(ServerTime({
  enabled: process.env.NODE_ENV !== 'production',
}))
```

This middleware will automatically add a `Total Response Time` header to the response. You can disable or modify it with options.

```js
app.use(ServerTime({
  total: true, // by default
  totalName: 'total', // by default
  totalDesc: 'Total Response Time', // by default
}))
```

For more detail, checkout [./example/app.js](./example/app.js).

### Options

- `enabled`: enable/disable this middleware. default: `true`
- `total`: enable/disable total response time. default: `true`
- `totalName`: total response time header name. default: `'total'`
- `totalDesc`: total response time header description. default: `'Total Response Time'`

## License

MIT &copy; [Mitscherlich](https://mitscherlich.me)
