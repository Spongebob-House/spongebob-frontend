<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1" style="border-top: 3px solid black">
      <h4 class="p-3" v-text="article.subject" ></h4>
      <div class="text-right" style="border-bottom: 1px solid lightgray">
        <b-col class="mb-3" >{{article.registerTime }} &nbsp; <b-icon icon="eye"></b-icon> {{article.hit}}</b-col>
      </div>
      <div class="my-3" style="border-bottom: 1px solid lightgray">
        <pre
        v-text="article.content"
        style="font-family: inherit; font-size: inherit; line-height: 2"
        ></pre>
      </div>
      <b-row></b-row>
      
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <router-link :to="{ name: 'boardlist' }"><b-button variant="outline-primary">목록</b-button></router-link>
      </b-col>
      <b-col class="text-right" v-if="articleOwner()">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardDetail",

  data() {
    return {
      isMemo: false,
      article: {},
      memo: {
        memono: "",
        userid: "admin",
        memotime: "",
        comment: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(memberStore, ["adminChk"]),
  },
  created() {
    http
      .get(`/board/view/${this.$route.params.articleno}`)
      .then(({ data }) => {
        this.article = data;
        return null;
      })
      .catch(() => {
        alert("글 불러오기 중 문제 발생");
      });
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    articleOwner() {
      if (this.userInfo) {
        if (this.userInfo.userId === this.article.userId) return true;

      }
      return false;
    }
  },

  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
