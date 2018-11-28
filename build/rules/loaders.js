const { resolve } = require('./../utils')

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }
}

module.exports = {
    cacheLoader
}
