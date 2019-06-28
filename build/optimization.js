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
                      buildup: {
                          chunks: 'all',
                          test: /[\\/]node_modules[\\/]/
                      },
                      vendor: {
                          name: 'vendor',
                          test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
                          chunks: 'all',
                          priority: 10
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
