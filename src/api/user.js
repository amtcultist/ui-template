import request from '@/utils/request'
import devRequest from '@/utils/devRequest'
export function login(data) {
  return devRequest({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return devRequest({
    url: '/token',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function modifyAvatar(id, data) {
  return devRequest({
    url: `/user/avatar/${id}`,
    method: 'patch',
    data
  })
}
