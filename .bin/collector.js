const inquirer = require('inquirer')
const { INQUIRE_TARGET_CHOICES } = require('./config')

/**
 * @description 交互式收集信息
 * @class
 */
const Collector = (function () {
  /**
   * @constructor
   */
  function Collector () {}

  Collector.prototype.inquireByCreate = function (
    name,
    options
  ) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'target',
        message: '请选择构建目标',
        choices: [...INQUIRE_TARGET_CHOICES],
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述',
        default: '',
      },
    ]).then(opts => ({
      target: opts.target,
      replaceData: {
        name: name,
        description: opts.description,
      },
      commandOptions: options.commandOptions,
    }))
  }

  Collector.prototype.inquireByUpdate = function () {
    return new Promise((resolve, reject) => {
      inquirer.prompt([{
        type: 'confirm',
        name: 'isUpdate',
        message: '是否立即更新',
        default: true,
      }]).then(({isUpdate}) => {
        if (!isUpdate) {
          return reject(false)
        }
        inquirer.prompt([{
          type: 'list',
          name: 'commandType',
          message: '请选择对应工具更新',
          choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' },
          ],
        }]).then(({commandType}) => resolve(commandType))
      })
    })
  }

  return Collector
}())

module.exports = Collector
