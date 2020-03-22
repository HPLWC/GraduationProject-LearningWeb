/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import CommentReply from '../entity/CommentReply'
import Comment from './Comment'
import UserInfo from './UserInfo'

class CommentReplyDao extends BaseDao<CommentReply> {
  constructor() {
    super(CommentReply)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const commentReply = await repository.findOne({
      where
    })
    return commentReply
  }

  async findAll(where) {
    if(!where.id) return { success:false, data: [] }

    const repository = this.getRepository()
    const params = this.pickPage(where)

    // const comment = await repository.find({
    //   where: params.where,
    //   order: { addTime: 'ASC' },
    //   skip: params.pageNum - 1 || 0,
    //   take: params.pageSize || 10,
    // })
    // const total = await repository.count(params.where)
    let resP = await repository.createQueryBuilder('commentReply')
      .innerJoin('commentReply.comment', 'comment', 'comment.id = :id', {id: params.where.comment_id})
      .innerJoinAndSelect('commentReply.toUserInfo', 'toUserInfo')
      .innerJoinAndSelect('commentReply.userInfo', 'userInfo')
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 10)
      .orderBy('commentReply.addTime', 'ASC')
    let comment = await resP.getMany()
    const total = await resP.getCount()

    // return {
    //   total: total,
    //   pageNum: parseInt(params.pageNum) || 1,
    //   pageSize: parseInt(params.pageSize) || 10,
    //   data: comment
    // }
    return comment
  }

  async saveComment(comment): Promise<any> {
    const manager = this.getManager()
    console.log(comment)

    const fComment = await Comment.findOne({id: comment.comment_id})
    const userInfo = await UserInfo.findOne({id: comment.user_id})
    const toUserInfo = await UserInfo.findOne({id: comment.to_user_id})
    console.log(fComment)
    comment.comment = fComment
    comment.userInfo = userInfo
    comment.toUserInfo = toUserInfo

    comment.id = this.getUuid().replace(/-/g, '')
    return manager.save(this.entityClass, comment)
  }

}

export default new CommentReplyDao()