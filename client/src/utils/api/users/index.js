import http from '../config.js'

const base = '/users'

// 注册
function register(params) {
    return http('post', base + '/register', params)
}

// 登陆
function login(params) {
    return http('post', base + '/login', params)
}

// 退出
function logout(params) {
    return http('post', base + '/logout', params)
}

export {
    register,
    login,
    logout
}