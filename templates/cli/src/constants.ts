import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(filename);
const pkg = JSON.parse(readFileSync(resolve(currentDirname, '../package.json'), 'utf8'));

export const CLI_VERSION = pkg.version as string;

export const CLI_LIB_NAME = pkg.name as string;

export const CLI_BIN_NAME = Object.keys(pkg.bin as object)[0];
