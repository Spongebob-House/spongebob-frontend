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
      @hidden="isdisabled = false">
      <template #header="{ hide }">
        <button style="border: 0; background-color: transparent" @click="isList = true" v-show="!isList">
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
          <b-card class="mb-3" body-class="pb-0">
            <b-card-title>
              <div class="d-flex justify-content-between">
                <h4>
                  {{ detailApt.apartmentName }}
                </h4>
                <span v-if="!isInter" @click="onInterClick">
                  <b-avatar icon="star-fill" variant="secondary"></b-avatar>
                </span>
                <span v-else @click="onInterClick">
                  <b-avatar icon="star-fill" style="color: yellow" variant="secondary"></b-avatar>
                </span>
              </div>
              <div class="p-3">
                <b-row class="mb-3" style="font-size: 20px"> 주변 정보 </b-row>
                <b-row class="mb-3 text-left" style="font-size: 16px">
                  <b-col id="coffee" class="p-0"
                    ><img src="@/assets/coffee.png" style="width: 30px; height: 30px" />{{ detailApt.coffee.name }}
                    {{ detailApt.coffee.dist | distance }}</b-col
                  >

                  <b-col id="metro" class="p-0"
                    ><img src="@/assets/metro.png" style="width: 30px; height: 30px" />{{ detailApt.metro.name }}
                    {{ detailApt.metro.dist | distance }}</b-col
                  >
                </b-row>
              </div>
            </b-card-title>
          </b-card>
          <b-card no-body>
            <b-tabs card fill>
              <b-tab title="거래 내역">
                <ul id="detailItemList" class="pl-0">
                  <li
                    v-for="(result, index) in detailItemsForList"
                    id="itemList"
                    :key="index"
                    class="p-3 mb-0"
                    style="border-bottom: solid 1px">
                    <b-row>
                      <b-row class="mb-1"> 거래일자: {{ result.dealYear }}년 {{ result.dealMonth }}월 </b-row>
                      <b-row class="mb-1">면적: {{ result.area }}&#13221;</b-row>
                      <b-row class="mb-1">거래가: {{ result.dealAmount | money }}</b-row>
                    </b-row>
                  </li>
                </ul>
                <div class="overflow-auto">
                  <b-pagination
                    align="center"
                    hide-ellipsis
                    v-model="detailCurrentPage"
                    :total-rows="dealList.length"
                    per-page="5"
                    aria-controls="detailItemList"></b-pagination>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
      <div v-show="isList">
        <b-tabs fill @activate-tab="loginCheck">
          <b-tab title="아파트 목록">
            <table class="table table-hover text-center col-sm-12">
              <tbody id="aptlist" v-if="mapList.length === 0">
                <tr class="p-3">
                  <td>아파트 없음</td>
                </tr>
              </tbody>
              <tbody id="aptlist" v-else>
                <tr
                  v-for="(apt, index) in itemsForList"
                  :key="index"
                  class="apt-item"
                  :lat="apt.lat"
                  :lng="apt.lng"
                  @click="setData(index)">
                  <td class="p-3">
                    <div class="apt-name">
                      <a>{{ apt.apartmentName }}</a>
                    </div>
                    <br />
                    <div class="apt-dong" v-text="`행정동 : ${apt.dong}`"></div>
                    <div class="apt-buildYear" v-text="`건축연도 : ${apt.buildYear}년`"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="overflow-auto mt-3">
              <b-pagination
                align="center"
                hide-ellipsis
                v-model="currentPage"
                :total-rows="mapList.length"
                per-page="6"
                aria-controls="itemList"></b-pagination>
            </div>
          </b-tab>
          <b-tab title="즐겨찾기">
            <table class="table table-hover text-center col-sm-12">
              <tbody id="interlist" v-if="interList.length === 0">
                <tr class="p-3">
                  <td>즐겨찾기 없음</td>
                </tr>
              </tbody>
              <tbody id="interlist" v-else>
                <tr
                  v-for="(apt, index) in interItemsForList"
                  :key="index"
                  class="apt-item"
                  :lat="apt.lat"
                  :lng="apt.lng"
                  @click="setInterData(index)">
                  <td class="p-3">
                    <div class="apt-name">
                      <a>{{ apt.apartmentName }}</a>
                    </div>
                    <br />
                    <div class="apt-dong" v-text="`행정동 : ${apt.dong}`"></div>
                    <div class="apt-buildYear" v-text="`건축연도 : ${apt.buildYear}년`"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="overflow-auto mt-3">
              <b-pagination
                align="center"
                hide-ellipsis
                v-model="interCurrentPage"
                :total-rows="interList.length"
                per-page="6"
                aria-controls="interList"></b-pagination>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </b-sidebar>
    <div>
      <b-button v-b-toggle.sidebar-1 id="sidebarToggle" :disabled="isdisabled" style="display: none"></b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
