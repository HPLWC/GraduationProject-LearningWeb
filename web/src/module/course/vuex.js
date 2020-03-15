import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getCourseAllNameType (context, params) {
      return api.getCourseAllNameType(params)
    }
  },
}
