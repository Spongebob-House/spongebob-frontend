<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="userid-group" style="height: auto" label="작성자" label-for="userid">
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="article.userid"
            type="text"
            required
            placeholder="작성자 입력..."></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" style="height: auto" label-for="subject">
          <template v-slot:label> <span class="text-danger small">*</span>제목</template>
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력을 입력해주세요"></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" style="height: auto" label-for="content">
          <template v-slot:label> <span class="text-danger small">*</span>내용</template>
          <b-form-textarea
            no-wheel="true"
            id="content"
            style="height: 10rem"
            v-model="article.content"
            placeholder="내용을 입력해주세요"
            rows="10"
            max-rows="15"></b-form-textarea>
        </b-form-group>
        <div class="btn-wrapper">
          <b-button type="submit" pill class="m-1" v-if="this.type === 'register'">글작성</b-button>
          <b-button type="submit" variant="primary" class="m-1" v-else-if="this.type === 'modify'">글수정</b-button>
          <b-button type="reset" pill variant="outline-secondary" class="m-1" v-if="this.type === 'register'"
            >초기화</b-button
          >
        </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/api/http";
import { mapState, mapGetters, mapMutations } from "vuex";
const memberStore = "memberStore";
const qnaStore = "qnaStore";
export default {
  name: "QnaInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: true,
      isView: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    this.article.userid = this.checkUserInfo.userId;
    if (this.type === "modify") {
      http.get(`/qna/${this.articleno}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
      });
    } else {
      // this.article.userid = this.loginUser.userId;
    }
  },
  computed: {
    ...mapState(qnaStore, ["qnaView", "articleno"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  methods: {
    ...mapMutations(qnaStore, ["SET_QNA_VIEW"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
    },
    registArticle() {
      http
        .post(`/qna`, {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.SET_QNA_VIEW("list");
        });
    },
    modifyArticle() {
      http
        .put(`/qna`, {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.SET_QNA_VIEW("list");
          // 현재 route를 /list로 변경.
        });
    },
    moveList() {
      // this.$router.push({ name: 'qnalist' });
      this.SET_QNA_VIEW("list");
    },
  },
};
</script>

<style>
Label:after {
  content: "*", color = red;
}
#content::-webkit-scrollbar {
  display: none;
}
span {
  font-size: 18px;
  font-weight: normal;
}
.btn-wrapper {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
