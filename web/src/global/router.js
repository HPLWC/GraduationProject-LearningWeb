import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import publicRouter from '../module/public/router'
import commonRouter from '../module/common/router'
import homeRouter from '../module/home/router'
import courseRouter from '../module/course/router'
import userRouter from '../module/user/router'

const Page404 = () => import('../module/common/view/ExceptionPage/404')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes: [
    // 404
    {
      path: '*',
      name: '404',
      component: Page404
    },

    ...publicRouter,
    ...commonRouter,
    ...homeRouter,
    ...courseRouter,
    ...userRouter,
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  document.body.scrollTop = 0
  document.title = to.meta && to.meta.title ? to.meta.title : '在线学习网站'
  next()
})
router.afterEach((to, from, next) => {
  Nprogress.done()
  window.scrollTo(1, 0)
})

export default router
