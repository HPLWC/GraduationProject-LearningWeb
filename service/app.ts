import * as Koa from 'koa'
import * as koaBody from 'koa-bodyparser'
import routes from './services'
import { connection } from './data/db'

const app = new Koa()

// 中间件
app.use(koaBody())

app.use(routes.routes())
app.use(routes.allowedMethods())

connection(app)