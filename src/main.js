// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../static/css/element-variables.scss'
import VueClipboards from 'vue-clipboards' // 点击复制
import store from './store/index.js'
import api from './api'
import axios from 'axios'
import GLOBALVAR from './global/variable.js' // 全局变量
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './icons' // icon
Vue.config.productionTip = false
axios.defaults.withCredentials = true
// 定义全局api变量
Vue.prototype.$api = api
Vue.prototype.$GLOBALVAR = GLOBALVAR
Vue.use(ElementUI)
Vue.use(VueClipboards)
Vue.use(mavonEditor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
