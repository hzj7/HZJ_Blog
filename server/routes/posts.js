const express = require('express');
const PostsModel = require("../mongo/models/postsModel");
const apiJSON = require("../utils/jsonCreator");
const UserModel = require("../mongo/models/userModel");
const router = express.Router();
const checkTokenMiddleware = require('../mongo/middlewares/checkTokenMiddleware')

let { successJSON, errorJSON, notAuthenticatedJSON } = apiJSON()

// 获取全部博客
router.get('/', function (req, res, next) {
    const category = req?.query?.category
    // 判断是否有分类筛选
    if (category) {
        PostsModel.find({ category }, function (err, data) {
            if (err) {
                res.json(errorJSON('获取失败'))
            } else {
                res.json(successJSON('获取成功', data))
            }
        })
    } else {
        PostsModel.find(function (err, data) {
            if (err) {
                res.json(errorJSON('获取失败'))
            } else {
                res.json(successJSON('获取成功', data))
            }
        })
    }
});

// 获取单个博客
router.get('/:id', function (req, res, next) {
    PostsModel.findById(req.params.id, function (err, post) {
        if (err) {
            res.json(errorJSON('获取失败'))
        } else {
            UserModel.findById(post.uid, function (err, user) {
                if (err) {
                    res.json(errorJSON('获取失败'))
                } else {
                    res.json(successJSON('获取成功', { post: post, author: user }))
                }
            })
        }
    })
});

// 新增单个博客
router.post('/', checkTokenMiddleware, function (req, res, next) {
    PostsModel.create({
        uid: req.user._id,
        ...req.body
    }, function (err, data) {
        if (err) {
            return res.json(notAuthenticatedJSON('登陆已过期'))
        }
        return res.json(successJSON('新增成功', data))
    })
});

// 删除单个博客
router.delete('/:id', checkTokenMiddleware, function (req, res, next) {
    PostsModel.deleteOne({ $and: [{ uid: req.user._id }, { _id: req.params.id }] }, function (err, data) {
        if (err) return res.json(notAuthenticatedJSON('权限不足'))
        if (data.deletedCount === 0) {
            return res.json(errorJSON('删除失败', data))
        }
        return res.json(successJSON('删除成功', data))
    })
});

// 更新单个博客
router.put('/:id', checkTokenMiddleware, function (req, res, next) {
    PostsModel.updateOne({ _id: req.body._id }, {
        uid: req.user._id,
        ...req.body
    }, function (err, data) {
        if (err) {
            return res.json(notAuthenticatedJSON('登陆已过期'))
        }
        return res.json(successJSON('修改成功', data))
    })
});

module.exports = router;
