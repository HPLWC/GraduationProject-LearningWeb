import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn} from 'typeorm'
import BaseEntity from './BaseEntity'
import CourseInfo from './CourseInfo'

@Entity()
export default class CourseType extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column()
  public typename: string

  @Column()
  public intro: string

  @Column()
  public photo: string

  // 一个种类包含多个详情
  @OneToMany(type => CourseInfo, courseInfo => courseInfo.id)
  courseInfo: CourseInfo[]
}