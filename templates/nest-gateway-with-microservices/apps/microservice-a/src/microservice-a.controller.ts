import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  Auth,
  HttpResponse,
  NoAuth,
  PERMISSIONS,
  HttpResponseException,
  BusinessStatus,
  MicroQuery,
} from '@app/common';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class MicroserviceAController {
  constructor(private readonly jwtService: JwtService) {}

  @SkipThrottle()
  @NoAuth()
  @MessagePattern({ cmd: 'GET:/health' })
  health() {
    return new HttpResponse({
      data: 'ok',
      responseType: 'raw',
    });
  }

  @Auth(PERMISSIONS.A_TEST)
  @MessagePattern({ cmd: 'GET:/auth' })
  auth() {
    return new HttpResponse({
      data: '需要权限的场景测试',
    });
  }

  @NoAuth()
  @MessagePattern({ cmd: 'GET:/no-auth' })
  noAuth() {
    return new HttpResponse({
      data: '无需权限的场景测试',
    });
  }

  /** 未指定权限,但是也会要求存在用户信息方可访问 */
  @MessagePattern({ cmd: 'GET:/error' })
  error() {
    throw new HttpResponseException({
      statusCode: BusinessStatus.FORBIDDEN,
      message: '测试错误抛出',
      data: {
        test: 'Hello world.',
      },
      httpStatus: HttpStatus.FORBIDDEN,
    });
  }

  /** 生成 token 示例 */
  @NoAuth()
  @MessagePattern({ cmd: 'GET:/generate-token' })
  generateToken(@MicroQuery() query: object) {
    const token = this.jwtService.sign(query, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      secret: process.env.JWT_SECRET,
    });
    return new HttpResponse({
      data: {
        token,
        ...query,
      },
    });
  }
}
