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

  async saveUser(userInfo): Promise<any> {
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