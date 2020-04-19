/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Section from '../entity/Section'
import CourseInfo from './CourseInfo'
import Comment from './Comment'

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

  async findAllByIds(where) {
    if(!where.id) return { success:false, data: [] }

    const repository = this.getRepository()

    let resP = await repository.createQueryBuilder('section')
      .innerJoinAndSelect('section.courseInfo', 'courseInfo')
      .leftJoinAndSelect('section.comment', 'comment')
      .leftJoinAndSelect('comment.commentReply', 'reply')
      .where('courseInfo.id = :id', { id: where.id })
    let section = await resP.getMany()
    const total = await resP.getCount()

    console.log(2333, section)
    // let sectionIds = section.map(item => item.id)

    return {
      total: total,
      data: section
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
  //   //   order: { addTime: 'DESC' },
  //   //   skip: params.pageNum - 1 || 0,
  //   //   take: params.pageSize || 10,
  //   // })
  //   let resP = await repository.createQueryBuilder('section')
  //     .innerJoinAndSelect('section.courseInfo', 'info', 'info.id = :id', {id: params.where.id})
  //     .skip(params.pageNum - 1 || 0)
  //     .take(params.pageSize || 10)
  //     .orderBy('section.section_num', 'DESC')
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

    section.courseInfo = await CourseInfo.findOne({ id: section.course_info_id })
    section.id = this.getUuid().replace(/-/g, '')
    return manager.save(this.entityClass, section)
  }

  async deleteSections(sectionIds) {
    const repository = this.getRepository()

    let comments = []
    let ids = sectionIds.map(item => {
      comments.push(...item.comment)
      return item.id
    })

    let deleteCom = await Comment.deleteComments(comments)

    let deleteRes = await repository.delete(ids)

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

export default new SectionDao()