import { Command } from 'commander';
import { version } from '../package.json'
import {CollectInfo} from "~/collect-info";
import {LoggerService, TemplateService} from "~/services";

const program = new Command();

program.command('create')
  .description('创建工程模板')
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

program.version(`v${version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv);
