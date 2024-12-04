import * as crypto from 'node:crypto';
import { importESM } from './common';

/** 生成不可逆数据 */
export function generateSHA256(data: string) {
  return crypto.createHash('sha256').update(`${data}_${process.env.APP_SALT_SECRET}`).digest('hex').toString();
}

/** 生成不可逆md5 */
export function generateMD5(data: string) {
  return crypto.createHash('md5').update(`${data}_${process.env.APP_SALT_SECRET}`).digest('hex').toString();
}

/**
 * 生成uuid
 * @param [size=36]
 */
export async function generateUUID(size?: number): Promise<string> {
  const { nanoid } = await importESM('nanoid');
  return nanoid(size);
}

/** 加密数据 */
export function encryptData(data: string) {
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(process.env.APP_PUBLIC_SECRET || '', buffer);
  return encrypted;
}

/** 解密数据 */
export function decryptData(encryptedData: string) {
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(process.env.APP_PRIVATE_SECRET || '', buffer);
  return decrypted.toString('utf8');
}
