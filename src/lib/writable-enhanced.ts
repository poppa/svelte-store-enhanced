import { get, writable, type Writable } from 'svelte/store'
import { isObject, type Maybe } from './shared/index.js'

/**
 * Check if `obj` is a Svelte Writable store
 */
export function isWritableStore<T>(obj: unknown): obj is Writable<T> {
  return isObject(obj) && 'set' in obj && 'subscribe' in obj && 'update' in obj
}

/**
 * A store extending a Svelte {@link Writable} store
 *
 * @template T - The type of the data
 */
export type WritableEnhanced<T> = Writable<T> & {
  /**
   * Update the store with `values`
   *
   * These are equivalent
   * ```
   * store.up({ myKey: 'some value' })
   *
   * store.update((curr) => {
   *   curr.myKey = 'some value'
   *   return curr
   * })
   * ```
   */
  up(values: Partial<T>): void

  /**
   * Getter for the internal store data
   *
   * These are equivalent:
   *
   * ```
   * const storeData = someStore.get()
   * ```
   *
   * and
   *
   * ```
   * import { get } from 'svelte/store'
   * const storeData = get(someStore)
   * ```
   */
  get(): T

  /**
   * Get the value of property `key` from the internal store data
   *
   * These are equivalent:
   *
   * ```
   * const someValue = someStore.get('myProp')
   * ```
   *
   * and
   *
   * ```
   * import { get } from 'svelte/store'
   * const storeData = get(someStore).myProp
   * ```
   */
  get<K extends keyof T>(key: K): T[K]
}

/**
 * Construct a new {@link WritableEnhanced} store, or enhance an existing
 * {@link Writable} store to become one.
 *
 * @param init - Initial store data, or an existing store to enhance
 */
export function writableEnhanced<T>(
  init: Writable<T> | Maybe<T>
): WritableEnhanced<T> {
  let store: Writable<T>

  if (!init || !isWritableStore(init)) {
    store = writable(init)
  } else {
    store = init
  }

  return {
    ...store,

    up(values): void {
      store.update((curr) => ({ ...curr, ...values }))
    },

    // I'd rather get rid of this expect error, but since the real typing is
    // defined in the type declaration above via the overload method, and since
    // VS Code derive the correct type when consuming this method, we can just
    // live with this for now.
    //
    // The fix is probably super-easy if you have a TS type system black belt.
    //
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get(key) {
      return key ? get(store)[key] : get(store)
    },
  }
}
