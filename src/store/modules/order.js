import { getOrders } from '@/api/order'

const order = {
  state: {
    list: []
  },

  mutations: {
    GET_ORDERS: (state, orders) => {
      state.list = orders
    }
  },

  actions: {
    GetOrders: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getOrders().then(response => {
          const data = response.data
          commit('GET_ORDERS', data)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default order
