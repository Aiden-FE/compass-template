import { VERSION, printLog } from '@/common-utils';

describe('common-utils', () => {
  it('should print log', () => {
    printLog('test');
    expect(VERSION).toBeDefined();
  });
});
