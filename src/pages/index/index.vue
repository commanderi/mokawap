<template>
  <div class="index">
    <Header></Header>
    <div class="content">
      <mu-carousel class="mu-carousel" hide-controls hide-indicators @change="carouselChange">
        <mu-carousel-item v-for="(item, index) in bannerDataList" :key="index">
          <a :href="item.ad_click_url_wap" style="display: inline-block;height: 2.8rem;">
            <img class="carousel-img" :src="item.ad_url">
          </a>
        </mu-carousel-item>
        <div class="indicators-box">
          <div :class="['indicators-list',indicatorsActive==index?'active':'']" v-for="(item, index) in bannerDataList" :key="index"></div>
        </div>
      </mu-carousel>
      <!-- 公告 -->
      <div class="notice-box" @click="changePage('/notice', {})">
        <div class="notice-title">公告：</div>
        <div class="scroll-box">
          <div class="notice-scroll-container" id="noticeScroll" :style="{marginLeft: ml + 'px'}">
            <span v-for="(item, index) in noticeList" :key="index" v-html="item.content_lb"></span>
          </div>
        </div>
      </div>
      <!-- -->
      <div class="amlist-flexbox">
        <div class="action-item" @click="onlineService">
          <img class="item-img" src="../../assets/zxkf.png">
          <p class="item-tit">在线客服</p>
        </div>
        <div class="action-item" @click="onChongZhiPage">
          <img class="item-img" src="../../assets/cztk.png">
          <p class="item-tit">充值/提款</p>
        </div>
        <div class="action-item" @click="onTouZhuPage">
          <img class="item-img" src="../../assets/tz_record.png">
          <p class="item-tit">投注记录</p>
        </div>
        <div class="action-item" @click="changePage('/specialOffer', {})">
          <img class="item-img" src="../../assets/yhhd.png">
          <p class="item-tit">优惠活动</p>
        </div>
        <!--<div class="action-item">
          <img class="item-img" src="../../assets/default.png" alt="">
          <p class="item-tit">开元棋牌</p>
        </div>-->
      </div>
      <!-- 热门 -->
      <div class="hotList">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">热门彩种</div>
        </div>
        <div class="am-flexbox am-flexbox-wrap am-flexbox-align-center">
          <div class="listItem" @click="lotteryPageFn(item)" v-for="(item, index) in catesList" :key="index">
            <div class="listLeftItem">
              <div class="title">{{item.name}}</div>
              <div class="description">{{item.detail}}</div>
            </div>
            <img class="imgLogo" :src="item.cate_img">
          </div>
        </div>
      </div>
      <!-- 全部彩种 -->
      <div class="hotList">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">彩种推荐</div>
        </div>
        <div class="am-flexbox am-flexbox-wrap am-flexbox-align-center">
          <div class="listItem listItem-right" @click="alertFn" v-for="(item, index) in imgUrl" :key="index">
            <img class="imgLogo" alt="" :src="item.link">
            <div class="listRightItem">
              <div class="title">{{fontArr[index]}}</div>
            </div>
          </div>
          <div class="listItem listItem-right" @click="changePage('/shoping', {})">
            <div class="listRightItem">
              <div class="title">&nbsp;&nbsp;&nbsp;&nbsp;更多彩种.....</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 棋牌游戏 -->
      <div class="hotList" v-if="gameInfo">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">棋牌游戏</div>
        </div>
        <div class="am-flexbox am-flexbox-wrap am-flexbox-align-center">
          <div class="listItem listItem-right" @click="gameLink(gameInfo.url_ky,1)">
            <img class="imgLogo" alt="" src="../../assets/KY.png">
            <div class="listRightItem">
              <div class="title">开元棋牌</div>
              <div class="description">开元棋牌游戏</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 电子游戏 -->
      <div class="hotList" v-if="gameInfo">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">电子游戏</div>
        </div>
        <div class="am-flexbox am-flexbox-wrap am-flexbox-align-center">
          <div class="listItem listItem-right" @click="gameLink(gameInfo.url_ag,1)">
            <img class="imgLogo" src="../../assets/MGgame.png">
            <div class="listRightItem">
              <div class="title">真人AG</div>
              <div class="description">AG电子游戏</div>
            </div>
          </div>
          <div class="listItem listItem-right" @click="gameLink(gameInfo.url_jdb,1)">
            <img class="imgLogo" src="../../assets/SSSport.png">
            <div class="listRightItem">
              <div class="title">JDB电子</div>
              <div class="description">JDB电子游戏</div>
            </div>
          </div>
          <div class="listItem listItem-right" @click="gameLink(gameInfo.url_cq,0)">
            <img class="imgLogo" src="../../assets/FG.png">
            <div class="listRightItem">
              <div class="title">MW电子</div>
              <div class="description">MW电子游戏</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 体育竞技 -->
      <div class="hotList" v-if="gameInfo">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">体育竞技</div>
        </div>
        <div class="am-flexbox am-flexbox-wrap am-flexbox-align-center">
          <div class="listItem listItem-right" @click="gameLink(gameInfo.url_ibc,0)">
            <img class="imgLogo" alt="" src="../../assets/IMSport.png">
            <div class="listRightItem">
              <div class="title">沙巴体育</div>
              <div class="description">沙巴体育平台</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新中奖榜 -->
      <div class="ranking-list-box">
        <div class="am-flexbox container___1yjck am-flexbox-align-center">
          <div class="title___3syfh">最新中奖榜</div>
        </div>
        <div class="scrollMainContainer" @click="changePage('/topWinnerListPage', {})">
          <div class="scrollContainer" id="tableScrollContainer" :style="{marginTop: mt + 'px'}">
            <table class="table" >
              <tr v-for="(item, index) in latestWinnersList" :key="index">
                <td>{{item.mobile}}</td>
                <td class="c-color">喜中{{item.z_money}}元</td>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="hb" @click="hongbao"><img src="../../assets/74003.png"></div>
      <!-- alert 公告 滚动弹框 -->
      <div class="layer" v-if="isLayer">
        <div class="layer-content-box">
          <div class="layer-title">公告</div>
          <div class="layer-content" style="position: relative">
            <mu-carousel class="notice-carousel" hide-controls hide-indicators :cycle="noticeCycle" @change="noticeCarouselChange">
              <mu-carousel-item v-for="(item, index) in noticeList" :key="index">
                <div class="notice-scroll" v-html="item.content"></div>
              </mu-carousel-item>
            </mu-carousel>
            <div class="indicators-box" style="height: .4rem;bottom: -.2rem;">
              <div :class="['indicators-list indicators-list-bg',noticeIndicatorsActive==index?'active':'']" v-for="(item, index) in bannerDataList" :key="index"></div>
            </div>
          </div>
          <div class="layer-btn-box" style="margin: .5rem 0 .3rem;">
            <div class="layer-btn" @click="closeLayer">确认</div>
          </div>
        </div>
      </div>
    </div>
    <TabBar active="1"></TabBar>
  </div>
