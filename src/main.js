import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css";

import VConsole from 'vconsole'

import './styles/index.scss'
import './icons/index'

import './permission'

import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate)
Validator.localize('zh_CN', zh_CN)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  new VConsole()
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
