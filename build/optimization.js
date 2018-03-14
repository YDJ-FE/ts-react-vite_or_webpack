const constants = require('./constants')

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
              }
          }
