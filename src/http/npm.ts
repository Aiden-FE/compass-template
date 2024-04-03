import Api from './api';

export function getRepoInfoFromNpm(repoName: string) {
  return Api.chain().domain('npm').get('/:repoName').path('repoName', repoName).request();
}
