import * as Koa from 'koa'
import * as koaBody from 'koa-bodyparser'
import * as jwt from 'jsonwebtoken'
import * as serve from 'koa-static'
import * as cors from 'kcors'
import routes from './services'
import { connection } from './data/db'
import { jwtSecret, jwtExp } from './services/config/encrypto'
import * as redis from './utils/redis'

const app = new Koa()
const unTokenUrl = [
  '/learn/public/user/login',
  '/learn/public/user/logout',
  '/learn/public/user/register',
  '/learn/public/user/email',
  '/home',

  '/learn/course/type/all',
  '/learn/public/user/info',
  '/learn/course/info/all',
  '/learn/user/info/common',
]

/* 中间件 */
app.use(koaBody()) // 解析post请求的参数
app.use(cors({credentials: true})) // 跨域中间件
app.use(serve('static', {maxage: 20 * 60 * 1000}))// 设置静态文件中间件

/* 登录验证 */
app.use(async (ctx, next) => {
  let url = ctx.request.url.split('?')
  if(unTokenUrl.includes(url[0])) {
    return await next()
  }

  let decoded = null
  try {
    const token = ctx.header['token']
    decoded = jwt.verify(token, jwtSecret)
    ctx.state.session = await redis.get(decoded.data.id)
    // 如果redis里面没有缓存，抛出异常
    if (!ctx.state.session) {
      throw Error('')
    }
  } catch(err) {
    ctx.body = {
      success: false,
      error: {
        code: 401,
        message: '未登录或已过期，请重新登录'
      }
    }
    return
  }

  if(decoded) {
    await redis.expire(decoded.data.id, jwtExp)
    await next()
  }
})

app.use(routes.routes())
app.use(routes.allowedMethods())

connection(app)