export default (routes, prefix) => {
  require('./public').default(routes, prefix)
  require('./course').default(routes, prefix)
  require('./comment').default(routes, prefix)
  require('./user').default(routes, prefix)
}