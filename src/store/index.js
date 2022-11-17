import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import http from "@/api/http.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: null,
    saveId: null,
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    mapList: [],
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
    SET_SIDO_LIST: function (state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.code, text: sido.name });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.code, text: gugun.name.split(" ")[1] });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.code, text: dong.name.split(" ")[2] });
      });
    },
    SET_MAP_LIST(state, lists) {
      console.log(lists);
      console.log("A");
      lists.forEach((apt) => {
        state.mapList.push(apt);
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_MAP_LIST(state) {
      state.mapList = [];
    },
    CLEAR_SAVE_ID: function (state) {
      state.saveId = null;
    },
    LOGOUT: function (state) {
      state.loginUser = null;
    },
  },
  actions: {
    getSido: function ({ commit }) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      let params = "regcode_pattern=" + "*00000000" + "&is_ignore_zero=true";
      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => {
          commit("SET_SIDO_LIST", data.regcodes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun: function ({ commit }, sidoCode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      let params = "regcode_pattern=" + sidoCode.substr(0, 2) + "*00000" + "&is_ignore_zero=true";
      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => commit("SET_GUGUN_LIST", data.regcodes))
        .catch((error) => {
          console.log(error);
        });
    },
    getDong: function ({ commit }, gugunCode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      let params = "regcode_pattern=" + gugunCode.substr(0, 5) + "*" + "&is_ignore_zero=true";
      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => commit("SET_DONG_LIST", data.regcodes))
        .catch((error) => {
          console.log(error);
        });
    },
    homeSearch: function ({ commit }, data) {
      const url = "/map/search/" + data.dong + "/" + data.year + "/" + data.month;
      console.log(url);
      http
        .get(url)
        .then(({ data }) => commit("SET_MAP_LIST", data))
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
