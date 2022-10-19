import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/permission'
import socketApi from "./network/websocket";//找到封装的socket.js文件
Vue.prototype.$socketApi = socketApi;//将其挂在原型上，这样 $socketApi就在所有的 Vue 实例中可用了。

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
