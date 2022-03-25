import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    folders: [],
  },

  mutations: {
    login(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.folders = payload.folders;
    }
  },
  actions: {},
  modules: {}

})
