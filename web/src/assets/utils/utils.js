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
    if (!this.isObj(obj)) return false
    return Object.keys(obj).length <= 0
  }
  // 一维数组转为二维三列
  toTwoArray (arr, num) {
    console.log(arr.length)
    let len = arr.length / num
    let nArr = []
    for (let i = 0; i < len; i++) {
      nArr.push(arr.splice(0, 3))
    }
    return nArr
  }
}

export const utils = new Utils()
