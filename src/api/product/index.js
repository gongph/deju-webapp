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

/**
 * 提交基本审核资料
 */

export function saveApplyInfo(data) {
  return request({
    url: '/api/application-infos',
    method: 'post',
    data
  })
}
