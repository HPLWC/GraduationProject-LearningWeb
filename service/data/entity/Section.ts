import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export default class Section {

  @PrimaryColumn()
  public id: string

  @Column({ length: 32 })
  public info_id: string

  @Column({ type: 'tinyint' })
  public section_num: number

  @Column()
  public title: string

  @Column()
  public intro: string

  @Column()
  public video: string

  @Column({ type: 'tinyint' })
  public date: number

  @Column()
  public length: string
}