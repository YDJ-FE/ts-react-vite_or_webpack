const tsImportPluginFactory = require('ts-import-plugin')

const { resolve } = require('./../utils')

module.exports = [
    {
        test: /\.(ts(x?)|js(x?))$/,
        include: [resolve('src')],
        use: [
            'cache-loader',
            'thread-loader',
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    plugins: ['transform-class-properties', 'syntax-dynamic-import', 'react-hot-loader/babel']
                }
            },
            {
                loader: 'ts-loader',
                options: {
                    // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                    happyPackMode: true,
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryDirectory: 'es',
                                libraryName: 'antd',
                                style: false
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: 'es2015',
                        sourceMap: true
                    }
                }
            }
        ]
    }
]
