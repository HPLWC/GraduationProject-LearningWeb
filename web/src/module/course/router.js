const CourseList = () => import(/* webpackChunkName: "course" */ './view/CourseList')
const CourseDetail = () => import(/* webpackChunkName: "course" */ './view/CourseDetail')

export default [
  {
    path: '/course/list',
    name: 'courseList',
    component: CourseList
  },
  {
    path: '/course/detail',
    name: 'courseDetail',
    component: CourseDetail
  }
]
