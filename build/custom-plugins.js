const clearConsole = require('react-dev-utils/clearConsole')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

const compilerHooks = [
    {
        apply: compiler => {
            compiler.hooks.invalid.tap('invalid', function () {
                console.log('Compiling...')
            })
            compiler.hooks.done.tap('done', function (stats) {
                const rawMessages = stats.toJson({ all: false, warnings: true, errors: true })
                const messages = formatWebpackMessages({
                    errors: rawMessages.errors.map(e => e.message),
                    warnings: rawMessages.warnings.map(e => e.message)
                })
                if (!messages.errors.length && !messages.warnings.length) {
                    clearConsole()
                }
                if (messages.errors.length) {
                    console.log('Failed to compile.')
                    messages.errors.forEach(e => console.log(e))
                    return
                }
                if (messages.warnings.length) {
                    console.log('Compiled with warnings.')
                    messages.warnings.forEach(w => console.log(w))
                }
            })
        }
    }
]

module.exports = { compilerHooks }
