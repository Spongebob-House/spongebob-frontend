<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="userId-group" style="height: auto" label="작성자" label-for="userId">
          <b-form-input
          ref="userId"
            id="userId"
            :disabled="isUserId"
            v-model="article.userId"
            type="text"
            required
            placeholder="작성자 입력..."></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" style="height: auto" label="제목" label-for="subject">
          <b-form-input
          ref="subject"
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" style="height: auto" label="내용" label-for="content">
          <b-form-textarea
          ref="content"
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else-if="this.type === 'modify'">글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1" v-if="this.type === 'register'">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        userId: "",
        subject: "",
        content: "",
      },
      isUserId: true,
      isView: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      http.get(`/board/view/${this.$route.params.articleno}`).then(({ data }) => {
        this.article = data;
      });
    } else {
      this.article.userId = this.userInfo.userId;
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userId && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userId.focus());
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
        .post(`/board`, {
          userId: this.article.userId,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      http
        .put(`/board`, {
          articleNo: this.article.articleNo,
          userId: this.article.userId,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        });
    },
    moveList() {
      this.$router.push({ name: "boardlist0" });
    },
  },
};
</script>

<style></style>
