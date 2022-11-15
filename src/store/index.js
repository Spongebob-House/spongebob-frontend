import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: null,
    saveId: null,

  },
  getters: {
    loginChk: function (state){
      return state.loginUser ? true : false;
    }
  },
  mutations: {
    SET_LOGIN_USER: function (state, user){
      state.loginUser = user;
    },
    SET_SAVE_ID: function(state, saveId){
      state.saveId = saveId;
    },
    CLEAR_SAVE_ID: function(state){
      state.saveId = null;
    },
    LOGOUT: function (state){
      state.loginUser = null;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ]
})
