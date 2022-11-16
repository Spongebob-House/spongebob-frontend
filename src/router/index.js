import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/AppMain.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/AppMap.vue"),
    children:[
      {
        path: "corona",
        name: "mapCorona",
        component: () => import("@/components/map/MapCorona")
      },
      {
        path: "hospital",
        name: "mapHospital",
        component: () => import("@/components/map/MapHospital")
      },
      {
        path: "search",
        name: "mapSearch",
        component: () => import("@/components/map/MapSearch")
      },
    ]
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/AppQna"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: () => import("@/components/qna/QnaList"),
      },
      {
        path: "write",
        name: "qnawrite",
        component: () => import("@/components/qna/QnaWrite"),
      },
      {
        path: "view/:articleno",
        name: "qnaview",
        component: () => import("@/components/qna/QnaView"),
      },
      {
        path: "modify",
        name: "qnamodify",
        component: () => import("@/components/qna/QnaModify"),
      },
      {
        path: "delete/:articleno",
        name: "qnadelete",
        component: () => import("@/components/qna/QnaDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
