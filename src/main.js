// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import {post,fetch,patch,put,exportExcel,imgUrl} from '@/components/tools/http'
//定义全局变量
import config from '@/api/api.js'
import Cookies from 'js-cookie'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$exportExcel = exportExcel;
Vue.prototype.$api = config.config.api;
Vue.prototype.$Cookies = Cookies;
Vue.prototype.$imgUrl = config.config.imgUrl;
Vue.prototype.$pcImg = config.config.pcImg;

Vue.use(ElementUI)
Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
