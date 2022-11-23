import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import memberStore from '@/store/modules/memberStore';
import mapStore from '@/store/modules/mapStore';
import qnaStore from '@/store/modules/qnaStore';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberStore,
    mapStore,
    qnaStore,
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
