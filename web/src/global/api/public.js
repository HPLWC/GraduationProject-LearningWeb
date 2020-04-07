/**
 * Created by HPLWC on 2020/01/20.
 * */
import request from '../request'

export default {
  test: (params) => request('get', '/public/test', params), // 测试
  login: (params, config) => request('post', '/public/user/login', params, config), // 登录
  logout: (params, config) => request('post', '/public/user/logout', params, config), // 退出登录
  userInfo: (params, config) => request('post', '/public/user/info', params, config), // 获取用户信息
  register: (params, config) => request('post', '/public/user/register', params, config), // 注册
  emailVerity: (params, config) => request('get', '/public/user/email', params, config), // 验证邮箱

  saveUserInfo: (params, config) => request('get', '/user/info/save', params, config), // 保存用户信息
}
