<template>
  <main>
    <!-- <section class="container-fluid bg-black justify-content-center text-center"> -->
    <!-- <map-search-bar></map-search-bar> -->
    <!-- </section> -->
    <!-- <map-inter></map-inter> -->
    <section class="home-result-box">

      <div class="search-result">
        <!-- <div>
          <div class="mt-2">Value: {{ text }}</div>
        </div> -->
        <div id="home-map" class="col-sm-12 p-0"><ka-kao-map :text="text"></ka-kao-map>
          <div class="col-sm-12 col-md-2" style="position:absolute; top: 3vh; left: 3vw; z-index: 2" >
            <b-input-group size="sm" prepend="">
              <b-form-input  style="width:100%; z-index: 3" autocomplete="off" :value="text" placeholder="Enter your place" ref="serachinput" @keydown.down="onArrowDown()" @keydown.up="onArrowUp()" @keyup.enter="onEnterUp()" @input="searchStart($event)"></b-form-input>
  
              <b-card style="position:absolute; margin-left:0;  z-index: 2; width:100%; top:3vh;" v-if="searchList.length && text.length != 0">
                <li class="mb-2 px-2" :class="{ 'is-active': index === arrownum}" v-for="(result,index) in searchList" :dongCode="result.dongCode" :key=index v-text="result.name" @click="onClickEvent(index)"></li>
              </b-card>
            </b-input-group>
          </div>
          <div class="col-sm-12 col-md-4" style="position:absolute; top: 3vh; left: 20vw; z-index: 2" >
            <span @click="onAvatarClick('MT1')">
              <b-avatar badge-variant="success" variant="secondary" >
                <template #badge v-if="isCategories.MT1"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('CS2')">
              <b-avatar badge-variant="success" variant="primary">
                <template #badge v-if="isCategories.CS2"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('PS3')">
              <b-avatar badge-variant="success" variant="dark">
                <template #badge v-if="isCategories.PS3"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('SC4')">
              <b-avatar badge-variant="success" variant="light">
                <template #badge v-if="isCategories.SC4"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('OL7')">
              <b-avatar badge-variant="success" variant="success">
                <template #badge v-if="isCategories.OL7"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('SW8')">
              <b-avatar badge-variant="success" variant="danger">
                <template #badge v-if="isCategories.SW8"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('BK9')">
              <b-avatar badge-variant="success" variant="warning">
                <template #badge v-if="isCategories.BK9"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('PO3')">
              <b-avatar badge-variant="success" variant="info">
                <template #badge v-if="isCategories.PO3"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
          </div>
        </div>
      </div>

          <!-- <table class="table table-hover text-center col-sm-12">
            <thead>
              <tr>
                <th>거래내역</th>
              </tr>
            </thead>
            <tbody id="aptlist" v-if="mapList.length === 0">
              <tr>
                <td>거래내역 없음</td>
              </tr>
            </tbody>
            <tbody id="aptlist" v-else>
              <tr v-for="(apt, index) in mapList" :key="index" class="apt-item" :lat="apt.lat" :lng="apt.lng">
                <td>
                  <div class="apt-name">
                    <a>{{ apt.apartmentName }}</a>
                  </div>
                  <div>
                    <b-img src="http://localhost/assets/img/coffee.png" width="20" height="20" class="icon"></b-img
                    ><span
                      v-if="apt.coffee"
                      style="font-size: 12px"
                      class="text-success"
                      v-text="`${apt.coffee.name} ${apt.coffee.dist}m`"></span>
                    <b-img src="http://localhost/assets/img/metro.png" width="20" height="20" class="icon"></b-img
                    ><span
                      v-if="apt.metro"
                      style="font-size: 12px"
                      v-text="`${apt.metro.name} ${apt.metro.dist}m`"></span>
                  </div>
                  <div class="apt-space" v-text="`면적 : ${apt.area}`"></div>
                  <div class="apt-price" v-text="`거래금액 : ${apt.dealAmount}만원`"></div>
                  <div class="apt-space" v-text="`면적 : ${apt.area}`"></div>
                  <div class="apt-price" v-text="`거래금액 : ${apt.dealAmount}만원`"></div>
                  <div class="apt-date text-end">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon" viewBox="0 0 24 24">
                        <path
                          d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
                      </svg>
                    </span>
                    <span v-text="`${apt.dealYear}.${apt.dealMonth}.${apt.dealDay}`"> </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> -->


    </section>
  </main>
</template>

<script>
// import MapSearchBar from "@/components/map/item/MapSearchBar.vue";
// import MapInter from "@/components/map/item/MapInter.vue";

import { mapState, mapActions, mapMutations } from "vuex";
import KaKaoMap from "./KakaoMap.vue";
import http from "@/api/http";
const mapStore = "mapStore";

export default {
  components: {
    KaKaoMap,
    // MapSearchBar,
    // MapInter,
  },
  data() {
    return {
      text: "",

      searchList:[],
      arrownum: 0,
      

    };
  },
  computed: {
    ...mapState(mapStore, ["mapList", "isCategories"]),
  },

  methods:{
    ...mapActions(mapStore, ["homeSearch"]),
    ...mapMutations(mapStore, ["CLEAR_IS_CATEGORIES","CLEAR_MARKER_POSITIONS", "CLEAR_MAP_LIST", "SET_SEARCH_FLAG_TRUE", "SET_IS_CATEGORIES"]),
    // dropboxDown(){
    //   this.$refs['searchdrop'].show();
    // },
    onAvatarClick(key) {
      if (this.isCategories[key]) {
        this.CLEAR_IS_CATEGORIES(key);
      }
      else {
        this.SET_IS_CATEGORIES(key);
      }
    },
      
    onArrowDown(){
      if(this.searchList.length === 0) return;
      this.arrownum++;
      this.arrownum %= this.searchList.length;
      // this.text = this.searchList[this.arrownum].name; 
    },
    onArrowUp(){
      if(this.searchList.length === 0) return;
      this.arrownum = (this.arrownum + this.searchList.length -1);
      this.arrownum %= this.searchList.length;
      // this.text = this.searchList[this.arrownum].name; 
    },
    onEnterUp(){
      this.CLEAR_MARKER_POSITIONS();
      this.CLEAR_MAP_LIST();
      this.SET_SEARCH_FLAG_TRUE();
      this.text = this.searchList[this.arrownum].name;
      const param = {
        dong: this.searchList[this.arrownum].dongCode,
        year: null,
        month: null,
      }
      this.homeSearch(param);
      this.searchList = [];
    },
    onClickEvent(i){
      this.arrownum = i;
      this.onEnterUp();
    },
    searchStart(e){
      this.text = e;
      if(this.text.length == 0) return;
      http.get(`/map/navi/${this.text}`).then(({data}) => {
        this.searchList = data;
      }).catch((e) => {
        console.log(e);
      })
    },
  }
};
</script>

<style>
li{
  cursor: pointer;
}
.is-active{
  background-color: #dedede;
}
.b-avatar:hover {
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 255, 0.2);
}
</style>

