import http from '../config.js'

const base = '/files'

// 注册
function uploadFile(params) {
    return http('post', base + '/uploadFile', params)
}

export {
    uploadFile
}