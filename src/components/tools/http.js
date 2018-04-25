import axios from 'axios';
import { Message, Loading } from 'element-ui';
import Cookies from 'js-cookie';
import router from '@/router/index'
let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

//http request 拦截器
axios.interceptors.request.use(
    config => {
        var token = ''
        if(typeof Cookies.get('user') === 'undefined'){
            //此时为空
        }else {
            token = JSON.parse(Cookies.get('user')).token
        }//注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json'
        }
        if(token != ''){
          config.headers.token = token;
        }
        showFullScreenLoading()
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        if(response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！'){
            router.push({
                path:"/",
                querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        tryHideFullScreenLoading()
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
/**
 * 封装导出文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function exportExcel(url,data = {}){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: url, // 请求地址
            data: data, // 参数
            responseType: 'blob' // 表明返回服务器返回的数据类型
        })
        .then(response => {
            axios.post(url, data).then((res) => {
                if(res.data.success == false){
                    this.$message({
                        type:'error',
                        message:res.data.message
                    })
                }else {
                    let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
                    let fileName = "订单列表_"+Date.parse(new Date())+".xls" ;
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, fileName);
                    } else {
                        var link = document.getElementById('download');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileName;
                        link.click();
                        window.URL.revokeObjectURL(link.href);
                    }
                }
            })

        },err => {
            reject(err)
        })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}