import request from '@/utils/request'

/**
 * 获取我的工单
 */

export function getOrders() {
  return request({
    url: '/api/v3/application-current-infos',
    method: 'get'
  })
}

/**
 * 我的工单，根据审核状态获取列表
 */

export function getCurOrders(query) {
  return request({
    url: '/api/v3/v2/application-current-infos',
    method: 'get',
    params: query
  })
}
