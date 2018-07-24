const path = require('path')
const webpack = require('webpack')

const config = require('./config')
const constants = require('./constants')
const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const { assetsPath, resolve } = require('./utils')
const optimization = require('./optimization')

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.tsx']
    },
    output: {
        path: config.assetsRoot,
        filename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js'),
        publicPath: config.assetsPublicPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [resolve('src'), resolve('node_modules')],
        alias: {
            mobx: resolve('node_modules/mobx/lib/mobx.es6.js'),
            '@constants': resolve('src/constants'),
            '@services': resolve('src/services'),
            '@utils': resolve('src/utils'),
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@views': resolve('src/containers/views'),
            '@shared': resolve('src/containers/shared')
        }
    },
    module: {
        rules: [...styleRules, ...jsRules, ...fileRules]
    },
    plugins,
    optimization,
    stats: { children: false },
    devtool: config.sourceMap ? '#source-map' : false
}
