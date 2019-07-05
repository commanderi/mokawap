<template>
  <div class="recharge-list">
    <!-- header -->
    <div class="am-navbar am-navbar-dark">
      <div class="navbar am-navbar-left" role="button">
        <span class="am-navbar-left-icon" aria-hidden="true">
          <div class="iconBack" @click="returnFn()"></div>
        </span>
      </div>
      <div class="navbar am-navbar-title">
        <div class="lottery-mask" @click="hideAssistantFn" v-if="isSelect"></div>
        <div class="titleContainer___foEz3" @click="showSelectLotteryFn">
          <span>{{selectText}}</span>
          <div class="sanjiao___2WERR"></div>
        </div>
        <div class="am-popover-inner" v-if="isSelect">
          <div class="body___1t9uH">
            <div class="menuBody___2PhYY">
              <div :class="['menuItem___2Mzkn', item.active?'active':'']" v-for="(item, index) in typeList"
                   @click="confirmPlaying(index)">
                {{item.name}}
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="navbar am-navbar-right" style="position: relative;"></div>
    </div>
    <div class="content">
      <div class="" v-if="dataList.length>=1" style="width: 100%; padding: 0;">
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <template>
              <div class="container___2jMj3" v-for="(item, index) in dataList" :key="index">
                <div class="title___3SxHD">{{item.title?item.title:'温馨提醒'}}</div>
                <div class="time___3qKP_">{{item.create_at}}</div>
                <div class="textContent___TkhLO">
                  <div class="texts___3Tbos">
                    {{item.content}}
                  </div>
                </div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>
      </div>
      <!-- 暂无数据 -->
      <div class="flex___16JOt container___2qnaf" v-if="dataList.length<=0">
        <div class="imgError___64CBy"></div>
        <div class="errorText1___3qfol">暂无数据</div>
        <!--<div class="buttonContainer___3tdAY">-->
        <!--<button class="color1___3wpTZ">立即充值</button>-->
        <!--</div>-->
      </div>

    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import {mapState} from 'vuex'
  import {GetMyMessage} from '../../axios/api.js'

  export default {
    name: 'recharge-list',
    data() {
      return {
        refreshing: false,
        loading: false,
        isSelect: false,
        page: 1, // 当前页数
        last_page: 0, // 总共多少也
        dataList: [],
        type: 0,
        selectText: '全部',
        typeList: [
          {
            name: '全部',
            active: true
          },
          {
            name: '普通',
            active: false
          },
          {
            name: '优惠',
            active: false
          },
          {
            name: '出入款',
            active: false
          }
        ]
      }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {

      this.getData()
    },
    methods: {
      returnFn() {
        this.$router.back(-1)
      },
      getData() {
        // 0全部1普通2优惠3出入款
        let param = {
          type: this.type,
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          page: this.page
        }
        GetMyMessage(param).then(res => {
          this.loading = false;
          let list = res.data.data
          let dataList = this.dataList
          for (var i = 0; i < list.length; i++) {
            dataList.push(list[i])
          }
          this.dataList = dataList
          this.last_page = res.data.last_page
        })
      },
      //  显示
      showSelectLotteryFn() {
        this.isSelect = true
      },
      hideAssistantFn() {
        this.isSelect = false
      },
      // 选择玩法 确认
      confirmPlaying(index) {
        let typeList = this.typeList
        for (var i = 0; i < typeList.length; i++) {
          typeList[i].active = false
        }
        typeList[index].active = true
        this.type = index
        this.selectText = typeList[index].name
        this.dataList = []
        this.page = 1
        this.isSelect = false
        this.getData()
      },
      load() {
        if (this.last_page > this.page) {
          // 总页数 > 当前页数
          this.page += 1
          this.loading = true;
          this.getData()
        }
      }
    }
  }
</script>
<style scoped lang="less">
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
    background: #292d30;
  }

  .navbar {
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
        background: url('../../assets/top_bar_back.png') 50% no-repeat;
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

  .lottery-mask {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .6);
  }

  .am-popover-content {
    width: 1.84rem;
    height: auto;
    background: #fff;
    position: absolute;
    top: .9rem;
    right: .2rem;
    z-index: 201;
    color: #333;
    font-size: .30rem;

  }

  .titleContainer___foEz3 {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    line-height: 38px;
    height: 38px;
    padding: 0 .1rem;
    border: 1px solid #ffc252;
    border-radius: 3px;
    font-size: .32rem;
  }

  .sanjiao___2WERR {
    margin-left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .16rem .14rem 0;
    border-color: #ffc252 transparent transparent;
  }

  .am-popover-inner {
    width: 92%;
    height: auto;
    background: #fff;
    position: absolute;
    top: .9rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 201;
    color: #333;

    .body___1t9uH {
      background: #fff;
      overflow: auto;
    }

    .menuBody___2PhYY {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 0 .1rem;
    }

    .menuItem___2Mzkn {
      background: #fff;
      width: 1.72rem;
      font-size: .24rem;
      border-radius: 4px;
      color: #000;
      border: 1px solid #d8d8d8;
      margin: 5px;
      padding: 8px 0;

      &.active {
        border: 1px solid #fc3838;
      }
    }

  }

  /**/
  .container___2jMj3 {
    margin: 0 .2rem .2rem;
    background: #fff;
    border-radius: 8px;
    font-size: .28rem;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    text-align: left;
    .title___3SxHD {
      font-size: .32rem;
      margin: .26rem 0 .1rem .36rem;
    }
    .time___3qKP_ {
      color: #999;
      margin-left: .38rem;
    }
    .textContent___TkhLO {
      border-top: 1px solid #e6e4e4;
      margin: .1rem .06rem 0;
      padding: .2rem 0;
      line-height: .32rem;
      color: #999;
      .texts___3Tbos {
        margin-left: .28rem;
        color: #999;
      }
    }
  }
</style>
