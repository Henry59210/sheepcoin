<template>
    <router-view :key="key"></router-view>
</template>

<script>
export default {
  name: "MainContainer",
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
