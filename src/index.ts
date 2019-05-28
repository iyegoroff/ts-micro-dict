export type Dict<T> = {
  readonly [id: string]: T | undefined
}

export const put = <T>(dict: Dict<T>, key: string, value: T): Dict<T> => ({
  ...dict,
  [key]: value
})

export const omit = <T>(dict: Dict<T>, key: string): Dict<T> => (
  Object.keys(dict).reduce(
    (acc, val) => {
      if (val !== key) {
        acc[val] = dict[val]
      }

      return acc
    },
    {} as Partial<Dict<T>>
  )
)

export const toArray = <T>(dict: Dict<T>): ReadonlyArray<Readonly<[string, T]>> => (
  Object.keys(dict).map((key) => [key, dict[key]!])
)
