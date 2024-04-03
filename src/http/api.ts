import Telegram, {
  HttpTelegramResInterceptor,
  HttpTelegramErrorInterceptor,
  HttpTelegramReqInterceptor,
} from '@compass-aiden/telegram';
import { Logger } from '@/utils';

const defaultResInterceptor: HttpTelegramResInterceptor = (data, res) => {
  if (res.status >= 200 && res.status < 300) {
    return data;
  }
  throw new Error('请求异常');
};

const defaultErrorInterceptor: HttpTelegramErrorInterceptor = (error) => {
  throw new Error(`[${error.response?.status || 'Api Error'}]: ${error.message || error}`);
};

const defaultRequestInterceptor: HttpTelegramReqInterceptor = (req) => {
  if (req.customMeta?.debug) {
    Logger.info('Request debug:');
    Logger.log(req);
  }
  return req;
};

const Api = new Telegram({
  interceptors: {
    response: defaultResInterceptor,
    responseError: defaultErrorInterceptor,
  },
})
  .register('github', {
    baseURL: 'https://api.github.com',
    interceptors: {
      response: defaultResInterceptor,
      responseError: defaultErrorInterceptor,
      request: defaultRequestInterceptor,
    },
  })
  .register('npm', {
    baseURL: 'https://registry.npmjs.org',
    interceptors: {
      response: defaultResInterceptor,
      responseError: defaultErrorInterceptor,
    },
  });

export default Api;
