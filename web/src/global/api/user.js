/**
 * Created by HPLWC on 2020/03/20.
 * */
import request from '../request'

export default {
  getTheUserCollections: (params, config) => request('get', '/user/collections/all', params, config), // 获取用户的收藏信息
}
