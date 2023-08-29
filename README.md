# Svelte Store Enhanced

A collection of "enhanced" Svelte stores

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

You can also import the `writable-enhanced` module specifically:

```ts
import { writableEnhanced } from '@poppanator/svelte-store-enhanced/writable-enhanced'
```
