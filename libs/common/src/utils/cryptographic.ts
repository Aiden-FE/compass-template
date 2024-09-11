import { hmac as HMAC } from 'node-forge';
import { getEnvConfig } from '@app/common';
import { importESM } from './common';

/** 不可逆数据加密 */
export function encodeHMAC(msg: string, secret = getEnvConfig('APP_PRIVATE_SECRET')) {
  const hmac = HMAC.create();
  hmac.start('sha1', secret);
  hmac.update(msg);
  hmac.update('806728901e95e380'); // 再次加盐,防止密钥丢失后破译隐私数据
  return hmac.digest().toHex();
}

/**
 * 生成uuid
 * @param [size=36]
 */
export async function generateUUID(size?: number) {
  const { nanoid } = await importESM('nanoid');
  return nanoid(size);
}
