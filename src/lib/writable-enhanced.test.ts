import { it, expect } from 'vitest'
import { isWritableStore, writableEnhanced } from './writable-enhanced.js'
import { writable } from 'svelte/store'

it('It should create a writable store given some data', () => {
  const store = writableEnhanced({ enhanced: true, name: 'store' })
  expect(isWritableStore(store)).toEqual(true)
})

it('It should enhance an existing writable store', () => {
  const orgStore = writable({ enhanced: true, name: 'store' })
  const store = writableEnhanced(orgStore)
  expect('up' in store).toEqual(true)
  expect(typeof store.up).toEqual('function')
})

it('get() should handle no argument and a given property', () => {
  const store = writableEnhanced({ enhanced: true, name: 'store' })
  expect(store.get()).toEqual({ enhanced: true, name: 'store' })
  expect(store.get('enhanced')).toEqual(true)
  expect(store.get('name')).toEqual('store')
})

it('up() should update the internal state', () => {
  const store = writableEnhanced({ enhanced: true, name: 'store' })
  store.up({ enhanced: false, name: 'enhanced' })
  expect(store.get()).toEqual({ enhanced: false, name: 'enhanced' })
})

it('up() should issue subscriptions to be called', () => {
  const store = writableEnhanced({ enhanced: true, name: 'store' })
  let initCalled = false
  let updateCalled = false
  const unsub = store.subscribe((state) => {
    if (state.enhanced === true) {
      initCalled = true
    } else {
      updateCalled = true
    }
  })
  store.up({ enhanced: false, name: 'enhanced' })

  expect(initCalled).toEqual(true)
  expect(updateCalled).toEqual(true)
  unsub()
})
