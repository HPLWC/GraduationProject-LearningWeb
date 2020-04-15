/* 接口数据返回格式 */
export default function createBody(data:any = {}, success = true, code = 200, message:string | { message, code } = '') {
  let re: any = {
    success: typeof data.success === 'boolean' ? data.success : success,
    code: data.code || code,
    data,
    message: data.message || ''
  }
  if (!success || !re.success) {
    if (typeof message === 'string') {
      re.error = { code, message }
    } else {
      re.error = message
    }
  }
  return re
}