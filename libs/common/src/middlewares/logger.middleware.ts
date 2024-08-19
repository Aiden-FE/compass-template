import { Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

export default class LoggerMiddleware implements NestMiddleware<Request, Response> {
  // eslint-disable-next-line class-methods-use-this
  use(req, resp, next) {
    const startTime = Date.now();
    resp.once('close', () => {
      const params = req.params && JSON.stringify(req.params) !== '{}' ? `\tParams: ${JSON.stringify(req.params)}` : '';
      const query = req.query && JSON.stringify(req.query) !== '{}' ? `\tQuery: ${JSON.stringify(req.query)}` : '';
      const body = req.body && JSON.stringify(req.body) !== '{}' ? `\tBody: ${JSON.stringify(req.body)}` : '';
      Logger.log(
        `${req.protocol.toLocaleUpperCase()}/${req.httpVersion} ${req.method} ${req.ips?.join?.(',') || req.ip} ${
          req.url
        }\t${params}${query}${body} +${Date.now() - startTime}ms`,
        'LoggerMiddleware',
      );
    });
    next();
  }
}
