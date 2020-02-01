import * as jwt from 'jsonwebtoken'
import * as Dao from '../../data/dao'
import createBody from '../config/createBody'
import * as redis from '../../utils/redis'
import { jwtSecret, jwtExp } from '../config/encrypto'

/* 测试接口 */
async function test(ctx, a) {
  ctx.body = createBody({message: '测试数据'})
}

/* 注册接口 */
async function register(ctx) {
  const params = ctx.request.body

  if(!params.username || !params.password) {
    ctx.body = createBody({}, false, 0, '用户名或密码不能为空')
    return
  }

  const user = await Dao.User.saveUser(params)
  if(user.success === false) {
    ctx.body = createBody(null, false, 0, user.message)
  } else {
    const token = jwt.sign({data: user}, jwtSecret, { expiresIn: jwtExp})
    await redis.set(user.id, {user}, jwtExp)
    ctx.body = createBody({token})
  }
}

/* 登录接口 */
async function login(ctx) {
  const params = ctx.request.body
  if(!params.username || !params.password) {
    ctx.body = createBody({}, false, 0, '用户名或密码不能为空')
    return
  }
  // const user = await Dao.User.findOne({username: params.username})
  const user = await Dao.User.findOne(params)
  if(user) {
    const token = jwt.sign({data: user}, jwtSecret, { expiresIn: jwtExp})
    await redis.set(user.id, {user}, jwtExp)
    ctx.body = createBody({token})
  } else {
    ctx.body = createBody(null, false, 0, '用户名密码不匹配')
  }
}

/* 退出登录接口 */
async function logout(ctx) {
  const params = ctx.request.body
  try {
    const token = ctx.header['token']
    const decoded = jwt.verify(token, jwtSecret)
    if (decoded) {
      await redis.del(decoded.data.id)
    }
  } catch {
    console.log('token已过期')
  } finally {
    ctx.body = createBody({message: '退出成功'}, true, 200, '退出成功')
  }
}

/* 获取用户详情接口 */
async function userInfo(ctx) {
  const token = ctx.header['token']
  const decoded = jwt.verify(token, jwtSecret)
  const userInfo = decoded.data && decoded.data.userInfo
  if(userInfo) {
    ctx.body = createBody(userInfo)
  } else {
    ctx.body = createBody(null, false, 0, '无该用户信息')
  }
}

export default (routes, prefix) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/user/register', register)
  routes.post(prefix + '/public/user/login', login)
  routes.post(prefix + '/public/user/logout', logout)
  routes.post(prefix + '/public/user/info', userInfo)
}