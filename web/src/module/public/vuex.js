import api from '../../global/api'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    login (context, params) {
      return api.login(params)
    }
  },
}
