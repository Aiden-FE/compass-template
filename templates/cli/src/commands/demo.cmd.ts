import { checkCliUpdate, Logger } from '@/utils';
import { Command } from 'commander';

/**
 * @description 检查Compass CLI是否存在新版本内容
 */
export default (program: Command) => {
  program
    .command('demo')
    .description('测试命令')
    .action(async () => {
      await checkCliUpdate();

      Logger.info('测试命令');
    });
};
