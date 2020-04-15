import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function getTheComment(ctx) {
  const params = ctx.request.query
  const comment = await Dao.Comment.findAll(params)
  ctx.body = createBody(comment)
}

async function saveTheFirstComment(ctx) {
  const params = ctx.request.body
  const comment = await Dao.Comment.saveComment(params)
  ctx.body = createBody(comment)
}
async function deleteTheFirstComment(ctx) {
  const params = ctx.request.body
  console.log(params)
  const comment = await Dao.Comment.deleteComments([params.data])
  ctx.body = createBody(comment)
}

// 二级评论
async function saveTheSecondComment(ctx) {
  const params = ctx.request.body
  const comment = await Dao.CommentReply.saveComment(params)
  ctx.body = createBody(comment)
}

export default (routes, prefix) => {
  // 评论信息
  routes.get(prefix + '/section/comment/all', getTheComment) // 获取相应课程评论
  routes.post(prefix + '/section/comment/save', saveTheFirstComment) // 保存相应课程评论
  routes.post(prefix + '/section/comment/reply/save', saveTheSecondComment) // 保存相应二级评论
  routes.delete(prefix + '/section/comment/delete', deleteTheFirstComment) // 删除评论
}