// router.js
//import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/token.js'
import router from './index.js'

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
      if (userStore.token) { // 判断当前的token是否存在
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next()
    }
  })
  