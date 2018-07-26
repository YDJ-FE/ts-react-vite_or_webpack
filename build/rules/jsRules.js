const tsImportPluginFactory = require('ts-import-plugin')

const { resolve } = require('./../utils')

module.exports = [
    {
        test: /\.(ts(x?)|js(x?))$/,
        use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    transpileOnly: true,
                    useCache: true,
                    cacheDirectory: resolve('.cache-loader'),
                    useBabel: true,
                    babelOptions: {
                        babelrc: false,
                        plugins: ['transform-class-properties', 'syntax-dynamic-import', 'react-hot-loader/babel']
                    },
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true
                            })
                        ]
                    })
                }
            }
        ],
        exclude: /node_modules/
    }
]
