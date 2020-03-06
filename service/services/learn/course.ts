import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function getAllCourseType(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.findAll(params)
  ctx.body = createBody(courseType)
}

async function saveCourseType(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.saveType(params)
  ctx.body = createBody(courseType)
}

async function updateCourseType(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.updateType(params)
  ctx.body = createBody(courseType)
}

async function deleteCourseType(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.deleteType(params)
  ctx.body = createBody(courseType)
}

async function getAllCourseInfo(ctx) {
  const params = ctx.request.body
  const courseInfo = await Dao.CourseInfo.findAll(params)
  ctx.body = createBody(courseInfo)
}

export default (routes, prefix) => {
  // 课程种类
  routes.get(prefix + '/course/type/all', getAllCourseType) // 获取所有课程种类
  routes.post(prefix + '/course/type/save', saveCourseType) // 添加课程种类
  routes.put(prefix + '/course/type/update', updateCourseType) // 修改所有课程种类
  routes.delete(prefix + '/course/type/delete', deleteCourseType) // 获取所有课程种类

  // 课程详情
  routes.get(prefix + '/course/info/all', getAllCourseInfo) // 获取所有课程详情
}