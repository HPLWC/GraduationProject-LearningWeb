import {CreateDateColumn, UpdateDateColumn} from 'typeorm'

export default abstract class BaseEntity {
  @CreateDateColumn()
  public addTime: number

  @UpdateDateColumn()
  public updateTime: number
}