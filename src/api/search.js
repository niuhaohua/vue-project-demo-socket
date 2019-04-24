import request from '@/utils/request'

/**
 * 企业查询页面获取企业列表
 * @param {*} query
 */
export function listGetListAPI(query) {
  return request({
    url: '/ticket/company/search',
    method: 'GET',
    params: query
  })
}

/**
 * 企业图谱页面获取交易企业列表
 * @param {*} query
 */
export function chartsGetListAPI(query) {
  return request({
    url: '/ticket/trade/search',
    method: 'GET',
    params: query
  })
}
