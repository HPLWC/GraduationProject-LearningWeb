import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export default class User {

  @PrimaryColumn()
  public id: string

  @Column({ length: 32 })
  public username: string

  @Column({ length: 32 })
  public password: string

  @Column({ default: 2 })
  public role: number
}