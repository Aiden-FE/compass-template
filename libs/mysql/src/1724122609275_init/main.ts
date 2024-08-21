import { createConnection } from 'mysql2/promise';
import process from 'node:process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Logger } from '@nestjs/common';
import { getEnvConfig } from '@app/common';

// 迁移: npx ts-node -r tsconfig-paths/register libs/mysql/src/1724122609275_init/main.ts
// 回滚: npx ts-node -r tsconfig-paths/register libs/mysql/src/1724122609275_init/main.ts --rollback

// 检查 --rollback 参数是否存在
const hasRollback = process.argv.includes('--rollback');

const host = getEnvConfig('MYSQL_HOST');
const user = getEnvConfig('MYSQL_USER');
const password = getEnvConfig('MYSQL_PASSWORD');
const database = getEnvConfig('MYSQL_DATABASE');

async function main() {
  const connection = await createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true, // 允许多语句,以便读取sql文件执行
  });

  try {
    const [result] = await connection.query(`SELECT id, version as v FROM migrations WHERE version = '0.0.1' LIMIT 1`);

    if (result[0]) {
      await connection.end();
      Logger.log('已执行过0.0.1的迁移任务');
      return;
    }
  } catch (e) {
    Logger.log(e);
  }

  await connection.query(readFileSync(join(__dirname, './main.sql'), { encoding: 'utf-8' }));
  await connection.end();
  Logger.log('0.0.1的迁移任务执行完成');
}

async function rollback() {
  const connection = await createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true, // 允许多语句,以便读取sql文件执行
  });

  await connection.query(readFileSync(join(__dirname, './rollback.sql'), { encoding: 'utf-8' }));
  await connection.end();
  Logger.log('rollback');
}

if (hasRollback) {
  rollback();
} else {
  main();
}
