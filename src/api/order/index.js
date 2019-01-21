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
