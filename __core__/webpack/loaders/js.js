const babelLoader = {
    loader: require.resolve('babel-loader'),
    options: {
        cacheDirectory: true,
        babelrc: false,
        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
        plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            'react-loadable/babel',
        ],
    },
}

module.exports = {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: [babelLoader],
}
