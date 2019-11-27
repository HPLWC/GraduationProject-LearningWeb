/**
 * Created by HPLWC on 2019/11/24.
 */

export default class Utils {
  // 日期判断
  isDate (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]'
  }
  // 对象判断
  isObj (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  // 空对象判断
  isEmptyObject (obj) {
    return Object.keys(obj).length <= 0
  }
}

export const utils = new Utils()
