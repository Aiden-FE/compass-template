import ora from 'ora'
import * as fs from "node:fs";
import path from 'node:path'
import download from 'download-git-repo'
import handlebars from 'handlebars'
import {CollectInfoOptions} from "../interface";
import {LoggerService} from "../services/logger.service";
import {TEMPLATE_REPLACE_FILES_PATH, TEMPLATE_REPO_BRANCH_MAPPING, TEMPLATE_REPO_ROOT} from "../config";

/**
 * @description 模板服务
 */
export class TemplateService {
  /**
   * @description 拉取模板
   * @param collectInfo
   */
  static async pull (collectInfo: CollectInfoOptions) {
    const loading = ora()
    loading.start(LoggerService.info('开始获取模板', false))
    await this.pullRepo(this.generateRepoUrl(collectInfo.target), collectInfo.replaceData.name, collectInfo.commandOptions.clone)
    loading.succeed(LoggerService.success('模板拉取成功', false))
    await this.replaceFilesVars(this.generateReplaceFilesPath(collectInfo.target, collectInfo.replaceData.name), collectInfo.replaceData)
    LoggerService.info(`\tcd ${collectInfo.replaceData.name}\n\tnpm install\n\tnpm start\n`)
  }
  
  /**
   * @description 替换文件内的匹配变量
   * @param filesPath
   * @param replaceData
   * @private
   */
  private static async replaceFilesVars (filesPath: string[], replaceData: CollectInfoOptions['replaceData']) {
    filesPath.forEach(filePath => {
      const file = fs.readFileSync(filePath, 'utf-8')
      const outputFile = handlebars.compile(file)(replaceData)
      fs.writeFileSync(filePath, outputFile)
    })
  }
  
  /**
   * @description 生成仓库路径
   * @param target
   * @private
   */
  private static generateRepoUrl (target: CollectInfoOptions['target']) {
    return `${TEMPLATE_REPO_ROOT}#${TEMPLATE_REPO_BRANCH_MAPPING[target]}`
  }
  
  /**
   * @description 生成待替换变量的文件路径
   * @param target
   * @private
   */
  private static generateReplaceFilesPath (target: CollectInfoOptions['target'], name: string) {
    const basePath = process.cwd()
    return (TEMPLATE_REPLACE_FILES_PATH[target] || []).map(filePath => path.join(basePath, name, filePath))
  }
  
  /**
   * @description 拉取指定仓库
   * @param repo
   * @param dest
   * @private
   */
  private static pullRepo (repo: string, dest: string, clone = false) {
    return new Promise((resolve, reject) => {
      if(fs.existsSync(dest)) {
        LoggerService.error(`路径下 ${dest} 已经存在`)
        reject(false)
      }
      download(repo, dest, { clone }, (error) => {
        if (error) {
          LoggerService.error(error?.message || '模板仓库拉取异常')
          reject(false)
        }
        resolve(true)
      })
    })
  }
}
