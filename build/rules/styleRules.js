const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('./../../theme')
const { threadLoader, cacheLoader } = require('./loaders')

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

const typingsForCssModulesLoader = {
    loader: 'typings-for-css-modules-loader',
    options: {
        modules: true,
        namedExport: true,
        camelCase: true,
        sass: true
    }
}

const baseLoaders = workerParallelJobs => {
    const loaders = [config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader', cacheLoader]
    if (workerParallelJobs !== 0) {
        loaders.push(threadLoader(workerParallelJobs))
    }
    return loaders
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [...baseLoaders(), 'css-loader', 'postcss-loader']
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [...baseLoaders(2), typingsForCssModulesLoader, 'postcss-loader', sassLoader]
    },
    {
        // for ant design
        test: /\.less$/,
        // less do not use threadLoader
        // https://github.com/webpack-contrib/thread-loader/issues/10
        use: [...baseLoaders(0), 'css-loader', 'postcss-loader', lessLoader]
    }
]
