/**
 * Created by HPLWC on 2020/03/20.
 */

const Collection = () => import(/* webpackChunkName: "user" */ './view/Collection')

export default [
  {
    path: '/user/collection',
    name: 'collection',
    component: Collection
  }
]
