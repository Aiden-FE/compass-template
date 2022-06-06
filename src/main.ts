import { test } from '~/modules';

export * from './modules';

/**
 * @description demo
 */
export function demo() {
  console.log(`${test()}2`);
  return true;
}
