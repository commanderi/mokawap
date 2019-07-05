<template>
  <div class="back-header">
    <div class="am-navbar am-navbar-dark">
      <div class="navbar am-navbar-left" role="button">
        <span class="am-navbar-left-icon" aria-hidden="true">
          <div class="iconBack" @click="returnFn()"></div>
        </span>
      </div>
      <div class="navbar am-navbar-title">{{title}}</div>
      <div class="navbar am-navbar-right">
        <div class="" v-if="rightContent" @click="onClickType">{{rightContent}}</div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'back-header',
    data () {
      return{

      }
    },
    props: ['title', 'rightContent'],
    mounted() {
    },
    methods: {
      returnFn() {
        this.$router.back(-1)
      },
      onClickType() {
        let type = this.rightContent
        if(type == '充值明细'){
          this.$router.push({
            path: '/rechargeList',
            query: {
              type: 1,
              title: '充值记录'
            }
          })
        } else if(type == '提现明细') {
          this.$router.push({
            path: '/rechargeList',
            query: {
              type: 2,
              title: '提款记录'
            }
          })
        } else if(type == '+添加用户') {
          this.$router.push({
            path: '/addAgent',
            query: {}
          })
        } else if(type == '我要反馈') {
          this.$router.push({
            path: '/addFeedback',
            query: {}
          })
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .back-header{
    .am-navbar {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: .9rem;
      display: flex;
      justify-content: space-between;
      color: #ffc252;
      background: #13171a;
    }
    .navbar{
      flex: 1 1;
      height: 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
    }
    .am-navbar-left {
      padding-left: 15px;
      font-size: 16px;
      .am-navbar-left-icon {
        margin-right: 5px;
        display: inherit;
        .iconBack {
          background: url('../../src/assets/top_bar_back.png') 50% no-repeat;
          background-size: contain;
          width: .64rem;
          height: .64rem;
        }
      }
    }
    .am-navbar-title {
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 18px;
      white-space: nowrap;
    }
    .am-navbar-right {
      -ms-flex-pack: end;
      justify-content: flex-end;
      font-size: 16px;
      margin-right: 15px;
    }
  }

</style>
