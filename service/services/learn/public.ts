import * as jwt from 'jsonwebtoken'
import * as Dao from '../../data/dao'
import createBody from '../config/createBody'
import { jwtSecret, jwtExp } from '../config/token'

/* 测试接口 */
async function test(ctx) {
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
    ctx.body = createBody({token})
  }
}

/* 登录接口 */
async function login(ctx) {
  const params = ctx.request.body
  const user = await Dao.User.findOne(params)
  if(user) {
    const token = jwt.sign({data: user}, jwtSecret, { expiresIn: jwtExp})
    ctx.body = createBody({token})
  } else {
    ctx.body = createBody(null, false, 0, '用户名密码不匹配')
  }
}

export default (routes, prefix) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/user/register', register)
  routes.post(prefix + '/public/user/login', login)
}