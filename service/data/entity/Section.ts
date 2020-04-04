import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import BaseEntity from './BaseEntity'
import CourseInfo from './CourseInfo'
import Comment from './Comment'

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

  // @Column({ type: 'tinyint' })
  // public date: number

  @Column()
  public length: string

  @ManyToOne(type => CourseInfo, CourseInfo => CourseInfo.section)
  @JoinColumn({ name: 'info_id' })
  courseInfo: CourseInfo

  @OneToMany(type => Comment, comment => comment.section)
  comment: Comment[]
}