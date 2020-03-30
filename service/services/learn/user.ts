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

async function getIsCollection(ctx) {
  const params = ctx.request.query
  const collections = await Dao.Collection.getIsCollection(params)
  ctx.body = createBody(collections)
}

async function getTheUserAttentions(ctx) {
  const params = ctx.request.query
  const collections = await Dao.Attention.findAll(params)
  ctx.body = createBody(collections)
}

async function saveTheUserAttentions(ctx) {
  const params = ctx.request.body
  const attentions = await Dao.Attention.saveAttention(params)
  ctx.body = createBody(attentions)
}

async function deleteAttention(ctx) {
  const params = ctx.request.body
  const attentions = await Dao.Attention.deleteAttention(params)
  ctx.body = createBody(attentions)
}

async function getIsAttention(ctx) {
  const params = ctx.request.query
  const attentions = await Dao.Attention.getIsAttention(params)
  ctx.body = createBody(attentions)
}

async function updateUserInfo(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.UserInfo.updateUserInfo(params)
  ctx.body = createBody(userInfo)
}

export default (routes, prefix) => {
  // 用户收藏信息
  routes.get(prefix + '/user/collections/all', getTheUserCollections) // 获取用户的收藏信息
  routes.delete(prefix + '/user/collections/delete', deleteCollection) // 取消用户的收藏信息
  routes.post(prefix + '/user/collections/save', saveCollection) // 添加用户的收藏信息
  routes.get(prefix + '/user/the/isCollection', getIsCollection) // 判断是否已收藏

  // 用户关注信息
  routes.get(prefix + '/user/attentions/all', getTheUserAttentions) // 获取用户的关注用户
  routes.post(prefix + '/user/attentions/save', saveTheUserAttentions) // 保存用户的关注用户
  routes.delete(prefix + '/user/attentions/delete', deleteAttention) // 取消用户的关注用户
  routes.get(prefix + '/user/the/isAttention', getIsAttention) // 判断是否已关注

  // 修改用户信息
  routes.post(prefix + '/user/info/update', updateUserInfo) // 修改用户信息

}