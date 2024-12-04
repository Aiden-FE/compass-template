import { Logger } from '@compass-aiden/helpers';
import { isFileOrFolderExists } from '@compass-aiden/helpers/dist/node.cjs';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

async function main() {
  const dirpath = join(__dirname, '../migrations');

  if (!isFileOrFolderExists(dirpath)) {
    Logger.warn('不存在迁移任务');
    return;
  }

  const dirs = readdirSync(dirpath)
    .filter((result) => {
      const stat = statSync(join(dirpath, result));
      return stat.isDirectory();
    })
    .sort((a, b) => {
      const timeA = Number(a.split('_')[0]);
      const timeB = Number(b.split('_')[0]);
      return timeB - timeA;
    });

  for (const dir of dirs) {
    const { rollback } = await import(join(dirpath, dir, 'main.ts'));
    await rollback();
  }
}

main();
