const constants = require('./../constants')
const { resolve } = require('./../utils')

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }
}

// node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2
// https://webpack.docschina.org/guides/build-performance/#sass
const threadLoader = workerParallelJobs => {
    const options = { workerParallelJobs }
    if (constants.APP_ENV === 'dev') {
        Object.assign(options, { poolTimeout: Infinity })
    }
    return { loader: 'thread-loader', options }
}

module.exports = {
    cacheLoader,
    threadLoader
}
