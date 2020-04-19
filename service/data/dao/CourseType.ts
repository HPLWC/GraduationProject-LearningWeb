/**
 * Created by HPLWC on 2020/02/03.
 * */
import { BaseDao } from './BaseDao'
import CourseType from '../entity/CourseType'
import { utils } from '../../utils/utils'

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
      order: { addTime: 'DESC' },
      skip: params.pageNum - 1 || 0,
      take: params.pageSize || 6
    })

    const total = await repository.count()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: courseType
    }
  }

  async findSelect(where, select) {
    const repository = this.getRepository()

    const courseType = await repository.find({
      select,
      where: where,
      order: { addTime: 'DESC' }
    })

    return courseType
  }

  async saveType(type): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该种类
    const res = await this.findOne({ title: type.title })
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
      // 判断是否有重复
      const nameRes = await this.findOne({ title: type.title })
      if(nameRes) return { success: false, message: '已存在此类型' }

      utils.myLodashPick(res, 'title', 'id', 'photo')
      Object.assign(res, utils.myLodashPick(type, 'title', 'decoration', 'photo'))
      return manager.save(res)
    }
  }

  async deleteType(type): Promise<any> {
    // const manager = this.getManager()
    const repository = this.getRepository()

    const res = await this.findOne({ id: type.id })
    if(!res) {
      return {
        success: false,
        message: '未查找到该种类'
      }
    } else {
      try {
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
      } catch(e) {
        return {
          success: false,
          message: '删除失败，该种类下有相关课程'
        }
      }

    }
  }
}

export default new CourseTypeDao()