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

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.awcache')
    }
}

const typingsForCssModulesLoader = {
    loader: 'typings-for-css-modules-loader',
    options: {
        localIdentName: '[name]-[local]-[hash:base64:5]',
        module: true,
        namedExport: true,
        camelCase: true,
        sourceMap: false,
        importLoaders: 2,
        sass: true
    }
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cacheLoader,
            'css-loader'
            // 'postcss-loader'
        ]
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    cacheLoader,
                    'css-loader',
                    typingsForCssModulesLoader,
                    sassLoader
                    // 'postcss-loader'
                ]
            }
        ]
    }
]
