/**
 * Created by 下雨收衫 on 2019.11.18
 */
import HpcVideo from '../baseComponent/HpcVideo'
import HpcUpload from '../baseComponent/HpcUpload'

export default {
  install (Vue) {
    Vue.component('hpc-video', HpcVideo)
    Vue.component('hpc-upload', HpcUpload)
  }
}
