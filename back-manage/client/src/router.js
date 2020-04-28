import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('./views/Index.vue'),
      meta: { title: '首页' },
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home/Home'),
          meta: { title: '首页' }
        },

        {
          path: '/course/type',
          name: 'courseType',
          component: () => import('./views/course/CourseType'),
          meta: { title: '类型管理' }
        },
        {
          path: '/course/info',
          name: 'courseInfo',
          component: () => import('./views/course/CourseInfo'),
          meta: { title: '详情管理' }
        },
        {
          path: '/course/section',
          name: 'courseSection',
          component: () => import('./views/course/Section'),
          meta: { title: '章节管理' }
        },
        {
          path: '/course/comment',
          name: 'courseSection',
          component: () => import('./views/course/Comment'),
          meta: { title: '评论管理' }
        },
        {
          path: '/user/manage',
          name: 'userManage',
          component: () => import('./views/user/UserManager'),
          meta: { title: '用户管理' }
        },
        {
          path: '/user/role',
          name: 'userManage',
          component: () => import('./views/user/UserRole'),
          meta: { title: '权限管理' }
        },
        {
          path: '/user/common',
          name: 'common',
          component: () => import('./views/user/Common'),
          meta: { title: '首页评论管理' }
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/logo/Login')
    },
    // {
    //   path: '/lock',
    //   name: 'lock',
    //   component: () => import('./views/Lock.vue')
    // },
    // {
    //   path: '*',
    //   name: 'Nofind',
    //   component: () => import('./views/404')
    // }
  ]
  // mode: "history"
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken

  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
