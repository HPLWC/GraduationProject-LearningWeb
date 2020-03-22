import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import BaseEntity from './BaseEntity'
import Section from './Section'
import CommentReply from './CommentReply'
import UserInfo from './UserInfo'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column()
  public content: string

  @ManyToOne(type => Section, Section => Section.id)
  @JoinColumn({ name: 'section_id' })
  section: Section

  @ManyToOne(type => UserInfo, UserInfo => UserInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo

  @OneToMany(type => CommentReply, commentReply => commentReply.comment)
  commentReply: CommentReply[]
}