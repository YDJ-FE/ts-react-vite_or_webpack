const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
    {
        test: /\.(j|t)sx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
            cacheLoader,
            threadLoader(),
            {
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015'
                }
            }
        ]
    }
]
