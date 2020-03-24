import api from '../../global/api'

export default {
  state: {},
  mutations: {},
  actions: {
    getTheUserCollections (context, params) {
      return api.getTheUserCollections(params)
    }
  },
}
