const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser')

const config = require('./config')
const constants = require('./constants')
const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const { assetsPath, resolve } = require('./utils')
const optimization = require('./optimization')
require('./cleanup-folder')

const conf = {
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

if (process.env.NODE_ENV === 'development') {
    conf.devServer = {
        port: config.devPort,
        hot: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        after: function() {
            openBrowser(`http://localhost:${config.devPort}`)
        }
    }
}

module.exports = conf
