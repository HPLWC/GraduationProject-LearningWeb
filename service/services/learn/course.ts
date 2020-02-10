import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function section(ctx) {
  const params = ctx.request.body
  const courseType = await Dao.CourseType.findAll(params)
  ctx.body = createBody(courseType)
}

export default (routes, prefix) => {
  routes.get(prefix + '/course/type/all', section) // 获取所有课程种类
}