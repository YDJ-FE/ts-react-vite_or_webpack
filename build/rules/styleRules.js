const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('./../../theme')
const { cacheLoader } = require('./loaders')

const cssLoader = modules => ({
    loader: 'css-loader',
    options: {
        modules: modules
            ? {
                  mode: 'local',
                  localIdentName: '[local]--[contenthash:base64:8]'
              }
            : false
    }
})

const sassLoader = {
    loader: 'sass-loader',
    options: {
        // `dart-sass` 是首选
        implementation: require('sass'),
        additionalData: `@import "${resolve('src/styles')}/_base.scss";`,
        sassOptions: {
            includePaths: [require('bourbon').includePaths[0]]
        }
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: theme
        }
    }
}

const baseLoaders = modules => [
    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
    cacheLoader,
    cssLoader(modules),
    'postcss-loader'
]

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: baseLoaders(false)
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [...baseLoaders(true), sassLoader]
    },
    {
        // for ant design
        test: /\.less$/,
        // less do not use threadLoader
        // https://github.com/webpack-contrib/thread-loader/issues/10
        use: [...baseLoaders(false), lessLoader]
    }
]
