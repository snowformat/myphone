// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/css/index.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://1411940963167423.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/youzan-qingting-wehotel/'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
