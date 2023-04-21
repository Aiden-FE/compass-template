import { demo, demo2 } from '@/main';

describe('Entry Test', () => {
  it('Test attr', async () => {
    expect(demo()).toEqual('demo');
    expect(demo2()).toEqual('demo2');
  });
});
