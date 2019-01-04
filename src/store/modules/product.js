const product = {
  state: {
    curProd: null,
    // 申请信息
    applyInfo: {}
  },

  mutations: {
    SAVE_CUR_PRODUCT: (state, product) => {
      state.curProd = product
    },
    SAVE_APPLY_INFO: (state, data) => {
      state.applyInfo = Object.assign(state.applyInfo, data)
    }
  },

  actions: {
    SaveCurProduct: ({ commit }, product) => {
      return new Promise((resolve) => {
        commit('SAVE_CUR_PRODUCT', product)
        resolve()
      })
    },
    SaveApplyInfo: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_APPLY_INFO', data)
        response()
      })
    }
  }
}

export default product
