const constants = require('./constants')
const { resolve } = require('./utils')

const alias = { mobx: resolve('node_modules/mobx/lib/mobx.es6.js') }
if (constants.APP_ENV === 'dev') {
    alias['react-dom'] = '@hot-loader/react-dom'
}

module.exports = alias
