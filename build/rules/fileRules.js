const { assetsPath, resolve } = require('./../utils')
const { threadLoader, cacheLoader } = require('./loaders')

function getUrlloader(assetsPrefix) {
    return {
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: assetsPath(`${assetsPrefix}/[name].[hash:7].[ext]`)
        }
    }
}

module.exports = [
    {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [cacheLoader, getUrlloader('img')]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [cacheLoader, getUrlloader('fonts')]
    },
    {
        test: /\.svg$/,
        loader: [cacheLoader, threadLoader(), '@svgr/webpack'],
        include: [resolve('src')]
    }
]
