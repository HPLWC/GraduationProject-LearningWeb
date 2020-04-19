/**
 * Created by HPLWC on 2020/02/25.
 * */
import { BaseDao } from './BaseDao'
import Authentication from '../entity/Authentication'
import User from './User'
import {utils} from '../../utils/utils'

class AuthenticationDao extends BaseDao<Authentication> {
  constructor() {
    super(Authentication)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const authentication = await repository.findOne({
      ...where
    },{
      where,
      relations: ['user'],
    })
    return authentication
  }

  async findOneWithUser(where) {
    const repository = this.getRepository()

    // const authentication = await repository.findOne({
    //   ...where
    // },{
    //   where,
    //   relations: ['user'],
    // })
    const authentication = await repository.createQueryBuilder('authentication')
      .innerJoinAndSelect('authentication.user', 'user')
      .where('user.username = :username', { username: where.email })
      .getOne()
    return authentication
  }

  async findAll(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)
    let authentication = await repository.find({
      where: params.where,
      relations: ['user'],
      order: { addTime: 'DESC' },
      skip: parseInt(params.pageNum) - 1 || 0,
      take: parseInt(params.pageSize) || 6,
    })
    let total = await repository.count({where: params.where})

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: authentication
    }
  }

  async saveAuthentication(info): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该名称
    const res = await this.findOne({ username: info.username, school: info.school })
    if(!res) {
      info.user = await User.findOne({ id: info.user_id })

      // 设置uuid值
      info.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, info)
    } else {
      return {
        success: false,
        message: '已存在该老师',
        code: 300
      }
    }
  }

  async updateAuthentication(info): Promise<any> {
    const manager = this.getManager()

    const res = await this.findOne({ id: info.id })

    if(res) {
      Object.assign(res, utils.myLodashPick(info, 'username', 'school', 'material'))

      return manager.save(this.entityClass, res)
    } else {
      return {
        success: false,
        message: '未找到该申请信息'
      }
    }
  }

  async updateAdminAuthentication(info): Promise<any> {
    const manager = this.getManager()

    const res = await this.findOne({ id: info.id })

    if(res) {
      Object.assign(res, utils.myLodashPick(info, 'status'))
      res.user = await User.findOne({id: info.user_id})

      res.user.role = res.status === 1 ? 1 : 2
      let userInfo = JSON.parse(JSON.stringify(res.user))
      userInfo.email = res.user.username
      console.log(userInfo)
      await User.updateUser(userInfo)

      return manager.save(this.entityClass, res)
    } else {
      return {
        success: false,
        message: '未找到该申请信息'
      }
    }
  }

}

export default new AuthenticationDao()