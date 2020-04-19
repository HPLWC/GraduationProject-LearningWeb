import { getManager, getRepository, Like } from 'typeorm'
import * as uuid from 'node-uuid'

export class BaseDao<Model> {
  protected entityClass

  constructor(entityClass) {
    this.entityClass = entityClass
  }

  findOne(query) {
    const entityManager = getManager()
    return entityManager.findOne(this.entityClass, query)
  }

  find(options: any = {}) {
    const entityManager = getManager()
    options.order = {addTime: 'DESC'}
    return entityManager.find(this.entityClass, options)
  }

  save(model: Model) {
    const entityManager = getManager()
    return entityManager.save(this.entityClass, model)
  }

  delete(id) {
    const entityManager = getManager()
    return entityManager.delete(this.entityClass, id)
  }

  // 提取搜索参数中的 pageSize 和 pageNum
  pickPage(where) {
    let params = JSON.parse(JSON.stringify(where))
    let likeQ = ['title'] // 需要模糊查询的数据
    if('pageSize' in params) delete params.pageSize
    if('pageNum' in params) delete params.pageNum

    // 将数据改成模糊查询
    for (let key in params) {
      if(likeQ.includes(key)) {
        params[key] = Like('%' + params[key] + '%')
      }
    }
    return {
      where: params,
      pageSize: where.pageSize,
      pageNum: where.pageNum
    }
  }

  getUuid() {
    return uuid.v1()
  }
  getRepository() {
    return getRepository<Model>(this.entityClass)
  }
  getManager() {
    return getManager()
  }

}