import {Entity, PrimaryColumn, OneToOne, JoinColumn, Column} from 'typeorm'
import BaseEntity from './BaseEntity'
import User from './User'

@Entity()
export default class Authentication extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column()
  public username: string

  @Column()
  public school: string

  @Column()
  public material: string

  @Column({ default: 0 })
  public status: number

  @OneToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User

}