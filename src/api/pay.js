import request from '@/utils/request'

/**
 * Zhifubao pay
 */

export function pay(data) {
  return request({
    url: '/api/alipay',
    method: 'post',
    data
  })
}
