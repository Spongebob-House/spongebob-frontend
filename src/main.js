import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSwal from "vue-swal";
import VueCookies from "vue-cookies";
import "@/api/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import "@/api/vueBootstrap.js";

Vue.config.productionTip = false;
Vue.use(VueSwal);
Vue.use(VueCookies);
Vue.$cookies.config('7d','','',true);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// Vue.use(GAuth, {
//   clientId: process.env.VUE_APP_OAUTH_CLIENT, // 아까 .env 파일에 저장해둔 그것임
//   scope: "profile email https://www.googleapis.com/auth/plus.login",
// });
// window.Kakao.init("aac6f5f23755d71e4ce203f95058f5f1");
