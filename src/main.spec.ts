import { demo } from '@/main';

describe('Entry Test', () => {
  it('Test attr', async () => {
    expect(demo()).toEqual(true);
  });
});
