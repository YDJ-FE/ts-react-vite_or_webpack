const constants = require('./constants')
const config = require('./config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports =
    constants.APP_ENV === 'dev'
        ? {}
        : {
              runtimeChunk: {
                  name: 'manifest'
              },
              splitChunks: {
                  cacheGroups: {
                      default: false,
                      commons: {
                          test: /[\\/]node_modules[\\/]/,
                          name: 'vendor',
                          chunks: 'all'
                      }
                  }
              },
              minimizer: [
                  new UglifyJsPlugin({
                      cache: true,
                      parallel: true,
                      sourceMap: config.sourceMap
                  }),
                  new OptimizeCSSAssetsPlugin({
                      cssProcessor: require('cssnano'),
                      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                      canPrint: true
                  })
              ]
          }
