<template>
<div>
  <div class="nav-bar-container">
    <router-link to="/" style="flex: 1">
      <div style="height: 100%; display: table">
        <span style="display:table-cell;vertical-align:middle;">
          <img src="../../assets/img/brand.jpeg" style="height:60px;width: 100%"/>
        </span>
      </div>
    </router-link>
    <div class="main-options-container">
<!--      <router-link v-for="route in routes" :key="route.path" :to="route.path" custom v-slot="{ navigate }">-->
<!--        <div @click="navigate" @keypress.enter="navigate" role="link">{{route.name}}</div>-->
<!--      </router-link>-->
      <router-link class="main-options" tag="div" v-for="route in routes" :key="route.path" :to="route.path">{{route.name}}</router-link>
    </div>
    <div class="null-place" ></div>
    <div class="account-info-container">
      <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>
            <span>{{username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in accountOptions" :key="item.path" :command="item.name">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "NavBar",
  props: {

  },
  computed: {
    routes() {
      let result = []
      this.$router.options.routes.forEach(item=>{if(item.name) result.push(item)})
      return result
    },
    accountOptions() {
      let result = []
      this.$router.options.routes.forEach(item=>{if(item.path === '/account') result = [...item.children]})
      return result
    },
    username() {
      return 'admin1'
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'Account': this.$router.push('/account'); break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.nav-bar-container {
  display: flex;
  justify-content: space-around;
  padding: 0 16px 0 16px;
  background: black;
  height: 60px;
  line-height: 60px;
  color: white;
}
.main-options-container {
  flex: 3;
  display:flex;
  justify-content: space-between;
}
.main-options {
  flex: 1;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  &.router-link-active{
    background: #3d3b3b;
  }
}
.null-place {
  flex:1
}
.account-info-container {
  flex:1;
  text-align: right;
}
.el-icon-user-solid {
  padding-right: 10px;
}
.account-options {
  display: inline-block;
  font-size:20px;
  padding-right: 10px;
  cursor: pointer;
}
.el-dropdown-link {
  color: white;
  font-size: 16px;
  cursor: pointer;
}

</style>
