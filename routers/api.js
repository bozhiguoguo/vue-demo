/**
 * Created by zgg on 2018/4/11
 */
const express = require('express');
const router = express.Router();
//引入模型类来进行数据库操作
const userModel = require('../models/User')
const orderList = require('../models/orderList')
var responseData;
router.use( (req, res, next) => {
    responseData = {
        code: 0,
        message: '',
        success:null
    }
    next()
})
/**
 * 注册接口
 * username,用户名
 * password,密码
 * repassword,二次输入密码
 */
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;
    if(username == ''){
        responseData.message = '账号不能为空';
        responseData.success = false;
        res.json(responseData)
        return;
    }
    if(password == ''){
        responseData.success = false;
        responseData.message = '密码不能为空';
        res.json(responseData)
        return;
    }
    if(repassword != password){
        responseData.success = false;
        responseData.message = '两次密码输入不一致';
        res.json(responseData)
        return;
    }
    userModel.findOne({
        username: username
    }).then( (result) => {
        if(result){
            responseData.success = false ;
            responseData.message = '用户已注册'
            res.json(responseData)
            return;
        }
        const userObject = new userModel({
            username: username,
            password: password,
        })
        return userObject.save()
    }).then( (userInfo) => {
        responseData.success = true;
        responseData.data = userInfo;
        responseData.message = '存储成功';
        res.json(responseData)
    })
})
/**
 * 登录接口
 * username,用户名
 * password,密码
 */
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username == ''){
        responseData.success = false;
        responseData.message = '账号不能为空';
        res.json(responseData)
        return;
    }
    if(password == ''){
        responseData.success = false;
        responseData.message = '密码不能为空'
        res.json(responseData)
        return;
    }
    userModel.findOne({
        username: username,
        password:password
    }).then( (result) => {
        if(!result){
            responseData.success = false;
            responseData.message = '账号密码错误'
            res.json(responseData)
            return;
        }
        responseData.success = true;
        responseData.data = {
            _id: result._id,
            username: result.username
        };
        responseData.message = '登陆成功';
        req.cookie.set('userInfo',JSON.stringify(responseData.data))
        res.json(responseData)
        return;
    })
})
/**
 * 退出
 * username,用户名
 * password,密码
 */
router.get('/logout', (req, res, next) => {
    let id = JSON.parse(req.cookie.get('userInfo'))._id;
    userModel.findOne({
        _id: id
    }).then( (result) => {
        if(!result){
            responseData.success = false;
            responseData.message = '参数错误'
            res.json(responseData)
            return;
        }
        responseData.success = true;
        responseData.message = '退出成功'
        req.cookie.set('userInfo',null)
        res.json(responseData)
        return;
    })
})
/**
 * 列表
 * username,用户名
 * password,密码
 */
router.get('/orderList', (req, res, next) => {
    orderList.find({
    }).limit(2).then( (result) => {
        responseData.data = result
        res.json(responseData)
    })
})
module.exports = router;