</template>
<script>
  import Header from '@/components/header.vue'
  import TabBar from '@/components/tabBar.vue'
  import { mapState } from 'vuex'
  import { GetBanners, GetNotice, GetLatestWinnersList, GetCates, GetThirdUrl, GetKefu } from '@/axios/api.js'
  export default {
    name: 'index',
    data () {
      return {
        isLayer: false,
        noticeTimer: null,
        tableTimer: null,
        maxNoticeScroll: 0,
        ml: 100,
        mt: 100,
        maxTableScroll: 0,
        bannerDataList: [],
        indicatorsActive: 0,
        latestWinnersList: [],
        catesList: [],
        noticeList: [],
        noticeIndicatorsActive: 0,
        noticeCycle: false,
        kefuUrl: null,
        gameInfo: null,
        imgUrl:[
          {link:require('../../assets/img/i1.png')},
          {link:require('../../assets/img/i2.png')},
          {link:require('../../assets/img/i3.png')},
          {link:require('../../assets/img/i4.png')},
          {link:require('../../assets/img/i5.png')},
        ],
        fontArr:['新疆时时彩','广东11选5','福彩3D','河北快3','湖北11选5'],
      }
    },
    computed: {
      ...mapState(["host", "loginInfo"])
    },
    components: {
      Header,
      TabBar
    },
    beforeRouteLeave(to, from, next){
      next()
      if(to.name==='specialOffer'){
        document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      }
    },
    destroyed() {
      clearInterval(this.noticeTimer)
      clearInterval(this.tableTimer)
    },
    mounted() {
      // 接口
      this.getBanner()
      this.getNotice()
      this.getLatestWinnersList()
      this.getCates()
      this.getThirdUrl()
      let isNotice = sessionStorage.getItem('isNotice')
      if(isNotice==null) {
        // 第一次进入网站 show notice
        this.isLayer = true
        sessionStorage.setItem('isNotice', true)
      } else {
        this.isLayer = false
      }
    },
    methods: {
      alertFn() {
        this.$toast.success('更新中，敬请期待...')
      },
      // 第三方游戏投注
      getThirdUrl() {
        if(this.loginInfo){
          GetThirdUrl({
            token: this.loginInfo.token,
            uid: this.loginInfo.id
          }).then(res => {
            // console.log(res);
            this.gameInfo = res.data
          })
        }
      },
      hongbao:function(){
        if(this.loginInfo){
          this.changePage('/turntable', {})
        }else{
          this.$router.push('/login')
        }
      },
      gameLink(url,n) {
        if(n==0){
          let url_new = 'jumpbrowser://callName_?'+url;
          window.location.href = url_new;
        }else{
          this.changePage('/iframe', {'url':url});
        }
      },
      // 购彩详情
      lotteryPageFn(item) {
        if(this.loginInfo){
          let obj = {}
          switch(item.kind){
            case 'PK10':
              obj = {
                path: 'PK10/BJPK10',
                query: {id: item.id, title: item.name}
              }
              break;
            case 'SSC':
              obj = {
                path: 'SSC/CQSSC',
                query: {id: item.id, title: item.name}
              }
              break;
            case 'KS':
              obj = {
                path: 'K3/JSK3',
                query: {id: item.id, title: item.name}
              }
              break;
            case 'LHC':
              obj = {
                path: 'LHC/XGLHC',
                query: {id: item.id, title: item.name}
              }
              break;
            default:
              alert('暂无此彩种')
          }
          this.$router.push(obj)
        } else {
          this.$router.push('/login')
        }
      },
      closeLayer() {
        this.isLayer = false
      },
      getBanner() {
        GetBanners().then(res => {
          this.bannerDataList = res.data
        })
      },
      //
      onChongZhiPage() {
        // console.log(this.loginInfo);
        if(this.loginInfo) {
          this.$router.push('/personal')
        } else {
          this.$router.push('/login')
        }
      },
      //
      onTouZhuPage() {
        if(this.loginInfo) {
          this.$router.push('/gameRecord')
        } else {
          this.$router.push('/login')
        }
      },
      carouselChange(index) {
        this.indicatorsActive = index
      },
      noticeCarouselChange(index) {
        this.noticeIndicatorsActive = index
      },
      getNotice() {
        GetNotice().then(res => {
          this.noticeList = res.data
        })
      },
      // 获取所有彩种
      getCates() {
        GetCates().then(res => {
          this.catesList = res.data
          setTimeout(() => {
            let maxNoticeScroll = 0
            $("#noticeScroll span").each(function(e){
              maxNoticeScroll += $(this).width()
            })
            this.maxNoticeScroll = maxNoticeScroll
            // 公告滚动
            this.noticeTimer = setInterval(()=>{
              this.noticeScrollFn()
            },30)
          }, 100)
        })
      },
      getLatestWinnersList() {
        GetLatestWinnersList().then(res => {
          this.latestWinnersList = res.data
          if(res.data.length <= 4){
            this.mt = 0
            return false
          }
          // 中奖榜滚动
          setTimeout(()=>{
            this.maxTableScroll = $("#tableScrollContainer").height()
            this.tableTimer = setInterval(()=>{
              this.tableScrollFn()
            },50)
          }, 100)
        })
      },
      noticeScrollFn(){
        this.ml--
        if(this.ml <= -this.maxNoticeScroll){
          this.ml = 100
        }
      },
      tableScrollFn() {
        this.mt--
        if(this.mt <= -this.maxTableScroll){
          this.mt = 100
        }
      },
      onlineService() {
        GetKefu().then(res => {
          if(res.ret == 200) {
            window.location.href = res.data.kefu
          } else {
            this.$toast.error(res.msg)
          }
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .indicators-box{
    width: 100%;
    height: .8rem;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    .indicators-list{
      width: .2rem;
      height: .2rem;
      border-radius: 50%;
      margin: 0 .12rem;
      background: #fff;
      opacity: .5;
      &.active{
        opacity: 1;
      }
    }
    .indicators-list-bg{
      background: #000;
    }
  }
  .layer{
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
    .layer-content-box{
      width: 80%;
      height: auto;
      background: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 1001;
      transform: translate(-50%, -50%);
      border-radius: 6px;
      .layer-title{
        width: 100%;
        text-align: center;
        padding: .2rem;
        border-bottom: 1px #ccc solid;
      }
      .layer-content{
        padding: .2rem;
        .notice-carousel{
          height: 3rem;
        }
        .notice-scroll{
          width: 100%;
          height: 100%;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          position: absolute;
          left: 0;
          right: 0;
          -webkit-transition: .4s cubic-bezier(.25,.8,.5,1);
          transition: .4s cubic-bezier(.25,.8,.5,1);
          overflow: scroll;
        }
      }
      .layer-btn-box{
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        margin: .3rem 0;
        .layer-btn{
          width: 1.2rem;
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          background: #f8ad20;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
  }
  .hb{
    position: fixed;
    top: 78vh;
    right: 0.05rem;
    width: 1.3rem;
    height: auto;
  }
  .hb>img{
    width: 100%;
    height: auto;
  }
</style>
