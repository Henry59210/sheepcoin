<template>
  <div>
    <video src="../../assets/img/loginBackground.mp4" autoplay="autoplay" loop="loop" muted="muted"></video>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "login-page"
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
