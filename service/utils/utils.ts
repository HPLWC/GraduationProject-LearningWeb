export default class Utils {

  // 仿lodash.pick
  myLodashPick (obj:Object, ...params) {
    // if (Object.prototype.toString.call(obj) !== '[object Object]') return {}
    let newObj = {}
    for (let key in obj) {
      if (params.includes(key))
        newObj[key] = obj[key]
    }
    return newObj
  }
}

export const utils = new Utils()