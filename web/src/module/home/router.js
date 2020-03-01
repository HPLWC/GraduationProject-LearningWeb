/**
 * Created by HPLWC on 2019/11/24.
 */

const Home = () => import(/* webpackChunkName: "home" */ './view/Home')
const About = () => import(/* webpackChunkName: "about" */ './view/About')
const Contact = () => import(/* webpackChunkName: "contact" */ './view/Contact')
const Blogroll = () => import(/* webpackChunkName: "contact" */ './view/Blogroll')

export default [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/blogroll',
    name: 'blogroll',
    component: Blogroll
  }
]
