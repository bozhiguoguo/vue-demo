/**
 * Created by zgg on 2018/4/10
 * 应用程序启动的入口文件
 */
const express = require('express');
//引入模板引擎
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies')
//创建app应用  => NodeJs http.createServer()
const app = express();



/**
 * 设置静态文件托管
 */
app.use('/public',express.static(__dirname + '/public'))
//定义当前应用使用的模板引擎
/**
 * 第一个参数，末班引擎的名称，同事也是模板文件的后缀
 * 第二个参数，参数表示用于解析模板内容的方法
 */
app.engine('html',swig.renderFile);
/**
 * 设置模板文件存放的目录，
 * 第一个参数必须是views,
 * 第二个蚕食是目录
 */
app.set('views','./views');
/**
 * 注册所使用的模板引擎
 * 第一个参数必须是 view engine
 * 第二个参数和app.engine这个方法中定义的模板引擎的名称是一致的
 */
app.set('view engine','html');
/**
 * 在开发中需要取消模板缓存的限制
 * 上线完毕之后可以关闭，上线之后缓存之后可以优化
 */
swig.setDefaults({cache: false})
/**
 * req request对象
 * res response对象
 * next是一个函数
 */
app.use(bodyParser.urlencoded({extended: true}))
//设置完毕之后，会在req对象上面新增一个req.body的一个对象
app.use(bodyParser.json());


app.use( (req, res, next) => {
    console.log(req.path + '路径被请求---', new Date().toLocaleTimeString())
    console.log(req.body)
    req.cookie = new Cookies(req, res);
    if(req.path == '/api/login' || req.path == '/api/logout' || req.path == '/api/register' || req.path == '/'){
        next()
    }else {
        if(!req.get('id')){
            res.json({
                code:1,
                message:'登录失效'
            })
        }else {
            next();
        }
    }
})
/*app.get('/', (req, res, next) => {
    /!**
     * 读取views目录下的指定文件，解析并返回客户端
     * 第一个参数：表示模板的文件，相对于views目录，可以不使用后缀
     * 第二个参数：传递到客户端使用的数据
     *!/
    res.render('index')
})*/
/*app.use('/admin',require('./routers/admin'))*/
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

mongoose.connect('mongodb://localhost:27018/blog', (err) => {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
        //监听端口,连接成功之后启动监听端口
        app.listen('8081',() => {
            console.log('Your project is in: localhost:8081')
        });
    }
})

