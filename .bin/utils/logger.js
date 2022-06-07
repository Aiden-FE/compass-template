const chalk  = require('chalk')

const Logger = /** @class */ (function () {
  /**
   *
   * @param {{debug?: boolean}} [options]
   * @constructor
   */
  function Logger(options) {
    /**
     * @private
     * @type {boolean}
     */
    this.debugMode = options?.debug || false;
  }

  /**
   * @description 仅在debug模式下打印信息
   * @param {string} msg 待输出的信息
   * @public
   */
  Logger.prototype.debug = function (msg) {
    if (!this.debugMode) return
    const text = chalk.greenBright(msg);
    console.info(text);
  }

  /**
   * @description 输出普通信息
   * @param {string} msg 待输出的信息
   * @param {boolean} print 是否在终端打印信息
   * @return {string}
   */
  Logger.prototype.info = (msg, print = true) => {
    const text = chalk.cyan(msg);
    if (print) {
      console.info(text);
    }
    return text;
  }
  Logger.info = Logger.prototype.info

  /**
   * @description 输出警告信息
   * @param {string} msg 待输出的信息
   * @param {boolean} print 是否在终端打印信息
   * @return {string}
   */
  Logger.prototype.warn = (msg, print = true) => {
    const text = chalk.yellow(msg);
    if (print) {
      console.info(text);
    }
    return text;
  }
  Logger.warn = Logger.prototype.warn

  /**
   * @description 输出错误信息
   * @param {string} msg 待输出的信息
   * @param {boolean} print 是否在终端打印信息
   * @param {boolean} exit 是否退出程序
   * @return {string}
   * @static
   */
  Logger.prototype.error = (msg, print = true, exit = false) => {
    const text = chalk.red(msg);
    if (print) {
      console.info(text);
    }
    if (exit) {
      process.exit(1);
    }
    return text;
  }
  Logger.error = Logger.prototype.error

  return Logger;
}());

module.exports = Logger
