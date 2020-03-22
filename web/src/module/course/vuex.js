import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getCourseAllNameType (context, params) {
      return api.getCourseAllNameType(params)
    },
    getTheCourseInfo (context, params) {
      return api.getTheCourseInfo(params)
    },
    getCourseAllSection (context, params) {
      return api.getCourseAllSection(params)
    },

    getTheComment (context, params) {
      return api.getTheComment(params)
    },
    saveTheFirstComment (context, params) {
      return api.saveTheFirstComment(params)
    },
    saveTheSecondComment (context, params) {
      return api.saveTheSecondComment(params)
    },
  },
}
