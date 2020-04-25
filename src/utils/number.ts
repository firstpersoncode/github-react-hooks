export const getRandomArbitrary = (min: number, max: number) => {
    const diff = max - min
    const rand = Math.random() * diff
    return Math.floor(rand + min)
}

const roundTo = (num: number, precision: number) => {
    /* eslint-disable-next-line no-restricted-properties */
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor
}

export const formatCurrency = (num: number, prefix?: string, fraction?: number) => {
    const n = roundTo(num, fraction || 0)
    let newnum = n.toString()
    const [mainnum, commas] = newnum.split('.')
    newnum = mainnum
    let i = newnum.length - 3
    while (i > 0) {
        newnum = `${newnum.substr(0, i)}.${newnum.substr(i)}`
        i -= 3
    }

    const zeroCents = fraction ? `.${'0'.repeat(fraction as number)}` : ''

    const cents = commas ? `.${commas}` : zeroCents

    return `${prefix} ${newnum}${cents}`
}

export const unformatCurrency = (num: string) => {
    let newnum = num || '0'
    newnum = newnum.split('.').join('')
    return newnum
}
