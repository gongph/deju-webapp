import request from '@/utils/request'

/**
 * 获取展示大图部分内容
 */

export function getMinioToken() {
    return request({
        url: '/api/minio/token',
        method: 'get'
    })
}
