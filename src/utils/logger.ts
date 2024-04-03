import chalk from 'chalk';
import ora from 'ora';

export default class Logger {
  static log(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(...args);
  }

  static info(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.info(...args.map((arg) => chalk.cyan(arg)));
  }

  static success(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(...args.map((arg) => chalk.green(arg)));
  }

  static warn(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.warn(...args.map((arg) => chalk.yellow(arg)));
  }

  static error(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.error(...args.map((arg) => chalk.red(arg)));
  }

  static createLoading() {
    return ora();
  }
}
