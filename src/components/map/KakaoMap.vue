<template>
  <div>
    <div id="map"></div>
    <b-sidebar  aria-labelledby="sidebar-no-header-title" id="sidebar-1"  :title="text" shadow width="25%" @shown="isdisabled = true" @hidden="isdisabled = false">
      <template #header="{ hide }">
        <button style="border:0; background-color: transparent;" @click="isList = true" v-show="!isList">
          <b-icon-chevron-left></b-icon-chevron-left>
        </button>
        <strong>{{text}}</strong>
        <button class="close text-dark" @click="isList = false">
          <b-icon-x-lg @click="hide()"></b-icon-x-lg>
        </button>
      </template>
      <div v-show="!isList">

        <div id="roadview" style="height:400px"></div>
        <div>
          <b-card class="mb-3">
            <b-card-title class="d-flex justify-content-between">
              <span>
                {{detailapt.apartmentName}}
              </span>
              <span v-if="!isInter" @click="onInterClick">
                <b-avatar icon="star-fill" variant="secondary"></b-avatar>
              </span>
              <span v-else @click="onInterClick">
                <b-avatar icon="star-fill" style="color:yellow" variant="secondary"></b-avatar>
              </span>
            </b-card-title>
            <b-card-text class="px-3">
              <b-row class="mb-1">
                면적: {{detailapt.area}}
              </b-row>
              <b-row class="mb-1">
                건축연도 : {{detailapt.buildYear}}년
              </b-row>
              <b-row class="mb-1">
                최근 거래: {{detailapt.dealYear}}년 {{detailapt.dealMonth}}월
              </b-row>
              <b-row class="mb-1">
                거래가: {{detailapt.dealAmount}}만원
              </b-row>
              <b-row class="mb-1">
                주변 정보
              </b-row>
              <b-row class="mb-1 text-left" >
                <b-col id="coffee"><img src="@/assets/coffee.png" style="width:30px;  height:30px"/>{{detailapt.coffee.name}} {{detailapt.coffee.dist}}m</b-col>
                <b-col id="metro"><img src="@/assets/metro.png" style="width:30px; height:30px"/>{{detailapt.metro.name}} {{detailapt.metro.dist}}m</b-col>
              </b-row>
            </b-card-text>
          </b-card>
  
          <b-card title="관련 뉴스">
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
          </b-card>
        </div>
      
      
      </div> 
      <div v-show="isList">
        <div>
                      <table class="table table-hover text-center col-sm-12">
            <thead >
              <tr >
                <th class="p-3">거래내역</th>
              </tr>
            </thead>
            <tbody id="aptlist" v-if="mapList.length === 0" >
              <tr  class="p-3">
                <td>거래내역 없음</td>
              </tr>
            </tbody>
            <tbody id="aptlist" v-else >
              <tr  v-for="(apt, index) in mapList" :key="index" class="apt-item" :lat="apt.lat" :lng="apt.lng" @click="setData(index)">
                <td class="p-3">
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
          </table>
        </div>
      </div>
    </b-sidebar>
    <div>
      <b-button v-b-toggle.sidebar-1 :id="`sidebarToggle${index}`" v-for="(result,index) in mapList" :key=index  :disabled="isdisabled" style="display:none"></b-button>
      <b-button :id="`mvsidebarToggle${index}`" v-for="(result,index) in mapList" :key=index+100 style="display:none" @click="setData(index)"></b-button>

      
    </div>
    <!-- <div class="button-group">
>>>>>>> b7c60d922ab768a66697752b5a211fbd880d7e41
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
<<<<<<< HEAD
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
=======
      <button @click="displayMarker([[37.5013068, 127.0396597]])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div> -->
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
const mapStore = "mapStore";

export default {
  name: "KakaoMap",
  props:{
    text:String,
  },
  data() {
    return {
      no: -1,
      markers: [],
      infos: [],
      infowindow: null,
      isdisabled: false,
      detailapt: {
        coffee:{
          name:"",
          dist:0,
        },
        metro:{
          name:"",
          dist:0,
        },
      },
      isInter:false,
      isList:false,
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
  watch:{
   markerPositions(val){
    if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
    if (this.infos.length > 0) {
        this.infos.forEach((info) => info.setMap(null));
      }
    

  
    const imageSrc = "http://localhost/assets/img/home.png";
    const imageSize = new kakao.maps.Size(64,69);
      this.mapList.forEach((apt) => {
        var infowindow = new kakao.maps.InfoWindow({
          content : `<div style="padding:5px; font-size:14px;"><div>${apt.apartmentName}</div><div>주소 : ${apt.dong} ${apt.jibun}</div><div>건축년도 : ${apt.buildYear}년</div></div>`,
          removable : true,
        });

        this.infos.push(infowindow);
    })

    const positions = val.map((position) => new kakao.maps.LatLng(...position));
    if (positions.length > 0) {
        positions.map((position, index) =>
            {var marker = new kakao.maps.Marker({
                map: this.map,
                position,
                image: new kakao.maps.MarkerImage(imageSrc, imageSize),
                clickable: true,
              });
              
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 위에 인포윈도우를 표시합니다
                console.log("abc");
                console.log(index);
                const el = "#mvsidebarToggle" + index;
                document.querySelector(el).click();
      

              });
              this.markers.push(marker);
            });

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    }, 
  },
  computed:{
    ...mapState(mapStore, ["markerPositions","mapList", "interList"]),
  },
  methods: {
    ...mapMutations(mapStore, ["APPEND_INTER_LIST"]),
    onInterClick(){
      for (let index = 0; index < this.interList.length; index++) {
        if(this.interList[index] === this.detailapt.aptCode){
          this.isInter = false;
          this.interList.splice(index, 1);
          return;
        }
      }
      this.APPEND_INTER_LIST(this.detailapt.aptCode);
      this.isInter = true;
    },

    setData(k) {
      if (this.no != -1) this.infos[this.no].setMap(null);
      this.isList = false;
      this.no = k;
      this.detailapt = this.mapList[k];
      var flag = true;
      for (let index = 0; index < this.interList.length; index++) {
        if(this.interList[index] === this.detailapt.aptCode){
          this.isInter = true;
          flag = false
          break;
        }
      }
      if (flag) {
        this.isInter = false;
      }
      var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      var position = new kakao.maps.LatLng(Number(this.detailapt.lat), Number(this.detailapt.lng));
      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      this.infos[this.no].open(this.map, this.markers[this.no]);
      this.map.panTo(position);
      
      roadviewClient.getNearestPanoId(position, 100, function(panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
      const el = "#sidebarToggle" + k;
      
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
      this.map = new kakao.maps.Map(container, options);
      
    },

  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {

  width: 100vw;
  height: 100vh;

}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

</style>
