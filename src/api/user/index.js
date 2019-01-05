import request from '@/utils/request'

/**
 * Reset password
 */

export function resetPwd(data) {
  return request({
    url: '/api/account/change-password',
    method: 'post',
    data
  })
}

/**
 * Update user data
 */

export function updateUserData(data) {
  return request({
    url: '/api/account',
    method: 'post',
    data
  })
}
