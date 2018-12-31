const product = {
  state: {
    curProd: null
  },

  mutations: {
    SAVE_CUR_PRODUCT: (state, product) => {
      state.curProd = product
    }
  },

  actions: {
    SaveCurProduct: ({ commit }, product) => {
      return new Promise((resolve) => {
        commit('SAVE_CUR_PRODUCT', product)
        resolve()
      })
    }
  }
}

export default product
