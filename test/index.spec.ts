import { Dict, put, omit, toArray } from '../src'

test('put - key doesn\'t exist', () => {
  const initial: Dict<number> = {}
  const expected: Dict<number> = { 'test': 123 }

  expect(put(initial, 'test', 123)).toEqual(expected)
  expect(initial).toEqual({})
})

test('put - key exists', () => {
  const initial: Dict<number> = { 'test': 123 }
  const expected: Dict<number> = { 'test': 321 }

  expect(put(initial, 'test', 321)).toEqual(expected)
  expect(initial).toEqual({ 'test': 123 })
})

test('omit - key exists', () => {
  const initial: Dict<number> = { 'test': 123 }
  const expected: Dict<number> = {}

  expect(omit(initial, 'test')).toEqual(expected)
  expect(initial).toEqual({ 'test': 123 })
})

test('omit - key doesn\'t exist', () => {
  const initial: Dict<number> = { 'test': 123 }
  const expected: Dict<number> = { 'test': 123 }

  expect(omit(initial, 'key')).toEqual(expected)
  expect(initial).toEqual({ 'test': 123 })
})

test('toArray', () => {
  const initial: Dict<number> = { 'test': 123, 'key': 321 }
  const expected = [['test', 123], ['key', 321]]

  expect(toArray(initial)).toEqual(expected)
  expect(initial).toEqual({ 'test': 123, 'key': 321 })
})
