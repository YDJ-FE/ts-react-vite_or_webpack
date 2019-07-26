const IS_DEV = process.env.NODE_ENV !== 'production'
const APP_ENV = process.env.APP_ENV || 'prod'
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

module.exports = {
    IS_DEV,
    APP_ENV,
    FILE_EXTENSIONS
}
