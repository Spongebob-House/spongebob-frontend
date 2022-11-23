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
            <span @click="onAvatarClick('MT1')" >
              <b-avatar icon="cart4" badge-variant="success" variant="secondary" >
                <template #badge v-if="isCategories.MT1"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('CS2')">
              <b-avatar icon="shop" badge-variant="success" variant="primary">
                <template #badge v-if="isCategories.CS2"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <!-- <span @click="onAvatarClick('PS3')">
              <b-avatar badge-variant="success" variant="dark">
                <font-awesome-icon icon="fa-solid fa-children" />
                <template #badge v-if="isCategories.PS3"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span> -->
            <span @click="onAvatarClick('SC4')">
              <b-avatar badge-variant="success" variant="dark">
                <font-awesome-icon icon="fa-solid fa-school" />
                <template #badge v-if="isCategories.SC4"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('OL7')">
              <b-avatar badge-variant="success" variant="success">
                <font-awesome-icon icon="fa-solid fa-gas-pump" />
                <template #badge v-if="isCategories.OL7"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('SW8')">
              <b-avatar badge-variant="success" variant="danger">
                <font-awesome-icon icon="fa-solid fa-train-subway" />
                <template #badge v-if="isCategories.SW8"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('BK9')">
              <b-avatar icon="bank" badge-variant="success" variant="warning">
                <font-awesome-icon icon="fa-solid fa-sack-dollar" />
                <template #badge v-if="isCategories.BK9"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
            <span @click="onAvatarClick('PO3')">
              <b-avatar badge-variant="success" variant="info">
                <font-awesome-icon icon="fa-solid fa-landmark-dome" />
                <template #badge v-if="isCategories.PO3"><b-icon  icon="check" scale="2" variant="white"></b-icon></template>
              </b-avatar>
            </span>
          </div>
        </div>
      </div>
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
    ...mapMutations(mapStore, ["SET_IS_CHANGED","CLEAR_IS_CATEGORIES","CLEAR_MARKER_POSITIONS", "CLEAR_MAP_LIST", "SET_SEARCH_FLAG_TRUE", "SET_IS_CATEGORIES"]),
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
      this.SET_IS_CHANGED(key);
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
li >span {
  margin: 0px;
}
.is-active{
  background-color: #dedede;
}
.b-avatar:hover {
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 255, 0.2);
}
</style>

