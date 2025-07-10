import { SetMetadata } from '@nestjs/common';
import { NO_LOG_METADATA_KEY } from '../constants';

export function NoLog(): MethodDecorator & ClassDecorator {
  return SetMetadata(NO_LOG_METADATA_KEY, true);
}
