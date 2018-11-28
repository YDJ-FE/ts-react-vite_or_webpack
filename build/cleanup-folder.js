const fs = require('fs-extra')
const path = require('path')

const constants = require('./constants')
if (constants.APP_ENV !== 'dev') {
    fs.emptyDirSync(path.join(__dirname, `../dist/${constants.APP_ENV}`))
}
