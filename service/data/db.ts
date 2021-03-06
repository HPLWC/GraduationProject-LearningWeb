/**
 * Created by HPLWC on 2020/01/06.
 * */
import { createConnection } from 'typeorm'

export const connection = async (app: any) => {
  createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'learningWeb',
    entities: [ __dirname + '/entity/*.ts', 'dist/data/entity/*.js'], // 引入实体
  }).then((connection: any) => {
    console.log('数据库连接成功')
    app.listen(3000)
    return true
  }).catch((error: any) => {
    console.log(error)
    console.log('数据库连接异常')
    return false
  })
}