<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div class="title">1:1 문의 내역</div>
        <hr class="line" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="!this.isdata">
          <div style="height: 10rem"><h2>등록된 1:1문의가 없습니다.</h2></div>
        </div>
        <b-table
          v-else
          class="text-center"
          borderless
          no-border-collapse
          hover
          head-variant="light"
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle"
          style="cursor: pointer">
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col style="display: flex; justify-content: center; margin: 10px 0">
        <b-button variant="outline-secondary" @click="moveWrite()">문의 하기</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";
import { mapState, mapMutations, mapGetters } from "vuex";
// import memberStore from '@/store/modules/memberStore';
const memberStore = "memberStore";
const qnaStore = "qnaStore";
export default {
  name: "QnaList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "memo", label: "답변상태", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      skey: "",
      sword: "",
      isdata: true,
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      if(this.checkUserInfo.userId !== "admin"){
        data = data.filter((data) => data.userid === this.checkUserInfo.userId);
      }
      this.articles = data;
      if (data.length === 0) {
        this.isdata = false;
      }
    });
  },
  methods: {
    ...mapMutations(qnaStore, ["SET_QNA_VIEW", "SET_ARTICLE_NO"]),
    moveWrite() {
      this.SET_QNA_VIEW("write");
    },
    viewArticle(article) {
      this.SET_QNA_VIEW("view");
      this.SET_ARTICLE_NO(article.articleno);
    },
    searchArticle() {
      http.get(`/qna`, { params: { key: this.skey, word: this.sword } }).then(({ data }) => {
        this.articles = data;
      });
    },
  },
  computed: {
    ...mapState(qnaStore, ["qnaView", "articleno"], memberStore, ["userInfo"]),
    ...mapGetters(memberStore, ["checkUserInfo", "getEmail"]),
  },
};
</script>

<style>
hr.line {
  /* border: none; */
  border: 3px solid black;
  /* border-radius: 2px; */
}
.title {
  font-weight: 500;
}
.tdClass {
  width: auto;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
  padding-left: 10rem;
}
th > div {
  text-align: center;
}
</style>
