const { assetsPath, resolve } = require('./../utils')

module.exports = [
    {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        include: [resolve('src')]
    }
]
