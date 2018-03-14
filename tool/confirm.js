/**
 * confirm
 * @date 2017-03-07 17:01:16
 * @author Allenice
 * @link http://www.allenice233.com
 */

'use strict'

let prompt = require('prompt')
let colors = require('colors')

module.exports = function (msg, callback) {
  prompt.start()

  prompt.get({
    properties: {
      confirm: {
        description: colors.red(msg),
        message: 'Type yes/no',
        // allow yes, no, y, n, YES, NO, Y, N as answer
        pattern: /^(yes|no|y|n)$/gi,
        required: true,
        default: 'yes'
      }
    }
  }, (err, result) => {
    if (err) {
      console.log(err)
      return callback(false)
    }
    // transform to lower case
    let c = result.confirm.toLowerCase()
    // yes or y typed ? otherwise abort
    if (c !== 'y' && c !== 'yes') {
      callback(false)
      return
    }

    // your code
    callback(true)
  })
}
