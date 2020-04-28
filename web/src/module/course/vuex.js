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
    getTheUserCourseInfo (context, params) {
      return api.getTheUserCourseInfo(params)
    },
    getTheUserInfo (context, params) {
      return api.getTheUserInfo(params)
    },
    getCourseAllSection (context, params) {
      return api.getCourseAllSection(params)
    },
    saveCourseSection (context, params) {
      return api.saveCourseSection(params)
    },
    deleteCourseSection (context, params) {
      return api.deleteCourseSection(params)
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

    getIsCollection (context, params) {
      return api.getIsCollection(params)
    },
    saveCollection (context, params) {
      return api.saveCollection(params)
    },

    getIsAttention (context, params) {
      return api.getIsAttention(params)
    },

    playCourseInfo (context, params) {
      return api.playCourseInfo(params)
    },
  },
}
