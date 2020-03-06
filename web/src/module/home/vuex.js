import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getCourseAllType (context, params) {
      return api.getCourseAllType(params)
    },
  },
}
