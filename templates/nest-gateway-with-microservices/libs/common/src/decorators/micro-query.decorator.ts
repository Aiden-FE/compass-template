import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MicroQuery = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const req = ctx.switchToRpc().getData();
  const query = req?.query ?? {};
  if (data) {
    return query[data] as unknown;
  }
  return query as unknown;
});
