import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function getTheUserCollections(ctx) {
  const params = ctx.request.query
  const collections = await Dao.Collection.findAll(params)
  ctx.body = createBody(collections)
}

async function deleteCollection(ctx) {
  const params = ctx.request.body
  const collections = await Dao.Collection.deleteCollection(params)
  ctx.body = createBody(collections)
}

async function saveCollection(ctx) {
  const params = ctx.request.body
  const collections = await Dao.Collection.saveCollection(params)
  ctx.body = createBody(collections)
}
//
// async function getTheUserAttentions(ctx) {
//   const params = ctx.request.query
//   const attentions = await Dao.UserInfo.findAttentions(params)
//   ctx.body = createBody(attentions)
// }
//
// async function saveTheUserAttentions(ctx) {
//   const params = ctx.request.body
//   console.log(params)
//   const attentions = await Dao.UserInfo.saveAttentions(params)
//   ctx.body = createBody(attentions)
// }

export default (routes, prefix) => {
  // 用户信息
  routes.get(prefix + '/user/collections/all', getTheUserCollections) // 获取用户的收藏信息
  routes.delete(prefix + '/user/collections/delete', deleteCollection) // 取消用户的收藏信息
  routes.post(prefix + '/user/collections/save', saveCollection) // 添加用户的收藏信息
  // routes.get(prefix + '/user/attentions/all', getTheUserAttentions) // 获取用户的关注用户
  // routes.post(prefix + '/user/attentions/save', saveTheUserAttentions) // 保存用户的关注用户

}