/**
 * Created by HPLWC on 2019/11/20.
 */

const Login = () => import(/* webpackChunkName: "public" */ './view/Login.vue')
const Register = () => import(/* webpackChunkName: "public" */ './view/Register.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]
