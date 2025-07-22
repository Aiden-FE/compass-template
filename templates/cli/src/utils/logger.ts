import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

export default class Logger {
  static log(...args: unknown[]): void {
    console.log(...args);
  }

  static info(...args: unknown[]): void {
    console.info(...args.map((arg) => chalk.cyan(arg)));
  }

  static success(...args: unknown[]): void {
    console.log(...args.map((arg) => chalk.green(arg)));
  }

  static warn(...args: unknown[]): void {
    console.warn(...args.map((arg) => chalk.yellow(arg)));
  }

  static error(...args: unknown[]): void {
    console.error(...args.map((arg) => chalk.red(arg)));
  }

  static createLoading() {
    return createSpinner();
  }
}
