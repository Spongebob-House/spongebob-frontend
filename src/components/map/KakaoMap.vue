<template>
  <div>
    <div id="map"></div>
    <b-sidebar
      aria-labelledby="sidebar-no-header-title"
      id="sidebar-1"
      :title="text"
      shadow
      width="25%"
      @shown="isdisabled = true"
      @hidden="isdisabled = false"
    >
      <template #header="{ hide }">
        <button
          style="border: 0; background-color: transparent"
          @click="isList = true"
          v-show="!isList"
        >
          <b-icon-chevron-left></b-icon-chevron-left>
        </button>
        <strong>{{ detailApt.dong }}</strong>
        <button class="close text-dark" @click="isList = false">
          <b-icon-x-lg @click="hide()"></b-icon-x-lg>
        </button>
      </template>
      <div v-show="!isList">
        <div id="roadview" style="height: 400px"></div>
        <div>
          <b-card class="mb-3">
            <b-card-title class="d-flex justify-content-between">
              <span>
                {{ detailApt.apartmentName }}
              </span>
              <span v-if="!isInter" @click="onInterClick">
                <b-avatar icon="star-fill" variant="secondary"></b-avatar>
              </span>
              <span v-else @click="onInterClick">
                <b-avatar
                  icon="star-fill"
                  style="color: yellow"
                  variant="secondary"
                ></b-avatar>
              </span>
            </b-card-title>
          </b-card>
          <b-card no-body>
            <b-tabs card fill>
              <b-tab title="주변 정보" active>
                <div class="p-3">
                  <b-row class="mb-3 text-left">
                    
                    <b-col id="coffee"
                      ><img
                        src="@/assets/coffee.png"
                        style="width: 30px; height: 30px"
                      />{{ detailApt.coffee.name }}
                      {{ detailApt.coffee.dist }}m</b-col
                    >
                  </b-row>
                  <b-row class="mb-3 text-left">
                    <b-col id="metro"
                      ><img
                        src="@/assets/metro.png"
                        style="width: 30px; height: 30px"
                      />{{ detailApt.metro.name }}
                      {{ detailApt.metro.dist }}m</b-col
                    >
                  </b-row>
                </div>
              </b-tab>
              <b-tab title="거래 목록">
                <ul
                  v-for="(result, index) in dealList"
                  :key="index"
                  class="p-3 mb-0"
                  style="border-bottom: solid 1px"
                >
                  <li class="mb-1">면적: {{ result.area }}</li>
                  <li class="mb-1">
                    거래일자: {{ result.dealYear }}년 {{ result.dealMonth }}월
                  </li>
                  <li class="mb-1">거래가: {{ result.dealAmount }}만원</li>
                </ul>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
      <div v-show="isList">
        <div>
          <table class="table table-hover text-center col-sm-12">
            <thead>
              <tr>
                <th class="p-3">아파트 목록</th>
              </tr>
            </thead>
            <tbody id="aptlist" v-if="mapList.length === 0">
              <tr class="p-3">
                <td>아파트 없음</td>
              </tr>
            </tbody>
            <tbody id="aptlist" v-else>
              <tr
                v-for="(apt, index) in mapList"
                :key="index"
                class="apt-item"
                :lat="apt.lat"
                :lng="apt.lng"
                @click="setData(index)"
              >
                <td class="p-3">
                  <div class="apt-name">
                    <a>{{ apt.apartmentName }}</a>
                  </div>
                  <!-- <div>
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
                  </div> -->
                  <br />
                  <div class="apt-dong" v-text="`행정동 : ${apt.dong}`"></div>
                  <div
                    class="apt-buildYear"
                    v-text="`건축연도 : ${apt.buildYear}년`"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-sidebar>
    <div>
      <b-button
        v-b-toggle.sidebar-1
        id="sidebarToggle"
        :disabled="isdisabled"
        style="display: none"
      ></b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
const mapStore = "mapStore";

