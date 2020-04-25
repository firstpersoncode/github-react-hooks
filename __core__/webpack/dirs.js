const path = require('path')

const distDir = path.resolve(process.cwd(), 'dist')
const srcDir = path.resolve(process.cwd(), 'src')
const staticDir = path.resolve(process.cwd(), 'static')
const appDir = path.resolve(process.cwd(), 'src/__app__')
const modulesDir = path.resolve(process.cwd(), 'node_modules')

module.exports = {
    distDir,
    staticDir,
    srcDir,
    appDir,
    modulesDir,
}
