import { useI18n } from 'vue-i18n';
import { useContextStore } from '@/stores';
import RequestSuccessCallbackResult = UniNamespace.RequestSuccessCallbackResult;

export function addRequestInterceptor() {
  uni.addInterceptor('request', {
    invoke(req) {
      const { getContext } = useContextStore();
      const token = getContext('token', '');

      if (!req.header) req.header = {};
      // 统一追加鉴权参数
      if (token) {
        req.header.Authorization = token.startsWith('bearer') ? token : `bearer ${token}`;
      }
    },
  });
}

export function addResponseInterceptor() {
  uni.addInterceptor('request', {
    returnValue: (respPromise: Promise<RequestSuccessCallbackResult>) =>
      respPromise.then((resp) => {
        if (resp.statusCode >= 200 && resp.statusCode < 300) {
          return resp.data;
        }
        const { t } = useI18n();
        // 发生请求级异常
        uni.showToast({
          title: resp.errMsg || t('Request failed'),
          icon: 'error',
          duration: 3000,
        });
        throw new Error(resp.errMsg || t('Request failed'));
      }),
  });
}
