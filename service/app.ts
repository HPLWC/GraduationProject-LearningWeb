import * as Koa from 'koa'
import routes from './services'
import { connection } from './data/db'

const app = new Koa()

app.use(routes.routes())

connection(app)