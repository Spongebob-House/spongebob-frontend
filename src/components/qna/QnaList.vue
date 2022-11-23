<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="m-4">
      <b-col>
        <h3>1:1 문의</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div v-if="!this.isdata"><h2>No data</h2></div>
        <b-table
          v-else
          class="text-center"
          striped
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle"
          style="cursor: pointer"
        >
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right">
        <b-button @click="moveWrite()">문의 하기</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from '@/api/http';
import { mapState, mapMutations, mapGetters } from 'vuex';
// import memberStore from '@/store/modules/memberStore';
const memberStore = 'memberStore';
const qnaStore = 'qnaStore';
export default {
  name: 'QnaList',
  data() {
    return {
      articles: [],
      fields: [
        { key: 'articleno', label: '글번호', tdClass: 'tdClass' },
        { key: 'subject', label: '제목', tdClass: 'tdSubject' },
        { key: 'userid', label: '작성자', tdClass: 'tdClass' },
        { key: 'regtime', label: '작성일', tdClass: 'tdClass' },
        { key: 'hit', label: '조회수', tdClass: 'tdClass' },
      ],
      skey: '',
      sword: '',
      isdata: true,
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      console.log(data);
      data = data.filter(data => data.userid === this.checkUserInfo.userId);
      this.articles = data;
      // console.log(data[0].userid);const result = words.filter(word => word.length > 6);
      console.log(this.checkUserInfo.userId);
      if (data.length === 0) {
        this.isdata = false;
      }
    });
  },
  methods: {
    ...mapMutations(qnaStore, ['SET_QNA_VIEW', 'SET_ARTICLE_NO']),
    moveWrite() {
      this.SET_QNA_VIEW('write');
      // console.log(this.qnaView);
    },
    viewArticle(article) {
      // this.$router.push({
      //   name: 'qnaview',
      //   params: { articleno: article.articleno },
      // });
      // console.log(article);
      // console.log(article.articleno);
      // const no = article.articleno;
      this.SET_QNA_VIEW('view');
      // console.log(no);
      this.SET_ARTICLE_NO(article.articleno);
    },
    searchArticle() {
      http.get(`/qna`, { params: { key: this.skey, word: this.sword } }).then(({ data }) => {
        this.articles = data;
        // console.log(data);
      });
    },
  },
  computed: {
    ...mapState(qnaStore, ['qnaView', 'articleno'], memberStore, ['userInfo']),
    ...mapGetters(memberStore, ['checkUserInfo', 'getEmail']),
  },
};
</script>

<style scope>
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
