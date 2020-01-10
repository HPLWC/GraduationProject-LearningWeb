/* 接口数据返回格式 */
export default function createBody(data= {}, success = true, code = 200, message:string | { code, message } = '') {
  let re: any = {
    success,
    code,
    data
  }
  if (!success) {
    if (typeof message === 'string') {
      re.error = { code, message }
    } else {
      re.error = message
    }
  }
  return re
}