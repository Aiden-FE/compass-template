import { Command } from 'commander';
import { version, name as pkgName } from '../package.json'
import {CollectInfo} from "./collect-info";
import {getRepoVersions, LoggerService, TemplateService} from "./services";
import ora from "ora";
import { compareVersion } from "@compass-aiden/utils";
import inquirer from "inquirer";
import shell from 'shelljs'

const program = new Command();

program.command('create')
  .description('创建一个新的工程模板')
  .argument('<app-name>', 'Provide application name')
  .option('--clone', 'If true use git clone instead of an http download.' +
    'While this can be a bit slower,' +
    'it does allow private repositories to be used if the appropriate SSH keys are setup.',
    false
  )
  .action((appName, commandOptions) => {
    new CollectInfo(appName, commandOptions)
      .inquire()
      .then(options => TemplateService.pull(options))
      .catch(err => LoggerService.error(err?.message || err))
  })

program.command('update')
  .description('检查更新')
  .action(async () => {
    const loading = ora()
    loading.start(LoggerService.info('正在检查版本信息', false))
    const versions = await getRepoVersions('Aiden-FE', 'compass-cli')
    const lastVersion = versions?.[0]?.name
    if (!lastVersion || compareVersion(version, lastVersion) >= 0) {
      loading.succeed(LoggerService.success('当前已是最新版本', false))
      return
    }
    loading.warn(LoggerService.warning('发现新版本', false))
    inquirer.prompt([{
        type: 'confirm',
        name: 'isUpdate',
        message: '是否立即更新',
        default: true,
    }]).then(options => {
      if (!options.isUpdate) return
      inquirer.prompt([{
        type: 'list',
        name: 'commandType',
        message: '请选择对应工具更新',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' },
        ]
      }]).then(opts => {
        const loading = ora()
        loading.start(LoggerService.info('开始更新', false))
        switch (opts.commandType) {
          case "npm":
            shell.exec(`npm install -g ${pkgName}`)
            break
          case "yarn":
            shell.exec(`yarn global add ${pkgName}`)
            break
          case "pnpm":
            shell.exec(`pnpm add ${pkgName} --global`)
            break
          default:
            break
        }
        loading.succeed(LoggerService.success('更新结束', false))
      })
    })
  })

program.version(`v${version}`, '-v, --version')
  .description('脚手架工程')
  .usage('<command> [option]')
  .parse(process.argv)
