const CourseList = () => import(/* webpackChunkName: "course" */ './view/CourseList')

export default [
  {
    path: '/course/list',
    name: 'courseList',
    component: CourseList
  }
]
