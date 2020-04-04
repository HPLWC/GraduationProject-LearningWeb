import {CreateDateColumn, UpdateDateColumn} from 'typeorm'

export default abstract class BaseEntity {
  @CreateDateColumn()
  public addTime: String

  @UpdateDateColumn()
  public updateTime: String
}