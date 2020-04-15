import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getTheUserCollections (context, params) {
      return api.getTheUserCollections(params)
    },
    getTheUserAttentions (context, params) {
      return api.getTheUserAttentions(params)
    },
    saveTheUserAttentions (context, params) {
      return api.saveTheUserAttentions(params)
    },
    deleteAttention (context, params) {
      return api.deleteAttention(params)
    },

    updateUserInfo (context, params) {
      return api.updateUserInfo(params)
    },
    updateUserPassword (context, params) {
      return api.updateUserPassword(params)
    },

    saveCourseInfo (context, params) {
      return api.saveCourseInfo(params)
    },

    getTheUploadCourseInfo (context, params) {
      return api.getTheUploadCourseInfo(params)
    },

    saveAuthentication (context, params) {
      return api.saveAuthentication(params)
    },
    updateAuthentication (context, params) {
      return api.updateAuthentication(params)
    },
    getTheAuthentication (context, params) {
      return api.getTheAuthentication(params)
    },
  },
}
