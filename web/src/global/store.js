import Vue from 'vue'
import Vuex from 'vuex'
import publicx from '../module/public/vuex'

Vue.use(Vuex)

const state = {
}
const mutations = {
}
const getters = {
}
const actions = {
}

const modules = {
  publicx
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules,
  getters,
})
