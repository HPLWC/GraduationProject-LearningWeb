/**
 * Created by HPLWC on 2020/03/12.
 * */
import request from '../request'

export default {
  getCourseAllNameType: (params, config) => request('get', '/course/type/name/all', params, config), // 获取所有课程类型
  getTheCourseInfo: (params, config) => request('get', '/course/info/detail', params, config), // 获取某一课程详情
  getCourseAllSection: (params, config) => request('get', '/course/section/all', params, config), // 获取所有课程目录

  getTheComment: (params, config) => request('get', '/section/comment/all', params, config), // 获取相应课程评论
  saveTheFirstComment: (params, config) => request('post', '/section/comment/save', params, config), // 保存相应课程评论
  saveTheSecondComment: (params, config) => request('post', '/section/comment/reply/save', params, config), // 保存相应二级评论
}
