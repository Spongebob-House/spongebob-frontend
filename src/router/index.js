import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = Vue.$cookies.get("access-token");

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
    path: "/board",
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist0",
        component: () => import("@/components/board/BoardList"),
        redirect: "/board/list/1"
      },
      {
        path: "list/:pgno",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view/:pgno/:articleno",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify",
        name: "boardmodify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardModify"),
      },
      {
        path: "delete/:articleno",
        name: "boarddelete",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
