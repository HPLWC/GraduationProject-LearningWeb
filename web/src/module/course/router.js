const CourseList = () => import(/* webpackChunkName: "course" */ './view/CourseList')
const CourseDetail = () => import(/* webpackChunkName: "course" */ './view/CourseDetail')
const CourseVideo = () => import(/* webpackChunkName: "course" */ './view/CourseVideo')

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
  },
  {
    path: '/course/video',
    name: 'courseVideo',
    component: CourseVideo
  }
]
