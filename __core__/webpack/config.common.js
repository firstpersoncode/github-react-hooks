const path = require('path')
const { DefinePlugin } = require('webpack')
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon')

const { srcDir, appDir, distDir } = require('./dirs')

const loaders = require('./loaders')

// env
const APP = /^APP_/i
const raw = Object.keys(process.env)
    .filter((key) => APP.test(key))
    .reduce(
        (env, key) => {
            env[key] = process.env[key]
            return env
        },
        {
            NODE_ENV: process.env.NODE_ENV || 'production',
        }
    )
const globals = {
    'process.env': Object.keys(raw).reduce((env, key) => {
        env[key] = JSON.stringify(raw[key])
        return env
    }, {}),
}

const commonConfigs = {
    target: 'web',
    // node: false,
    resolve: {
        modules: [distDir, srcDir, appDir, 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.ico',
            '.json',
            '.png',
            '.jpg',
            '.jpeg',
            '.svg',
            '.gif',
        ],
        alias: {
            '~': srcDir,
            '__core__': path.resolve(process.cwd(), '__core__'),
        },
    },
    output: {
        path: distDir,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        globalObject: 'this',
        publicPath: `/${process.env.APP_NAME}/`,
    },
    module: {
        rules: loaders,
    },
    plugins: [
        new DefinePlugin(globals),
        new ReactLoadableSSRAddon({
            filename: 'react-loadable-ssr-addon.json',
        }),
    ],
}

module.exports = commonConfigs
