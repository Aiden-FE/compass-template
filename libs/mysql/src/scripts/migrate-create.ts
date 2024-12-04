import { join } from 'path';
import { Logger } from '@nestjs/common';
import { createFolder, createFileSync } from '@compass-aiden/helpers/dist/node.cjs';
import getMigrateMainTemplate from './templates';

/**
 * @example
 * // pnpm migrate:create <migration_name>
 */

async function main() {
  Logger.log(process.argv[2]);
  if (!process.argv[2] || !/^[a-z]+(_[a-z]+)*$/.test(process.argv[2])) {
    Logger.error('迁移名称错误,名称应该由小写字母组成,多个单词采用 _ 连接', 'Migration');
    process.exit(1);
  }

  const migrateName = `${Date.now()}_${process.argv[2]}`;

  const targetPath = join(__dirname, '..', 'migrations', migrateName);

  await createFolder(targetPath);

  createFileSync(join(targetPath, 'main.ts'), getMigrateMainTemplate({ dirname: targetPath, migrateName }));
  createFileSync(join(targetPath, 'main.sql'), '');
  createFileSync(join(targetPath, 'rollback.sql'), '');
  return targetPath;
}

main().then((targetPath) => {
  Logger.log(`Migration created successfully at ${targetPath}`, 'Migration');
  process.exit(0);
});
