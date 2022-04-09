import inquirer from 'inquirer'
import {CollectInfoOptions} from "~/interface";

export class CollectInfo {
  constructor(
    private appName: string,
    private commandOptions: CollectInfoOptions['commandOptions']
  ) {}
  
  public inquire (): Promise<CollectInfoOptions> {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'target',
        message: '请选择构建目标',
        choices: [
          { name: 'style lib', value: 'styles', description: '样式包构建工程' },
          { name: 'script lib', value: 'utils', description: '通用 ES or CommonJs包构建工程' },
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述',
        default: ''
      }
    ]).then(options => {
      return {
        target: options.target,
        replaceData: {
          name: this.appName,
          description: options.description
        },
        commandOptions: this.commandOptions
      }
    })
  }
}
