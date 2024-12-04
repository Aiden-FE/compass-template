import { Logger } from '@nestjs/common';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

export default function LoggerMiddleware(req: Request, resp: Response['raw'], next: (error?: Error | any) => void) {
  const startTime = Date.now();
  resp.once('close', () => {
    Logger.log(
      `${req.protocol.toLocaleUpperCase()}/${(req as any).httpVersion} ${req.method} ${req.ips?.join?.(',') || req.ip} ${
        req.url
      } +${Date.now() - startTime}ms`,
      'LoggerMiddleware',
    );
  });
  next();
}
