import { writable, type Writable } from 'svelte/store'

export type ToggleMap = { [key: string]: boolean }
export type ToggleStore<T extends ToggleMap> = Writable<T> & {
  /** Toggle the state of `key` */
  toggle: (key: keyof T) => void
  /** Set the state of `key` to active, i.e. `true` */
  on: (key: keyof T) => void
  /** Set the state of `key` to inactive, i.e. `false` */
  off: (key: keyof T) => void
  /** Toggle `key` and disable any other active key  */
  swap: (key: keyof T) => void
  /** Reset the store to its initial values */
  reset: VoidFunction
}

/**
 * Creates a new {@link ToggleStore} with initial `defaults` data
 */
export function toggle<T extends ToggleMap>(defaults: T): ToggleStore<T> {
  const initials = Object.freeze({ ...defaults })
  const store = writable<T>(defaults)

  return {
    ...store,

    toggle(key): void {
      store.update((curr) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        curr[key] = !curr[key]
        return curr
      })
    },

    swap(what): void {
      store.update((curr) => {
        for (const key of Object.keys(curr) as Array<keyof T>) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          key === what ? (curr[key] = !curr[key]) : (curr[key] = false)
        }

        return curr
      })
    },

    on(key): void {
      store.update((curr) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        curr[key] = true
        return curr
      })
    },

    off(key): void {
      store.update((curr) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        curr[key] = false
        return curr
      })
    },

    reset(): void {
      store.set({ ...initials })
    },
  }
}
