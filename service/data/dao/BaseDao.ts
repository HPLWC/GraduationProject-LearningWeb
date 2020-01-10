import { getManager, getRepository } from 'typeorm'

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
    options.order = {addTime: 'ASC'}
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

  getRepository() {
    return getRepository<Model>(this.entityClass)
  }

}