import deepmerge from 'deepmerge'

export const filterObject = (raw: any, notAllowed: string[]) =>
    Object.keys(raw)
        .filter((key: string) => !notAllowed.includes(key))
        .reduce((obj: any, key: string) => {
            obj[key] = raw[key]
            return obj
        }, {})

export const index = (obj: any, i: any) => obj[i]

export const indexValue = (obj: any, queries: string) => queries.split('.').reduce(index, obj)

export const filterWithQueryNotation = (obj: any, queries: string) => {
    let object: any = {}
    const result: any = object
    const arr = queries.split('.')
    for (let i = 0; i < arr.length - 1; i++) {
        /* eslint-disable-next-line no-multi-assign */
        object = object[arr[i]] = {}
    }

    object[arr[arr.length - 1]] = indexValue(obj, queries)

    return result
}

export const deepMerge = (obj: any, otherObj: any) =>
    deepmerge(obj, otherObj, {
        arrayMerge: (dest, src) => [...dest, ...src]
    })

export const deepMergeAll = (objs: any[]) =>
    deepmerge.all(objs, {
        arrayMerge: (dest, src) => [...dest, ...src]
    })
