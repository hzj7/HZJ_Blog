const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    // 姓名
    username: {
        type: String,
        required: true
    },
    // 邮箱
    email: {
        type: String,
        required: true
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    // 头像
    img: {
        type: String,
    },
});

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel