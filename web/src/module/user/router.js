/**
 * Created by HPLWC on 2020/03/20.
 */

const Collection = () => import(/* webpackChunkName: "user" */ './view/Collection')
const Attention = () => import(/* webpackChunkName: "user" */ './view/Attention')
const UserCenter = () => import(/* webpackChunkName: "user" */ './view/UserCenter')
const UploadView = () => import(/* webpackChunkName: "user" */ './view/UploadView')
const PasswordView = () => import(/* webpackChunkName: "user" */ './view/PasswordView')
const UserLayout = () => import(/* webpackChunkName: "user" */ './view/UserLayout')

export default [
  // {
  //   path: '/user/collection',
  //   name: 'collection',
  //   component: Collection
  // },
  // {
  //   path: '/user/attention',
  //   name: 'attention',
  //   component: Attention
  // },
  // {
  //   path: '/user/center',
  //   name: 'userCenter',
  //   component: UserCenter
  // },
  {
    path: '/user',
    name: 'userLayout',
    component: UserLayout,
    children: [
      {
        path: 'collection',
        name: 'collection',
        component: Collection
      },
      {
        path: 'attention',
        name: 'attention',
        component: Attention
      },
      {
        path: 'center',
        name: 'userCenter',
        component: UserCenter
      },
      {
        path: 'upload',
        name: 'uploadView',
        component: UploadView
      },
      {
        path: 'password',
        name: 'passwordView',
        component: PasswordView
      },
    ]
  },
]
