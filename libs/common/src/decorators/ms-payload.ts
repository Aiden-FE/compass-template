import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { get } from 'lodash';
import { MicroServiceRequest } from '@app/common';

// 获取微服务请求负载
const MSPayload = createParamDecorator<
  keyof MicroServiceRequest | string | (keyof MicroServiceRequest | string)[] | undefined
>((key, ctx: ExecutionContext) => {
  const rpcData = ctx.switchToRpc().getData();
  if (!key) {
    return rpcData;
  }
  return get(rpcData, key);
});

export default MSPayload;
