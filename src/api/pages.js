import request from '@/utils/request'

export function getPagesAPI(query) {
  return request({
    url: '/ticket/company/count',
    method: 'GET',
    params: query
  })
}
