<template>
  <header>
    <b-nav class="nav d-flex justify-content-between align-items-center mt-2 mb-2">
      <b-col class="logo justify-content-start ms-5">
<<<<<<< HEAD
        <router-link class="text-decoration-none display-5 font-weight-bold" to="/"
          >FIND HOME</router-link
        >
      </b-col>
      <b-col cols="6" class="text-right">
        <router-link to="/map/search"
          ><button class="search-btn btn me-3" id="btn-homesearch">HomeSearch</button></router-link
        >
        <router-link to="/news"
          ><button class="news-btn btn me-3" id="btn-notice">News</button></router-link
        >
        <router-link to="/notice"
          ><button class="notice-btn btn me-3" id="btn-notice">Notice</button></router-link
        >
        <router-link to="/qna"
          ><button class="qna-btn btn me-3" id="btn-qna">Q&A</button></router-link
        >
      </b-col>
      <b-col cols="2" class="nav justify-content-end">
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar variant="info"></b-avatar>
            </template>
            <b-dropdown-item @click="myPage" v-b-modal.mypage> 마이페이지 </b-dropdown-item>
            <b-dropdown-item @click="onClickLogout"> 로그아웃 </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-modal id="mypage" ref="mypage" centered hide-footer hide-header>
            <user-my-page v-on:close="close" v-if="modalview === 'myPage'"></user-my-page>
            <user-modify-mypage
              v-on:close="close"
              v-else-if="modalview === 'mypageModify'"
            ></user-modify-mypage>
          </b-modal>
        </b-navbar-nav>

        <b-navbar-nav @click="loginForm()" v-else>
          <b-avatar variant="secondary"></b-avatar>
        </b-navbar-nav>
        <b-modal id="my-modal" ref="my-modal" centered hide-footer hide-header>
=======
        <h1>
          <router-link id="logo"  to="/" ><span style="position: absolute; clip: rect(0 0 0 0)">FIND HOME</span></router-link>
        </h1>
      </b-col>
      <b-col cols="6" class="text-right">
        <router-link to="/map/search"><button class="search-btn btn me-3" id="btn-homesearch">HomeSearch</button></router-link>
        <router-link to="/news"><button class="news-btn btn me-3" id="btn-notice">News</button></router-link>
        <router-link to="/notice"><button class="notice-btn btn me-3" id="btn-notice">Notice</button></router-link>
        <router-link to="/qna"><button class="qna-btn btn me-3" id="btn-qna">Q&A</button></router-link>
      </b-col>
      <b-col cols="2" class="nav justify-content-end">
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item-dropdown right menu-class="w-100" >
            <template #button-content>
              <b-avatar variant="info"></b-avatar>
            </template>
            <b-dropdown-item v-b-modal.mypage>
              마이페이지
            </b-dropdown-item>
            <b-dropdown-item @click="onClickLogout">
              로그아웃
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-modal  id="mypage" ref="mypage" centered hide-footer hide-header>
            <div>마이페이지</div>
          </b-modal>
        </b-navbar-nav>

        <b-navbar-nav @click="loginForm() " v-else>
          <b-avatar variant="secondary"></b-avatar>
        </b-navbar-nav> 
        <b-modal  id="my-modal" ref="my-modal" centered hide-footer hide-header>
>>>>>>> b7c60d922ab768a66697752b5a211fbd880d7e41
          <user-login v-on:close="close" v-if="modalview === 'login'"></user-login>
          <user-register v-on:close="close" v-else-if="modalview === 'join'"></user-register>
          <user-find-pwd v-on:close="close" v-else-if="modalview === 'findPwd'"></user-find-pwd>
        </b-modal>
      </b-col>
    </b-nav>
  </header>
</template>

<script>
<<<<<<< HEAD
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import UserLogin from '@/components/user/UserLogin.vue';
import UserFindPwd from '@/components/user/UserFindPwd.vue';
import UserRegister from '@/components/user/UserRegister.vue';
import UserMyPage from '@/components/user/UserMyPage.vue';
import UserModifyMypage from '@/components/user/UserModifyMypage.vue';
const memberStore = 'memberStore';
export default {
  components: {
    UserLogin,
    UserFindPwd,
    UserRegister,
    UserMyPage,
    UserModifyMypage,
  },
  name: 'HeaderNav',
  data() {
    return {};
  },

  methods: {
    ...mapActions(memberStore, ['userLogout']),
    ...mapMutations(memberStore, ['SET_MODAL_VIEW']),

    onClickLogout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('refresh-token');
    },
    close() {
      this.$refs['my-modal'].hide();
    },
    loginForm() {
      console.log('a');
      this.SET_MODAL_VIEW('login');
      this.$refs['my-modal'].show();
    },
    myPage() {
      this.SET_MODAL_VIEW('myPage');
      console.log('here');
    },
  },
  computed: {
    ...mapState(memberStore, ['userInfo', 'modalview']),
    ...mapGetters(memberStore, ['checkUserInfo']),
  },
=======
import { mapActions, mapState, mapGetters, mapMutations} from "vuex";
import UserLogin from "@/components/user/UserLogin.vue";
import UserFindPwd from "@/components/user/UserFindPwd.vue";
import UserRegister from "@/components/user/UserRegister.vue";
const memberStore = "memberStore";
export default {
  components:{
    UserLogin,
    UserFindPwd,
    UserRegister,
  },
  name: "HeaderNav",
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    ...mapMutations(memberStore, ["SET_MODAL_VIEW"]),

    onClickLogout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      
    },
    close(){
      this.$refs['my-modal'].hide();
    },
    loginForm(){
      console.log("a");
      this.SET_MODAL_VIEW("login");
      this.$refs['my-modal'].show();
    },
    
  },
  computed: {
    ...mapState(memberStore, ["userInfo", "modalview"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  
>>>>>>> b7c60d922ab768a66697752b5a211fbd880d7e41
};
</script>

<style scoped>
<<<<<<< HEAD
.b-avatar:hover {
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 255, 0.2);
}
=======
.b-avatar:hover{
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 255, .2); 
}
#logo::before{
  display:inline-block;
  width: 52px;
  height: 52px;
  vertical-align: top;
  content: '';
  background-image: url("@/assets/lokasi-logo-25379.png");
  background-size: 52px 52px;
  /* background-position: 0 -158px; */
}


>>>>>>> b7c60d922ab768a66697752b5a211fbd880d7e41
</style>
