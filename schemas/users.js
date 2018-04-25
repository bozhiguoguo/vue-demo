/**
 * Created by zgg on 2018/4/11
 * 每一个schemas文件就是一张表，users创建一张用户表
 */
const mongoose = require('mongoose');
/**
 *
 */
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String
})
