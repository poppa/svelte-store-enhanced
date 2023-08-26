import type { AnyFunction } from './type-types.js'

/**
 * Check if `f` is a function
 */
export function isFunction(f: unknown): f is AnyFunction {
  return f !== null && typeof f === 'function' && f.prototype === undefined
}

/**
 *  Check if `what` is an object that is not null, an array, or a function
 */
export function isObject<T>(
  what: Record<string, unknown> | T
): what is Record<string, unknown> {
  return (
    typeof what === 'object' &&
    what !== null &&
    !Array.isArray(what) &&
    !isFunction(what)
  )
}
