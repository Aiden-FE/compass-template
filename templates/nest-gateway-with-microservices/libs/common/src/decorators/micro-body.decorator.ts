import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MicroBody = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const req = ctx.switchToRpc().getData();
  const body = req?.body ?? {};
  if (data) {
    return body[data] as unknown;
  }
  return body as unknown;
});
