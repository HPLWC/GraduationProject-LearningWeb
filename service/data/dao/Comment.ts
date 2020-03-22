/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Comment from '../entity/Comment'
import Section from './Section'
import UserInfo from './UserInfo'
import CommentReply from './CommentReply'

class CommentDao extends BaseDao<Comment> {
  constructor() {
    super(Comment)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const comment = await repository.findOne({
      where
    })
    return comment
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
    let resP = await repository.createQueryBuilder('comment')
      .innerJoin('comment.section', 'section', 'section.id = :id', {id: params.where.id})
      .innerJoinAndSelect('comment.userInfo', 'userInfo')
      .leftJoinAndSelect('comment.commentReply', 'replyComm')
      .leftJoinAndSelect('replyComm.userInfo', 'replyUserInfo')
      .leftJoinAndSelect('replyComm.toUserInfo', 'replyToUserInfo')
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 10)
      .orderBy('comment.addTime', 'ASC')
    let comment = await resP.getMany()
    const total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 10,
      data: comment
    }
  }

  async saveComment(comment): Promise<any> {
    const manager = this.getManager()
    const section = await Section.findOne({id: comment.section_id})
    const userInfo = await UserInfo.findOne({id: comment.user_id})
    comment.section = section
    comment.userInfo = userInfo

    comment.id = this.getUuid().replace(/-/g, '')
    return manager.save(this.entityClass, comment)
  }

}

export default new CommentDao()