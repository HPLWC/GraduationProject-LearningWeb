/**
 * Created by HPLWC on 2020/03/20.
 * */
import request from '../request'

export default {
  getTheUserCollections: (params, config) => request('get', '/user/collections/all', params, config), // 获取用户的收藏信息
  getTheUserAttentions: (params, config) => request('get', '/user/attentions/all', params, config), // 获取用户的关注用户
  saveTheUserAttentions: (params, config) => request('post', '/user/attentions/save', params, config), // 保存用户的关注用户
  deleteAttention: (params, config) => request('delete', '/user/attentions/delete', params, config), // 取消用户的关注用户

  imageUpload: (params, config) => request('post', '/image/upload', params, config), // 上传文件
  sectionUpload: (params, config) => request('post', '/section/upload', params, config), // 上传文件

  updateUserInfo: (params, config) => request('post', '/user/info/update', params, config), // 修改用户信息

  saveCourseInfo: (params, config) => request('post', '/course/info/save', params, config), // 添加课程详情
  getTheUploadCourseInfo: (params, config) => request('get', '/course/user/upload/all', params, config), // 获取用户的课程
}
