import {MockHandler} from "vite-plugin-mock-server";

export default (): MockHandler[] => [
  {
    pattern: '/users/{userId}',
    method: 'POST',
    handle: (req, res) => {
      res.end({name: 'jxm', id: '0001'})
    }
  }
]
