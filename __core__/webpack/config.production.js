const path = require('path')
const {
    optimize: { ModuleConcatenationPlugin },
    NoEmitOnErrorsPlugin,
} = require('webpack')

const { appDir } = require('./dirs')

const webpackConfigs = {
    mode: 'production',
    entry: {
        bundle: ['regenerator-runtime/runtime', path.join(appDir, 'client')],
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        assetsSort: '!size',
        chunks: true,
        chunkGroups: true,
        chunkModules: true,
        chunkOrigins: true,
        chunksSort: '!size',
        modules: true,
        modulesSort: '!size',
        moduleTrace: true,
        children: true,
        depth: true,
        entrypoints: true,
        env: true,
        logging: 'verbose',
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: false,
    },
    plugins: [ new ModuleConcatenationPlugin(), new NoEmitOnErrorsPlugin()],
    devtool: 'cheap-module-source-map',
}

module.exports = webpackConfigs