export default {
  name: "KakaoMap",
  props: {
    text: String,
  },
  data() {
    return {
      no: -1,
      bounds: {},
      markers: [],
      infos: [],
      cates: [],
      infowindow: null,
      isdisabled: false,
      isInter: false,
      isList: false,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
  },
  watch: {
    no(val) {
      if (val != -1) {
        this.aptDetail(this.mapList[val]);
      }
    },
    
    categoryList(val){
      if(val.length === 0) return;
      if (this.cates.length > 0) {
        this.cates.forEach((cate) => cate.setMap(null));
      }
      this.cates = [];

      const imageSize = new kakao.maps.Size(32, 34);
      const isrc = require("@/assets/clinic.png");
      const categories = [
        "MT1",
        "CS2",
        "PS3",
        "SC4",
        "OL7",
        "SW8",
        "BK9",
        "PO3",
      ];
      for (let index = 0; index < categories.length; index++) {
        if (this.isCategories[categories[index]]) {
          console.log(this.categoryList.length);
          val.forEach((element) => {
            if (element.category_group_code === categories[index]) {
              var latlng = new kakao.maps.LatLng(element.y, element.x);
              var category = new kakao.maps.Marker({
                map: this.map,
                position: latlng,
                image: new kakao.maps.MarkerImage(isrc, imageSize),
                clickable: true,
                title: categories[index],
              });
              this.cates.push(category);
            }
          });
        }
      }

    },
    isChanged(val) {
      if(!val) return;
      console.log("category");
      const imageSrc = require("@/assets/clinic.png");
      const imageSize = new kakao.maps.Size(32, 34);
      if(this.isCategories[val]){
        this.categoryList.forEach((element) => {
              if (element.category_group_code === val) {
                var latlng = new kakao.maps.LatLng(element.y, element.x);
                var category = new kakao.maps.Marker({
                  map: this.map,
                  position: latlng,
                  image: new kakao.maps.MarkerImage(imageSrc, imageSize),
                  clickable: true,
                  title: val,
                });
                this.cates.push(category);
              }
            }
        )
      }
      else {
            var start = 500;
            this.cates.forEach((element, i) => {
              if (element.getTitle() === val) {
                console.log(val);
                if (i < start) start = i;
                element.setMap(null);
              }
            });
            this.cates.splice(start, 15);
          }
          this.CLEAR_IS_CHANGED();
        },
    markerPositions(val) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      if (this.infos.length > 0) {
        this.infos.forEach((info) => info.setMap(null));
      }
      
      this.markers = [];
      this.infos = [];
      
      const imageSrc = require("@/assets/lokasi-logo-25379.png");
      const imageSize = new kakao.maps.Size(32, 34);
      this.mapList.forEach((apt) => {
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:14px;"><div>${apt.apartmentName}</div><div>주소 : ${apt.dong} ${apt.jibun}</div><div>건축년도 : ${apt.buildYear}년</div></div>`,
          removable: true,
        });

        this.infos.push(infowindow);
      });

      const positions = val.map(
        (position) => new kakao.maps.LatLng(...position)
      );
      if (positions.length > 0) {
        positions.map((position, index) => {
          var marker = new kakao.maps.Marker({
            map: this.map,
            position,
            image: new kakao.maps.MarkerImage(imageSrc, imageSize),
            clickable: true,
          });
          kakao.maps.event.addListener(marker, "mouseover", () => {
            this.infos[index].open(this.map, this.markers[index]);
          });
          kakao.maps.event.addListener(marker, "mouseout", () => {
            this.infos[index].setMap(null);
          });
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 위에 인포윈도우를 표시합니다
            console.log("abc");
            console.log(index);
            if (this.no != -1) this.infos[this.no].setMap(null);
            this.isList = false;
            this.no = index;
            var flag = true;
            for (let index = 0; index < this.interList.length; index++) {
              if (this.interList[index] === this.mapList[this.no].aptCode) {
                this.isInter = true;
                flag = false;
                break;
              }
            }
            if (flag) {
              this.isInter = false;
            }
            var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            var position = new kakao.maps.LatLng(
              Number(this.mapList[this.no].lat),
              Number(this.mapList[this.no].lng)
            );
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            this.infos[this.no].open(this.map, this.markers[this.no]);
            this.map.panTo(position);

            roadviewClient.getNearestPanoId(position, 100, function (panoId) {
              roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
            document.querySelector("#sidebarToggle").click();
          });
          this.markers.push(marker);
        });

        if (this.searchFlag) {
          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );
          this.map.setBounds(bounds);
          this.SET_SEARCH_FLAG_FALSE();
        }
      }
    },

    bounds(val) {
      var position =  this.map.getCenter();
      const data = {
        Lat: position.getLat(),
        Lng: position.getLng(),
        ha: val.ha,
        qa: val.qa,
        oa: val.oa,
        pa: val.pa,
        
      };
      this.getCategory(data)
      this.aptSearch(val);
    },
  },
  computed: {
    ...mapState(mapStore, [
      "markerPositions",
      "mapList",
      "interList",
      "searchFlag",
      "detailApt",
      "dealList",
      "userInfo",
      "categoryList",
      "isCategories",
      "isChanged",
    ]),
  },
  methods: {
    ...mapMutations(mapStore, ["APPEND_INTER_LIST", "SET_SEARCH_FLAG_FALSE", "CLEAR_IS_CHANGED"]),
    ...mapActions(mapStore, ["aptSearch", "aptDetail", "getCategory"]),
    onInterClick() {
      for (let index = 0; index < this.interList.length; index++) {
        if (this.interList[index] === this.detailApt.aptCode) {
          this.isInter = false;
          this.interList.splice(index, 1);
          return;
        }
      }
      this.APPEND_INTER_LIST(this.detailApt.aptCode);
      this.isInter = true;
    },

    setData(k) {
      if (this.no != -1) this.infos[this.no].setMap(null);
      this.isList = false;
      this.no = k;
      var flag = true;
      for (let index = 0; index < this.interList.length; index++) {
        if (this.interList[index] === this.mapList[this.no].aptCode) {
          this.isInter = true;
          flag = false;
          break;
        }
      }
      if (flag) {
        this.isInter = false;
      }
      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      var position = new kakao.maps.LatLng(
        Number(this.mapList[this.no].lat),
        Number(this.mapList[this.no].lng)
      );
      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      this.infos[this.no].open(this.map, this.markers[this.no]);
      this.map.panTo(position);

      roadviewClient.getNearestPanoId(position, 100, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
      const el = "#sidebarToggle";

      document.querySelector(el).click();
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5013068, 127.0396597),
        level: 3,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      var map = new kakao.maps.Map(container, options);
      kakao.maps.event.addListener(map, "dragend", () => {
        var bounds = map.getBounds();
        console.log(bounds);
        this.bounds = bounds;
        this.no = -1;
      });
      kakao.maps.event.addListener(map, "zoom_changed", () => {
        var bounds = map.getBounds();
        console.log(bounds);
        this.bounds = bounds;
        this.no = -1;
      });
      this.map = map;
      var bounds = map.getBounds();
      console.log(bounds);
      this.bounds = bounds;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
li {
  cursor: auto;
}
.button-group {
  margin: 10px 0px;
}
.b-avatar:hover {
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 255, 0.2);
}

button {
  margin: 0 3px;
}
</style>
