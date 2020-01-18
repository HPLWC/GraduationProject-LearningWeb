/**
 * Created by HPLWC on 2020/01/10.
 * */
import { BaseDao } from './BaseDao'
import User from '../entity/User'
import { encrypto } from '../../services/config/encrypto'

class UserDao extends BaseDao<User> {
  constructor() {
    super(User)
  }

  async findOne(where) {
    const repository = this.getRepository()

    if(where.password) where.password = encrypto(where.password)

    const user = await repository.findOne({
      where
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
      return manager.save(this.entityClass, user)
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

  async excPasswor(pwd1, pwd2) {

    return true
  }

}

export default new UserDao()