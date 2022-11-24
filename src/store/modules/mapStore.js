import http from "@/api/http";

const mapStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    mapList: [],
    markerPositions: [],
    categoryList: [],
    searchFlag: false,
    detailApt: {
      apartmentName: "",
      coffee: {
        name: "",
        dist: 0,
      },
      metro: {
        name: "",
        dist: 0,
      },
    },
    isCategories: {
      MT1: false,
      CS2: false,
      PS3: false,
      SC4: false,
      OL7: false,
      SW8: false,
      BK9: false,
      PO3: false,
    },
    isChanged: "",

    dealList: [],
  },
  getters: {},
  mutations: {
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

      lists.forEach((apt) => {
        state.mapList.push(apt);
      });
    },
    SET_MARKER_POSITIONS(state, lists) {
      lists.forEach((apt) => {
        const arr = [];
        arr[0] = apt.lat;
        arr[1] = apt.lng;
        state.markerPositions.push(arr);
      });
    },
    SET_SEARCH_FLAG_FALSE(state) {
      state.searchFlag = false;
    },
    SET_SEARCH_FLAG_TRUE(state) {
      state.searchFlag = true;
    },
    SET_DETAIL_APT(state, data) {
      state.detailApt = data;
    },
    SET_DEAL_LIST(state, list) {
      list.forEach((deal) => {
        state.dealList.push(deal);
      });
    },
    SET_CATEGORY_LIST(state, list) {
      state.categoryList = list;
    },
    SET_IS_CATEGORIES(state, key) {
      state.isCategories[key] = true;
    },
    SET_IS_CHANGED(state, key){
      state.isChanged = key;
    },

    CLEAR_MARKER_POSITIONS(state) {
      state.markerPositions = [];
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
    CLEAR_DEAL_LIST(state) {
      state.dealList = [];
    },
    CLEAR_CATEGORY_LIST(state) {
      state.categoryList = [];
    },
    CLEAR_IS_CATEGORIES(state, key) {
      state.isCategories[key] = false;
    },
    CLEAR_IS_CHANGED(state){
      state.isChanged = "";
    }
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
        });
    },
    homeSearch: function ({ commit }, data) {
      const url = "/map/search/" + data.dong + "/" + data.year + "/" + data.month;
      console.log(url);
      // commit("CLEAR_MARKER_POSITIONS");
      http
        .get(url)
        .then(({ data }) => {
          if (data.length == 0) {
            alert("해당지역에 거래내역이 없습니다!");
            return;
          }
          commit("SET_MAP_LIST", data);
          commit("SET_MARKER_POSITIONS", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    aptDetail: function ({ commit }, apt) {
      http
        .post("/map/detail", apt)
        .then(({ data }) => {
          commit("SET_DETAIL_APT", data.mapDto);
          commit("CLEAR_DEAL_LIST");
          commit("SET_DEAL_LIST", data.dealList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    aptSearch: function ({ commit }, latLng) {
      commit("CLEAR_MAP_LIST");
      commit("CLEAR_MARKER_POSITIONS");
      http
        .post("/map/aptsearch", latLng)
        .then(({ data }) => {
          commit("SET_MAP_LIST", data);
          commit("SET_MARKER_POSITIONS", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategory: function ({ commit }, data) {
      commit("CLEAR_CATEGORY_LIST");
      const REST_API_KEY = "ea24e1f6ec6a40170810bf2fa9ecc846";
      const headers = new Headers({ Authorization: `KakaoAK ${REST_API_KEY}` });
      const loop = async (categories) => {
        const promises = categories.map(async element => {
          return await fetch(
            `https://dapi.kakao.com/v2/local/search/category.json?y=${data.Lat}&x=${data.Lng}&rect=${
              data.ha, data.qa, data.oa, data.pa
            }&category_group_code=${element}&sort=distance&page=1`,
            {
              headers,
            }).then((res) => res.json())
            .then(({ documents }) => documents)
        })
        const results = await Promise.all(promises)
        const arr = [];
        results.forEach(d => arr.push(...d));
        commit("SET_CATEGORY_LIST", arr);
      }
        const categories = ["MT1", "CS2", "PS3", "SC4", "OL7", "SW8", "BK9", "PO3"];
        loop(categories)
    },
  }
}
export default mapStore;
