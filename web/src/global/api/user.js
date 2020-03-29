/**
 * Created by HPLWC on 2020/03/20.
 * */
import request from '../request'

export default {
  getTheUserCollections: (params, config) => request('get', '/user/collections/all', params, config), // 获取用户的收藏信息
  getTheUserAttentions: (params, config) => request('get', '/user/attentions/all', params, config), // 获取用户的关注用户
  saveTheUserAttentions: (params, config) => request('post', '/user/attentions/save', params, config), // 保存用户的关注用户
  deleteAttention: (params, config) => request('delete', '/user/attentions/delete', params, config), // 取消用户的关注用户
}
