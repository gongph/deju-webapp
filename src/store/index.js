import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import product from './modules/product'
import order from './modules/order'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    product,
    order
  },
  getters
})

export default store