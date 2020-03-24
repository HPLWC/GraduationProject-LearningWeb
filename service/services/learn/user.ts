import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function getTheUserCollections(ctx) {
  const params = ctx.request.query
  const collections = await Dao.CourseInfo.findAllCollections(params)
  ctx.body = createBody(collections)
}

export default (routes, prefix) => {
  // 用户信息
  routes.get(prefix + '/user/collections/all', getTheUserCollections) // 获取用户的收藏信息
}