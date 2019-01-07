import request from '@/utils/request'

/**
 * Fetch product list
 */

export function getList() {
  return request({
    url: '/api/products',
    method: 'get'
  })
}
