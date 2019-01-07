import request from '@/utils/request'

/**
 * Zhifubao pay
 */

export function pay() {
  return request({
    url: '/api/test',
    method: 'post'
  })
}