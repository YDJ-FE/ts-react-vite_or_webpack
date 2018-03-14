const path = require('path')
const webpack = require('webpack')

const config = require('./build/config')
const constants = require('./build/constants')
const styleLoaders = require('./build/style-loaders')
const plugins = require('./build/plugins')

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.tsx']
    },
    output: {
        path: config.assetsRoot,
        filename: '[name].js',
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
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                            plugins: ['react-hot-loader/babel']
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join(
                        config.assetsSubDirectory,
                        'img/[name].[hash:7].[ext]'
                    )
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join(
                        config.assetsSubDirectory,
                        'fonts/[name].[hash:7].[ext]'
                    )
                }
            }
        ]
    },
    plugins,
    devtool: constants.APP_ENV === 'qa' ? false : '#source-map'
}
