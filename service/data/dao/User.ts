/**
 * Created by HPLWC on 2020/01/10.
 * */
import { BaseDao } from './BaseDao'
import User from '../entity/User'
import UserInfo from './UserInfo'
import { encrypto } from '../../services/config/encrypto'
import {utils} from '../../utils/utils'

class UserDao extends BaseDao<User> {
  constructor() {
    super(User)
  }

  async findOne(where) {
    const repository = this.getRepository()

    if(where.password) where.password = encrypto(where.password)

    const user = await repository.findOne({
      where,
      relations: ['userInfo'],
    })
    return user
  }

  async saveUser(user): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ username: user.username })
    if(!res) {
      // 设置uuid值
      user.id = this.getUuid().replace(/-/g, '')
      user.password = encrypto(user.password)
      user.role = typeof user.role === 'number' ? user.role : 2
      const res = await manager.save(this.entityClass, user)

      await UserInfo.saveUserInfo({email: user.username})
      return res
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

  async updateUser(user): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ username: user.email })
    console.log(111, res, 222)
    if(res) {
      // Object.assign(res, utils.myLodashPick(user, 'user_id'))
      res.userInfo = await UserInfo.findOne({id: user.user_id})
      return manager.save(this.entityClass, res)
    } else {
      return {
        success: false,
        message: '未找到该用户'
      }
    }
  }

}

export default new UserDao()