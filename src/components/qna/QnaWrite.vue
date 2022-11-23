<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <div class="title-wrapper">
        <b-icon icon="arrow-left" class="h2" style="cursor: pointer" @click="movelist"></b-icon>
        <span>문의 작성</span>
      </div>
    </b-row>
    <qna-input-item type="register" />
  </b-container>
</template>

<script>
import QnaInputItem from '@/components/qna/item/QnaInputItem';
import { mapState, mapMutations } from 'vuex';
const qnaStore = 'qnaStore';
export default {
  name: 'QnaWrite',
  components: {
    QnaInputItem,
  },
  methods: {
    ...mapMutations(qnaStore, ['SET_QNA_VIEW']),
    movelist() {
      this.SET_QNA_VIEW('list');
    },
  },
  computed: {
    ...mapState(qnaStore, ['qnaView']),
  },
};
</script>

<style>
span {
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
}

.title-wrapper {
  display: flex;
}
</style>
