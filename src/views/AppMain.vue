<template>
  <main>
    <section class="container-fluid main-banner p-5">
      <div class="banner-title-box">
        <div class="banner-title display-3 text-center p-5 text-white border-bottom border-2">FIND HOME</div>
        <!-- <c:if test="${userinfo ne null}"> -->
        <form class="search-box p-5" method="GET">
          <div class="row col-md-12 mb-2 justify-content-center text-center">
            <input type="hidden" name="act" value="search" />
            <div class="form-group col-md-2">
              <select class="form-select bg-white" id="sido" name="sido">
                text-black
                <option value="">시도선택</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <select class="form-select bg-white text-black" id="gugun" name="gugun">
                <option value="">구군선택</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <select class="form-select bg-white text-black" id="dong" name="dong">
                <option value="">동선택</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <select class="form-select bg-white text-black" id="year" name="year"></select>
            </div>
            <div class="form-group col-md-2">
              <select class="form-select bg-white text-black" id="month" name="month">
                <option value="">매매월선택</option>
              </select>
            </div>

            <div class="form-group col-md-2">
              <button type="button" id="list-btn" class="btn btn-outline-light">매매 정보 가져오기</button>
              <!--                <button type="submit" id="list-btn" class="btn btn-outline-light">
                  매매 정보 가져오기
                </button>-->
            </div>
          </div>
        </form>
        <!-- </c:if> -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppMain",
  mounted() {
    let date = new Date();
    let yearEl = document.querySelector("#year");
    let yearOpt = `<option value="">매매년도선택</option>`;
    let year = date.getFullYear();
    for (let i = year; i > year - 20; i--) {
      yearOpt += `<option value="${i}">${i}년</option>`;
    }
    yearEl.innerHTML = yearOpt;
  },
  computed: {
    ...mapState(["sido"]),
  }
};
</script>

<style></style>
