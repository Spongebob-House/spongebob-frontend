import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: null,
    saveId: null,
    sido: [],
  },
  getters: {
    loginChk: function (state) {
      return state.loginUser ? true : false;
    },
    adminChk: function (state) {
      if (state.loginUser) {
        return state.loginUser.userId === "admin" ? true : false;
      }
      return false;
    },
  },
  mutations: {
    SET_LOGIN_USER: function (state, user) {
      state.loginUser = user;
    },
    SET_SAVE_ID: function (state, saveId) {
      state.saveId = saveId;
    },
    SET_SIDO: function (state, sido) {
      state.sido = sido;
    },
    CLEAR_SAVE_ID: function (state) {
      state.saveId = null;
    },
    LOGOUT: function (state) {
      state.loginUser = null;
    },
  },
  actions: {
    sendRequest: function ({ commit }, regcode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      let params = "regcode_pattern=" + regcode + "&is_ignore_zero=true";
      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => commit("SET_SIDO", data.regcodes));
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
