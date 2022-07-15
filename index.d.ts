import type { Middleware } from 'koa'
import type { ServerTiming } from 'servertime'

declare function ServerTime(opts?: ServerTime.ServerTimeOptions): Middleware

declare namespace ServerTime {
  interface ServerTimeOptions {
    enabled?: boolean
    total?: boolean
    totalName?: string
    totalDesc?: string
  }

  function getCurrentTimer(): ServerTiming
}

declare module 'koa' {
  interface Context {
    startTime(key: string, desc: string): void
    startTimePromise<T>(key: string, desc: string, promise: Promise<T>): Promise<T>
    endTime(key: string): void
  }
}

export = ServerTime
