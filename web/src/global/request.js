import store from './store'
import axios from 'axios'
import { ls } from '../assets/utils/index'
import { Notification, MessageBox } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'learn', // api base_url
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 0 // 请求超时时间
})

let modal = null
const statusHandle = (status, data) => {
  switch (status) {
    case 403:
      Notification.error({ title: '系统提示', message: '您没有接口访问权限', duration: 4000 })
      break
    case 401:
      if (data.message === '未登录或已过期，请重新登录' || data.error.message === '未登录或已过期，请重新登录') {
        if (modal) {
          return
        }
        MessageBox('很抱歉，登录已过期，请重新登录', '登录已过期', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          store.dispatch('logout')
          // setTimeout(() => { modal = null }, 500)
          modal = null
        })
      }
      break
    case 404:
      Notification.error({ title: '系统提示', message: '很抱歉，资源未找到!', duration: 4000 })
      break
    case 504:
      Notification.error({ title: '系统提示', message: '网络超时' })
      break
    case 417:
      store.dispatch('errorPage')
      window.localStorage.setItem('error_msg', JSON.stringify(data.message))
      Notification.warning({ title: '系统提示', message: data.message, duration: 4000 })
      break
    default:
      Notification.error({
        title: '系统提示',
        message: data.message || data.data.message,
        duration: 4000
      })
      break
  }
}
const err = (error) => {
  if (error.response) {
    let data = error.response.data
    statusHandle(error.response.status, data)
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  // 加公共请求参数
  config.headers.token = ls.get('ACCESS_TOKEN') || ''
  return config
})

// response interceptor
service.interceptors.response.use(response => {
  if (response.data.success || response.data.code === 200) {
    return Promise.resolve(response.data)
  } else {
    statusHandle((response.data.error && response.data.error.code) || response.data.data.code, response.data)
    return response.data
  }
}, err)

export default (method, url, data = {}, myConfig = {}) => {
  const config = {
    method, url
  }
  if (config.method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  if (myConfig.download) {
    config.responseType = 'blob'
  }
  if (myConfig.loading !== false) {
  }
  return service.request(config)
    .then((data) => {
      if (myConfig.loading !== false) {
        // 显示loading
      }
      // FIXME: 先增加code === 0 判断，后期后端code成功返回修改200后，去掉"|| data.code === 0"
      if (data.code === 200) {
        return {data: data.data || {payload: data.payload} || {}, message: data.message, code: data.code, success: data.success}
      } else {
        // 默认情况下，此处统一提示服务端的错误信息，除非请求的时候设置了hideError为true
        if (!myConfig.hideError) {
          Notification.close()
          Notification.error({ title: '系统提示', message: data.error.message || '服务器异常' })
        }
        return {error: {code: data.code, message: data.message}}
      }
    })
    .catch((error) => {
      if (myConfig.loading !== false) {
        // 隐藏loading
      }
      return { error }
    })
}
