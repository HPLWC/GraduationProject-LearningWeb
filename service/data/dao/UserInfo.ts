/**
 * Created by HPLWC on 2020/01/23.
 * */
import { BaseDao } from './BaseDao'
import UserInfo from '../entity/UserInfo'

class UserInfoDao extends BaseDao<UserInfo> {
  constructor() {
    super(UserInfo)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const userInfo = await repository.findOne({
      where
    })
    return userInfo
  }

  /*async findAttentions(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)

    let resP = await repository.createQueryBuilder('userInfo')
      .innerJoinAndSelect('userInfo.attentions', 'attentions')
      .where('attentions.id = :id', {id: params.where.id})
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 6)
    let courseInfo = await resP.getMany()
    let total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: courseInfo
    }
  }*/

  /*async saveAttentions(where) {
    const manager = this.getManager()
    let params:any = {}

    const attentions = await this.findOne({ id: where.user_id })
    const toAttentions = await this.findOne({ id: where.attention_id })

    params.id = this.getUuid().replace(/-/g, '')
    params.attentions = attentions
    params.toAttentions = toAttentions

    return manager.save(this.entityClass, params)
  }*/

  async saveUserInfo(userInfo): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ user_id: userInfo.user_id })
    if(!res) {
      // 设置uuid值
      userInfo.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, userInfo)
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

}

export default new UserInfoDao()