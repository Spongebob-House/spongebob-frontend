<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div class="header-wrapper">
          <div class="title">1:1 문의 보기</div>
          <b-icon-x-lg @click="moveList" style="cursor: pointer"></b-icon-x-lg>
        </div>
        <div style="font-size: 20px; font-weight: bold">
          <span v-if="isMemo">[답변완료]&nbsp;&nbsp;&nbsp;</span>{{ article.subject }}
        </div>
        <hr class="line" />
      </b-col>
    </b-row>
    <b-row class="mb-1"> </b-row>
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form>
          <tr>
            <td>작성자</td>
            <td>{{ article.userid }}</td>
          </tr>
          <!-- <tr>
            <td>제목</td>
            <td>{{ article.subject }}</td>
          </tr> -->
          <tr>
            <td>내용</td>
          </tr>
          <div class="content-container">{{ article.content }}</div>
        </b-form>
      </b-col>
    </b-row>
    <!-- <b-col class="text-right">
      <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
      <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
    </b-col> -->

    <hr />
    <b-row class="mb-1">
      <b-col>
        <!-- <b-card
            :header-html="`<span><h6>${memo.userid}</h6></span><span><h6>${memo.memotime}</h6></span>`"
          class="mb-2"
          border-variant="dark"
          no-body> -->
        <div class="title">
          <div>[답글] {{ article.subject }}</div>
          <div style="font-weight: normal; font-size: 12px">{{ memo.memotime }}</div>
        </div>
        <div class="answer-wrapper" v-if="!isMemo">
          <b-icon-arrow-return-right></b-icon-arrow-return-right>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <b-form-textarea
            id="textarea-no-resize"
            rows="3"
            no-resize
            placeholder="댓글을 입력해주세요..."
            v-model="memo.comment"></b-form-textarea>
        </div>
        <div
          v-if="isMemo"
          style="width: 100%; border: solid 1px lightgray; height: 5rem; border-radius: 5px; padding: 5px">
          <textarea style="border: none; width: 100%; height: 100%" v-model="memo.comment"></textarea>
        </div>
        <!-- <b-card-body class="text-left">
          <textarea v-model="memo.comment"></textarea>
        </b-card-body> -->
        <!-- </b-card> -->
      </b-col>
      <div v-if="adminChk">
        <b-button
          variant="outline-secondary"
          size="sm"
          class="m-2"
          style="float: right"
          @click="writeMemo"
          v-if="!isMemo"
          >댓글 작성</b-button
        >
        <div class="bnt-wrapper" style="display: flex; float: right">
          <b-button variant="outline-secondary" class="m-2" size="sm" @click="modifyMemo" v-if="isMemo"
            >댓글 수정</b-button
          >
          <b-button variant="outline-danger" class="m-2" size="sm" @click="deleteMemo" v-if="isMemo"
            >댓글 삭제</b-button
          >
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
import { mapState, mapGetters, mapMutations } from "vuex";
const memberStore = "memberStore";
const qnaStore = "qnaStore";

export default {
  name: "QnaDetail",

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
      no: 0,
    };
  },
  computed: {
    ...mapState(qnaStore, ["articleno", "qnaView"]),
    ...mapGetters(memberStore, ["adminChk"]),
  },
  created() {
    // console.log(this.articleno);
    const no = this.articleno;
    console.log(no);
    http
      .get(`/qna/${no}`)
      .then(({ data }) => {
        this.article = data;
        return null;
      })
      .then(() => {
        http.get(`/memo/${no}`).then(({ data }) => {
          if (data.length != 0) {
            this.memo = data;
            this.isMemo = true;
          }
        });
      })
      .catch(() => {
        alert("글 불러오기 중 문제 발생");
      });
  },
  methods: {
    ...mapMutations(qnaStore, ["SET_QNA_VIEW"]),
    refreshAll() {
      // 새로고침
      this.$router.go();
    },
    writeMemo() {
      if (this.memo.comment.length < 1) {
        alert("댓글을 작성해주세요!");
        return;
      }
      http
        .post("/memo", {
          articleno: this.article.articleno,
          comment: this.memo.comment,
          userid: "admin",
        })
        .then(({ data }) => {
          // let msg = "답글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            this.$swal("답글 등록이 완료되었습니다", { icon: "success" });
            // msg = "답글 등록이 완료되었습니다.";
            this.isMemo = true;
          }
          // alert(msg);
        });
    },
    modifyMemo() {
      if (this.memo.comment.length < 1) {
        alert("댓글을 작성해주세요!");
        return;
      }
      http
        .put("/memo", {
          articleno: this.articleno,
          comment: this.memo.comment,
          userid: "admin",
          memono: this.memo.memono,
        })
        .then(({ data }) => {
          // let msg = "답글 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            this.$swal("답글 수정이 완료되었습니다", { icon: "success" });
          }
          // alert(msg);
        });
    },
    deleteMemo() {
      http.delete("/memo", { params: { memono: this.memo.memono } }).then(({ data }) => {
        // let msg = "답글 삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          // msg = "답글 삭제가 완료되었습니다.";
          this.$swal("답글 삭제가 완료되었습니다", { icon: "success" });
          this.isMemo = false;
          this.memo.comment = "";
        }
        // alert(msg);
      });
    },
    moveModifyArticle() {
      this.SET_QNA_VIEW("modify");
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.SET_QNA_VIEW("delete");
      }
    },
    moveList() {
      this.SET_QNA_VIEW("list");
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>
.content-container {
  padding: 5px;
  /* border: solid 0.1px lightgray; */
  border-radius: 5px;
  width: 100%;
  height: 7rem;
}
hr.line {
  border: solid 2px black;
  opacity: 0.75;
}
.title {
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-wrapper {
  display: flex;
}
span {
  font-weight: normal;
  font-size: 16px;
  font-family: "Spoqa Han Sans Neo";
}
td {
  padding: 5px;
  border: solid 1px black;
}
.answer-wrapper {
  padding: 2px;
  display: flex;
}
</style>
