const yargs = require('yargs')
const openBrowser = require('react-dev-utils/openBrowser')
const clearConsole = require('react-dev-utils/clearConsole')

const { port } = yargs.argv

const compilerHooks = [
    {
        apply: compiler => {
            compiler.hooks.afterPlugins.tap('after-plugins', () => {
                openBrowser(`http://localhost:${port}`)
            })
            compiler.hooks.done.tap('BuildStatsPlugin', () => {
                clearConsole()
            })
        }
    }
]

module.exports = { compilerHooks }
