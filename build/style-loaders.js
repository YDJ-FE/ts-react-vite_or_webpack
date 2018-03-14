const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./config')

function resolve(dir) {
    return path.join(__dirname, './../', dir)
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

function getLoadingWithoutSourceMap(loader) {
    return {
        loader,
        options: { sourceMap: false }
    }
}

module.exports = config.extractCss
    ? [
          {
              test: /\.css$/,
              include: [resolve('src')],
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      typingsForCssModulesLoaderConf,
                      getLoadingWithoutSourceMap('postcss-loader')
                  ]
              })
          },
          {
              test: /\.scss$/,
              include: resolve('src/styles'),
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      getLoadingWithoutSourceMap('css-loader'),
                      getLoadingWithoutSourceMap('sass-loader'),
                      getLoadingWithoutSourceMap('postcss-loader')
                  ]
              })
          }
      ]
    : [
          {
              test: /\.css$/,
              include: [resolve('src')],
              use: [
                  'style-loader',
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
                          'style-loader',
                          'css-loader',
                          'sass-loader',
                          'postcss-loader'
                      ]
                  }
              ]
          }
      ]
