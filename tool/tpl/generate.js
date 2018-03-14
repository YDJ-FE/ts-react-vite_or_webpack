/**
 * Generate component files
 * @date 2017-03-07 17:21:25
 * @author Allenice
 * @link http://www.allenice233.com
 */

'use strict'

let fs = require('fs-plus')
let path = require('path')
let colors = require('colors')
let confirm = require('../confirm')

function compile(tplFile, data) {
  let conent = fs.readFileSync(tplFile, 'utf8')

  return conent.replace(/\${(\w+)}/gi, function (match, name) {
    return data[name] ? data[name] : ''
  })
}

function fillZero(num) {
  if (num < 10) {
    return '0' + num
  }

  return num
}

function dateFormat(date) {
  let year = date.getFullYear()
  let month = fillZero(date.getMonth() + 1)
  let day = fillZero(date.getDate())
  let hour = fillZero(date.getHours())
  let min = fillZero(date.getMinutes())
  let sec = fillZero(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

function writeFiles(componentType, distPath, data) {
  let tplPath = path.join(__dirname, './component')

  fs.readdir(tplPath, 'utf8', (err, files) => {
    if (err) {
      console.log(colors.red(err))
      return false
    }

    files.forEach((filename) => {
      let content = compile(path.join(tplPath, filename), data)
      let distFileName = filename.slice(0, filename.lastIndexOf('.'))
      // if (filename.indexOf('index') >= 0) {
      //   distFileName = 'index.tsx'
      // }

      let filePath = path.join(distPath, distFileName)

      console.log(colors.green('write file: '))
      console.log(colors.underline(filePath))
      fs.writeFileSync(filePath, content, 'utf8')
    })

    console.log(colors.green(`${componentType}: ${data.componentName} is generated.`))
  })
}

module.exports = function (componentType, distPath, data) {
  data.curDate = dateFormat(new Date())

  let _checkFile = path.join(distPath, 'index.ts')
  if (fs.existsSync(_checkFile)) {
    confirm(`The ${componentType} ${data.componentName} is exist. Do your want to override it?`, (flag) => {
      if (flag) {
        writeFiles(componentType, distPath, data)
      }
    })
  } else {
    writeFiles(componentType, distPath, data)
  }
}
