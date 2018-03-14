#!/usr/bin/env node

/**
 * Command line tool
 * @date 2017-03-07 17:21:25
 * @author Allenice
 * @link http://www.allenice233.com
 */

'use strict'

var fs = require('fs-plus')
var path = require('path')
var yargs = require('yargs')
var generate = require('./tpl/generate')

yargs.command(['add <componentName>', 'a'], 'Add a component to project', {
    type: {
      alias: 't',
      describe: 'The component type',
      choices: ['view', 'component'],
      default: 'view'
    },
    help: {
      alias: 'h'
    }
  }, function (args) {
    let componentPath = args.componentName
    let componentName = componentPath.substr(componentPath.lastIndexOf('/') + 1)
    let ComponentName = componentName[0].toLocaleUpperCase() + componentName.substr(1)

    args.type += 's'
    componentPath = path.join(__dirname, '../src', args.type, componentPath)
    generate(args.type, componentPath, {
      componentName: componentName,
      ComponentName: ComponentName,
      componentNameLower: componentName.toLocaleLowerCase()
    })
  })
  // .version(function () {
  //   return require('../package.json').version
  // })
  .alias('version', 'v')
  .help()
  .argv
