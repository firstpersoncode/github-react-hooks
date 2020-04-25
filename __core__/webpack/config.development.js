const { HotModuleReplacementPlugin } = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

const { appDir } = require('./dirs')

const webpackConfigs = {
    mode: 'development',
    entry: {
        bundle: [
            'regenerator-runtime/runtime',
            'webpack-hot-middleware/client',
            path.join(appDir, 'client'),
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
            eslint: path.resolve(process.cwd(), '.eslintrc'),
        }),
    ],
    devtool: 'eval',
}

module.exports = webpackConfigs
