import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm'
import CourseInfo from './CourseInfo'

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

  @ManyToMany(type => CourseInfo, courseInfo => courseInfo.userCollect)
  collections: CourseInfo[]
}