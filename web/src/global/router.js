import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import publicRouter from '../module/public/router'
import commonRouter from '../module/common/router'
import homeRouter from '../module/home/router'

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
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach((to, from, next) => {
  Nprogress.done()
})

export default router
