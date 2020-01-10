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
      where,
      relations: ['role'],
    })
    console.log(user)
    // if (user && user.role) {
    //   user.roleIds = user.role.map((role: Role) => role.id)
    //   delete user.role
    // }
    return user
  }

}

export default new UserDao()