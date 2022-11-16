<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2" v-if="`loginUser.userId === ${article.userid}`? true : false">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form>
          <b-form-group id="userid-group"  style="height:auto;" label="작성자:" label-for="userid" >
            <b-form-input
              id="user"
              v-model="article.userid"
              type="text"
              required
              placeholder="작성자 입력..."
              readonly
            ></b-form-input>
          </b-form-group>

          <b-form-group id="subject-group" style="height:auto;" label="제목:" label-for="subject" >
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
              readonly
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" style="height:auto;" label="내용:" label-for="content">
            <b-form-textarea
              id="content"
              v-model="article.content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
              readonly
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<span><h6>${memo.userid}</h6></span><span><h6>${memo.memotime}</h6></span>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <textarea v-model="memo.comment"></textarea>
          </b-card-body>
        </b-card>
      </b-col>
      <b-button variant="outline-primary" size="sm" @click="writeMemo" v-if="adminChk">댓글 작성</b-button>
      <b-button variant="outline-danger" size="sm" @click="modifyMemo" v-if="adminChk">댓글 수정</b-button>
      <b-button variant="outline-danger" size="sm" @click="deleteMemo" v-if="adminChk">댓글 삭제</b-button>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
import { mapState, mapGetters } from "vuex";
export default {
  name: "QnaDetail",

  data() {
    return {
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
    ...mapState(["loginUser"]),
    ...mapGetters(["adminChk"]),
    
  },
  created() {
    http.get(`/qna/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
      return null;
    }).then(() => {
      http.get(`/memo/${this.$route.params.articleno}`).then(({ data }) => {
        if (data.length != 0) {
          this.memo = data;
        }
      })
    }).catch(() => {
      alert("글 불러오기 중 문제 발생");
    })
  },
  methods: {
    writeMemo() {
      http.post("/memo", {
        articleno: this.article.articleno,
        comment: this.memo.comment,
        userid: "admin",

      }).then(({ data }) => {
          let msg = "답글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답글 등록이 완료되었습니다.";
          }
          alert(msg);
        });
    },
    modifyMemo() {
      http.put("/memo", {
        articleno: this.articleno,
        comment: this.memo.comment,
        userid: "admin",
        memono: this.memo.memono,

      }).then(({ data }) => {
          let msg = "답글 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답글 수정이 완료되었습니다.";
          }
          alert(msg);
        });
    },
    deleteMemo() {
      http.delete("/memo", { params: { memono: this.memo.memono } }).then(({ data }) => {
          let msg = "답글 삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답글 삭제가 완료되었습니다.";
          }
          alert(msg);
        });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
