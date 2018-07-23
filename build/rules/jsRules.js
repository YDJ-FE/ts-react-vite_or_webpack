const tsImportPluginFactory = require('ts-import-plugin')

const { resolve } = require('./../utils')

module.exports = [
    {
        test: /\.(ts(x?)|js(x?))$/,
        use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                    useBabel: true,
                    babelOptions: {
                        babelrc: false,
                        plugins: ['transform-class-properties', 'syntax-dynamic-import', 'react-hot-loader/babel']
                    },
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryDirectory: 'es',
                                libraryName: 'antd',
                                style: 'css'
                            })
                        ]
                    })
                }
            }
        ],
        exclude: /node_modules/
    }
]
