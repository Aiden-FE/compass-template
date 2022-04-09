import chalk from 'chalk'

/**
 * @description 日志服务
 */
export class LoggerService {
  static success (msg: string, print = true) {
    const text = chalk.green(msg)
    print && console.log(text)
    return text
  }
  static info (msg: string, print = true) {
    const text = chalk.cyan(msg)
    print && console.log(text)
    return text
  }
  static warning (msg: string, print = true) {
    const text = chalk.hex('#FFA500')(msg)
    print && console.log(text)
    return text
  }
  static error (msg: string, print = true, exit = true) {
    const text = chalk.red(msg)
    print && console.log(text)
    exit && process.exit(1)
    return text
  }
}
