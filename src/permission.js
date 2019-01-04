import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

// No redirect
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(() => {
          next({ ...to, replace: true })
        }).catch(err => {
          store.dispatch('Logout').then(() => {
            console.error(err || 'Verification failed, please login again')
          })
          next({ path: '/' })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
