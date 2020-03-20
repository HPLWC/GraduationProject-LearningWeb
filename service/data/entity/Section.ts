import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'
import BaseEntity from './BaseEntity'
import CourseInfo from './CourseInfo'

@Entity()
export default class Section extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column({ type: 'tinyint' })
  public section_num: number

  @Column()
  public title: string

  @Column()
  public decoration: string

  @Column()
  public video: string

  @Column({ type: 'tinyint' })
  public date: number

  @Column()
  public length: string

  @ManyToOne(type => CourseInfo, CourseInfo => CourseInfo.section)
  @JoinColumn({ name: 'info_id' })
  courseInfo: CourseInfo
}