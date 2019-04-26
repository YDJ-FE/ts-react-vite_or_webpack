const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const constants = require('./constants')
const config = require('./config')
const { assetsPath } = require('./utils')
const env = require('./env.json')

const oriEnv = env[constants.APP_ENV]
Object.assign(oriEnv, {
    APP_ENV: constants.APP_ENV
})
// webpack process.env
const defineEnv = {}
for (let key in oriEnv) {
    defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

const DLL_PATH = './../dll'

const basePlugins = [
    new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn']
    }),
    new webpack.DefinePlugin(defineEnv)
]

const devPlugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'build/tpl/index.html',
        inject: true
    }),
    new CaseSensitivePathsPlugin()
]

const prodPlugins = [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.DllReferencePlugin({
        manifest: require(`${DLL_PATH}/vendor.manifest.json`)
    }),
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
    new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, `${DLL_PATH}/**/*.js`),
        includeSourcemap: false
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: assetsPath('css/[name].[contenthash].css'),
        chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
    }),
    new WorkboxPlugin.GenerateSW({
        cacheId: 'ts-react-webpack',
        clientsClaim: true,
        skipWaiting: true,
        offlineGoogleAnalytics: false,
        // do not use google cdn
        importWorkboxFrom: 'local',
        // precache ignore
        exclude: [/index\.html$/, /\.map$/],
        // dynamic update
        runtimeCaching: [
            {
                // match html
                urlPattern: config.pagePattern,
                handler: 'NetworkFirst'
            },
            {
                // match static resource
                urlPattern: config.assetsPattern,
                handler: 'StaleWhileRevalidate'
            }
        ]
    })
]

if (config.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins)
