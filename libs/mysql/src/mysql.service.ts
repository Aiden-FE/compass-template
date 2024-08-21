import { Injectable, Logger, OnModuleInit, INestApplication } from '@nestjs/common';
import { Pool, createPool, PoolOptions, PoolConnection } from 'mysql2/promise';

@Injectable()
export class MysqlService implements OnModuleInit {
  public client: Pool;

  constructor(private options: PoolOptions) {}

  async onModuleInit() {
    this.client = createPool(this.options);
    Logger.log('Connected to MySQL database successfully', 'MySQLClient');
  }

  async enableShutdownHooks(app: INestApplication) {
    if (this.client) {
      try {
        await this.client.end();
        Logger.log('Disconnected MySQL database successfully', 'MySQLClient');
      } catch (e) {
        Logger.warn(e, 'MySQLClient');
      }
    }
    await app.close();
  }

  /**
   * @description 使用事务
   * @param callback
   * @example
   * const res = await transaction(async (connection) => {
   *   const [result] = await connection.query('SELECT * FROM `demo`');
   *   return result;
   * });
   * console.log('Response: ', res);
   */
  async transaction<Result = any>(callback: (connection: PoolConnection) => Promise<Result>) {
    const connection = await this.client.getConnection();
    let result: any;
    try {
      await connection.beginTransaction();
      result = await callback(connection);
      await connection.commit();
    } catch (e) {
      await connection.rollback();
      Logger.warn('发生错误,已回滚事务', 'MySQLClient');
      throw e;
    } finally {
      connection.release();
    }
    return result as Result;
  }
}
