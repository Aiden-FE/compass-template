import { Api } from '@compass-aiden/utils'
export const ApiService = new Api()

export function getRepoVersions (user: string, repo: string): Promise<{name: string}[]> {
  return new Promise((resolve, reject) => {
    ApiService.get(`https://api.github.com/repos/${user}/${repo}/releases`)
      .config({
        headers: {
          accept: 'application/vnd.github.v3+json',
        }
      })
      .execution(
        (resp: any) => {
          resolve(resp.data)
        },
        (err: any) => reject(err)
      )
  })
}
