const path = require('path')
const fsExtra = require('fs-extra')

const dllPath = path.join(__dirname, `./../dll`)
fsExtra.emptyDirSync(dllPath)
