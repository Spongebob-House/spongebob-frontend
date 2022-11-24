<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div class="header-wrapper">
          <div class="title">1:1 문의 작성</div>
          <b-icon-x-lg @click="movelist" style="cursor: pointer"></b-icon-x-lg>
        </div>
        <hr class="line" />
      </b-col>
    </b-row>
    <qna-input-item type="register" />
  </b-container>
</template>

<script>
import QnaInputItem from "@/components/qna/item/QnaInputItem";
import { mapState, mapMutations } from "vuex";
const qnaStore = "qnaStore";
export default {
  name: "QnaWrite",
  components: {
    QnaInputItem,
  },
  methods: {
    ...mapMutations(qnaStore, ["SET_QNA_VIEW"]),
    movelist() {
      this.SET_QNA_VIEW("list");
    },
  },
  computed: {
    ...mapState(qnaStore, ["qnaView"]),
  },
};
</script>

<style>
/* hr.line {
  /* border: none; */
/* border-radius: 2px; */
hr.line {
  border: solid 2px brown;
}
.title {
  font-weight: 500;
}
span {
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-wrapper {
  display: flex;
}
</style>
