import * as path from 'path';
import * as process from 'process';

export { default as validateMultipleDto } from './validate-mutiple-dto';

export function resolve(...pathStr: string[]) {
  return path.join(process.cwd(), ...pathStr);
}
