import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function getAllCourseType(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.findAll(params)
  ctx.body = createBody(courseType)
}

async function getAllCourseTypeName(ctx) {
  const params = ctx.request.body
  const select = ['id', 'title']
  const courseType = await Dao.CourseType.findSelect(params, select)
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
  if(courseType.success) ctx.body = createBody(courseType)
  else ctx.body = createBody(courseType, false, 400, courseType.message)
}

async function getAllCourseInfo(ctx) {
  const params = ctx.request.query
  const courseInfo = await Dao.CourseInfo.findAll(params)
  ctx.body = createBody(courseInfo)
}

async function getTheCourseInfo(ctx) {
  const params = ctx.request.query
  const courseInfo = await Dao.CourseInfo.findOne(params)
  ctx.body = createBody(courseInfo)
}

async function saveCourseInfo(ctx) {
  const params = ctx.request.body
  const courseInfo = await Dao.CourseInfo.saveInfo(params, ctx.header['token'])
  ctx.body = createBody(courseInfo)
}

async function updateCourseInfo(ctx) {
  const params = ctx.request.body
  const courseInfo = await Dao.CourseInfo.updateInfo(params)
  ctx.body = createBody(courseInfo)
}

async function deleteCourseInfo(ctx) {
  const params = ctx.request.body
  const courseInfo = await Dao.CourseInfo.deleteInfo(params)
  if(courseInfo.success) ctx.body = createBody(courseInfo)
  else ctx.body = createBody(courseInfo, false, 400, courseInfo.message)
}

async function playCourseInfo(ctx) {
  const params = ctx.request.body
  const courseInfo = await Dao.CourseInfo.playInfo(params)
  ctx.body = createBody(courseInfo)
}

async function getAllCourseSection(ctx) {
  const params = ctx.request.query
  const section = await Dao.Section.findAll(params)
  ctx.body = createBody(section)
}

export default (routes, prefix) => {
  // 课程种类
  routes.get(prefix + '/course/type/all', getAllCourseType) // 获取所有课程种类
  routes.post(prefix + '/course/type/save', saveCourseType) // 添加课程种类
  routes.put(prefix + '/course/type/update', updateCourseType) // 修改所有课程种类
  routes.delete(prefix + '/course/type/delete', deleteCourseType) // 获取所有课程种类
  routes.get(prefix + '/course/type/name/all', getAllCourseTypeName) // 获取所有课程种类（id, title）

  // 课程详情
  routes.get(prefix + '/course/info/all', getAllCourseInfo) // 获取所有课程详情
  routes.get(prefix + '/course/info/detail', getTheCourseInfo) // 获取某个课程详情
  routes.post(prefix + '/course/info/save', saveCourseInfo) // 添加课程详情
  routes.put(prefix + '/course/info/update', updateCourseInfo) // 修改所有课程详情
  routes.delete(prefix + '/course/info/delete', deleteCourseInfo) // 获取所有课程详情
  routes.put(prefix + '/course/info/play', playCourseInfo) // 播放量加一

  // 课程目录
  routes.get(prefix + '/course/section/all', getAllCourseSection) // 获取所有课程目录
}