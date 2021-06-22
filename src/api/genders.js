import devRequest from '@/utils/devRequest'

export function findAll() {
  return devRequest({
    url: '/gender',
    method: 'get'
  })
}
