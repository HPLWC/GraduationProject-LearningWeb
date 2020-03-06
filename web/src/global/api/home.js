/**
 * Created by HPLWC on 2020/03/01.
 * */
import request from '../request'

export default {
  getCourseAllType: (params, config) => request('get', '/course/type/all', params, config), // 获取所有课程种类
}
