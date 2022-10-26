<template>
  <div class="container">
    <div class="sideBar-container">
      <el-menu
          :default-active="tabValue"
          class="el-menu-vertical-demo"
          @select="showPage">
        <el-menu-item v-for="(item, index) in routes" :key="index" :index="item.name" >
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="operate-container">
      <router-view class="display-area"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "manager",
  data() {
    return {}
  },
  computed: {
    tabValue: {
      get() {
        return this.$route.name
      },
      set(value) {
        this.$router.push(value)
      }
    },
    routes() {
      return this.$store.getters.permission_routes.filter(item=> { return item.path === '/manager'} )[0].children[0].children
    }
  },
  methods:{
    showPage(index) {
      this.$router.push('/manager/index/' + index.toLowerCase())
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  /*height: calc(100% - 60px);*/
  top: 60px;
  bottom: 0;
}
.sideBar-container {
  position: absolute;
  width: 15%;
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
  text-align: center;
}
.operate-container {
  height: 100%;
  margin-left: 15%;
  box-sizing: border-box;
  padding: 20px;
}
.display-area {
  height: 100%;
  width: 100%;
}
</style>
