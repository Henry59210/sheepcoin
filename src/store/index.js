import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import trade from './modules/trade'
import getters from "@/store/getters";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    trade
  },
  getters
})

export default store
