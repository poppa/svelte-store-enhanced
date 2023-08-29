import { writable, type Writable } from 'svelte/store'

export type ToggleMap = { [key: string]: boolean }
export type ToggleStore<T extends ToggleMap> = Writable<T> & {
  /** Toggle the state of `key` */
  toggle: (key: keyof T) => ToggleStore<T>
  /**
   * Set the state of all items
   *
   * @param state -
   *  - `on` will set all items to `true`
   *  - `off` will set all items to `false`
   *  - `toggle` will toggle the state of all items
   */
  every: (state: 'on' | 'off' | 'toggle') => ToggleStore<T>
  /** Set the state of `key` to active, i.e. `true` */
  on: (key: keyof T) => ToggleStore<T>
  /** Set the state of `key` to inactive, i.e. `false` */
  off: (key: keyof T) => ToggleStore<T>
  /** Toggle `key` and disable any other active key  */
  swap: (key: keyof T) => ToggleStore<T>
  /** Reset the store to its initial values */
  reset: () => ToggleStore<T>
}

/**
 * Creates a new {@link ToggleStore} with initial `defaults` data
 */
export function toggle<T extends ToggleMap>(defaults: T): ToggleStore<T> {
  const initials = Object.freeze({ ...defaults })
  const store = writable<T>(defaults)

  return {
    ...store,

    toggle(key): ToggleStore<T> {
      store.update((curr) => {
        curr[key] = !curr[key] as never
        return curr
      })

      return this
    },

    every(state): ToggleStore<T> {
      type Setter = (st: T, key: keyof T) => void

      const fn: Setter =
        state === 'toggle'
          ? (st, k): void => (st[k] = !st[k] as never)
          : state === 'on'
          ? (st, k): void => (st[k] = true as never)
          : (st, k): void => (st[k] = false as never)

      store.update((curr) => {
        for (const key of Object.keys(curr) as Array<keyof T>) {
          fn(curr, key)
        }

        return curr
      })

      return this
    },

    swap(what): ToggleStore<T> {
      store.update((curr) => {
        for (const key of Object.keys(curr) as Array<keyof T>) {
          key === what
            ? (curr[key] = !curr[key] as never)
            : (curr[key] = false as never)
        }

        return curr
      })

      return this
    },

    on(key): ToggleStore<T> {
      store.update((curr) => {
        curr[key] = true as never
        return curr
      })

      return this
    },

    off(key): ToggleStore<T> {
      store.update((curr) => {
        curr[key] = false as never
        return curr
      })

      return this
    },

    reset(): ToggleStore<T> {
      store.set({ ...initials })
      return this
    },
  }
}
