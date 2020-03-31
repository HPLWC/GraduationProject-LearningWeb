import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import BaseEntity from './BaseEntity'
import CourseType  from './CourseType'
import UserInfo from './UserInfo'
import Section from './Section'
import Collection from './Collection'

@Entity()
export default class CourseInfo extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column()
  public title: string

  @Column()
  public decoration: string

  @Column()
  public photo: string

  @Column({type: 'tinyint', default: 0})
  public play_num: number

  @Column({type: 'tinyint'})
  public date: number

  @ManyToOne(type => CourseType, courseType => courseType.id)
  @JoinColumn({ name: 'type_id' })
  courseType: CourseType

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo

  @OneToMany(type => Section, Section => Section.courseInfo)
  section: Section[]

  @OneToMany(type => Collection, collection => collection.courseInfo)
  collections: Collection[]
}