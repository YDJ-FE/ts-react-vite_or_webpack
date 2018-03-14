const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const constants = require('./constants')
const config = require('./config')

const devPlugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'build/tpl/index.html',
        inject: true
    })
]

const prodPlugins = [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new HtmlWebpackPlugin({
        filename: config.index,
        template: 'build/tpl/index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    }),
    new ExtractTextPlugin({
        filename: path.posix.join(
            config.assetsSubDirectory,
            'css/[name].[contenthash].css'
        )
    })
]

if (config.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = constants.NODE_ENV === 'development' ? devPlugins : prodPlugins
