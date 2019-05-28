export type Dict<T> = {
  readonly [id: string]: NonNullable<T> | undefined
}

/**
 * Creates a new `Dict` from a dict-like object.
 *
 * Can be used to infer the value type of `Dict` entry
 *
 * @param o A `Dict`-like object
 * @returns `Dict`
 */
export const dict = <T>(o: Dict<T> = {}): Dict<T> => o

/**
 * Creates a new `Dict` by adding or updating an entry to existing `Dict`
 *
 * @param dict original `Dict`
 * @param key entry key
 * @param value entry value
 * @returns `Dict`
 */
export const put = <T>(dict: Dict<T>, key: string, value: NonNullable<T>): Dict<T> => ({
  ...dict,
  [key]: value
})

/**
 * Creates a new `Dict` by removing an entry from existing `Dict`
 *
 * @param dict original `Dict`
 * @param key key to remove
 * @returns `Dict`
 */
export const omit = <T>(dict: Dict<T>, key: string): Dict<T> => (
  Object.keys(dict).reduce(
    (acc, k) => {
      if (k !== key) {
        acc[k] = dict[k]
      }

      return acc
    },
    {} as Partial<Dict<T>>
  )
)

/**
 * Converts a `Dict` to array
 *
 * Entries containing `undefined` values will be skipped
 *
 * @param dict original `Dict`
 * @returns Array of `Dict` entries
 */
export const toArray = <T>(dict: Dict<T>): ReadonlyArray<Readonly<[string, NonNullable<T>]>> => (
  Object.keys(dict).reduce(
    (acc, key) => {
      const val = dict[key]

      if (val !== undefined) {
        acc.push([key, val])
      }

      return acc
    },
    [] as [string, NonNullable<T>][]
  )
)
