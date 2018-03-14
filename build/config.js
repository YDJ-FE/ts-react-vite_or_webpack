const path = require('path')

const constants = require('./constants')

// 静态资源访问域名（CDN）
const STATICDOMAIN = constants.APP_ENV === 'prod' ? '//七牛CDN地址' : ''

module.exports = {
    index: path.resolve(__dirname, './../index.html'),
    assetsRoot: path.resolve(__dirname, `./../dist/${constants.APP_ENV}`),
    assetsPublicPath: constants.NODE_ENV === 'development' ? '/' : `${STATICDOMAIN}/dist/${constants.APP_ENV}/`,
    assetsSubDirectory: 'static',
    // 正式环境接入sentry需要sourceMap
    sourceMap: constants.APP_ENV !== 'qa',
    extractCss: constants.NODE_ENV !== 'development',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
}
