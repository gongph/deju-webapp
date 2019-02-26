import localforage from 'localforage'
import { getProductById } from '@/api/product'

const product = {
  state: {
    // 当前申请的产品
    curProd: null,
    // 申请信息
    applyInfo: null,
    // 申请信息表单信息
    applyInfoForm: null,
    // 个人信息
    personalInfo: null,
    // 产品对象
    product: null
  },

  mutations: {
    SAVE_CUR_PRODUCT: (state, product) => {
      state.curProd = product
    },
    SAVE_APPLY_INFO: (state, data) => {
      state.applyInfo = Object.assign(state.applyInfo || {}, data)
    },
    SAVE_APPLY_INFO_FORM: (state, data) => {
      state.applyInfoForm = Object.assign(state.applyInfoForm || {}, data)
    },
    SAVE_PERSONAL_INFO: (state, data) => {
      state.personalInfo = Object.assign(state.personalInfo || {}, data)
    },
    SAVE_PRODUCT: (state, data) => {
      state.product = data
    }
  },

  actions: {
    getProductById({ commit }, id) {
      getProductById(id).then(response => {
        if (response.status === 200) {
          commit('SAVE_PRODUCT', response.data)
        }
      })
    },
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
    
    /**
     * 保存用户在产品详情页填写的信息
     */
    
    /* eslint-disable */
    SaveApplyInfo: ({ commit }, data) => {
      return new Promise((response) => {
        localforage.setItem('cur_apply_info', data).then(value => {
          response(value)
        })
      })
    },
    /**
     * 保存申请表单信息
     */
    saveApplyInfoForm: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_APPLY_INFO_FORM', data)
        response()
      })
    },
    SavePersonalInfo: ({ commit }, data) => {
      return new Promise((response) => {
        commit('SAVE_PERSONAL_INFO', data)
        response()
      })
    }
  }
}

export default product
