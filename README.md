# Svelte Store Enhanced

A collection of "enhanced" Svelte stores

# Table Of Contents

1. [WritableEnhanced](#writableenhancedt)
   1. [Usage](#usage)
2. [ToggleStore](#togglestoret)
   1. [Usage](#usage-1)
3. [Narrow Imports](#narrow-imports)

## Install

```
npm i -D @poppanator/svelte-store-enhanced
```

```
yarn add --dev @poppanator/svelte-store-enhanced
```

## `WritableEnhanced<T>`

This is pretty much a standard `Writable<T>` store with the added `up()` method
which lets you update multiple properties at once in the store data, if the
store data is an object.

It also has the `get()` method which lets you retrieve store data in a
non-Svelte context, i.e. equivalent to Svelte's `get(theStore)`

This is the type declaration for the `WritableEnhanced<T>` store

````ts
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
````

### Usage

You can either enhance an existing Svelte writable store, or just pass the
initial state to the `wriableEnhanced()` method

```svelte
<script lang="ts">
import { writableEnhanced } from '@poppanator/svelte-store-enhanced'

const store = writableEnhanced({ lang: 'Svelte', version: '3', cool: 'yes' })

store.up({ version: '4', cool: 'very' })
</script>
```

The above `store.up(...)` is the equivalent of

```svelte
<script lang="ts">
store.update((curr) => {
  curr.version = '4'
  curr.cool = 'very'

  return curr
})
</script>
```

As stated above, you can also "enhance" an existing Svelte writable
store like so:

```svelte
<script lang="ts">
import { writable } from 'svelte/store'
import { writableEnhanced } from '@poppanator/svelte-store-enhanced'

const orgStore = writable({
  name: 'Rich Harris',
  creatorOf: ['svelte', 'rollup', 'degit'],
})

const store = writableEnhanced(orgStore)
</script>
```

If you need to retrieve data from a store in a non-Svelte context, you
can call `store.get()`, to get the data. This method also takes a
specific store property as argument if that particular property is
wanted

```ts
// some-file.ts

export function verifyStoreName(store: WritableEnhanced<MyState>) {
  const name = store.get('name')

  if (name !== 'Rich Harris') {
    throw new Error('Bad Name')
  }
}

export function verifyStore(store: WritableEnhanced<MyState>) {
  verifyStoreName(store)

  const allData = store.get()

  if (!allData.creatorOf.includes('svelte')) {
    throw new Error('Missing Svelte in creatorOf')
  }
}
```

## `ToggleStore<T>`

The `ToggleStore<T>` is a store for keeping `boolean` states for given
property names. This is useful when implementing things like _accordions_ and
such.

This is the type declaration for the toggle store:

```ts
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
```

### Usage

```svelte
<script lang="ts">
import { toggle } from '@poppanator/svelte-store-enhanced'

const store = toggle({ one: true, two: false, three: false })
</script>

<div>
  <button on:click={() => store.every('on')}>Show All</button>
  <button on:click={() => store.every('off')}>Hide All</button>
</div>

<ul>
  <li class:open={$store.one}>
    <button on:click={() => store.swap('one')}>
      <h2>First</h2>
    </button>
    <div>
      <p>This is the first text</p>
    </div>
  </li>

  <li class:open={$store.two}>
    <button on:click={() => store.swap('two')}>
      <h2>Second</h2>
    </button>
    <div>
      <p>This is the second text</p>
    </div>
  </li>

  <li class:open={$store.three}>
    <button on:click={() => store.swap('three')}>
      <h2>Third</h2>
    </button>
    <div>
      <p>This is the third text</p>
    </div>
  </li>
</ul>

<style>
div {
  display: none;
}

.open div {
  display: block;
}
</style>
```

## Narrow Imports

This package has support for importing specific "submodules" directly, without
importing them from the root. This can help with three-shaking and such, if
that is of concern.

> **NOTE!** If you are using Typescript you have to make sure the
> `moduleResolution` option in you `tsconfig.json` is set to `node16` or
> `nodenext`

### Example

```ts
import { wriableEnhanced } from '@poppanator/svelte-store-enhanced/writable-enhanced'
import { toggle } from '@poppanator/svelte-store-enhanced/toggle'
```
