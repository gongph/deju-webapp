import { loginByUserName, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: null,
    token: getToken(),
    roles: [],
    name: '',
    avatar: '',
    introduction: '',
    status: ''
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_STATUS: (state, status) => {
      state.status = status
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
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('error')
          }
          const data = response.data
          if (data.authorities && data.authorities.length > 0) {
            commit('SET_ROLES', data.authorities)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.login)
          commit('SET_AVATAR', data.imageUrl)
          commit('SET_INTRODUCTION', data.firstName)
          commit('SET_USER', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
