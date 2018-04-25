/**
 * Created by zgg on 2018/4/11
 * 每一个schemas文件就是一张表，users创建一张用户表
 */
const mongoose = require('mongoose');
/**
 *
 */
module.exports = new mongoose.Schema({
    url: {type: String},//抓取地址
    type: {type: String},//类型
    content: {type: String},//抓取地址
    updateTime: {type: Date, default: Date.now},//数据抓取时间
    flag: {type: String, default: 0} //用于判断是否抓取过 0表示详情没有抓取过.
})
