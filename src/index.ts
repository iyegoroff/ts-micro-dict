export type Dict<T> = {
  readonly [key: string]: NonNullable<T> | undefined
}

export type KeyValue<T> = Readonly<[string, NonNullable<T>]>
export type KeyValueArray<T> = ReadonlyArray<KeyValue<T>>

/**
 * Creates a new `Dict` from a dict-like object.
 *
 * Can be used to infer the value type of `Dict` entry
 *
 * @param o A `Dict`-like object
 * @returns `Dict`
 */
const dict = <T>(o: Dict<T> = {}): Dict<T> => o

/**
 * Creates a new `Dict` by adding or updating an entry to existing `Dict`
 *
 * @param dict original `Dict`
 * @param key entry key
 * @param value entry value
 * @returns `Dict`
 */
const put = <T>(
  dict: Dict<T>,
  key: string,
  value: NonNullable<T>
): Dict<T> => ({ ...dict, [key]: value })

/**
 * Creates a new `Dict` by removing an entry from existing `Dict`
 *
 * @param dict original `Dict`
 * @param key key to remove
 * @returns `Dict`
 */
const omit = <T>(dict: Dict<T>, key: string): Dict<T> =>
  Object.keys(dict).reduce((acc, k) => {
    if (k !== key) {
      acc[k] = dict[k]
    }

    return acc
  }, {} as Partial<Dict<T>>)

/**
 * Converts a `Dict` to `KeyValueArray`
 *
 * Entries containing `undefined` values will be skipped
 *
 * @param dict original `Dict`
 * @returns Array of `Dict` entries
 */
const toArray = <T>(dict: Dict<T>): KeyValueArray<T> =>
  reduce(dict, (acc, item, key) => {
    acc.push([key, item])
    return acc
  }, [] as [string, NonNullable<T>][])

/**
 * Converts a `KeyValueArray` to `Dict`
 *
 * @param array Array of `Dict` entries
 * @returns `Dict`
 */
const fromArray = <T>(array: KeyValueArray<T>): Dict<T> => {
  const dict: { [key: string]: NonNullable<T> } = {}
  for (const [key, value] of array) {
    dict[key] = value
  }

  return dict
}

/**
 * Creates a new `Dict` by filtering an existing `Dict`
 *
 * @param dict original `Dict`
 * @param fn predicate function
 * @returns `Dict`
 */
const filter = <T>(dict: Dict<T>, fn: (item: T, key: string) => boolean): Dict<T> =>
  reduce(dict, (acc, item, key) => {
    if (fn(item, key)) {
      acc[key] = item
    }

    return acc
  }, {} as Partial<Dict<T>>)

/**
 * Creates a new `Dict` by mapping an existing `Dict`
 *
 * @param dict original `Dict`
 * @param fn mapping function
 * @returns `Dict`
 */
const map = <T, U>(
  dict: Dict<T>,
  fn: (item: T, key: string) => NonNullable<U>
): Dict<U> =>
  reduce(dict, (acc, item, key) => {
    acc[key] = fn(item, key)
    return acc
  }, {} as Partial<Dict<U>>)

/**
 * Creates a new object by reducing an existing `Dict`
 *
 * @param dict original `Dict`
 * @param fn mapping function
 * @param initial initial value
 * @returns `U`
 */
const reduce = <T, U>(
  dict: Dict<T>,
  fn: (acc: U, item: NonNullable<T>, key: string) => U,
  initial: U
): U =>
  Object.keys(dict).reduce((acc, key) => {
    const item = dict[key]

    return item !== undefined ? fn(acc, item, key) : acc
  }, initial)

export const Dict = {
  create: dict,
  put,
  omit,
  filter,
  map,
  reduce,
  toArray,
  fromArray
} as const
