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
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_SAVE_ID: (state, saveId) => {
      state.saveId = saveId;
    },

    SET_MODAL_VIEW: (state, modalview) => {
      state.modalview = modalview;
    },

    CLEAR_SAVE_ID: (state) => {
      state.saveId = null;
    },
    SET_EMAIL: (state, userInfo) => {
      state.email = userInfo.emailId + "@" + userInfo.emailDomain;
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
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
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
          console.log("aaaaaa");
          console.log(data);
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
          console.log(data);
          if (data != 0) {
            commit("SET_IS_DUPLICATE_ID", false);
            console.log(this.isDuplicateId);
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
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            commit("SET_EMAIL", data.userInfo);
            console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userId,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "main" });
              },
              (error) => {
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
            console.log("회원 정보 수정 완료!!!!");
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
            console.log("user join", data);
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

    // iD Check
  },
};
export default memberStore;
