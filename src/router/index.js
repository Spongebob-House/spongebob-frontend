import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    router.push({ name: "main" });
  } else {
    next();
  }
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/AppMain.vue"),
    redirect: "/map/search",
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/AppMap.vue"),
    children: [
      {
        path: "search",
        name: "mapSearch",
        component: () => import("@/components/map/MapSearch"),
      },
    ],
  },
  { path: "/news", name: "news", component: () => import("@/views/AppNews") },
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
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/qna/QnaWrite"),
      },
      {
        path: "view/:articleno",
        name: "qnaview",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/qna/QnaView"),
      },
      {
        path: "modify",
        name: "qnamodify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/qna/QnaModify"),
      },
      {
        path: "delete/:articleno",
        name: "qnadelete",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/qna/QnaDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
