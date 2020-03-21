/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Section from '../entity/Section'
import CourseInfo from '../entity/CourseInfo'

class SectionDao extends BaseDao<Section> {
  constructor() {
    super(Section)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const section = await repository.findOne({
      where
    })
    return section
  }

  async findAll(where) {
    if(!where.id) return { success:false, data: [] }

    const repository = this.getRepository()
    const params = this.pickPage(where)

    // const sections = await repository.find({
    //   where: params.where,
    //   order: { addTime: 'ASC' },
    //   skip: params.pageNum - 1 || 0,
    //   take: params.pageSize || 10,
    // })
    let resP = await repository.createQueryBuilder('section')
      .innerJoinAndSelect('section.courseInfo', 'info', 'info.id = :id', {id: params.where.id})
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 10)
      .orderBy('section.section_num', 'ASC')
    let sections = await resP.getMany()
    const total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 10,
      data: sections
    }
  }

  // async findSectionAll(where) {
  //   if(!where.id) return { success:false, data: [] }
  //
  //   const repository = this.getRepository()
  //   const params = this.pickPage(where)
  //
  //   // const sections = await repository.find({
  //   //   where: params.where,
  //   //   order: { addTime: 'ASC' },
  //   //   skip: params.pageNum - 1 || 0,
  //   //   take: params.pageSize || 10,
  //   // })
  //   let resP = await repository.createQueryBuilder('section')
  //     .innerJoinAndSelect('section.courseInfo', 'info', 'info.id = :id', {id: params.where.id})
  //     .skip(params.pageNum - 1 || 0)
  //     .take(params.pageSize || 10)
  //     .orderBy('section.section_num', 'ASC')
  //   let sections = await resP.getMany()
  //   const total = await resP.getCount()
  //
  //   return {
  //     total: total,
  //     pageNum: parseInt(params.pageNum) || 1,
  //     pageSize: parseInt(params.pageSize) || 10,
  //     data: sections
  //   }
  // }

  async saveSection(section): Promise<any> {
    const manager = this.getManager()

    // 查询是否已存在该用户
    const res = await this.findOne({ user_id: section.user_id })
    if(!res) {
      // 设置uuid值
      section.id = this.getUuid().replace(/-/g, '')
      return manager.save(this.entityClass, section)
    } else {
      return {
        success: false,
        message: '用户名已存在'
      }
    }
  }

}

export default new SectionDao()