<template>
  <div style="margin-top: 60px">
    <div
      style="
        font-size: 50px;
        width: 80%;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="font-family: Inter; font-size: 30px">Latest News</div>
    </div>

    <!-- card item 가져와서 뿌리기-->
    <div class="card-one-container">
      <div class="card-one">
        <a :href="`${onedata.link}`" target="_blank">
          <div class="card-one-item">
            <div class="card-one-img">
              <img :src="`${onedata.src}`" alt="" />
            </div>
            <div class="card-one-right">
              <div v-html="onedata.title" class="card-one-title"></div>
              <div class="card-one-pdate">{{ onedata.pDate }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- 두개씩 -->
    <div class="card-few-container">
      <div v-for="(news, index) in fewdata" :key="index">
        <a :href="`${news.link}`" target="_blank">
          <div class="card-few-item">
            <div class="card-few-img">
              <img :src="`${news.src}`" style="width: 100%; height: 100%" alt="" />
            </div>
            <div v-html="news.title" class="card-few-title"></div>
            <div class="card-few-pdate">{{ news.pDate }}</div>
          </div>
        </a>
      </div>
    </div>

    <div class="card-container">
      <div v-for="(news, index) in newsdata" :key="index">
        <a :href="`${news.link}`" target="_blank">
          <div class="card-item">
            <div class="card-img">
              <img :src="`${news.src}`" style="width: 100%; height: 12rem" alt="" />
            </div>
            <div v-html="news.title" class="card-title"></div>
            <div class="card-pdate">{{ news.pDate }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/components/news/NewsData';
import oneData from '@/components/news/MainData';
import fewData from '@/components/news/FewData';
export default {
  name: 'AppNews',
  data() {
    return {
      newsdata: data,
      onedata: oneData,
      fewdata: fewData,
    };
  },
  created() {
    console.log(this.newsdata);
  },
};
</script>

<style>
h2 {
  font-family: Spoqa Han Sans Neo;
  font-weight: bold;
}
a {
  text-decoration: none !important;
}

/* 하나짜리 카드  */
.card-one-container {
  width: 90%;
  margin: 0 auto;
  /* background-color: yellow; */
}

.card-one-item {
  width: 81rem;
  height: 30rem;
  margin: 0 auto;
  display: flex;
  border-radius: 2rem;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
}
.card-one-item:hover {
  opacity: 0.5;
}
.card-one-title {
  width: 80%;
  height: 60%;
  margin: 50px auto;
  font-family: Spoqa Han Sans Neo;
  font-size: 40px;
  font-weight: bold;
  color: black;
}

.card-one-pdate {
  width: 80%;
  margin: auto;
  font-size: 20px;
  font-weight: bold;
  font-family: Spoqa Han Sans Neo;
  color: #9d9d9d;
}
/* 두개짜리 카드 */

.card-few-container {
  width: 90%;
  margin: 50px auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, minmax(10rem, auto));
  gap: 3rem;
}

.card-few-item {
  width: 39em;
  height: 35rem;
  position: relative;
  flex-direction: column;
  border-radius: 2rem;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
}

.card-few-item:hover {
  opacity: 0.5;
}
.card-few-img {
  width: 100%;
  height: 60%;
  background-color: #9d9d9d;
}

.card-few-title {
  width: 85%;
  height: 5rem;
  margin: 40px auto;
  font-family: Spoqa Han Sans Neo;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  overflow: hidden;
}
.card-few-pdate {
  width: 85%;
  float: bottom;
  margin: 0px auto;
  font-family: Spoqa Han Sans Neo;
  color: #9d9d9d;
  font-size: 20px;
  font-weight: bold;
}

/* 세개 짜리 */
.card-container {
  width: 90%;
  margin: 50px auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, auto));
  gap: 3rem;
  /* background-color: yellow; */
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
