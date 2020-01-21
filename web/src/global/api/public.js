/**
 * Created by HPLWC on 2020/01/20.
 * */
import request from '../request'

export default {
  login: (params, config) => request('post', '/public/user/login', params, config),
}
