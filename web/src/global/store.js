import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import publicx from '../module/public/vuex'
import homex from '../module/home/vuex'
import coursex from '../module/course/vuex'
import userx from '../module/user/vuex'

Vue.use(Vuex)

const state = {
}
const mutations = {
}
const getters = {
}
const actions = {
  async uploadImg (context, file) {
    let formData = new FormData()
    let upload = await file
    formData.append('typeOption', 'upload_image')
    formData.append('upload', upload)
    const { data } = await api.imageUpload(formData)
    // data.default = process.env.VUE_APP_BASE_URL + data.default

    let baseUrl = process.env.VUE_APP_PHOTO_URL
    data.default = baseUrl + '/' + data.default
    return { data }
  },

  async uploadSection (context, file) {
    let formData = new FormData()
    let upload = await file
    formData.append('typeOption', 'upload_section')
    formData.append('upload', upload)
    const { data } = await api.sectionUpload(formData)
    // data.default = process.env.VUE_APP_BASE_URL + data.default

    let baseUrl = process.env.VUE_APP_PHOTO_URL
    data.default = baseUrl + '/' + data.default
    return { data }
  }
}

const modules = {
  publicx,
  homex,
  coursex,
  userx
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules,
  getters,
})
