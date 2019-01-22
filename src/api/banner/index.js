import request from '@/utils/request'

/**
 * 获取展示大图部分内容
 */

export function getBanners() {
    return request({
        url: '/api/banners',
        method: 'get'
    })
}
