import localforage from 'localforage'

const product = {
  state: {
    // 当前申请的产品
    curProd: null,
    // 申请信息
    applyInfo: null,
    // 个人信息
    personalInfo: null
  },

  mutations: {
    SAVE_CUR_PRODUCT: (state, product) => {
      state.curProd = product
    },
    SAVE_APPLY_INFO: (state, data) => {
      state.applyInfo = Object.assign(state.applyInfo || {}, data)
      localforage.setItem('apply_info', state.applyInfo)
    },
    SAVE_PERSONAL_INFO: (state, data) => {
      state.personalInfo = Object.assign(state.personalInfo || {}, data)
      localforage.setItem('personal_info', state.personalInfo)
    }
  },

  actions: {
    SaveCurProduct: ({ commit }, product) => {
      return new Promise((resolve, reject) => {
        commit('SAVE_CUR_PRODUCT', product)
        localforage.setItem('curProd', product).then((value) => {
          resolve(value)
        }).catch(err => {
          reject(err)
        })
      })
    },
    SaveApplyInfo: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_APPLY_INFO', data)
        response()
      })
    },
    SavePersonalInfo: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_PERSONAL_INFO', data)
        response()
      })
    },
    InitApplyData: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_APPLY_INFO', {
          amount: data.amount,
          deadline: data.deadline
        })
        commit('SAVE_PERSONAL_INFO', data.personalInformation)
        commit('SAVE_CUR_PRODUCT', data.product)
        response()
      })
    }
  }
}

export default product
