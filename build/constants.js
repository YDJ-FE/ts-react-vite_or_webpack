const APP_ENV = process.env.APP_ENV || 'prod'
const NODE_ENV = process.env.APP_ENV === 'dev' ? 'development' : 'production'

module.exports = {
    NODE_ENV,
    APP_ENV
}
