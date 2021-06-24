import request from '@/utils/request';
import devRequest from '@/utils/devRequest';

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get',
  });
}

export function getRoles(params) {
  return devRequest({
    url: '/role',
    method: 'get',
    params: params,
  });
}

export function createRole(data) {
  return devRequest({
    url: '/role',
    method: 'post',
    data,
  });
}

export function updateRole(id, data) {
  return devRequest({
    url: `/role/${id}`,
    method: 'put',
    data,
  });
}

export function deleteRole(id) {
  return devRequest({
    url: `/role/${id}`,
    method: 'delete',
  });
}

export function findById(id) {
  return devRequest({
    url: `/role/${id}`,
    method: 'get',
  });
}

export function validateByName(name) {
  return devRequest({
    url: `/role/validate/name/${name}`,
    method: 'get',
  });
}
