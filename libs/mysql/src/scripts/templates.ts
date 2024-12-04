export default function getMigrateMainTemplate(params: { dirname: string; migrateName: string }) {
  return `import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Logger } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

const MIGRATE_NAME = '${params.migrateName}';

function getConnection() {
  return createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_HOST ? Number(process.env.MYSQL_PORT) : undefined,
    user: process.env.MYSQL_HOST,
    password: process.env.MYSQL_HOST,
    database: process.env.MYSQL_HOST,
    multipleStatements: true, // 允许多语句,以便读取sql文件执行
  });
}

export async function main(): Promise<1 | -1> {
  const connection = await getConnection();
  const [result] = await connection.query(\`SELECT id, name FROM migrations WHERE name = '\${MIGRATE_NAME}' LIMIT 1\`);

  if (result[0]) {
    await connection.end();
    Logger.log(\`已执行过 \${MIGRATE_NAME} 的迁移任务\`);
    return -1;
  } else {
    await connection.query(readFileSync(join(__dirname, './main.sql'), { encoding: 'utf-8' }));
    await connection.query(\`INSERT INTO migrations (name) VALUES ('\${MIGRATE_NAME}')\`);
    await connection.end();
    Logger.log(\`\${MIGRATE_NAME} 的迁移任务执行完成\`);
    return 1;
  }
}

export async function rollback(): Promise<1 | -1> {
  const connection = await getConnection();
  const [result] = await connection.query(\`SELECT id, name FROM migrations WHERE name = '\${MIGRATE_NAME}' LIMIT 1\`);

  if (result[0]) {
    await connection.query(readFileSync(join(__dirname, './rollback.sql'), { encoding: 'utf-8' }));
    await connection.query("DELETE FROM migrations WHERE \`name\` = '\${MIGRATE_NAME}'");
    await connection.end();
    Logger.log(\`\${MIGRATE_NAME} 的回滚任务执行完成\`);
    return 1;
  } else {
    await connection.end();
    Logger.log(\`\${MIGRATE_NAME} 的迁移任务已回滚或不存在\`);
    return -1;
  }
}
`;
}
