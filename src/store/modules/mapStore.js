import http from "@/api/http";

const mapStore = {
    namespaced: true,
    state: {
        sidos: [{ value: null, text: "선택하세요" }],
        guguns: [{ value: null, text: "선택하세요" }],
        dongs: [{ value: null, text: "선택하세요" }],
        mapList: [],
        markerPositions: [],
        interList: [],
    },
    getters: {
    },
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
        console.log(lists);
        console.log("A");
        lists.forEach((apt) => {
            state.mapList.push(apt);
        });
        },
        SET_MARKER_POSITIONS(state, lists){
            lists.forEach((apt) => {
                const arr = [];
                arr[0] = apt.lat;
                arr[1] = apt.lng;
                state.markerPositions.push(arr);
            })
        },
        APPEND_INTER_LIST(state, data){
            state.interList.push(data);
        },
        CLEAR_MARKER_POSITIONS(state){
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
        // commit("CLEAR_MARKER_POSITIONS");
        http
            .get(url)
            .then(({ data }) => {
                commit("SET_MAP_LIST", data)
                commit("SET_MARKER_POSITIONS", data)})
            .catch((error) => {
            console.log(error);
            });
        },
    },
}
export default mapStore;