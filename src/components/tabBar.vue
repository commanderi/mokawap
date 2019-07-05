<template>
  <div class="tab-bar">
    <div class="am-tab-bar-bar">
      <div :class="['am-tab-bar-tab',active==1?'iconHomeActive':'iconHome']" @click="changePage('/', {})">
        <div class="am-tab-bar-tab-icon" >
          <div class="tab-bar-ico"></div>
        </div>
        <p class="am-tab-bar-tab-title" >首页</p>
      </div>
      <div :class="['am-tab-bar-tab',active==2?'iconShoppingActive':'iconShopping']" @click="changePage('/shoping', {})">
        <div class="am-tab-bar-tab-icon">
          <div class="tab-bar-ico"></div>
        </div>
        <p class="am-tab-bar-tab-title">购彩</p>
      </div>
      <div :class="['am-tab-bar-tab',active==3?'iconLotteryActive':'iconLottery']" @click="changePage('/openLottery', {})">
        <div class="am-tab-bar-tab-icon" >
          <div class="tab-bar-ico"></div>
        </div>
        <p class="am-tab-bar-tab-title" >开奖</p>
      </div>
      <!--<div class="am-tab-bar-tab">-->
        <!--<div class="am-tab-bar-tab-icon">-->
          <!--<div class="tab-bar-ico iconTrend"></div>-->
        <!--</div>-->
        <!--<p class="am-tab-bar-tab-title" >走势</p>-->
      <!--</div>-->
      <div :class="['am-tab-bar-tab',active==4?'iconMineActive':'iconMine']" @click="personalFn">
        <div class="am-tab-bar-tab-icon" >
          <div class="tab-bar-ico"></div>
        </div>
        <p class="am-tab-bar-tab-title" >我的</p>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'tab-bar',
    data () {
      return {

      }
    },
    props: ['active'],
    computed: {
      ...mapState(["loginInfo"])
    },
    mounted() {
      // console.log(this.active)
    },
    methods: {
      personalFn() {
        if(this.loginInfo) {
          this.$router.push('/personal')
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .tab-bar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 1rem;
    .am-tab-bar-bar{
      background: #13171a;
      color: #5d5d5d;
      font-size: .2rem;
      position: relative;
      box-sizing: border-box;
      height: 1rem;
      border-top: 1px solid #424242;
      box-shadow: 0px 0px 3px 0px #424242;
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      transition-duration: .2s;
      transition-property: height bottom;
      z-index: 100;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -ms-flex-align: center;
      align-items: center;
      bottom: 0;
      .am-tab-bar-tab{
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-direction: column;
        flex-direction: column;
        text-align: center;
        width: 100%;
      }
      .am-tab-bar-tab-icon{
        display: flex;
        justify-content: center;
      }
      .am-tab-bar-tab-title{
        margin-top: .08rem;
      }
    }
  }
  .am-tab-bar-tab .tab-bar-ico{
    background-size: contain;
    background-repeat: no-repeat;
    height: .44rem;
    width: .44rem;
  }
  .iconHome .tab-bar-ico {
    background-image: url(../assets/index_home.png);
  }
  .iconHomeActive{
    color: #ffc252;
    .tab-bar-ico{
      background-image: url(../assets/index_home_pressed.png);
    }
  }
  .iconShopping .tab-bar-ico{
    background-image: url(../assets/index_shopping.png);
  }
  .iconShoppingActive{
    color: #ffc252;
    .tab-bar-ico{
      background-image: url(../assets/index_shopping_pressed.png);
    }
  }
  .iconLottery .tab-bar-ico{
    background-image: url(../assets/index_lottery.png);
  }
  .iconLotteryActive {
    color: #ffc252;
    .tab-bar-ico{
      background-image: url(../assets/index_lottery_pressed.png);
    }
  }
  .iconTrend .tab-bar-ico{
    background-image: url(../assets/index_trend.png);
  }
  .iconTrendActive {
    color: #ffc252;
    .tab-bar-ico{
      background-image: url(../assets/index_trend_pressed.png);
    }
  }
  .iconMine .tab-bar-ico{
    background-image: url(../assets/index_mine.png);
  }
  .iconMineActive {
    color: #ffc252;
    .tab-bar-ico{
      background-image: url(../assets/index_mine_pressed.png);
    }
  }
</style>
