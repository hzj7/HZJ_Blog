import http from '../config.js'

const base = '/posts'

// 获取多个博客
function getAllPosts(params) {
    return http('get', base + '/', params)
}

// 获取博客详情
function getPost(params) {
    return http('get', base + '/' + params.id, params)
}

// 获取博客详情
function deletePost(id) {
    return http('delete', base + '/' + id)
}

// 新增博客
function addPost(params) {
    return http('post', base + '/', params)
}

// 修改博客
function editPost(id, params) {
    return http('put', base + '/' + id, params)
}

export {
    getAllPosts,
    getPost,
    deletePost,
    addPost,
    editPost
}