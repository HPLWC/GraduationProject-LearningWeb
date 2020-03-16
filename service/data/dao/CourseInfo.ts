/**
 * Created by HPLWC on 2020/02/25.
 * */
import { Like } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import { BaseDao } from './BaseDao'
import CourseInfo from '../entity/CourseInfo'
import { jwtSecret } from '../../services/config/encrypto'
import * as redis from '../../utils/redis'

class CourseInfoDao extends BaseDao<CourseInfo> {
  constructor() {
    super(CourseInfo)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const courseInfo = await repository.findOne({
      where,
      relations: ['courseType']
    })
    return courseInfo
  }

  async findAll(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)
    let courseInfo:any, total:number

    if(!(params.where.type_id === '0' || !params.where.type_id)) {
      let resP = await repository.createQueryBuilder('courseInfo')
        .innerJoin('courseInfo.courseType', 'type', 'type.id = :id', {id: params.where.type_id})
        .where('courseInfo.title Like :title', {title: params.where.title ? params.where.title._value : '%%'})
        .skip(params.pageNum - 1 || 0)
        .take(params.pageSize || 6)
      courseInfo = await resP.getMany()
      total = await resP.getCount()
    } else {
      courseInfo = await repository.find({
        where: params.where,
        order: { addTime: 'ASC' },
        skip: params.pageNum - 1 || 0,
        take: params.pageSize || 6,
      })
      total = await repository.count({where: params.where})
    }


    return {
      total: total,
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 6,
      data: courseInfo
    }
  }

  async saveInfo(info, myToken): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该名称
    const res = await this.findOne({ name: info.name })
    if(!res) {
      let decoded = jwt.verify(myToken, jwtSecret)
      let user = await redis.get(decoded.data.id)

      // 设置uuid值
      info.id = this.getUuid().replace(/-/g, '')
      info.user_id = user.userInfo.id
      return manager.save(this.entityClass, info)
    } else {
      return {
        success: false,
        message: '该种类已存在'
      }
    }
  }

  async updateInfo(info): Promise<any> {
    const manager = this.getManager()

    const res = await this.findOne({ id: info.id })
    if(!res) {
      return {
        success: false,
        message: '未查找到此课程'
      }
    } else {
      Object.assign(res, info)
      return manager.save(res)
    }
  }

  async deleteInfo(info): Promise<any> {
    // const manager = this.getManager()
    const repository = this.getRepository()

    const res = await this.findOne({ id: info.id })
    if(!res) {
      return {
        success: false,
        message: '未查找到此课程'
      }
    } else {
      let deleteRes = await repository.delete(res.id)
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

}

export default new CourseInfoDao()