const qnaStore = {
  namespaced: true,
  state: {
    qnaView: '',
    articleno: 0,
  },
  getters: {
    getArticleNo: function (state) {
      return state.articleno;
    },
  },
  mutations: {
    SET_QNA_VIEW: (state, qnaView) => {
      state.qnaView = qnaView;
    },
    SET_ARTICLE_NO: (state, articleno) => {
      state.articleno = articleno;
    },
  },
};
export default qnaStore;
