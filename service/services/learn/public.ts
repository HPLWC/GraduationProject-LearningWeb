import * as Dao from '../../data/dao'
import createBody from '../config/createBody'

async function test(ctx) {
  ctx.body = createBody({message: '测试数据'})
}

async function login(ctx) {
  const params = ctx.request.body
  const user = await Dao.User.findOne(params)
  console.log(user)
  ctx.body = createBody({message: '测试数据'})
}

export default (routes, prefix) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/login', login)
}