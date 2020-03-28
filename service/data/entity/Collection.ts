import {Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, JoinColumn} from 'typeorm'
import CourseInfo from './CourseInfo'
import BaseEntity from './BaseEntity'
import UserInfo from './UserInfo'

@Entity()
export default class Collection extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo

  @ManyToOne(type => CourseInfo, courseInfo => courseInfo.id)
  @JoinColumn({ name: 'course_info_id' })
  courseInfo: CourseInfo
}