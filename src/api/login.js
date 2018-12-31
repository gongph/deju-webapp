import request from '@/utils/request'

export function loginByUserName(data) {
  return request({
    url: '/api/authenticate',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/account',
    method: 'get'
  })
}