/**
 * Created by HPLWC on 2019/11/24.
 */

const Home = () => import(/* webpackChunkName: "home" */ './view/Home')

export default [
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]
