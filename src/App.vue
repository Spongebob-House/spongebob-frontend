<template>
  <div id="app">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- <router-link to="/">Home</router-link> | -->
    <header-nav></header-nav>
    <router-view> </router-view>
  </div>
</template>
<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
export default {
  name: "App",
  components: { HeaderNav },
};
</script>
<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
@font-face {
  font-family: "Inter";
  font-weight: 300;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  src: url("./assets/fonts/Inter-Bold.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-weight: 500;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  src: url("./assets/fonts/Inter-ExtraBold.woff2") format("woff2");
}

@font-face {
  font-family: "Spoqa Han Sans Neo";
  font-weight: 300;
  src: url("./assets/fonts/SpoqaHanSansNeo-Medium.otf") format("otf");
}

@font-face {
  font-family: "Spoqa Han Sans Neo";
  font-weight: 500;
  src: url("./assets/fonts/SpoqaHanSansNeo-Bold.otf") format("otf");
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
/* header{
  height: 30px;
} */
a {
  text-decoration: none;
}
body {
  font-family: "Inter", "Spoqa Han Sans Neo";
}
main {
  height: auto;
}
.dropdown-menu {
  width: 250px;
}
.main-banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 700px; */
}
.search-box {
  align-self: flex-end;
  opacity: 1;
}
.search-box > div {
  display: flex;
  align-content: space-between;
  align-items: center;
  justify-content: center;
}
.form-group {
  min-width: 200px;
  height: 50px;
}
.icon-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
}
.icon-wrap svg {
  fill: #555;
  width: 14px;
  height: 14px;
}

footer {
  height: 100px;
  display: flex;
  align-items: center;
}
footer > * {
  width: 100%;
}
.search-result {
  display: flex;
  flex-wrap: wrap;
  /* height: 700px; */
}
.table-box {
  overflow: auto;
  height: 100%;
}
tr {
  text-align: left;
  border-bottom: 1px solid gray;
}
.apt-name {
  font-weight: bold;
}
.apt-space,
.apt-price {
  font-size: 14px;
}
.apt-date {
  font-size: 14px;
  color: gray;
}
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.customoverlay {
  position: relative;
  bottom: 85px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px
    center;
}
.customoverlay .title {
  display: block;
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
</style>
