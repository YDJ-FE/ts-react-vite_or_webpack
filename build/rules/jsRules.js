const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
    {
        test: /\.(j|t)sx?$/,
        include: [resolve('src')],
        use: [
            cacheLoader,
            threadLoader(),
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [['@babel/preset-env'], '@babel/preset-typescript', '@babel/preset-react'],
                    plugins: [
                        ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        '@babel/plugin-syntax-dynamic-import',
                        'react-hot-loader/babel'
                    ]
                }
            }
        ],
        exclude: /node_modules/
    }
]
