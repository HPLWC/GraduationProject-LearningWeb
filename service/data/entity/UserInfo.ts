import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export default class UserInfo {

  @PrimaryColumn()
  public id: string

  @Column({ length: 255 })
  public name: string

  @Column()
  public sex: string

  @Column({ length: 11 })
  public phone: string

  @Column({ length: 50 })
  public email: string
}