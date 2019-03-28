import request from '@/utils/request'

/**
 * 获取我的工单
 */

export function getOrders() {
  return request({
    url: '/api/application-current-infos',
    method: 'get'
  })
}

/**
 * 我的工单，根据审核状态获取列表
 */

export function getCurOrders(query) {
  return request({
    url: '/api/v2/application-current-infos',
    method: 'get',
    params: query
  })
}
