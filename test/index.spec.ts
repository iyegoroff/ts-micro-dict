import { dict, put, omit, toArray, Dict, fromArray, KeyValueArray, map, filter } from '../src'

test('put - key doesn\'t exist', () => {
  const initial = dict<number>()
  const expected = { test: 123 }

  expect(put(initial, 'test', 123)).toEqual(expected)
  expect(initial).toEqual({})
})

test('put - key exists', () => {
  const initial = dict({ test: 123 })
  const expected = { test: 321 }

  expect(put(initial, 'test', 321)).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('omit - key exists', () => {
  const initial = dict({ test: 123 })
  const expected = {}

  expect(omit(initial, 'test')).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('omit - key doesn\'t exist', () => {
  const initial = dict({ test: 123 })
  const expected = { test: 123 }

  expect(omit(initial, 'key')).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('toArray', () => {
  const initial: Dict<number> = { test: 123, oops: undefined, key: 321 }
  const expected = [['test', 123], ['key', 321]]

  expect(toArray(initial)).toEqual(expected)
  expect(initial).toEqual({ test: 123, oops: undefined, key: 321 })
  expect(Object.keys(initial)).toEqual(['test', 'oops', 'key'])
})

test('fromArray', () => {
  const initial: KeyValueArray<number> = [['test', 123], ['key', 321]]
  const expected: Dict<number> = { test: 123, key: 321 }

  expect(fromArray(initial)).toEqual(expected)
  expect(initial).toEqual([['test', 123], ['key', 321]])
})

test('filter', () => {
  const initial: Dict<number> = { x: 1, y: 100, z: 5 }
  const expected: Dict<number> = { y: 100 }

  expect(filter(initial, x => x > 10)).toEqual(expected)
  expect(initial).toEqual({ x: 1, y: 100, z: 5 })
})

test('map', () => {
  const initial: Dict<number> = { x: 1, y: 100, z: 5, _: undefined }
  const expected: Dict<string> = { x: '1', y: '100', z: '5' }

  expect(map(initial, x => `${x}`)).toEqual(expected)
  expect(initial).toEqual({ x: 1, y: 100, z: 5, _: undefined })
})
