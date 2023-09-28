import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export default class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: FastifyRequest): Promise<string> {
    return new Promise<string>((resolve) => {
      if (req.ips?.length) {
        resolve(req.ips[0]?.trim() || req.ip);
      } else {
        resolve(req.ip);
      }
    });
  }
}
