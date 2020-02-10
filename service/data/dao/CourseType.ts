/**
 * Created by HPLWC on 2020/02/03.
 * */
import { BaseDao } from './BaseDao'
import CourseType from '../entity/CourseType'

class CourseTypeDao extends BaseDao<CourseType> {
  constructor() {
    super(CourseType)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const courseType = await repository.findOne({
      where
    })
    return courseType
  }

  async findAll(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)

    const courseType = await repository.find({
      where: params.where,
      order: { addTime: 'ASC' },
      skip: params.pageNum - 1 || 0,
      take: params.pageSize || 6
    })
    return courseType
  }

  async saveType(type): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该种类
    const res = await this.findOne({ name: type.name })
    if(!res) {
      // 设置uuid值
      type.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, type)
    } else {
      return {
        success: false,
        message: '该种类已存在'
      }
    }
  }

  async updateType(type): Promise<any> {
    const manager = this.getManager()

    const res = await this.findOne({ id: type.id })
    if(!res) {
      return {
        success: false,
        message: '未查找到该种类'
      }
    } else {
      Object.assign(res, type)
      return manager.save(res)
    }
  }

}

export default new CourseTypeDao()