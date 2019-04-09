import request from '@/utils/request'

/**
 * Fetch product list
 */

export function getList() {
  return request({
    url: '/api/v3/products',
    method: 'get'
  })
}

/**
 * 根据 id 获取当前产品
 */
export function getProductById(id) {
  return request({
    url: `/api/v3/products/${id}`,
    method: 'get'
  })
}

/**
 * 提交基本审核资料
 */

export function saveApplyInfo(data, method = "post") {
  return request({
    url: '/api/v3/application-infos',
    method,
    data
  })
}

/**
 * 根据 id 获取申请信息
 */
export function getApplyInfoById(id) {
  return request({
    url: `/api/v3/application-infos/${id}`,
    method: 'get'
  })
}

/**
 * 提交详细资料
 */

export function savePersonInfo(data, method = 'POST') {
  return request({
    url: '/api/v3/personal-informations',
    method,
    data
  })
}

/**
 * 根据 id 获取客户信息
 */

export function getPersonalInfoById(id) {
  return request({
    url: `/api/v3/personal-informations/${id}`,
    method: 'get'
  })
}
