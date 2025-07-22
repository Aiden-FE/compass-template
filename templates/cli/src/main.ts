import { Command } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import { Logger } from './utils';
import { CLI_VERSION } from './constants';
import * as allCommands from './commands';

export default () => {
  const program = new Command();

  Object.keys(allCommands).forEach((key) => (allCommands as Record<string, (program: Command) => void>)[key](program));

  program
    .version(`v${CLI_VERSION}`, '-v, --version')
    .description('Command line interfaces')
    .usage('<command> [option]')
    .on('--help', () => {
      Logger.info(`\r\n${figlet.textSync('CLI Template')}`);
      // 新增说明信息
      Logger.log(`\r\nRun ${chalk.cyan(`cli <command> --help`)} show details\r\n`);
    })
    .parse(process.argv);
};
