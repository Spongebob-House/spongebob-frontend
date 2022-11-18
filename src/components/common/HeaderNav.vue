<template>
  <header>
    <div class="nav d-flex justify-content-between align-items-center mt-2 mb-2">
      <div class="logo justify-content-start ms-5">
        <router-link class="text-decoration-none ddisplay-5 font-weight-bold" to="/">FIND HOME</router-link>
      </div>
      <div class="nav justify-content-end logined" v-if="userInfo">
        <div class="logined-info me-3 align-middle">
          <strong>{{ userInfo.userName }}</strong> 님 안녕하세요.
        </div>
        <router-link to="/map/hospital"
          ><button class="hospital-btn btn me-3" id="btn-hospital">Hospital</button></router-link
        >
        <router-link to="/map/corona"><button class="corona-btn btn me-3" id="btn-corona">Corona</button></router-link>
        <router-link to="/map/search"
          ><button class="mvsearch-btn btn me-3" id="btn-homesearch">HomeSearch</button></router-link
        >
        <router-link to="/notice"><button class="notice-btn btn me-3" id="btn-notice">Notice</button></router-link>
        <router-link to="/qna"><button class="qna-btn btn me-3" id="btn-qna">Q&A</button></router-link>
        <router-link to="/mypage"><button class="mypage-btn btn me-3" id="btn-mypage">MyPage</button></router-link>
        <button class="logout-btn btn me-3" id="btn-logout" @click="onClickLogout">Logout</button>
      </div>
      <div class="nav justify-content-end" v-else>
        <router-link to="/join"><button id="btn-mv-join" class="join-btn btn me-3">Join</button></router-link>

        <div class="login-area me-3">
          <b-dropdown
            right
            type="button"
            id="dropdownMenu"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            text="Login">
            <b-dropdown-form id="form-login">
              <div class="form-check mb-3 float-end">
                <input class="form-check-input" type="checkbox" value="ok" id="saveid" name="saveid" v-model="save" />
                <label class="form-check-label" for="saveid"> 아이디저장 </label>
              </div>
              <div class="mb-3">
                <label for="userid" class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="userid"
                  name="userid"
                  placeholder="ID..."
                  v-model="user.userId"
                  @keyup.enter="chkVal" />
              </div>
              <div class="mb-3">
                <label for="userpwd" class="form-label">PW</label>
                <input
                  type="password"
                  class="form-control"
                  id="userpwd"
                  name="userpwd"
                  placeholder="PW..."
                  v-model="user.userPwd"
                  @keyup.enter="chkVal" />
              </div>
              <div class="col-auto text-center">
                <button type="button" id="btn-login" class="btn btn-outline-primary mb-3" @click="chkVal">Login</button>
                <router-link to="/findpwd"
                  ><button type="button" id="btn-findpw" class="btn btn-primary mb-3">
                    비밀번호 찾기
                  </button></router-link
                >
              </div>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

const memberStore = "memberStore";
export default {
  name: "HeaderNav",
  data() {
    return {
      user: {
        userId: "",
        userPwd: "",
      },
      save: false,
    };
  },
  methods: {
    ...mapActions(memberStore, ["userLogout", "userConfirm", "getUserInfo"]),
    ...mapMutations(memberStore, ["SET_SAVE_ID", "CLEAR_SAVE_ID"]),
    async confirm() {
      if(this.save){
        this.SET_SAVE_ID(this.user.userId);
      }
      else{
        this.CLEAR_SAVE_ID();
      }
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
      }
    },
    onClickLogout() {
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      if(!this.save){
        this.user.userId = "";
      }
      this.user.userPwd = "";
    },
    refreshAll() {
      // 새로고침
      this.$router.go();
    },
    chkVal() {
      if (this.user.userId.length === 0) {
        alert("아이디를 적어주세요!");
      } else if (this.user.userPwd.length === 0) {
        alert("비밀번호를 적어주세요!");
      } else {
        this.confirm();
      }
    },
    
  },
  computed: {
    ...mapState(memberStore, ["saveId", "userInfo", "isLogin", "isLoginError"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  created() {
    this.user.userId = this.saveId;
    if (this.user.userId) {
      this.save = true;
    }
  },
};
</script>

<style></style>
