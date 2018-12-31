import { loginByUserName } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUserName(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.id_token)
          setToken(data.id_token)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
