<template>
  <b-container class="bv-example-row mt-3">

    <b-row class="mt-5 mb-3">

      <b-col class="text-left">
        <b-form class="d-flex" id="form-search" action="">
          <select
            class="form-select form-select-sm  me-1 w-50"
            id="skey"
            name="key"
            aria-label="검색조건"
            v-model="skey"
          >
            <option value="" selected>검색조건</option>
            <option value="subject" >제목</option>
          </select>
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" id="sword" name="word" placeholder="검색어..." v-model="sword" />
            <button id="btn-search" class="btn btn-dark" type="button" @click="searchArticle">검색</button>
          </div>
        </b-form>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-dark" v-if="adminChk" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="text-center"  hover :items="articles" :fields="fields" @row-clicked="viewArticle" style="cursor:pointer; border-top: 3px solid black "> </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";
import { mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      pgno: 1,
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      skey: "",
      sword: "",
    };
  },
  created() {
    http.get(`/board/list/${this.pgno}`).then(({ data }) => {
      this.articles = data;
    });
  },
  computed: {
    ...mapGetters(memberStore, ["adminChk"]),
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleNo },
      });
    },
    searchArticle() {
      if (this.skey === '') {
        alert("검색조건을 선택해주세요!")
        return;
      }
      http.get(`/board/list/${this.pgno}`, { params: { key: this.skey, word: this.sword } }).then(({ data }) => {
        this.articles = data;
      })
    }
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  height: 65px;
  text-align: center;
  
}
.table td{
  vertical-align: middle;
}
thead > tr{
  background-color: rgba(0,0,0,0.05);
}
.tdSubject {
  vertical-align: middle;
  width: 300px;
  text-align: center;
}
th > div{
  text-align: center;
}
</style>
