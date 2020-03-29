import {Entity, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'
import BaseEntity from './BaseEntity'
import UserInfo from './UserInfo'

@Entity()
export default class Attention extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfo

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({ name: 'attention_user_id' })
  attentionUserInfo: UserInfo
}