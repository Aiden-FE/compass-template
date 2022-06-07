#!/usr/bin/env node

const { Command } = require('commander')
const CollectInfo = require('./collect-info')
const pkg = require('../package.json');
const {Logger} = require('./utils')

const program = new Command();

program.command('create')
    .description('创建一个新的工程模板')
    .argument('<app-name>', 'Provide application name')
    .option(
        '--clone',
        'If true use git clone instead of an http download.'
        + 'While this can be a bit slower,'
        + 'it does allow private repositories to be used if the appropriate SSH keys are setup.',
        false,
    )
    .action((appName, commandOptions) => {
        new CollectInfo()
            .inquireByCreate(appName, commandOptions)
            .then((options) => Logger.info(options))
            .catch((err) => Logger.error(err?.message || err));
    });

program.command('update')
  .description('检查更新')
  .action(() => {

  })
program.version(`v${pkg.version}`, '-v, --version')
  .description('脚手架工程')
  .usage('<command> [option]')
  .parse(process.argv);
