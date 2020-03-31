/**
 * Created by HPLWC on 2020/03/01.
 * */
import request from '../request'

export default {
  getCourseAllType: (params, config) => request('get', '/course/type/all', params, config), // 获取所有课程种类
  getCourseAllInfo: (params, config) => request('get', '/course/info/all', params, config), // 获取所有课程详情
  deleteCollection: (params, config) => request('delete', '/user/collections/delete', params, config), // 取消收藏

  deleteCourseInfo: (params, config) => request('delete', '/course/info/delete', params, config), // 删除课程详情
}
