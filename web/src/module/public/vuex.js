import api from '../../global/api'
import { ls } from '../../assets/utils'
import router from '../../global/router'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      ls.set('USER_INFO', userInfo)
      state.userInfo = userInfo
    },
  },
  actions: {
    test (context, params) {
      return api.test(params)
    },
    login (context, params) {
      return api.login(params)
    },
    async logout ({commit, status}, params) {
      const { data } = await api.logout(params)
      console.log(data)
      commit('SET_USER_INFO', {})
      if (data) {
        router.push('/login')
      }
    },
    userInfo (context, params) {
      return api.userInfo(params)
    },
  },
}
