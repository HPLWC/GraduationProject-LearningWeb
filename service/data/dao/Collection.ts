/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Collection from '../entity/Collection'
import UserInfo from './UserInfo'
import CourseInfo from './CourseInfo'

class CollectionDao extends BaseDao<Collection> {
  constructor() {
    super(Collection)
  }

  async findOne(where) {
    const repository = this.getRepository()

    const collection = await repository.findOne({
      where
    })
    return collection
  }

  async findAll(where) {
    if(!where.id) return { success:false, data: [] }

    const repository = this.getRepository()
    const params = this.pickPage(where)

    let resP = await repository.createQueryBuilder('collection')
      .innerJoinAndSelect('collection.userInfo', 'userInfo')
      .innerJoinAndSelect('collection.courseInfo', 'courseInfo')
      .where('userInfo.id = :id', { id: params.where.id })
      .skip(params.pageNum - 1 || 0)
      .take(params.pageSize || 10)
      .orderBy('collection.addTime', 'ASC')
    let collection = await resP.getMany()
    const total = await resP.getCount()

    return {
      total: total,
      pageNum: parseInt(params.pageNum) || 1,
      pageSize: parseInt(params.pageSize) || 10,
      data: collection
    }
  }

  async saveCollection(collection): Promise<any> {
    const manager = this.getManager()
    const userInfo = await UserInfo.findOne({id: collection.user_id})
    const courseInfo = await CourseInfo.findOne({id: collection.course_info_id})
    collection.userInfo = userInfo
    collection.courseInfo = courseInfo

    collection.id = this.getUuid().replace(/-/g, '')
    return manager.save(this.entityClass, collection)
  }

  async deleteCollection(where) {
    const repository = this.getRepository()

    const collection = await this.findOne({ id: where.id })

    if(!collection) {
      return {
        success: false,
        message: '未查找到此收藏内容'
      }
    } else {
      let deleteRes = await repository.delete(collection.id)
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

export default new CollectionDao()