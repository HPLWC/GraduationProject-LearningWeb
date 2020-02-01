/**
 * Created by HPLWC on 2020/01/20.
 * */
import request from '../request'

export default {
  test: (params) => request('get', '/public/test', params), // 测试
  login: (params, config) => request('post', '/public/user/login', params, config), // 登录
  logout: (params, config) => request('post', '/public/user/logout', params, config), // 退出登录
  userInfo: (params, config) => request('post', '/public/user/info', params, config), // 获取用户信息
}
