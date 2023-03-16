import { translate } from './i18n';
import { setupConfig } from "./config";

describe('测试翻译功能', () => {
  setupConfig({
    locale: {
      test: 'test info',
      test2: 'test {{info}}',
      test3: 'test {{ info }}',
      test4: 'test {{     info            }} test',
      common: {
        error: '错误: {{ msg }}',
      },
    }
  })
  it('取值展示', () => {
    expect(translate('test')).toEqual('test info');
  });
  it('插值展示', () => {
    expect(translate('test2', { info: 'hello world' })).toEqual('test hello world');
  });
  it('插值前后空格展示', () => {
    expect(translate('test3', { info: 'hello world' })).toEqual('test hello world');
  });
  it('插值前后空白符展示', () => {
    expect(translate('test4', { msg: 'hello world' })).toEqual('test hello world test');
  });
  it('嵌套取值插值展示', () => {
    expect(translate('common.error', { info: 'hello world' })).toEqual('错误: hello world');
  });
  it('取不存在的key', () => {
    expect(translate('common.empty', { info: 'hello world' })).toEqual('错误: common.empty');
  });
});
