import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  modifyMypage,
  register,
  deleteUser,
  findPwd,
  idCheck,
} from "@/api/member";
import { getInter, appendInt, deleteInt } from "@/api/map.js";
import Vue from 'vue';
const memberStore = {
  namespaced: true,
  state: {
    saveId: null,
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    modalview: "login",
    email: null,
    newPwd: null,
    isDuplicateId: false,
    loginTrigger: false,
    interList: [],
  },
  getters: {
    getEmail: function (state) {
      return state.email;
    },
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
    adminChk: function (state) {
      if (state.userInfo) {
        return state.userInfo.userId === "admin" ? true : false;
      }
      return false;
    },
  },
  mutations: {
    SET_IS_DUPLICATE_ID: (state, isDuplicateId) => {
      state.isDuplicateId = isDuplicateId;
    },
    SET_NEW_PWD: (state, newPwd) => {
      state.newPwd = newPwd;
    },
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_SAVE_ID: (state, saveId) => {
      state.saveId = saveId;
    },

    SET_MODAL_VIEW: (state, modalview) => {
      state.modalview = modalview;
    },
    SET_EMAIL: (state, userInfo) => {
      state.email = userInfo.emailId + "@" + userInfo.emailDomain;
    },
    SET_INTER_LIST: (state, interList) => {
      state.interList = interList;
    },
    SET_LOGIN_TRIGGER: (state) => {
      state.loginTrigger = true;
    },
    CLEAR_LOGIN_TRIGGER: (state) => {
      state.loginTrigger = false;
    },
    CLEAR_INTER_LIST: (state) => {
      state.interList = [];
    },

    CLEAR_SAVE_ID: (state) => {
      state.saveId = null;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            Vue.$cookies.set("access-token", accessToken);
            Vue.$cookies.set("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
            alert("로그인 실패!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async findPassword({ commit }, user) {
      await findPwd(
        user,
        ({ data }) => {
          commit("SET_NEW_PWD", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async idConfirm({ commit }, userid) {
      await idCheck(
        userid,
        ({ data }) => {
          if (data != 0) {
            commit("SET_IS_DUPLICATE_ID", false);
          } else {
            commit("SET_IS_DUPLICATE_ID", true);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            commit("SET_EMAIL", data.userInfo);
            getInter(
              data.userInfo,
              ({ data }) => {
                commit("SET_INTER_LIST", data);
              },
            );
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async () => {
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            Vue.$cookies.set("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userId,
              ({ data }) => {
                if (data.message === "success") {
                  commit("CLEAR_INTER_LIST");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "main" });
              },
              () => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
            commit("CLEAR_INTER_LIST");
            router.push("/");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userDelete({ commit }, userid) {
      await deleteUser(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
            alert("회원탈퇴 완료");
            router.push("/");
          }
        },
        (error) => {
          console.log(error);
          alert("회원탈퇴 실패");
        }
      );
    },
    async userModify({ commit, state }, user) {
      const param = {
        userId: state.userInfo.userId,
        userName: user.userName,
        emailId: user.emailId,
        emailDomain: user.emailDomain,
      };
      await modifyMypage(
        param,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            commit("SET_EMAIL", data.userInfo);
          }
        },
        (error) => {
          console.log(error);
          alert("회원 정보 수정 실패 !!!");
        }
      );
    },
    async userJoin({ commit }, user) {
      await register(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            commit("SET_EMAIL", data.userInfo);
            alert("회원가입 완료!");
          }
        },
        (error) => {
          console.log(error);
          alert("회원가입 실패");
        }
      );
    },
    async pullInter({ commit, state }) {
      getInter(
        state.userInfo,
        ({ data }) => {
          commit("SET_INTER_LIST", data);
        },
      );
    },
    async appendInter({ commit, state }, aptCode) {
      const body = {
        aptCode: aptCode,
        userId: state.userInfo.userId,
      };
      await appendInt(
        body,
        ({ data }) => {
          if (data === "success") {
            getInter(
              state.userInfo,
              ({ data }) => {
                commit("SET_INTER_LIST", data);
              },
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async deleteInter({ commit, state }, aptCode) {
      const body = {
        aptCode: aptCode,
        userId: state.userInfo.userId,
      };
      await deleteInt(
        body,
        ({ data }) => {
          if (data === "success") {
            getInter(
              state.userInfo,
              ({ data }) => {
                commit("SET_INTER_LIST", data);
              },
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
export default memberStore;
