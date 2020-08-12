import { Dict, KeyValueArray } from '../src'

test('put - key doesn\'t exist', () => {
  const initial = Dict.create<number>()
  const expected = { test: 123 }

  expect(Dict.put(initial, 'test', 123)).toEqual(expected)
  expect(initial).toEqual({})
})

test('put - key exists', () => {
  const initial = Dict.create({ test: 123 })
  const expected = { test: 321 }

  expect(Dict.put(initial, 'test', 321)).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('omit - key exists', () => {
  const initial = Dict.create({ test: 123 })
  const expected = {}

  expect(Dict.omit(initial, 'test')).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('omit - key doesn\'t exist', () => {
  const initial = Dict.create({ test: 123 })
  const expected = { test: 123 }

  expect(Dict.omit(initial, 'key')).toEqual(expected)
  expect(initial).toEqual({ test: 123 })
})

test('toArray', () => {
  const initial: Dict<number> = { test: 123, oops: undefined, key: 321 }
  const expected = [['test', 123], ['key', 321]]

  expect(Dict.toArray(initial)).toEqual(expected)
  expect(initial).toEqual({ test: 123, oops: undefined, key: 321 })
  expect(Object.keys(initial)).toEqual(['test', 'oops', 'key'])
})

test('fromArray', () => {
  const initial: KeyValueArray<number> = [['test', 123], ['key', 321]]
  const expected: Dict<number> = { test: 123, key: 321 }

  expect(Dict.fromArray(initial)).toEqual(expected)
  expect(initial).toEqual([['test', 123], ['key', 321]])
})

test('filter', () => {
  const initial: Dict<number> = { x: 1, y: 100, z: 5 }
  const expected: Dict<number> = { y: 100 }

  expect(Dict.filter(initial, x => x > 10)).toEqual(expected)
  expect(initial).toEqual({ x: 1, y: 100, z: 5 })
})

test('map', () => {
  const initial: Dict<number> = { x: 1, y: 100, z: 5, _: undefined }
  const expected: Dict<string> = { x: '1', y: '100', z: '5' }

  expect(Dict.map(initial, x => `${x}`)).toEqual(expected)
  expect(initial).toEqual({ x: 1, y: 100, z: 5, _: undefined })
})
