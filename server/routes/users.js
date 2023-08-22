const express = require('express');
const UserModel = require("../mongo/models/userModel");
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../mongo/config/config')
const apiJSON = require("../utils/jsonCreator");
let { successJSON, errorJSON, notAuthenticatedJSON } = apiJSON()

// 登陆
router.post('/login', function (req, res, next) {
    let { username, password } = req.body;
    UserModel.find({ $and: [{ username: username }, { password: md5(password) }] }, (err, data) => {
        // 报错
        if (err) {
            return res.json(err)
        }
        // 判定用户是否存在
        if (data.length === 1) {
            //创建当前用户的 token
            let token = jwt.sign({
                username: data[0].username,
                _id: data[0]._id
            }, JWT_SECRET_KEY, {
                expiresIn: 60 * 60 * 24 * 7
            });
            res.cookie("access_token", token)
            return res.json(successJSON("登陆成功!", data[0]))
        } else {
            return res.json(errorJSON("用户名或密码错误"))
        }
    })
})

// 注册
router.post('/register', function (req, res, next) {
    let { username, email, password } = req.body;
    UserModel.find({ $or: [{ username: username }, { email: email }] }, (err, data) => {
        // 报错
        if (err) {
            return res.json(err)
        }
        // 用户已存在
        if (data.length) {
            return res.json(
                {
                    code: 500,
                    msg: "用户已存在!"
                }
            )
        }
        // 创建用户
        UserModel.create({
            ...req.body,
            password: md5(password)  //md5对密码进行加密
        }, (err, data) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '创建失败',
                })
                return false;
            }
            res.json({
                // 响应编号
                code: 200,
                // 响应信息
                msg: '创建成功',
                // 响应的数据
                data: data,
            })
        })
        return true;
    })
})

// 退出登陆
router.post('/logout', function (req, res, next) {
    res.clearCookie("access_token").json({
        code: 200,
        msg: '退出成功'
    })
})

module.exports = router;
