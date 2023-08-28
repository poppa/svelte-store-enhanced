import { expect, it } from 'vitest'
import { toggle } from './toggle.js'
import { isWritableStore } from './writable-enhanced.js'
import { get } from 'svelte/store'

it('It should create a writable store', () => {
  const store = toggle({ one: false, two: false, three: false })
  expect(isWritableStore(store)).toEqual(true)
  expect(typeof store.off).toEqual('function')
  expect(typeof store.on).toEqual('function')
  expect(typeof store.reset).toEqual('function')
  expect(typeof store.swap).toEqual('function')
  expect(typeof store.toggle).toEqual('function')

  const s = get(store)
  expect(s.one).toEqual(false)
  expect(s.two).toEqual(false)
  expect(s.three).toEqual(false)
})

it('off() should set the given property to false', () => {
  const store = toggle({ one: true, two: true, three: true })
  store.off('one')

  const s = get(store)
  expect(s.one).toEqual(false)
  expect(s.two).toEqual(true)
  expect(s.three).toEqual(true)
})

it('on() should set the given property to true', () => {
  const store = toggle({ one: false, two: true, three: true })
  store.on('one')

  const s = get(store)
  expect(s.one).toEqual(true)
  expect(s.two).toEqual(true)
  expect(s.three).toEqual(true)
})

it('toggle() should toggle the given property from true to false and vice-versa', () => {
  const store = toggle({ one: false, two: true, three: true })
  store.toggle('one')

  let s = get(store)
  expect(s.one).toEqual(true)
  expect(s.two).toEqual(true)
  expect(s.three).toEqual(true)

  store.toggle('one')

  s = get(store)
  expect(s.one).toEqual(false)
  expect(s.two).toEqual(true)
  expect(s.three).toEqual(true)
})

it('swap() should toggle the given property and set all other to false', () => {
  const store = toggle({ one: false, two: true, three: true })
  store.swap('one')

  const s = get(store)
  expect(s.one).toEqual(true)
  expect(s.two).toEqual(false)
  expect(s.three).toEqual(false)
})
