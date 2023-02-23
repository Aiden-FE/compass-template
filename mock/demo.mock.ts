import type { MockHandler } from 'vite-plugin-mock-server';

export function wrapResponse (data: unknown) {
  return JSON.stringify({
    status: 200,
    result: data,
    message: '操作成功',
    details: '操作成功详情'
  })
}

export default (): MockHandler[] => [
  {
    pattern: '/api/users/{userId}',
    method: 'POST',
    handle: (req, res) => {
      res.setHeader('Content-Type', 'application/json;utf-8')
      res.end(wrapResponse({name: 'jxm', id: '0001'}), 'utf-8')
    }
  }
]
