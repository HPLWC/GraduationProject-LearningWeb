export default (routes, prefix) => {
  require('./public').default(routes, prefix)
  require('./course').default(routes, prefix)
}