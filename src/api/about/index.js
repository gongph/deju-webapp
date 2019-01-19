import request from '@/utils/request'

/**
 * 获取我的页面中关于部分内容
 */

export function getAbouts() {
    return request({
        url: '/api/abouts',
        method: 'get'
    })
}
