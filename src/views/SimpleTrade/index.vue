<template>
  <div>
    <div class="trade-options-container">
      <el-menu
          :default-active="activateName"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1f2138"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handClick" >
        <el-menu-item v-for="item in simpleTrade" :key="item.path" :index="item.path" @click.native.prevent="activateName=item.path">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="trade-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "simple-trade",
  data() {
    return {
      activateName: 'express',
    };
  },
  watch: {
      $route: {
        handler: function(route) {
          this.activateName = route.meta.activateName.toLowerCase() //fix bug： 切换导航菜单时activateName不变，会导致样式无法更新，只有三层路由会有问题
        },
        immediate: true
      }
  },
  computed: {
    simpleTrade() {
      return this.$router.options.routes.filter(item => {
        return item.path === '/simpleTrade'
      })[0].children[0].children
    },
    // fix bug2: 同一个问题，解决方式不同
    tabValue: {
      get() {
        return this.$route.name.toLowerCase()
      },
      set(value) {
        this.$router.push(value)
      }
    }
  },
  methods: {
    handClick(key) {
      console.log(key)
      this.$router.push('/simpleTrade/trade/' + key)
    }
  }
}
</script>

<style scoped>
.trade-options-container {
  height: 60px;
}
.trade-area {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
}
.el-menu-demo {
  padding: 0 10%;
}
/deep/.el-menu-item {
  font-size: 17px;
}
</style>
