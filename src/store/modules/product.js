const product = {
  state: {
    curProd: null,
    // 申请信息
    applyInfo: {
      // 金额
      account: 0,
      // 期限
      deadline: 0
    }
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
