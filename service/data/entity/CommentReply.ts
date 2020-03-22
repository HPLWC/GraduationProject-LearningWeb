import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'
import BaseEntity from './BaseEntity'
import Comment from './Comment'
import Section from './Section'
import UserInfo from './UserInfo'

@Entity()
export default class CommentReply extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column()
  public content: string

  @ManyToOne(type => Comment, Comment => Comment.id)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment

  @ManyToOne(type => UserInfo, UserInfo => UserInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo

  @ManyToOne(type => UserInfo, UserInfo => UserInfo.id)
  @JoinColumn({ name: 'to_user_id' })
  toUserInfo: UserInfo
}