<template>
  <div class="headers">
    <div class="box">
      <div class="h-row h-left">
        <div class="ava-info" v-if="isLogin" @click="changePage('/personal', {})">
          <img src="../assets/index_personal.png" alt="" class="ava-img">
        </div>
        <div class="btn-zc" @click="changePage('/register', {})" v-else>注册</div>
      </div>
      <div class="h-row h-center title">摩咖娱乐</div>
      <div class="h-row h-right">
        <!--<div class="" @click="changePage('/collectList', {})" v-if="isLogin">我的收藏</div>-->
        <div v-if="isLogin" style="font-size: .24rem;">余额:{{total}}</div>
        <div class="" @click="changePage('/login', {})" v-else>登录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { GetPersonalInfo } from '../axios/api.js'
  export default {
    name: 'headers',
    data () {
      return {
        isLogin: false,
        total: ''
      }
    },
    computed: {
      ...mapState(['loginInfo'])
    },
    mounted() {
      if(this.loginInfo){
        this.isLogin = true
        this.getPersonalInfo()
      }else{
        this.isLogin = false
      }
    },
    methods: {
      // 获取个人信息
      getPersonalInfo() {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          this.total = res.data.money
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .headers{
    width: 100%;
    background: #13171a;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow: hidden;
    .box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 .2rem;
      color: #ffc252;
      font-size: .28rem;
      .h-left{
        width: 30%;
        text-align: left;
        .ava-info{
          height: .9rem;
        }
        .ava-img {
          width: .6rem;
          height: .6rem;
          margin-top: .15rem;
        }
      }
      .h-center{
        width: 40%;
      }
      .h-right{
        width: 30%;
        text-align: right;
      }
      .title{
        font-size: .34rem;
      }
      .h-row{
        line-height: .9rem;
      }
    }
  }
</style>
