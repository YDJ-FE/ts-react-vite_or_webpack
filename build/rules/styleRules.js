const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')

const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true
    }
}

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader', cacheLoader, 'css-loader']
    },
    {
        test: /\.scss$/,
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    cacheLoader,
                    'css-loader',
                    sassLoader
                ]
            }
        ]
    },
    {
        // 用于antd按需加载
        test: /\.less$/,
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    cacheLoader,
                    'css-loader',
                    lessLoader
                ]
            }
        ]
    }
]
