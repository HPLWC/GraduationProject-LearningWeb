/**
 * Created by HPLWC on 2020/01/23.
 * */
import { BaseDao } from './BaseDao'
import UserInfo from '../entity/UserInfo'
import {utils} from '../../utils/utils'
import User from './User'

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

  async saveUserInfo(userInfo): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ id: userInfo.user_id })
    if(!res) {
      // 设置uuid值
      userInfo.id = this.getUuid().replace(/-/g, '')

      let userInfoSave = await manager.save(this.entityClass, userInfo)
      await User.updateUser({email: userInfo.email, user_id: userInfo.id})

      return userInfoSave
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

  async updateUserInfo(userInfo): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ id: userInfo.id })
    if(res) {
      Object.assign(res, utils.myLodashPick(userInfo, 'name', 'decoration', 'photo', 'sex', 'phone', 'email', 'common'))
      return manager.save(this.entityClass, res)
    } else {
      return {
        success: false,
        message: '未找到该用户'
      }
    }
  }

}

export default new UserInfoDao()