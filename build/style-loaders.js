const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./config')
const { resolve } = require('./utils')

const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
}

const typingsForCssModulesLoaderConf = {
    loader: 'typings-for-css-modules-loader',
    options: {
        localIdentName: '[local]_[hash:base64:8]',
        modules: true,
        namedExport: true,
        camelCase: true,
        sass: true,
        sourceMap: false
    }
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            typingsForCssModulesLoaderConf,
            sassLoader,
            { loader: 'postcss-loader' }
        ]
    }
]
