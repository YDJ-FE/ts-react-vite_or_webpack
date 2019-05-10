const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('./../../theme')
const { threadLoader, cacheLoader } = require('./loaders')

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

const baseLoaders = (workerParallelJobs, modules) => {
    const loaders = [
        config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
        cacheLoader,
        cssLoader(modules),
        'postcss-loader'
    ]
    if (modules) {
        loaders.splice(2, 0, 'css-modules-typescript-loader')
    }
    if (workerParallelJobs !== 0) {
        loaders.splice(2, 0, threadLoader(workerParallelJobs))
    }
    return loaders
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: baseLoaders(undefined, false)
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [...baseLoaders(0, true), sassLoader]
    },
    {
        // for ant design
        test: /\.less$/,
        // less do not use threadLoader
        // https://github.com/webpack-contrib/thread-loader/issues/10
        use: [...baseLoaders(0, false), lessLoader]
    }
]
