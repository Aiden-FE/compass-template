import {test, test2} from './test'

describe('Test', () => {
  it('Test 1', async () => {
    expect(test()).toEqual('test');
  });
});

describe('Test2', () => {
  it('Test 2', async () => {
    expect(test2()).toEqual('test2');
  });
});
