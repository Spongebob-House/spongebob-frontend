<template>
  <div>
    <h2>kakao</h2>
    <img
      class="kakao_btn"
      src="https://user-images.githubusercontent.com/55784772/203083888-412a4bc3-8fe9-4bff-9f7a-fd0a7a62ce82.png"
      @click="loginWithKakao" />
  </div>
</template>

<script>
export default {
  name: "KakaoLogin",
  methods: {
    loginWithKakao() {
      const params = {
        redirectUri: "http://localhost:8080/map/search/auth",
      };
      window.Kakao.Auth.authorize(params);
    },
  },
};
</script>
<!-- <template>
  <div id="app">
    <KakaoLogin
      api-key="aac6f5f23755d71e4ce203f95058f5f1"
      image="kakao_account_login_btn_medium_wide"
      :on-success="onSuccess"
      :on-failure="onFailure" />
  </div>
</template>

<script>
import KakaoLogin from "vue-kakao-login";

let onSuccess = (data) => {
  console.log(data);
  console.log("success");
};
let onFailure = (data) => {
  console.log(data);
  console.log("failure");
};

export default {
  name: "App",
  components: {
    KakaoLogin,
  },
  methods: {
    onSuccess,
    onFailure,
  },
};
</script>

<style></style>
<style></style> -->
