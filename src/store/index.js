import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
const store = new Vuex.Store({
  state:{
    loginInfo: loginInfo,
    host: 'http://api.vs04o.cn/',
    BettingData: [],
    getCates:null,
    oneIndex:null,
    twoIndex:null,
  },
  // mutations主要是修改store存储的值(同步)
  mutations:{
    increment(state,data){
      state.BettingData.push(data);
      state.oneIndex = data;
      state.twoIndex = data;
    },
  },
  getters:{
    chengedata(state){
      return state.BettingData
    },
  },
  // actions是异步的
  actions:{}
})
export default store
