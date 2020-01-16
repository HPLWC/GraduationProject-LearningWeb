/**
 * Created by HPLWC on 2020/01/10.
 * */
import { BaseDao } from './BaseDao'
import User from '../entity/User'

class UserDao extends BaseDao<User> {
  constructor() {
    super(User)
  }

  async findOne(where) {
    const repository = this.getRepository()
    const user = await repository.findOne({
      where
    })
    // if (user && user.role) {
    //   user.roleIds = user.role.map((role: Role) => role.id)
    //   delete user.role
    // }
    return user
  }

  async saveUser(user): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ username: user.username })
    if(!res) {
      // 设置uuid值
      user.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, user)
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

}

export default new UserDao()