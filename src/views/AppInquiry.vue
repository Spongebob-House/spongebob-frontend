<template>
  <div>
    <qna-list v-if="qnaView === 'list'"></qna-list>
    <qna-write v-else-if="qnaView === 'write'"> </qna-write>
    <qna-view v-else-if="qnaView === 'view'"></qna-view>
    <qna-modify v-else-if="qnaView === 'modify'"></qna-modify>
    <qna-delete v-else-if="qnaView === 'delete'"></qna-delete>
  </div>
</template>

<script>
import http from "@/api/http";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaView from "@/components/qna/QnaView.vue";
import QnaModify from "@/components/qna/QnaModify.vue";
import QnaDelete from "@/components/qna/QnaDelete.vue";
import { mapState, mapMutations } from "vuex";
const qnaStore = "qnaStore";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "inquiry",
  components: {
    QnaWrite,
    QnaList,
    QnaView,
    QnaModify,
    QnaDelete,
  },
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      skey: "",
      sword: "",
      // qnaView: 'list',
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      this.articles = data;
      this.SET_QNA_VIEW("list");
    });
  },
  methods: {
    ...mapMutations(qnaStore, ["SET_QNA_VIEW"]),
    moveWrite() {
      this.$router.push({ name: "qnawrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "qnaview",
        params: { articleno: article.articleno },
      });
    },
    searchArticle() {
      http.get(`/qna`, { params: { key: this.skey, word: this.sword } }).then(({ data }) => {
        this.articles = data;
      });
    },
  },
  computed: {
    ...mapState(qnaStore, ["qnaView"]),
  },
};
</script>

<style scope>
h3 {
  text-align: center;
  margin-bottom: 10px;
}
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
th > div {
  text-align: center;
}
</style>
