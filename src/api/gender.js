import devRequest from '@/utils/devRequest';

export function findAll(params) {
  return devRequest({
    url: '/gender',
    method: 'get',
    params: params,
  });
}

export function create(data) {
  return devRequest({
    url: '/gender',
    method: 'post',
    data,
  });
}

export function validateByName(name) {
  return devRequest({
    url: `/gender/validate/name/${name}`,
    method: 'get',
  });
}

export function deleteGender(id) {
  return devRequest({
    url: `/gender/${id}`,
    method: 'delete',
  });
}

export function findById(id) {
  return devRequest({
    url: `/gender/${id}`,
    method: 'get',
  });
}

export function update(id, data) {
  return devRequest({
    url: `/gender/${id}`,
    method: 'put',
    data,
  });
}
