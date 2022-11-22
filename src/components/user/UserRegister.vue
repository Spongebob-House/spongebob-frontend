<template>
  <div>
    <h2>회원가입</h2>
    <b-container id="mypage" style="height: 500px" class="mt -5 px -5">
      <b-form-group id="input-group-2" label="아이디" label-for="input-2">
        <b-form-input id="userid" v-model="user.userId" @blur="idChk" :state="idState"></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">중복된 아이디입니다 </b-form-invalid-feedback>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이름" label-for="input-2" class="mt-2">
        <b-form-input id="username" v-model="user.userName" @keyup.enter="chkVal"></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="비밀번호" label-for="input-2">
        <b-form-input id="userpwd" v-model="user.userPwd" @keyup.enter="chkVal"></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="비밀번호 확인" label-for="input-2">
        <b-form-input id="userpwd" v-model="user.userRePwd" @blur="pwdConfirm" :state="pwdState"></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback"> 비밀번호가 일치하지 않습니다. </b-form-invalid-feedback>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이메일" label-for="input-2" class="mt-2">
        <div class="email-wrapper">
          <b-form-input id="emailId" v-model="user.emailId" style="width: 180px"></b-form-input><span>@</span>
          <b-form-input id="emailDomain" v-model="user.emailDomain" style="width: 220px"></b-form-input>
        </div>
      </b-form-group>
      <br />
      <div class="bnt-group">
        <b-button @click="chkVal" type="submit" variant="primary" class="m-2">회원 가입</b-button>
      </div>
    </b-container>
  </div>
</template>
<script src="components/sweetalert/dist/sweetalert.min.js"></script>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  name: "userJoin",
  // computed: {
  //   pwdConfirm() {
  //     return this.user.userPwd === this.user.userRePwd ? true : false;
  //   },
  // },
  data() {
    return {
      user: {
        userId: "",
        userName: "",
        userPwd: "",
        userRePwd: "",
        userEmail: "",
        emailId: "",
        emailDomain: "",
      },
      pwdState: null,
      show: true,
      idState: null,
    };
  },
  methods: {
    ...mapActions(memberStore, ["userLogout", "userConfirm", "getUserInfo", "userJoin", "idConfirm"]),
    async confirm() {
      await this.userJoin(this.user);
      console.log("회원가입 완료");
      this.$swal("회원가입 완료하였습니다.", { icon: "success" }).then(() => this.$emit("close"));
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
    async idChk() {
      await this.idConfirm(this.user.userId);
      console.log(this.isDuplicateId);
      if (!this.isDuplicateId) {
        this.idState = false;
      } else {
        this.idState = true;
      }
    },

    pwdConfirm() {
      if (this.user.userPwd === this.user.userRePwd) {
        this.pwdState = true;
      } else {
        this.pwdState = false;
      }
    },
  },
  computed: {
    nameState() {
      console.log(this.user.userPwd);
      return this.user.userId.length > 2 ? true : false;
    },
    ...mapState(memberStore, ["isDuplicateId", "saveId", "userInfo", "isLogin", "isLoginError", "email"]),
    ...mapGetters(memberStore, ["checkUserInfo", "getEmail"]),
  },
};
</script>

<style>
h2 {
  text-align: center;
  padding: 20px 0;
}
.bnt-group {
  float: right;
}
.email-wrapper {
  display: flex;
}
span {
  margin: 4px;
}
</style>
