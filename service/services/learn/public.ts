import * as jwt from 'jsonwebtoken'
import * as Dao from '../../data/dao'
import createBody from '../config/createBody'
import * as redis from '../../utils/redis'
import { jwtSecret, jwtExp } from '../config/encrypto'
import nodemail from '../config/mail'

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
  const user = await Dao.User.findOne(params)
  if(user) {
    console.log(user)
    if(!user.is_used) {
      console.log(111)
      ctx.body = createBody({}, false, 0, '该用户目前被停用')
    } else {
      const token = jwt.sign({
        data: {
          id: user.id,
          password: user.password,
          username: user.username
        }
      }, jwtSecret, {expiresIn: jwtExp})
      await redis.set(user.id, {user}, jwtExp)
      ctx.body = createBody({token, role: user.role})
    }
  } else {
    ctx.body = createBody({}, false, 0, '用户名密码不匹配')
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
  // const userInfo = decoded.data && decoded.data.userInfo
  const user = await Dao.User.findOne({id: decoded.data.id})
  const userInfo = { ...user.userInfo, role: user.role }
  if(userInfo) {
    ctx.body = createBody(userInfo)
  } else {
    ctx.body = createBody(null, false, 0, '无该用户信息')
  }
}

/* 邮箱验证 */
async function emailVerify(ctx) {
  const params = ctx.request.query
  const code = Math.floor(Math.random() * (9999-1000)) + 1000

  let res = await Dao.User.findOne({username: params.email})
  if(!res) {
    ctx.body = createBody({}, true, 200, '邮箱可用')
    const mail = {
      // 发件人
      from: '易上课注册码 <15113125919@163.com>',
      // 主题
      subject: '注册验证码',
      // 收件人
      to: params.email,
      // 邮件内容，HTML格式
      text: `验证码为：${code}` // 发送验证码
    }
    await redis.set(params.email, {code}, 5 * 60)
    await nodemail(mail) // 发送邮件
  } else {
    ctx.body = createBody({}, false, 0, '邮箱已被绑定')
  }
}

async function doRegister(ctx) {
  const params = ctx.request.body

  const data = await redis.get(params.email)

  if(data && data.code && data.code == params.code) {
    const user = await Dao.User.saveUser({
      username: params.email,
      password: params.password
    })
    if(user.success === false) {
      ctx.body = createBody(null, false, 0, user.message)
    } else {
      const userInfo = await Dao.User.findOne({id: user.id})
      const token = jwt.sign({data: user}, jwtSecret, { expiresIn: jwtExp})
      await redis.set(user.id, {user}, jwtExp)

      ctx.body = createBody({token, userId: userInfo.userInfo && userInfo.userInfo.id})
    }
  } else {
    ctx.body = createBody({message: '验证码错误'}, false, 0, '验证码错误')
  }
}

export default (routes, prefix) => {
  routes.get(prefix + '/public/test', test)
  // routes.post(prefix + '/public/user/register', register)
  routes.post(prefix + '/public/user/login', login)
  routes.post(prefix + '/public/user/logout', logout)
  routes.post(prefix + '/public/user/info', userInfo)

  routes.get(prefix + '/public/user/email', emailVerify)
  routes.post(prefix + '/public/user/register', doRegister)
}