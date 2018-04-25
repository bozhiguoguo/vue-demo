/**
 * Created by zgg on 2018/4/11
 * 模型类，对于表的一些操作
 */
const mongoose = require('mongoose');
const usersSchema = require('../schemas/users');
module.exports = mongoose.model('User',usersSchema);