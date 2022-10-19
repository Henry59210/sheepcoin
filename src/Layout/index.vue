<template>
  <div>
    <nav-bar></nav-bar>
    <main-container class="main-container"></main-container>
  </div>
</template>

<script>
import NavBar from "@/Layout/Components/NavBar";
import MainContainer from "@/Layout/Components/MainContainer";
export default {
  name: 'page-layout',
  components: {MainContainer, NavBar},
}
</script>

<style scoped>
.main-container {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
}
</style>
