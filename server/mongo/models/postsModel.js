const mongoose = require('mongoose')

let PostsSchema = new mongoose.Schema({
    // 标题
    title: {
        type: String,
        required: true
    },
    // 描述
    desc: {
        type: String,
        required: true
    },
    // 描述
    date: {
        type: Date,
        // required: true
    },
    // 谁创建的
    uid: {
        type: String,
        required: true
    },
    // 图片
    img:{
        type: String,
        required: true
    },
    // 类别
    category:{
        type: String,
        required: true
    }
});

let PostsModel = mongoose.model('posts', PostsSchema);

module.exports = PostsModel