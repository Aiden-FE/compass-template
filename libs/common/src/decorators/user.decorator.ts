import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { get } from 'lodash';

const User = createParamDecorator((key: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!key) {
    return request.user;
  }
  return get(request.user, key);
});

export default User;
