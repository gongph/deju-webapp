import request from '@/utils/request'

/**
 * 支付
 */

export function pay(data) {
  const alipay = '/api/alipay',
         wxpay = '/api/wxpay'
  return request({
    url: data.paymentMethod === 'ALIPAY' ? alipay : wxpay,
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
