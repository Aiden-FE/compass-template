import type { FastifyRequest as FastifyRequestType } from 'fastify';
import type { UserContext } from '@app/common';

declare module 'fastify' {
  export interface FastifyRequest extends FastifyRequestType {
    user: UserContext;
  }
}
