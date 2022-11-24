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
      <div style="font-family: Inter; font-size: 30px">Notice</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "AppBoard",
};
</script>
<style scoped>

.form-control[readonly]{
  background-color: white;
}

</style>