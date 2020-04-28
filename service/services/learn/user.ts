import * as jwt from 'jsonwebtoken'
import * as Dao from '../../data/dao'
import createBody from '../config/createBody'
import {jwtSecret} from '../config/encrypto'

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

async function getAllUser(ctx) {
  const params = ctx.request.query
  const attentions = await Dao.User.findAll(params)
  ctx.body = createBody(attentions)
}

async function getTheUserInfo(ctx) {
  const params = ctx.request.query
  const attentions = await Dao.UserInfo.findOne(params)
  ctx.body = createBody(attentions)
}

async function getAllUserCommon(ctx) {
  const params = ctx.request.query
  const attentions = await Dao.User.findAll(params)
  const arr = attentions.data.map(item => {
    return item.userInfo
  })
  ctx.body = createBody(arr)
}

async function updateUserInfo(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.UserInfo.updateUserInfo(params)
  ctx.body = createBody(userInfo)
}

async function updateUser(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.User.updateUser(params)
  ctx.body = createBody(userInfo)
}

async function updateUserPassword(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.User.updateUserPassword(params)
  ctx.body = createBody(userInfo)
}

async function saveUserInfo(ctx) {
  const params = ctx.request.body
  const token = ctx.header['token']
  const decoded = jwt.verify(token, jwtSecret)
  params.id = decoded.data.id
  const userInfo = await Dao.UserInfo.saveUserInfo(params)
  ctx.body = createBody(userInfo)
}

async function saveAuthentication(ctx) {
  const params = ctx.request.body
  const token = ctx.header['token']
  const decoded = jwt.verify(token, jwtSecret)
  params.user_id = decoded.data.id
  const userInfo = await Dao.Authentication.saveAuthentication(params)
  ctx.body = createBody(userInfo)
}

async function updateAdminAuthentication(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.Authentication.updateAdminAuthentication(params)
  ctx.body = createBody(userInfo)
}

async function updateAuthentication(ctx) {
  const params = ctx.request.body
  const userInfo = await Dao.Authentication.updateAuthentication(params)
  ctx.body = createBody(userInfo)
}

async function getAllAuthentication(ctx) {
  const params = ctx.request.query
  const userInfo = await Dao.Authentication.findAll(params)
  ctx.body = createBody(userInfo)
}


async function getTheAuthentication(ctx) {
  const params = ctx.request.query
  const userInfo = await Dao.Authentication.findOneWithUser(params)
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

  // 用户信息
  routes.post(prefix + '/user/info/update', updateUserInfo) // 修改用户信息
  routes.post(prefix + '/user/info/save', saveUserInfo) // 保存用户信息
  routes.get(prefix + '/user/info/all', getAllUser) // 获取所有
  routes.post(prefix + '/user/admin/info/update', updateUser) // 修改登录用户信息
  routes.post(prefix + '/user/admin/password/update', updateUserPassword) // 修改用户登录密码
  routes.get(prefix + '/user/info/common', getAllUserCommon) // 获取用户评论

  routes.get(prefix + '/get/user/course/info', getTheUserInfo) // 获取用户评个人详情

  // 验证信息
  routes.post(prefix + '/user/authentication/save', saveAuthentication) // 上传身份验证
  routes.get(prefix + '/user/authentication/all', getAllAuthentication) // 获取所有身份校验
  routes.put(prefix + '/user/admin/authentication/update', updateAdminAuthentication) // 修改身份校验状态
  routes.put(prefix + '/user/authentication/update', updateAuthentication) // 修改身份校验
  routes.get(prefix + '/user/get/authentication', getTheAuthentication) // 获取用户身份校验
}