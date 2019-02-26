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

/**
 * 检查支付情况，同一个用户支付一次后7天内免支付
 */
export function checkPay(query) {
  return request({
    url: '/api/application-infos/id-card/name/seven',
    method: 'get',
    params: query
  })
}
