import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import UserInfo from './UserInfo'
import Authentication from './authentication'
import BaseEntity from './BaseEntity'

@Entity()
export default class User extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column({ length: 32 })
  public username: string

  @Column({ length: 32 })
  public password: string

  @Column({ default: 2 })
  public role: number

  @Column({ default: 1 })
  public is_used: number


  @Column({ default: 0 })
  public is_used_comment: number

  @OneToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo
  //
  // @OneToOne(type => Authentication, authentication => authentication.id)
  // authentication: Authentication
}