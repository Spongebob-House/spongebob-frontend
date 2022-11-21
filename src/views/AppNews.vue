<template>
  <div>
    <h2>Latest News</h2>

    <div class="card-container">
      <!-- card item 가져와서 뿌리기-->
      <div v-for="(news, index) in newsdata" :key="index">
        <a :href="`${news.src}`" target="_blank">
          <div class="card-item">
            <div class="card-img"><img :src="`${news.thumbnail}`" style="width: 100%; height: 12rem" alt="" /></div>
            <div v-html="news.title" class="card-title"></div>
            <div class="card-pdate">{{ news.pDate }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/components/news/NewsData";
export default {
  name: "AppNews",
  data() {
    return {
      newsdata: data,
    };
  },
  created() {
    console.log(this.newsdata);
  },
};
</script>

<style>
h2 {
  font-family: Inter;
}
a {
  text-decoration: none !important;
}
.card-container {
  width: 90%;
  margin: 50px auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, auto));
  gap: 3rem;
}

.card-item {
  width: 25rem;
  height: 20rem;
  position: relative;
  flex-direction: column;
  border-radius: 2rem;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
}
.card-item:hover {
  opacity: 0.5;
}
.card-img {
  width: 100%;
  height: 12rem;
  background-color: #9d9d9d;
  /* border-radius: 5px 5px 0px 0px; */
}
.card-title {
  width: 80%;
  height: 4rem;
  margin: 20px auto;
  font-family: Spoqa Han Sans Neo;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  overflow: hidden;
}

.card-pdate {
  width: 80%;
  float: bottom;
  margin: 0px auto;
  font-family: Spoqa Han Sans Neo;
  color: #9d9d9d;
}
</style>
