// const urlLoader = {
//     loader: require.resolve('url-loader'),
//     options: {
//         limit: 2048,
//         name: '[name].[hash:8].[ext]',
//     },
// }

const fileLoader = {
    loader: require.resolve('file-loader'),
    options: {
        name: '[name].[ext]',
        emitFile: false,
    },
}

module.exports = {
    // test: /\.(png|jpg|jpeg|gif|svg|ico|json)$/,
    exclude: /\.(js|jsx|ts|tsx|mjs)$/,
    type: 'javascript/auto',
    use: [fileLoader],
}
