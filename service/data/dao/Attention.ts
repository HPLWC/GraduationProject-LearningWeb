/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Attention from '../entity/Attention'
import UserInfo from './UserInfo'

class AttentionDao extends BaseDao<Attention> {
  constructor() {
    super(Attention)
  }

  async findOne(where) {
    const repository = this.getRepository()
    let attention

    if(!where.id) {
      attention = await repository.createQueryBuilder('attention')
        .innerJoinAndSelect('attention.userInfo', 'userInfo')
        .innerJoinAndSelect('attention.attentionUserInfo', 'attentionUserInfo')
        .where('userInfo.id = :id', {id: where.user_id})
        .where('attentionUserInfo.id = :id', {id: where.attention_user_id})
        .getOne()
    } else {
      attention = await repository.findOne({
        where
      })
    }
    return attention
  }

  async findAll(where) {
    if(!where.id) return { success:false, data: [] }

    const repository = this.getRepository()
    const params = this.pickPage(where)

    let resP = await repository.createQueryBuilder('attention')
      .innerJoinAndSelect('attention.userInfo', 'userInfo')
      .innerJoinAndSelect('attention.attentionUserInfo', 'attentionUserInfo')
      .where('userInfo.id = :id', { id: params.where.id })
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 10)
      .orderBy('attention.addTime', 'ASC')
    let attention = await resP.getMany()
    const total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 10,
      data: attention
    }
  }

  async saveAttention(attention): Promise<any> {
    const manager = this.getManager()
    const userInfo = await UserInfo.findOne({id: attention.user_id})
    const attentionUserInfo = await UserInfo.findOne({id: attention.attention_user_id})
    attention.userInfo = userInfo
    attention.attentionUserInfo = attentionUserInfo

    attention.id = this.getUuid().replace(/-/g, '')
    return manager.save(this.entityClass, attention)
  }

  async deleteAttention(where) {
    const repository = this.getRepository()

    const attention = await this.findOne(where)

    if(!attention) {
      return {
        success: false,
        message: '未查找到此关注用户'
      }
    } else {
      let deleteRes = await repository.delete(attention.id)
      if(deleteRes.affected > 0) {
        return {
          success: true,
          message: '删除成功'
        }
      } else {
        return {
          success: false,
          message: '删除失败'
        }
      }
    }
  }

  async getIsAttention (where) {
    const res = await this.findOne(where)
    if(!res) {
      return {
        success: true,
        message: '未关注',
        data: {
          isAttention: false
        }
      }
    } else {
      return {
        success: true,
        message: '已关注',
        data: {
          isAttention: true
        }
      }
    }
  }

}

export default new AttentionDao()