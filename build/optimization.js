const constants = require('./constants')
const config = require('./config')
const TerserPlugin = require('terser-webpack-plugin')
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
                          test: /moment|lodash|mobx/,
                          name: 'split-vendor',
                          chunks: 'all'
                      }
                  }
              },
              minimizer: [
                  new TerserPlugin({
                      cache: true,
                      parallel: true,
                      sourceMap: Boolean(config.sourceMap)
                  }),
                  new OptimizeCSSAssetsPlugin({
                      cssProcessor: require('cssnano'),
                      cssProcessorOptions: {
                          reduceIdents: false,
                          autoprefixer: false
                      }
                  })
              ]
          }
