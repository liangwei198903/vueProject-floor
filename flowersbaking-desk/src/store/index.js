import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: "",
    user:{},
    isLogin:false,
    orderData:{}
  },
  mutations: {
    changeUser(state, payload) {
      state.userName = payload
    },
    changeUser(state, payload) {
      state.user = payload
    },
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    changeOrderData(state, payload) {
      state.orderData = payload
    },
  },
  actions: {},
})