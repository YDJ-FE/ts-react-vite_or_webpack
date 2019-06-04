const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config = require('./config')
const constants = require('./constants')
const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const { assetsPath, resolve } = require('./utils')
const optimization = require('./optimization')
require('./cleanup-folder')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: { app: ['./src/index.tsx'] },
    output: {
        path: config.assetsRoot,
        filename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js'),
        publicPath: config.assetsPublicPath,
        pathinfo: false
    },
    resolve: {
        extensions: constants.FILE_EXTENSIONS,
        modules: [resolve('src'), resolve('node_modules')],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.webpack.json'),
                extensions: constants.FILE_EXTENSIONS
            })
        ],
        alias: { mobx: resolve('node_modules/mobx/lib/mobx.es6.js') }
    },
    module: {
        rules: [...styleRules, ...jsRules, ...fileRules]
    },
    plugins,
    optimization,
    stats: 'minimal',
    devtool: config.sourceMap
}
