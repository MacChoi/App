/*
 * Copyright (C) 2017, Skyler.
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

function slice (args, from) {
  return Array.prototype.slice.call(args, from)
}

class Emitter {
  constructor () {
    this.handlerMap = {}
  }

  on (event, handler) {
    if (typeof event !== 'string') {
      throw new TypeError(event + ' is not a string')
    }
    if (typeof handler !== 'function') {
      throw new TypeError(handler + ' is not a function')
    }
    let map = this.handlerMap
    let handlers = map[event] = map[event] || []
    let i = handlers.indexOf(handler)
    if (i === -1) {
      handlers.push(handler)
    }
    return this
  }

  off (event, handler) {
    if (handler === undefined) {
      // remove all handlers
      delete this.handlerMap[event]
      return this
    }
    // remove registered handler
    let handlers = this.handlerMap[event]
    if (handlers) {
      let i = handlers.indexOf(handler)
      if (i >= 0) {
        handlers.splice(i, 1)
      }
      // cleanup empty handlers
      if (handlers.length === 0) {
        this.off(event)
      }
    }
    return this
  }

  emit (event) {
    let args = slice(arguments, 1)
    let handlers = this.handlerMap[event]
    if (handlers) {
      for (let i = 0, len = handlers.length; i < len; i++) {
        handlers[i].apply(undefined, args)
      }
    }
    return this
  }
}

export default Emitter
