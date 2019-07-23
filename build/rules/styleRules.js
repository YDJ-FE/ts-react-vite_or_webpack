const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('./../../theme')
const { cacheLoader } = require('./loaders')

const cssLoader = modules => ({
    loader: 'css-loader',
    options: { modules, localIdentName: '[name]__[local]--[hash:base64:5]' }
})

const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        modifyVars: theme
    }
}

const baseLoaders = modules => {
    const loaders = [
        config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
        cacheLoader,
        cssLoader(modules),
        'postcss-loader'
    ]
    return loaders
}

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