const mapStore = "mapStore";
const memberStore = "memberStore";

export default {
  name: "KakaoMap",
  props: {
    text: String,
  },
  data() {
    return {
      interCurrentPage: 1,
      detailCurrentPage: 1,
      currentPage: 1,
      no: -1,
      interno: -1,
      bounds: {},
      markers: [],
      infos: [],
      cates: [],
      infowindow: null,
      isdisabled: false,
      isInter: false,
      isList: false,
      itemsForList: [],
      detailItemsForList: [],
      interItemsForList: [],
      inters: [],
      interInfos: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
  },
  filters: {
    money(val) {
      if (val.length > 5) {
        val = val.replace(",", "");
        const temp = val.slice(val.length - 4, val.length);
        if (temp === "0000") {
          return val.slice(0, val.length - 4) + "억";
        }
        return val.slice(0, val.length - 4) + "억 " + Number(val.slice(val.length - 4, val.length)) + "만원";
      } else return val + "만원";
    },
    distance(val) {
      if (val > 999) {
        val = val + "";
        const temp = val.slice(val.length - 3, val.length);
        if (temp === "000") {
          return val.slice(0, val.length - 3) + "km";
        }
        return val.slice(0, val.length - 3) + "km " + Number(val.slice(val.length - 3, val.length)) + "m";
      } else return val + "m";
    },
  },
  watch: {
    userInfo(val) {
      if (val == null) {
        this.isInter = false;
        this.interno = -1;
        return;
      }
    },
    no(val) {
      if (val != -1) {
        this.aptDetail(this.mapList[val]);
      }
      this.detailCurrentPage = 1;
    },
    interno(val) {
      if (val != -1) {
        this.aptDetail(this.interList[val]);
      }
      this.detailCurrentPage = 1;
    },
    dealList() {
      this.detailItemsForList = this.dealList.slice(0, 5);
    },
    mapList() {
      this.itemsForList = this.mapList.slice(0, 6);
    },
    currentPage(val) {
      this.itemsForList = this.mapList.slice((val - 1) * 6, val * 6);
    },
    detailCurrentPage(val) {
      this.detailItemsForList = this.dealList.slice((val - 1) * 5, val * 5);
    },
    interCurrentPage(val) {
      this.interItemsForList = this.interList.slice((val - 1) * 6, val * 6);
    },
    categoryList(val) {
      if (val.length === 0) return;
      if (this.cates.length > 0) {
        this.cates.forEach((cate) => cate.setMap(null));
      }
      this.cates = [];

      const color = ["lightgray", "dodgerblue", "light", "black", "green", "red", "gold", "darkcyan"];
      const categories = ["MT1", "CS2", "PS3", "SC4", "OL7", "SW8", "BK9", "PO3"];
      for (let index = 0; index < categories.length; index++) {
        if (this.isCategories[categories[index]]) {
          val.forEach((element) => {
            if (element.category_group_code === categories[index]) {
              var latlng = new kakao.maps.LatLng(element.y, element.x);
              var category = new kakao.maps.CustomOverlay({
                map: this.map,
                position: latlng,
                content:
                  `<div ${categories[index]} class="customoverlay">` +
                  `  <a href=${element.place_url} target="_blank" style='background: ${color[index]}'>` +
                  `    <span class="title" style="margin: 0 35px 0 0">${element.place_name}</span>` +
                  "  </a>" +
                  "</div>",
                clickable: true,
                title: categories[index],
              });
              this.cates.push(category);
            }
          });
        }
      }
    },
    interList(val) {
      for (let index = 0; index < this.interList.length; index++) {
        if (this.interList[index].aptCode === this.detailApt.aptCode) {
          this.isInter = true;
        }
      }
      this.interItemsForList = this.interList.slice(0, 6);
      if (this.inters.length > 0) {
        this.inters.forEach((cate) => cate.setMap(null));
      }

      if (this.interInfos.length > 0) {
        this.interInfos.forEach((cate) => cate.setMap(null));
      }
      this.inters = [];
      this.interInfos = [];
      if (val.length === 0) return;
      const imageSrc = "https://pngimg.com/uploads/star/star_PNG41495.png";
      const imageSize = new kakao.maps.Size(45, 45);
      this.interList.forEach((apt, index) => {
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:14px;"><div>${apt.apartmentName}</div><div>주소 : ${apt.dong} ${apt.jibun}</div><div>건축년도 : ${apt.buildYear}년</div></div>`,
          removable: true,
        });
        this.interInfos.push(infowindow);
        const position = new kakao.maps.LatLng(apt.lat, apt.lng);
        var marker = new kakao.maps.Marker({
          map: this.map,
          position,
          image: new kakao.maps.MarkerImage(imageSrc, imageSize),
          clickable: true,
        });
        kakao.maps.event.addListener(marker, "mouseover", () => {
          this.interInfos[index].open(this.map, this.inters[index]);
        });
        kakao.maps.event.addListener(marker, "mouseout", () => {
          this.interInfos[index].setMap(null);
        });
        kakao.maps.event.addListener(marker, "click", () => {
          // 마커 위에 인포윈도우를 표시합니다
          if (this.no != -1) {
            this.infos[this.no].setMap(null);
          }
          if (this.interno != -1) {
            this.interInfos[this.interno].setMap(null);
          }
          this.isList = false;
          this.interno = index;
          this.no = -1;
          this.isInter = true;
          var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
          var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
          var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
          this.interInfos[this.interno].open(this.map, this.inters[this.interno]);
          this.map.panTo(position);
          roadviewClient.getNearestPanoId(position, 100, function (panoId) {
            roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
          });
          document.querySelector("#sidebarToggle").click();
        });
        this.inters.push(marker);
      });
    },
    isChanged(val) {
      const color = {
        MT1: "lightgray",
        CS2: "dodgerblue",
        PS3: "light",
        SC4: "black",
        OL7: "green",
        SW8: "red",
        BK9: "gold",
        PO3: "darkcyan",
      };
      if (!val) return;

      if (this.isCategories[val]) {
        this.categoryList.forEach((element) => {
          if (element.category_group_code === val) {
            var latlng = new kakao.maps.LatLng(element.y, element.x);
            var category = new kakao.maps.CustomOverlay({
              map: this.map,
              position: latlng,
              content:
                `<div ${val} class="customoverlay">` +
                `  <a href=${element.place_url} target="_blank" style='background: ${color[val]}'>` +
                `    <span class="title" style="margin: 0 35px 0 0">${element.place_name}</span>` +
                "  </a>" +
                "</div>",
              clickable: true,
              title: val,
            });
            this.cates.push(category);
          }
        });
      } else {
        var start = 500;
        this.cates.forEach((element, i) => {
          if (element.getContent().includes(val)) {
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

      const imageSrc = "https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png";
      const imageSize = new kakao.maps.Size(32, 34);
      this.mapList.forEach((apt) => {
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:14px;"><div>${apt.apartmentName}</div><div>주소 : ${apt.dong} ${apt.jibun}</div><div>건축년도 : ${apt.buildYear}년</div></div>`,
          removable: true,
        });

        this.infos.push(infowindow);
      });

      const positions = val.map((position) => new kakao.maps.LatLng(...position));
      if (this.userInfo) {
        this.pullInter();
      }
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
            if (this.no != -1) {
              this.infos[this.no].setMap(null);
            }
            if (this.interno != -1) {
              this.interInfos[this.interno].setMap(null);
            }
            this.isList = false;
            this.no = index;
            this.interno = -1;
            var flag = true;
            for (let index = 0; index < this.interList.length; index++) {
              if (this.interList[index].aptCode === this.mapList[this.no].aptCode) {
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
            var position = new kakao.maps.LatLng(Number(this.mapList[this.no].lat), Number(this.mapList[this.no].lng));
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
          const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());
          this.map.setBounds(bounds);
          this.SET_SEARCH_FLAG_FALSE();
        }
      }
    },

    bounds(val) {
      var position = this.map.getCenter();
      const data = {
        Lat: position.getLat(),
        Lng: position.getLng(),
        ha: val.ha,
        qa: val.qa,
        oa: val.oa,
        pa: val.pa,
      };
      this.getCategory(data);
      this.aptSearch(val);
      if (this.userInfo) {
        this.pullInter();
      }
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

      "categoryList",
      "isCategories",
      "isChanged",
    ]),
    ...mapState(memberStore, ["userInfo", "interList"]),
  },
  methods: {
    ...mapMutations(mapStore, ["SET_SEARCH_FLAG_FALSE", "CLEAR_IS_CHANGED"]),
    ...mapMutations(memberStore, ["SET_LOGIN_TRIGGER"]),
    ...mapActions(mapStore, ["aptSearch", "aptDetail", "getCategory"]),
    ...mapActions(memberStore, ["appendInter", "deleteInter", "pullInter"]),
    loginCheck(e) {
      if (!this.userInfo && e == 1) {
        this.SET_LOGIN_TRIGGER();
      }
    },
    onInterClick() {
      if (!this.userInfo) {
        this.SET_LOGIN_TRIGGER();
        return;
      }
      for (let index = 0; index < this.interList.length; index++) {
        if (this.interList[index].aptCode == this.detailApt.aptCode) {
          this.deleteInter(this.detailApt.aptCode);
          this.interno = -1;
          this.isInter = false;
          return;
        }
      }
      this.appendInter(this.detailApt.aptCode);
      this.isInter = true;
    },

    setData(k) {
      if (this.no != -1) {
        this.infos[this.no].setMap(null);
      }
      if (this.interno != -1) {
        this.interInfos[this.interno].setMap(null);
      }

      this.isList = false;
      this.no = 6 * (this.currentPage - 1) + k;
      var flag = true;
      for (let index = 0; index < this.interList.length; index++) {
        if (this.interList[index].aptCode === this.mapList[this.no].aptCode) {
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
      var position = new kakao.maps.LatLng(Number(this.mapList[this.no].lat), Number(this.mapList[this.no].lng));
      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      this.infos[this.no].open(this.map, this.markers[this.no]);
      this.map.panTo(position);

      roadviewClient.getNearestPanoId(position, 100, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
    setInterData(k) {
      if (this.no != -1) {
        this.infos[this.no].setMap(null);
      }
      if (this.interno != -1) {
        this.interInfos[this.interno].setMap(null);
      }
      this.interno = 6 * (this.interCurrentPage - 1) + k;
      this.isList = false;
      this.isInter = true;

      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      var position = new kakao.maps.LatLng(
        Number(this.interList[this.interno].lat),
        Number(this.interList[this.interno].lng)
      );
      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      this.interInfos[this.interno].open(this.map, this.inters[this.interno]);
      this.map.panTo(position);

      roadviewClient.getNearestPanoId(position, 100, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
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
        this.bounds = bounds;
        this.no = -1;
      });
      kakao.maps.event.addListener(map, "zoom_changed", () => {
        var bounds = map.getBounds();
        this.bounds = bounds;
        this.no = -1;
      });
      this.map = map;
      var bounds = map.getBounds();
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
