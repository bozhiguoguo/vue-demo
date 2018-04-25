const IpConfig = {
    develop: {
        api:'http://192.168.89.221:48080/insu-web-rest/',
        imgUrl:'http://192.168.89.215/',
        pcImg:'http://192.168.89.215/'
    },
    staging: {
        api:'http://insu-api.zhiguoguo.cn/insu-web-rest/',
        imgUrl:'http://101.201.72.4:81/',
        pcImg:'https://pc.zhiguoguo.com/pc-web-rest/'
    },
    production: {
        api:'http://insu-api.zhiguoguo.com/insu-web-rest/',
        imgUrl:'http://resource.zhiguoguo.com:81/',
        pcImg:'http://resource.zhiguoguo.com:81/'
    },
}
//通过环境配置环境地址
if (process.env.NODE_ENV === 'development') {
    module.exports.config = IpConfig.develop;
// 编译环境
} else {
    // 测试环境
    if (process.env.type === 'test') {
        module.exports.config = IpConfig.staging;
        // 正式环境
    } else {
        module.exports.config = IpConfig.production;
    }
}

