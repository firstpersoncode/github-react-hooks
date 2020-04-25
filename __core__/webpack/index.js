require('dotenv').config()
const deepmerge = require('deepmerge')
const common = require('./config.common')
const webpackConfigs = require(`./config.${process.env.NODE_ENV || 'production'}`)

const configs = deepmerge(common, webpackConfigs, {
    arrayMerge: (dest, src) => [...dest, ...src],
})

module.exports = configs
