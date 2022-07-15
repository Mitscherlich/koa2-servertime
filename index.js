const servertime = require('servertime')
const {
  setCurrentTimer,
  getCurrentTimer,
} = require('./utils')

module.exports = function (opts) {
  const defaultOpts = {
    enabled: true,
    total: true,
    totalName: 'total',
    totalDesc: 'Total Response Time',
  }

  const userOpts = Object.assign({}, defaultOpts, opts)

  return function (ctx, next) {
    if (!userOpts.enabled)
      return next()

    const timer = servertime.createTimer()

    ctx.startTime = startTime(timer)
    ctx.startTimePromise = startTimePromise(timer)
    ctx.endTime = endTime(timer)

    if (userOpts.total)
      timer.start(userOpts.totalName, userOpts.totalDesc)

    setCurrentTimer(timer)
    return next().then(function () {
      setCurrentTimer(null)

      if (userOpts.total)
        timer.end(userOpts.totalName)

      ctx.res.setHeader('Server-Timing', timer.getHeader())
    })
  }
}

function startTime(timer) {
  return function (key, desc) {
    timer.start(key, desc)
  }
}

function endTime(timer) {
  return function (key) {
    timer.end(key)
  }
}

function startTimePromise(timer) {
  return function (key, desc, promise) {
    timer.start(key, desc)
    return promise.finally(function () {
      timer.end(key)
    })
  }
}

module.exports.getCurrentTimer = getCurrentTimer
