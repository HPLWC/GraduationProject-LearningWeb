import * as Router from 'koa-router'
import registerLearn from './learn'

const routes = new Router()

registerLearn(routes, '/learn')

export default routes