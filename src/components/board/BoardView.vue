<template>
  <b-container class="bv-example-row mt-3">
    
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form>
          <b-form-group id="userid-group" style="height: auto" label="작성자:" label-for="userid">
            <b-form-input
              id="user"
              v-model="article.userId"
              type="text"
              required
              placeholder="작성자 입력..."
              readonly></b-form-input>
            </b-form-group>
            
            <b-form-group id="subject-group" style="height: auto" label="제목:" label-for="subject">
            <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
            readonly></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" style="height: auto" label="내용:" label-for="content">
            <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            readonly></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="articleOwner">
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
