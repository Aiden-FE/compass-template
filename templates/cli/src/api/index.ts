export function getRepoInfoFromNpm(libName: string) {
  return fetch(`https://registry.npmjs.org/${libName}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res: any) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
      throw new Error(String(res.message) || '获取失败');
    });
}
