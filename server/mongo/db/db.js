/**
 * @param success 数据库连接成功的回调
 * @param error   数据库连接失败的回调
 */
module.exports = function (success, error = () => {console.log("连接失败")}) {

    // 导入mongo
    const mongoose = require('mongoose')

    // 设置strictQuery
    mongoose.set('strictQuery', true);

    //
    const { DB_HOST, DB_NAME, DB_PORT } = require('../config/config')

    // 连接mongo服务
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

    // 设置连接成功的回调  once事件回调函数只执行一次
    mongoose.connection.once('open', () => {
        success()
    })
    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error()
    })
    // 设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log("连接关闭")
    })
}
