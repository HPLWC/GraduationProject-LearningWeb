/**
 * Created by HPLWC on 2020/02/02.
 * */
import { BaseDao } from './BaseDao'
import Section from '../entity/Section'

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
    const repository = this.getRepository()

    const sections = await repository.find({
      where
    })
    return sections
  }

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