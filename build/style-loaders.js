const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./config')
const { resolve } = require('./utils')

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
        test: /\.css$/,
        include: [resolve('src')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            typingsForCssModulesLoaderConf,
            { loader: 'postcss-loader' }
        ]
    },
    {
        test: /\.scss$/,
        include: resolve('src/styles'),
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    }
]
