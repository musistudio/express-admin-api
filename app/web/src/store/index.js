import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem("token")
  },
  mutations: {
    login(state, token) {
      window.sessionStorage.setItem("token", token);
      state.token = token;
    }
  },
  actions: {}
});
