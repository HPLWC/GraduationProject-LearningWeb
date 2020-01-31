import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import UserInfo from './UserInfo'

@Entity()
export default class User {

  @PrimaryColumn()
  public id: string

  @Column({ length: 32 })
  public username: string

  @Column({ length: 32 })
  public password: string

  @Column({ default: 2 })
  public role: number

  @OneToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo
}