import Vue from 'vue'
import Router from 'vue-router'

import Apply from '@/views/applyForm/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      name: 'ProductList',
      component: () => import('@/views/product/index.vue')
    },
    {
      path: '/product/detail/:id',
      name: 'ProductDetail',
      component: () => import('@/views/product/detail.vue')
    },
    {
      path: '/apply',
      component: Apply,
      children: [
        {
          path: 'base',
          name: 'BaseInfoForm',
          component: () => import('@/views/applyForm/baseInfo.vue')
        },
        {
          path: 'more',
          name: 'MoreInfoForm',
          component: () => import('@/views/applyForm/moreInfo.vue')
        }
      ]
    },
    {
      path: '/center',
      component: Apply,
      children: [
        {
          path: '/',
          name: 'UserCenter',
          component: () => import('@/views/userCenter/index.vue')
        },
        {
          path: '/orders',
          name: 'Orders',
          component: () => import('@/views/userCenter/orders.vue')
        },
        {
          path: '/resetpwd',
          name: 'ResetPwd',
          component: () => import('@/views/userCenter/resetPwd.vue')
        },
        {
          path: '/userdata',
          name: 'UserData',
          component: () => import('@/views/userCenter/userData.vue')
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/userCenter/about.vue')
        }
      ]
    },
    {
      path: '/notice',
      name: 'NoticePage',
      component: () => import('@/views/resultPage/notice.vue')
    },
    {
      path: '/payrtn',
      name: 'PayReturnPage',
      component: () => import('@/views/resultPage/payrtn.vue')
    },
    {
      path: '/neterror',
      name: 'NetErrorPage',
      component: () => import('@/views/resultPage/neterror.vue')
    },
    {
      path: '/404',
      name: '404Page',
      component: () => import('@/views/resultPage/404.vue')
    }
  ]
})