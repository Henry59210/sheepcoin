import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import trade from './modules/trade'
import getters from "@/store/getters";
import permission from "./modules/permission";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    trade,
    permission
  },
  getters
})

export default store
