/**
 * Created by HPLWC on 2020/03/12.
 * */
import request from '../request'

export default {
  getCourseAllNameType: (params, config) => request('get', '/course/type/name/all', params, config), // 获取所有课程类型
  getTheCourseInfo: (params, config) => request('get', '/course/info/detail', params, config), // 获取某一课程详情
}
