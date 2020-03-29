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
  },
}
