const path = require('path')
const webpack = require('webpack')

const config = require('./build/config')
const constants = require('./build/constants')
const styleLoaders = require('./build/style-loaders')
const plugins = require('./build/plugins')
const { assetsPath } = require('./build/utils')
const optimization = require('./build/optimization')

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.tsx']
    },
    output: {
        path: config.assetsRoot,
        filename:
            constants.APP_ENV === 'dev'
                ? '[name].js'
                : assetsPath('js/[name].[chunkhash].js'),
        chunkFilename:
            constants.APP_ENV === 'dev'
                ? '[name].js'
                : assetsPath('js/[name].[id].[chunkhash].js'),
        publicPath: config.assetsPublicPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [resolve('src'), resolve('node_modules')]
    },
    module: {
        rules: [
            ...styleLoaders,
            {
                test: /\.(ts(x?)|js(x?))$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins,
    optimization,
    devtool: config.sourceMap ? '#source-map' : false
}
