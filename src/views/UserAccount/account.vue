<template>
  <div class="account">
    <div class="options-container">
      <el-menu
          :default-active="tabValue"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1f2138"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item v-for="item in accountOptions" :key="item.path" :index="item.path" @click.native.prevent="tabValue=item.path">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="content-container">
      <div class="user-info">{{ username }}</div>
      <div class="user-option-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-wallet",
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.getUsername()
  },
  computed: {
    accountOptions() {
      return this.$router.options.routes.filter(item => {
        return item.path === '/account'
      })[0].children[0].children
    },
    tabValue: {
      get() {
        console.log(this.$route.name)
        return this.$route.name.toLowerCase()
      },
      set(value) {
        this.$router.push(value)
      }
    }
  },
  methods: {
    getUsername() {
      this.username = this.$store.getters.username
    }
  }
}
</script>

<style scoped>
.account {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
}
.options-container {
  height: 60px;
}
.content-container {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
}
.user-info {
  height: 150px;
  line-height: 100px;
  font-size: 25px;
  padding-left: 50px;
}
.user-option-content {
  position: absolute;
  top: 100px;
  bottom: 0;
  width: 100%;
}
.el-menu-demo {
  padding: 0 10%;
}
/deep/.el-menu-item {
  font-size: 17px;
}
</style>
