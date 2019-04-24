import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './mock' // simulation data
import './directive/directive'
import * as filters from './filters' // global filters

import api from './api2/api2'
// http://10.0.5.110:9092
const socket = io.connect('http://192.168.60.167:9092', {
      transports: ['websocket']
    })



Vue.prototype.$api = api
Vue.prototype.$socket = socket


Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
