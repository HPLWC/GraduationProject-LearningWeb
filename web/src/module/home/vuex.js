import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getCourseAllType (context, params) {
      return api.getCourseAllType(params)
    },
    getCourseAllInfo (context, params) {
      return api.getCourseAllInfo(params)
    },
    deleteCollection (context, params) {
      return api.deleteCollection(params)
    },

    deleteCourseInfo (context, params) {
      return api.deleteCourseInfo(params)
    },

    getUserInfoCommon (context, params) {
      return api.getUserInfoCommon(params)
    },
  },
}
