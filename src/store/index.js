import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import memberStore from "@/store/modules/memberStore";
import mapStore from "@/store/modules/mapStore";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberStore,
    mapStore,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
