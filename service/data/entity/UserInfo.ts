import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import Attention from './Attention'
import Collection from './Collection'
import BaseEntity from './BaseEntity'

@Entity()
export default class UserInfo extends BaseEntity {

  @PrimaryColumn()
  public id: string

  @Column({ length: 255 })
  public name: string

  @Column()
  public sex: string

  @Column({ length: 11 })
  public phone: string

  @Column({ length: 255 })
  public photo: string

  @Column({ length: 50 })
  public email: string

  @Column({ length: 255 })
  public decoration: string

  @Column({ length: 255 })
  public common: string

  @OneToMany(type => Collection, collection => collection.userInfo)
  collections: Collection[]

  @OneToMany(type => Attention, attention => attention.attentionUserInfo)
  attentions: Attention[]
}