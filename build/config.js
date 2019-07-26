const path = require('path')

const { APP_ENV, IS_DEV } = require('./constants')

const DOMAIN = 'https://starter.jackple.com'

// static resource domain（CDN）
const STATICDOMAIN = APP_ENV === 'prod' ? '.' : ''

module.exports = {
    // open http://localhost:devPort/
    devPort: 8080,
    // output html
    index: path.resolve(__dirname, `./../dist/${APP_ENV}/index.html`),
    assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
    assetsPublicPath: IS_DEV ? '/' : `${STATICDOMAIN}/`,
    assetsSubDirectory: 'static',
    // page Pattern for workbox
    pagePattern: new RegExp(DOMAIN),
    // id you use CDN, change it!!!
    assetsPattern: new RegExp(`${DOMAIN.replace(/\//g, '\\/')}\\/static`),
    // production sourceMap for monitoring
    sourceMap: APP_ENV === 'dev' ? 'eval-source-map' : APP_ENV === 'prod' ? 'source-map' : false,
    extractCss: APP_ENV !== 'dev',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
}
