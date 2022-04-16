import Http from './http';

export function getUserInfoById(userId: number) {
  return Http.post(`/api/users/${userId}`);
}

export function getUsers() {
  return Http.get('users');
}
