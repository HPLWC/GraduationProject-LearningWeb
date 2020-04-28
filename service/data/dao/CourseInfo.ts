/**
 * Created by HPLWC on 2020/02/25.
 * */
import { BaseDao } from './BaseDao'
import CourseInfo from '../entity/CourseInfo'
import UserInfo from './UserInfo'
import CourseType from './CourseType'
import Collection from './Collection'
import Section from './Section'

class CourseInfoDao extends BaseDao<CourseInfo> {
  constructor() {
    super(CourseInfo)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const courseInfo = await repository.findOne({
      ...where
    },{
      where,
      relations: ['courseType', 'userInfo'],
    })
    return courseInfo
  }

  async findAll(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)
    let courseInfo:any, total:number

    if(!(params.where.type_id === '0' || !params.where.type_id)) {
      console.log(params.where.user_id, 32222, params.where.user_id ? params.where.user_id : '%%')
      let resP = await repository.createQueryBuilder('courseInfo')
        .innerJoin('courseInfo.courseType', 'type', 'type.id = :id', {id: params.where.type_id})
        // .leftJoinAndSelect('courseInfo.userInfo', 'userInfo', 'userInfo.id Like :id', {id: params.where.user_id ? params.where.user_id : '%%'})
        .where('courseInfo.title Like :title', {title: params.where.title ? params.where.title._value : '%%'})
        // .where('userInfo.id Like :id', {id: params.where.user_id ? params.where.user_id : '%%'})
        .orderBy('courseInfo.addTime', 'DESC')
        .skip(params.pageNum - 1 || 0)
        .take(params.pageSize || 6)
      courseInfo = await resP.getMany()
      total = await resP.getCount()
    } else {
      courseInfo = await repository.find({
        where: params.where,
        order: { addTime: 'DESC' },
        relations: ['courseType', 'userInfo'],
        skip: parseInt(params.pageNum) - 1 || 0,
        take: parseInt(params.pageSize) || 6,
      })
      total = await repository.count({where: params.where})
    }


    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: courseInfo
    }
  }

  async findAllUpload(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)

    let resP = await repository.createQueryBuilder('courseInfo')
      .innerJoin('courseInfo.userInfo', 'userInfo', 'userInfo.id = :id', {id: params.where.user_id})
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 6)
    const courseInfo = await resP.getMany()
    const total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: courseInfo
    }
  }

  async findAllUser(where) {
    const repository = this.getRepository()
    const params = this.pickPage(where)
    let courseInfo:any, total:number

    if(!(params.where.type_id === '0' || !params.where.type_id)) {
      let resP = await repository.createQueryBuilder('courseInfo')
        .innerJoinAndSelect('courseInfo.userInfo', 'userInfo')
        .innerJoinAndSelect('courseInfo.courseType', 'type', 'type.id = :id', {id: params.where.type_id})
        .where('courseInfo.title Like :title', {title: params.where.title ? params.where.title._value : '%%'})
        .where('userInfo.id = :user_id', {user_id: params.where.user_id})
        .orderBy('courseInfo.addTime', 'DESC')
        .skip(params.pageNum - 1 || 0)
        .take(params.pageSize || 6)
      courseInfo = await resP.getMany()
      total = await resP.getCount()
    } else {
      let resP = await repository.createQueryBuilder('courseInfo')
        .innerJoin('courseInfo.userInfo', 'userInfo', 'userInfo.id = :id', {id: params.where.user_id})
        .where('courseInfo.title Like :title', {title: params.where.title ? params.where.title._value : '%%'})
        .orderBy('courseInfo.addTime', 'DESC')
        .skip(params.pageNum - 1 || 0)
        .take(params.pageSize || 6)
      courseInfo = await resP.getMany()
      total = await resP.getCount()
    }


    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 6,
      data: courseInfo
    }
  }

  async saveInfo(info): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该名称
    const res = await this.findOne({ title: info.title })
    if(!res) {
      const userInfo = await UserInfo.findOne({ id: info.user_id })
      const courseType = await CourseType.findOne({ id: info.type_id })

      info.userInfo = userInfo
      info.courseType = courseType

      // 设置uuid值
      info.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, info)
    } else {
      return {
        success: false,
        message: '该标题已存在',
        code: 300
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
      let collections = await Collection.findAllByIds({ id: res.id })
      let sections = await Section.findAllByIds({ id: res.id })

      let deleteCol:any, deleteSec:any
      if (collections.data.length > 0) {
        deleteCol = await Collection.deleteCollections(collections.data)
      } else {
        deleteCol = {
          success: true
        }
      }
      if (sections.data.length > 0) {
        deleteSec = await Section.deleteSections(sections.data)
      } else {
        deleteSec = {
          success: true
        }
      }

      if (!deleteCol.success) {
        return deleteCol
      }
      if (!deleteSec.success) {
        return deleteSec
      }

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

  async playInfo(info) {
    const manager = this.getManager()

    const res = await this.findOne({ id: info.id })
    if(!res) {
      return {
        success: false,
        message: '未查找到此课程'
      }
    } else {
      Object.assign(res, { play_num: ++ res.play_num })
      return manager.save(res)
    }
  }
}

export default new CourseInfoDao()