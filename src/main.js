import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css";

import './styles/index.scss'
import './icons/index'

import './permission'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
