# ts-micro-dict
[![npm version](https://badge.fury.io/js/ts-micro-dict.svg?t=1495378566925)](https://badge.fury.io/js/ts-micro-dict)
[![CircleCI](https://circleci.com/gh/iyegoroff/ts-micro-dict.svg?style=svg)](https://circleci.com/gh/iyegoroff/ts-micro-dict)
[![codecov](https://codecov.io/gh/iyegoroff/ts-micro-dict/branch/master/graph/badge.svg?t=1520230083925)](https://codecov.io/gh/iyegoroff/ts-micro-dict)
[![Dependency Status](https://david-dm.org/iyegoroff/ts-micro-dict.svg?t=1495378566925)](https://david-dm.org/iyegoroff/ts-micro-dict)
[![devDependencies Status](https://david-dm.org/iyegoroff/ts-micro-dict/dev-status.svg)](https://david-dm.org/iyegoroff/ts-micro-dict?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](src/index.d.ts)
[![npm](https://img.shields.io/npm/l/express.svg?t=1495378566925)](https://www.npmjs.com/package/ts-micro-dict)

Functions for representing plain objects as typesafe immutable dictionaries

## Getting started

`$ npm install ts-micro-dict --save`

## Usage

```typescript
import { Dict, put, omit, toArray, dict } from 'ts-micro-dict'

// explicitly initialize a Dict with plain object
const initial: Dict<number> = { key: 1 }
// or infer entry value type with dict function
const alt = dict({ key: 1 })

console.log(initial) // { key: 1 }
console.log(alt)     // { key: 1 }

// immutability
// ERROR - Index signature in type 'Dict<number>' only permits reading:
initial['test'] = 123
// ERROR - Index signature in type 'Dict<number>' only permits reading:
delete initial['key']

// type safety
// ERROR - Type 'number | undefined' is not assignable to type 'number':
const x: number = initial['test']
// OK:
const y: number | undefined = initial['test']

// create another Dict by adding an entry to existing Dict
const another = put(initial, 'test', 123)

console.log(another) // { key: 1, test: 123 }
console.log(initial) // { key: 1 }

// create new Dict by removing an entry from existing Dict
const newDict = omit(another, 'key')

console.log(newDict) // { test: 123 }
console.log(another) // { key: 1, test: 123 }

// converting Dict to readonly array
const arr = toArray(another)

console.log(arr) // [['key', 1], ['test', 123]]

// entries with undefined values will be removed from toArray result
const oops = dict({ key: 1, oops: undefined, test: 123 })

console.log(toArrray(oops)) // [['key', 1], ['test', 123]]

```
