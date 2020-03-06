/**
 * Created by HPLWC on 2020/02/25.
 * */
import { BaseDao } from './BaseDao'
import CourseInfo from '../entity/CourseInfo'

class CourseInfoDao extends BaseDao<CourseInfo> {
  constructor() {
    super(CourseInfo)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const courseInfo = await repository.findOne({
      where
    })
    return courseInfo
  }

  async findAll(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)

    const courseInfo = await repository.find({
      where: params.where,
      order: { addTime: 'ASC' },
      skip: params.pageNum - 1 || 0,
      take: params.pageSize || 6
    })
    return courseInfo
  }

  async saveInfo(type): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该
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

export default new CourseInfoDao()