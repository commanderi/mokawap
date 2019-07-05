<template>
  <!-- 重庆时时彩 -->
  <div class="lottery-page">
    <!-- header -->
    <div class="am-navbar am-navbar-dark">
      <!-- 返回 -->
      <div class="navbar am-navbar-left" role="button">
          <span class="am-navbar-left-icon" aria-hidden="true">
            <div class="iconBack" @click="returnFn()"></div>
          </span>
      </div>
      <!-- 选择玩法 -->
      <div class="navbar am-navbar-title">
        <div class="menuTitle___3jHiP">玩法</div>
        <div class="titleContainer___foEz3" @click="showSelectLotteryFn" v-if="playingList">
          <div class="lotteryTitle___4KqNL" v-if="preSwitchIndex!=0">
            <div>{{playingList[preSwitchIndex].name}}</div>
            {{playingList[preSwitchIndex].play_rule[subSwitchIndex].title}}
          </div>
          <span v-else>{{playingList[preSwitchIndex].name}}</span>
          <div class="sanjiao___2WERR"></div>
        </div>
        <div class="am-popover-inner" v-if="isSelect">
          <div class="parentTitle___1fCnq">选择玩法</div>
          <div class="body___1t9uH">
            <div class="menuBody___2PhYY">
              <div :class="['menuItem___2Mzkn', preSwitchIndex==index ? 'active' : '']"
                   v-for="(item, index) in playingList"
                   @click="confirmPlaying(item,index)" :key="index">{{item.name}}
              </div>
            </div>
            <div class="activeTitle___143cx" v-if="preSwitchIndex!=0">
              {{playingList[preSwitchIndex].play_rule[subSwitchIndex].title}}
            </div>
            <div class="menuBody___2PhYY">
              <div :class="['menuItem___2Mzkn', subSwitchIndex==index ? 'active' : '']"
                   v-for="(item, index) in playingList[preSwitchIndex].play_rule"
                   @click="confirmPlayingSub(item,index)" :key="index" v-if="preSwitchIndex!=0">{{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 购彩助手 -->
      <div class="navbar am-navbar-right" style="position: relative;">
        <div class="" @click="showAssistantFn">购彩助手</div>
        <div class="lottery-mask" @click="hideAssistantFn" v-if="isAssistant||isSelect"></div>
        <div class="am-popover-content" v-if="isAssistant">
          <ul class="am-popover-item-ui">
            <li @click="changePage('/gameRecord', {})">投注记录</li>
            <li @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'ssc'})">开奖历史</li>
            <!--<li>走势图</li>-->
            <li @click="changePage('/playRule', {id: id})">玩法说明</li>
            <!--<li>收藏彩票</li>-->
          </ul>
        </div>
      </div>
    </div>
    <!-- 主要 -->
    <div class="content">
      <div class="lotteryBetTimer___1mgMG">
        <div class="container___3PZA2" v-if="lastOneData">
          <div>{{lastOneData.stage}}期</div>
          <div class="lotteryWinView___1zcag">
            <div class="flex___16JOt openCode___2oEky">
              <div class="flex___16JOt sscItem___1-Qyy" v-for="(item, index) in lastOneData.number" :key="index">
                <div class="num___31j0E">{{item}}</div>
                <!--<div class="animal___2fxcU">牛</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="container___3PZA2" v-else>
            <div>正在获取{{Number(nextTimeData.next_stage)-1}}期</div>
            <div class="flex___16JOt lotteryWinView___1zcag">
              <div style="margin-right: .2rem;" >等待开奖...</div>
            </div>
        </div>
        <div>
          <div class="currentIssueId___1xhbZ">距{{nextTimeData.next_stage}}期截止</div>
          <div class="timer___1tSLt">{{hms.hour}}:{{hms.minute}}:{{hms.second}}</div>
        </div>
      </div>
      <!-- -->
      <div class="flexContainer___3DQxK">
        <div class="container___3ub3Q" id="qiCiHeight">
          <div class="listTitle___3ZzbJ">
            <div class="uniqueIssueNumber___3PLvy">期次</div>
            <div class="number___i-ryQ">开奖号码</div>
          </div>
          <div class="scrollView___1ZMYS">
            <table class="table___19NyN">
              <tr v-for="(item, index) in lastOpenNumber" :key="index">
                <td>
                  <div class="uniqueIssueNumberTd___20CZH">第{{item.stage}}期</div>
                </td>
                <td>
                  <div class="openCode___1mDSr">
                    <div class="openCode___1mDSr">
                      <div class="flex___16JOt sscItem___2s3g1" v-for="(sub, index) in item.number">
                        <div class="num____BOq0">{{sub}}</div>
                        <!--<div class="animal___AlN9W">牛</div>-->
                      </div>

                      <div class="numInfo___1PtxZ">{{item.detail[0]+'||'+item.detail[1]}}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="optionContainer___3nqVi">
            <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'ssc'})">
              <div class="moreIcon___3fQEy"></div>
              点击查看更多开奖历史
            </div>
          </div>
        </div>
        <div class="container___btf3a" id="tableQiCi" :style="{top: tableTop + 'px'}">
          <div class="container___K0zBX">
            <div class="dropIcon___3fbhG" @click="showQiCiTable"></div>
            <div class="container1___3TtZg">
              <!-- <div class="shakeBtn___3dh9N">
                <img src="../../../assets/icon_shake.png" class="shakeIcon___3iFN-">
              </div> -->
              <div class="balance___3VTdb">余额：{{userInfo.money}}元</div>
              <div class="returnCat" @click="backCart" v-if="BettingData.length>=1">返回购物车<i class="lf_num">{{BettingData.length}}</i> </div>
            </div>
          </div>
          <div class="betContainer___2sw-n">
            <ul v-if="dataList.length>0">
              <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in dataList" :key="index">
                <div class="title___3GwzV">{{ item.name }}</div>
                <div class="selectItemRight___3lZk3">
                  <!-- font -->
                  <div class="flex___16JOt btnContainer___2HDeL">
                    <div v-for="(top, i) in item.topFont" :key="i"
                         :class="['btnItem___21_fq', top.active ? 'btnItemActive' : '']"
                         @click="selectTextFn(index, i)">{{ top.text }}
                    </div>
                  </div>
                  <!-- number -->
                  <div class="flex___16JOt selectNumBody___9bXff">
                    <div class="selectMark___1Dj8V" @click="selectNumFn(index, j)" v-for="(btm, j) in item.btmNum"
                         :key="j">
                      <div :class="['selectNumItem___3nDoA', btm.active ? 'selectNumItemActive' : '']">{{btm.num}}</div>
                    </div>
                  </div>
                  <!--  -->
                  <div class="flex___16JOt checkContainer___2-1YR" v-if="item.btmText">
                    <div class="" v-for="(bt, k) in item.btmText" :key="k">
                      <div :class="['checkBox___2jX8D', bt.active?'iconChecked___1tkhj':'iconCheck___2HmbD']"
                           @click="selectMoneyUnit(index, k)"></div>
                      {{bt.name}}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="footerContainer___qA5nn">
        <div class="theme2___13ElA undefined button___3xxsI" @click="clearBetDataFn">清空</div>
        <div class="flex___16JOt betInfoContainer___1hnNI">
          <div class="betText___3JQwN">{{betData.betNumber}}</div>
          <div>共{{betData.betQuantity}}注<span class="totalMoney___1N9Cj">{{betData.betMoney}}元</span></div>
        </div>
        <div class="theme1___341L1 undefined button___3xxsI" @click="showLotteryLayerFn">确定</div>
      </div>
      <!-- -->
      <LotteryLayer :isShow.sync="isShowLayer" :betData="betData"></LotteryLayer>
    </div>
  </div>
</template>
<script>
  import LotteryLayer from '@/components/lotteryLayer.vue'
  import {GetPersonalInfo, getLotteryOdds, getLastOneNumber, getNextTimeStage, getLastOpenNumber} from '@/axios/api.js'
  import {mapState} from 'vuex'
  export default {
    name: 'CQSSC',
    data() {
      return {
        isShowLayer: false,
        id: '',
        title: '',
        userInfo: {},
        tableTop: 0,
        isAssistant: false, // is助手
        isSelect: false,
        playingList: null, // 获取玩法数据
        preSwitchIndex: 0, //选择玩法的下标 上
        subSwitchIndex: 0, //选择玩法的下标 下
        odd_pan: 1, // 代表某种玩法 父
        odd_play: 1,// 代表某种玩法 子
        betData: {
          betQuantity: 0, // 投注数量
          betNumber: '', // 投注号码
          betMoney: 0, // 投注金额
          rate: null, // 最高赔率
          odd_play: '', // 玩法类型
          cateid: '', // 彩种id
          odd_title: '', // 选择玩法的名称
          title: '' // 购物车title需要
        },
        betQuantityType: 0, // 投注类型，根据投注类型 计算 投注数量
        nextTimeData: {},
        lastOneData: null,
        lastOpenNumber: [], // 最近10期数据
        dataList: [
          {
            name: '万位',
            topFont: [
              {
                active: false,
                text: '全'
              },
              {
                active: false,
                text: '大'
              },
              {
                active: false,
                text: '小'
              },
              {
                active: false,
                text: '单'
              },
              {
                active: false,
                text: '双'
              },
              {
                active: false,
                text: '清'
              }
            ],
            btmNum: [
              {
                active: false,
                num: 0
              },
              {
                active: false,
                num: 1
              },
              {
                active: false,
                num: 2
              },
              {
                active: false,
                num: 3
              },
              {
                active: false,
                num: 4
              },
              {
                active: false,
                num: 5
              },
              {
                active: false,
                num: 6
              },
              {
                active: false,
                num: 7
              },
              {
                active: false,
                num: 8
              },
              {
                active: false,
                num: 9
              },
            ]
          },
          {
            name: '千位',
            topFont: [
              {
                active: false,
                text: '全'
              },
              {
                active: false,
                text: '大'
              },
              {
                active: false,
                text: '小'
              },
              {
                active: false,
                text: '单'
              },
              {
                active: false,
                text: '双'
              },
              {
                active: false,
                text: '清'
              }
            ],
            btmNum: [
              {
                active: false,
                num: 0
              },
              {
                active: false,
                num: 1
              },
              {
                active: false,
                num: 2
              },
              {
                active: false,
                num: 3
              },
              {
                active: false,
                num: 4
              },
              {
                active: false,
                num: 5
              },
              {
                active: false,
                num: 6
              },
              {
                active: false,
                num: 7
              },
              {
                active: false,
                num: 8
              },
              {
                active: false,
                num: 9
              },
            ]
          },
          {
            name: '百位',
            topFont: [
              {
                active: false,
                text: '全'
              },
              {
                active: false,
                text: '大'
              },
              {
                active: false,
                text: '小'
              },
              {
                active: false,
                text: '单'
              },
              {
                active: false,
                text: '双'
              },
              {
                active: false,
                text: '清'
              }
            ],
            btmNum: [
              {
                active: false,
                num: 0
              },
              {
                active: false,
                num: 1
              },
              {
                active: false,
                num: 2
              },
              {
                active: false,
                num: 3
              },
              {
                active: false,
                num: 4
              },
              {
                active: false,
                num: 5
              },
              {
                active: false,
                num: 6
              },
              {
                active: false,
                num: 7
              },
              {
                active: false,
                num: 8
              },
              {
                active: false,
                num: 9
              },
            ]
          },
          {
            name: '十位',
            topFont: [
              {
                active: false,
                text: '全'
              },
              {
                active: false,
                text: '大'
              },
              {
                active: false,
                text: '小'
              },
              {
                active: false,
                text: '单'
              },
              {
                active: false,
                text: '双'
              },
              {
                active: false,
                text: '清'
              }
            ],
            btmNum: [
              {
                active: false,
                num: 0
              },
              {
                active: false,
                num: 1
              },
              {
                active: false,
                num: 2
              },
              {
                active: false,
                num: 3
              },
              {
                active: false,
                num: 4
              },
              {
                active: false,
                num: 5
              },
              {
                active: false,
                num: 6
              },
              {
                active: false,
                num: 7
              },
              {
                active: false,
                num: 8
              },
              {
                active: false,
                num: 9
              },
            ]
          },
          {
            name: '个位',
            topFont: [
              {
                active: false,
                text: '全'
              },
              {
                active: false,
                text: '大'
              },
              {
                active: false,
                text: '小'
              },
              {
                active: false,
                text: '单'
              },
              {
                active: false,
                text: '双'
              },
              {
                active: false,
                text: '清'
              }
            ],
            btmNum: [
              {
                active: false,
                num: 0
              },
              {
                active: false,
                num: 1
              },
              {
                active: false,
                num: 2
              },
              {
                active: false,
                num: 3
              },
              {
                active: false,
                num: 4
              },
              {
                active: false,
                num: 5
              },
              {
                active: false,
                num: 6
              },
              {
                active: false,
                num: 7
              },
              {
                active: false,
                num: 8
              },
              {
                active: false,
                num: 9
              },
            ]
          }
        ],
        time: null,
        hms: {
          hour: 0,
          minute: 0,
          second: 0
        }, //时分秒
        loginInfo:{},
        next_stage: '',
        time10: null
      }
    },
    computed: {
      ...mapState(["BettingData"])
    },
    components: {
      LotteryLayer
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
      clearInterval(this.time);
      clearInterval(this.time10);
    },
    mounted() {
      this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      this.id = this.$route.query.id
      this.title = this.$route.query.title
      // 获取玩法数据
      this.getPlayingData();
      //
      this.getNextTimeStage()
      this.getPersonalInfo()
      //
      clearInterval(this.time);
      clearInterval(this.time10);
      //
      // 10秒获取 当前最近一期
      this.time10 = setInterval(()=>{
        this.getLastOneNumber(this.next_stage)
      }, 10000)
    },
    methods: {
      backCart() {
        // 返回购物车
        this.$router.push({ path:'/BetBuyListPage', query:{title: this.title}});
      },
      showLotteryLayerFn() {
        if(this.betData.betQuantity<=0){
          this.$alert('号码选择有误', '提示');
          return
        }
        this.isShowLayer = true
      },
      // 获取玩法数据
      getPlayingData: function () {
        getLotteryOdds({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          cate: this.$route.query.id
        }).then(res => {
          if (res.ret == 200) {
            this.playingList = res.data;
            this.getMaxArrNumber(res.data[0])
          } else {
            console.log('请求出错:', res);
          }
        })
      },
      // 获取个人信息
      getPersonalInfo() {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          this.userInfo = res.data
        })
      },
      // 获取下一期开奖时间
      getNextTimeStage() {
        getNextTimeStage({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          cate: this.$route.query.id
        }).then(res => {
          this.nextTimeData = res.data
          this.thisTermTime();
          setTimeout(() => {
            this.next_stage = res.data.next_stage
            this.getLastOneNumber(res.data.next_stage)
          }, 500)
        })
      },
      // 获取当前最近一期
      getLastOneNumber(next_stage) {
        getLastOneNumber({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          cate: this.$route.query.id,
          stage: parseInt(next_stage) - 1
        }).then(res => {
          this.lastOneData = res.data[0]
          this.getLastOpenNumber()
        })
      },
      // 获取最近10期结果
      getLastOpenNumber() {
        getLastOpenNumber({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          cate: this.$route.query.id
        }).then(res => {
          this.lastOpenNumber = res.data
        })
      },
      // 当前期数倒计时
      thisTermTime: function () {
        let c = this.nextTimeData.open_time;
        this.time = setInterval(() => {
          this.hms.hour = (Math.floor((c / 3600) % 24));
          this.hms.minute = (Math.floor((c / 60) % 60));
          this.hms.second = (Math.floor(c % 60));
          if (this.hms.hour < 10) {
            this.hms.hour = '0' + this.hms.hour;
          }
          if (this.hms.minute < 10) {
            this.hms.minute = '0' + this.hms.minute;
          }
          if (this.hms.second < 10) {
            this.hms.second = '0' + this.hms.second;
          }
          // console.log(this.hms.hour,this.hms.minute,this.hms.second)
          c--;
          if (c < 1) {
            clearInterval(this.time);
            this.getNextTimeStage();
          }
        }, 1000);

      },
      // 购彩助手 show
      showAssistantFn() {
        this.isAssistant = true
      },
      // 购彩助手 hide
      hideAssistantFn() {
        this.isAssistant = false
        this.isSelect = false
      },
      //  显示玩法
      showSelectLotteryFn() {
        this.isSelect = true
      },
      // 选择玩法
      confirmPlaying(item, index) {
        this.preSwitchIndex = index;
        this.subSwitchIndex = 0;
        this.odd_pan = item.odd_pan
        if (index == 0) {
          // 定位胆
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
          this.betQuantityType = 0 // 选中一个算一注
          this.getMaxArrNumber(item)
          this.isSelect = false
        }
      },
      confirmPlayingSub(item, index) {
        this.subSwitchIndex = index;
        this.odd_play = item.odd_play
        if (this.odd_pan == 2 && (this.odd_play == 2 || this.odd_play == 4)) {
          // 五星 (通选复式 、 直选复式)
          this.betQuantityType = 1 // 二维数组形式，算注数
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 3 && this.odd_play == 6) {
          // 三星 直选复式
          this.betQuantityType = 1 // 二维数组形式，算注数
          this.dataList = [
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 3 && this.odd_play == 8) {
          // 三星 组三复式
          this.betQuantityType = 2 //  组三复式，算注数
          this.dataList = [
            {
              name: '组三',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
          ]
        } else if (this.odd_pan == 3 && this.odd_play == 10) {
          // 三星 组六复式
          this.betQuantityType = 3 //  组六复式，算注数
          this.dataList = [
            {
              name: '组六',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
          ]
        } else if (this.odd_pan == 4 && this.odd_play == 12) {
          // 二星 直选复式
          this.betQuantityType = 1 // 二维数组形式，算注数
          this.dataList = [
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 4 && this.odd_play == 14) {
          // 二星 组选复式
          this.betQuantityType = 4 // 二星 组选复式，算注数
          this.dataList = [
            {
              name: '选号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 16) {
          // 大小单双 - 后二位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 17) {
          // 大小单双 - 后三位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 18) {
          // 大小单双 - 前二位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 19) {
          // 大小单双 - 前三位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            },
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 20) {
          // 大小单双 - 万位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 21) {
          // 大小单双 - 千位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 22) {
          // 大小单双 - 百位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 23) {
          // 大小单双 - 十位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 24) {
          // 大小单双 - 个位
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 5 && this.odd_play == 25) {
          // 大小单双 - 总和
          this.betQuantityType = 1  // 二维数组形式，算注数
          this.dataList = [
            {
              name: '总和',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: '大'
                },
                {
                  active: false,
                  num: '小'
                },
                {
                  active: false,
                  num: '单'
                },
                {
                  active: false,
                  num: '双'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 7 && this.odd_play == 37) {
          // 任选二 - 直选
          this.betQuantityType = 5
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 7 && this.odd_play == 38) {
          // 任选二 - 直选和值
          this.betQuantityType = 6
          this.dataList = [
            {
              name: '和值',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
                {
                  active: false,
                  num: 10
                },
                {
                  active: false,
                  num: 11
                },
                {
                  active: false,
                  num: 12
                },
                {
                  active: false,
                  num: 13
                },
                {
                  active: false,
                  num: 14
                },
                {
                  active: false,
                  num: 15
                },
                {
                  active: false,
                  num: 16
                },
                {
                  active: false,
                  num: 17
                },
                {
                  active: false,
                  num: 18
                },
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: false,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 7 && this.odd_play == 39) {
          // 任选二 - 组选
          this.betQuantityType = 7
          this.dataList = [
            {
              name: '组选',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: false,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 7 && this.odd_play == 40) {
          // 任选二 - 组选和值
          this.betQuantityType = 6
          this.dataList = [
            {
              name: '和值',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
                {
                  active: false,
                  num: 10
                },
                {
                  active: false,
                  num: 11
                },
                {
                  active: false,
                  num: 12
                },
                {
                  active: false,
                  num: 13
                },
                {
                  active: false,
                  num: 14
                },
                {
                  active: false,
                  num: 15
                },
                {
                  active: false,
                  num: 16
                },
                {
                  active: false,
                  num: 17
                },
                {
                  active: false,
                  num: 18
                },
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: false,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 8 && this.odd_play == 41) {
          // 任选三 - 直选
          this.betQuantityType = 8
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 8 && this.odd_play == 42) {
          // 任选三 - 直选和值
          this.betQuantityType = 9
          this.dataList = [
            {
              name: '和值',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
                {
                  active: false,
                  num: 10
                },
                {
                  active: false,
                  num: 11
                },
                {
                  active: false,
                  num: 12
                },
                {
                  active: false,
                  num: 13
                },
                {
                  active: false,
                  num: 14
                },
                {
                  active: false,
                  num: 15
                },
                {
                  active: false,
                  num: 16
                },
                {
                  active: false,
                  num: 17
                },
                {
                  active: false,
                  num: 18
                },
                {
                  active: false,
                  num: 19
                },
                {
                  active: false,
                  num: 20
                },
                {
                  active: false,
                  num: 21
                },
                {
                  active: false,
                  num: 22
                },
                {
                  active: false,
                  num: 23
                },
                {
                  active: false,
                  num: 24
                },
                {
                  active: false,
                  num: 25
                },
                {
                  active: false,
                  num: 26
                },
                {
                  active: false,
                  num: 27
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 8 && this.odd_play == 43) {
          // 任选三 - 组三
          this.betQuantityType = 10
          this.dataList = [
            {
              name: '组三',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 8 && this.odd_play == 44) {
          // 任选三 - 组六
          this.betQuantityType = 11
          this.dataList = [
            {
              name: '组六',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 8 && this.odd_play == 45) {
          // 任选三 - 组选和值
          this.betQuantityType = 9
          this.dataList = [
            {
              name: '和值',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
                {
                  active: false,
                  num: 10
                },
                {
                  active: false,
                  num: 11
                },
                {
                  active: false,
                  num: 12
                },
                {
                  active: false,
                  num: 13
                },
                {
                  active: false,
                  num: 14
                },
                {
                  active: false,
                  num: 15
                },
                {
                  active: false,
                  num: 16
                },
                {
                  active: false,
                  num: 17
                },
                {
                  active: false,
                  num: 18
                },
                {
                  active: false,
                  num: 19
                },
                {
                  active: false,
                  num: 20
                },
                {
                  active: false,
                  num: 21
                },
                {
                  active: false,
                  num: 22
                },
                {
                  active: false,
                  num: 23
                },
                {
                  active: false,
                  num: 24
                },
                {
                  active: false,
                  num: 25
                },
                {
                  active: false,
                  num: 26
                },
                {
                  active: false,
                  num: 27
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: false,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 9 && this.odd_play == 46) {
          // 任选四 - 直选
          this.betQuantityType = 12
          this.dataList = [
            {
              name: '万位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '千位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '百位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '十位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            },
            {
              name: '个位',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                },
              ]
            }
          ]
        } else if (this.odd_pan == 9 && this.odd_play == 47) {
          // 任选四 - 组选24
          this.betQuantityType = 13
          this.dataList = [
            {
              name: '组选24',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: true,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 9 && this.odd_play == 48) {
          // 任选四 - 组选12/ 组选4
          this.betQuantityType = 14
          this.dataList = [
            {
              name: '二重号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ]
            },
            {
              name: '单号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: true,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 9 && this.odd_play == 49) {
          // 任选四 - 组选六
          this.betQuantityType = 15
          this.dataList = [
            {
              name: '二重号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: true,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        } else if (this.odd_pan == 9 && this.odd_play == 50) {
          // 任选四 - 组选12/ 组选4
          this.betQuantityType = 16
          this.dataList = [
            {
              name: '三重号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ]
            },
            {
              name: '单号',
              topFont: [
                {
                  active: false,
                  text: '全'
                },
                {
                  active: false,
                  text: '大'
                },
                {
                  active: false,
                  text: '小'
                },
                {
                  active: false,
                  text: '单'
                },
                {
                  active: false,
                  text: '双'
                },
                {
                  active: false,
                  text: '清'
                }
              ],
              btmNum: [
                {
                  active: false,
                  num: 0
                },
                {
                  active: false,
                  num: 1
                },
                {
                  active: false,
                  num: 2
                },
                {
                  active: false,
                  num: 3
                },
                {
                  active: false,
                  num: 4
                },
                {
                  active: false,
                  num: 5
                },
                {
                  active: false,
                  num: 6
                },
                {
                  active: false,
                  num: 7
                },
                {
                  active: false,
                  num: 8
                },
                {
                  active: false,
                  num: 9
                }
              ],
              btmText: [
                {
                  active: false,
                  name: '万'
                },
                {
                  active: true,
                  name: '千'
                },
                {
                  active: true,
                  name: '百'
                },
                {
                  active: true,
                  name: '十'
                },
                {
                  active: true,
                  name: '个'
                }
              ]
            }
          ]
        }
        else {
          this.betQuantityType = ''
        }
        this.getMaxArrNumber(item)
        this.isSelect = false
      },
      // 获取最高赔率
      getMaxArrNumber(data) {
        // console.log(data)
        let arr = []
        let odd_title = ''
        if(data.play_rule){
          for(let i = 0 ; i < data.play_rule.length ; i++) {
            for(let j = 0 ; j < data.play_rule[i].odds.length ; j++) {
              arr.push(parseFloat(data.play_rule[i].odds[j].rate))
            }
          }
        } else {
          for(let i = 0 ; i < data.odds.length ; i++) {
            arr.push(parseFloat(data.odds[i].rate))
          }
        }
        // console.log(arr)
        // console.log(Math.max.apply(null,arr));
        if( this.playingList[this.preSwitchIndex].name == this.playingList[this.preSwitchIndex].play_rule[this.subSwitchIndex].title ) {
          odd_title = this.playingList[this.preSwitchIndex].name
        } else {
          odd_title = this.playingList[this.preSwitchIndex].name+'-'+this.playingList[this.preSwitchIndex].play_rule[this.subSwitchIndex].title
        }
        this.betData = {
          betQuantity: 0,
          betNumber: '',
          betMoney: 0,
          rate: Math.max.apply(null,arr),
          odd_play: this.odd_play,
          odd_title: odd_title,
          cateid: this.id,
          title: this.title
        }
      },
      // show hide 期次
      showQiCiTable() {
        let qiCiHeight = $("#qiCiHeight").height()
        if (this.tableTop <= 0) {
          this.tableTop = qiCiHeight;
          $('.dropIcon___3fbhG').css('transform','rotate(180deg)');
          this.getlast10();
        } else {
          this.tableTop = 0;
          $('.dropIcon___3fbhG').css('transform','rotate(0deg)');
        }
      },
      // 0全 1大 2小 3单 4双 5清
      selectTextFn(index, subIndex) {
        let dataList = this.dataList
        // console.log(subIndex)
        if (subIndex != 5) {
          dataList[index].topFont[subIndex].active = !dataList[index].topFont[subIndex].active
        }
        dataList[index].topFont.forEach((item, i) => {
          if (subIndex != i) {
            item.active = false
          }
        })
        if (subIndex == 0) {
          dataList[index].btmNum.forEach((item, i) => {
            item.active = dataList[index].topFont[subIndex].active
          })

        } else if (subIndex == 1) {
          dataList[index].btmNum.forEach((item, i) => {
            if (i + 1 >= 6) {
              item.active = dataList[index].topFont[subIndex].active
            } else {
              item.active = false
            }
          })
        } else if (subIndex == 2) {
          dataList[index].btmNum.forEach((item, i) => {
            if (i + 1 <= 5) {
              item.active = dataList[index].topFont[subIndex].active
            } else {
              item.active = false
            }
          })
        } else if (subIndex == 3) {
          dataList[index].btmNum.forEach((item, i) => {
            if ((i + 1) % 2 == 0) {
              item.active = dataList[index].topFont[subIndex].active
            } else {
              item.active = false
            }
          })
        } else if (subIndex == 4) {
          dataList[index].btmNum.forEach((item, i) => {
            if ((i + 1) % 2 != 0) {
              item.active = dataList[index].topFont[subIndex].active
            } else {
              item.active = false
            }
          })
        } else if (subIndex == 5) {
          dataList[index].btmNum.forEach((item, i) => {
            item.active = false
          })
        }
        //
        this.calcBetFn()
      },
      //
      selectNumFn(index, subIndex) {
        let dataList = this.dataList
        dataList[index].btmNum[subIndex].active = !dataList[index].btmNum[subIndex].active
        this.calcBetFn()
      },
      // 个 十 百 千 万 选择
      selectMoneyUnit(index, subIndex) {
        let dataList = this.dataList
        dataList[index].btmText[subIndex].active = !dataList[index].btmText[subIndex].active

        // console.log(arr);
        this.calcBetFn()
      },
      // 计算投注数组
      calcBetFn() {
        let dataList = this.dataList
        let betNumberArr = [] // 一维数组 (ps: ['1 2 3', '4 5 6'])
        let betNumberArrArr = [] // 二维数组 (ps: [[1,2],[3,4]])
        let betNumberA = [] // 数组 (ps: [1, 2, 3, 4])
        let num1 = 0 // 选中一个 就算投注一个
        let moneyUnitArr = [] // 统计 个十百千万 选择了的数组
        let gsbqwStr = '' // G S B Q W 个十百千万
        let betNumber = '' // 发送的投注号码
        for (let i = 0; i < dataList.length; i++) {
          betNumberArr.push('')
          betNumberArrArr.push([])
          for (let j = 0; j < dataList[i].btmNum.length; j++) {
            if (dataList[i].btmNum[j].active) {
              num1++
              betNumberArr[i] = (betNumberArr[i] + ' ' + dataList[i].btmNum[j].num).trim()
              betNumberArrArr[i].push(dataList[i].btmNum[j].num)
              betNumberA.push(dataList[i].btmNum[j].num)
            }
          }
          if (i !== dataList.length - 1) {
            betNumberArr[i] = betNumberArr[i] + '|'
          }
          // 个十百千万
          if(dataList[i].btmText){
            for(let k = 0 ; k < dataList[i].btmText.length ; k++){
              if(dataList[i].btmText[k].active){
                if(dataList[i].btmText[k].name === '个'){
                  gsbqwStr += 'G '
                } else if(dataList[i].btmText[k].name === '十'){
                  gsbqwStr += 'S '
                } else if(dataList[i].btmText[k].name === '百'){
                  gsbqwStr += 'B '
                } else if(dataList[i].btmText[k].name === '千'){
                  gsbqwStr += 'Q '
                } else if(dataList[i].btmText[k].name === '万'){
                  gsbqwStr += 'W '
                }
                moneyUnitArr.push(dataList[i].btmText[k].name)
              }
            }
          }
        }
        // console.log(betNumberArr)
        // console.log(betNumberArrArr)
        // console.log(betNumberA)
        // 投注数量（根据不同玩法，投注数量计算不一致）
        betNumber = betNumberArr.join('')
        let betQuantity = 0
        if (this.betQuantityType === 0) {
          // 选中一个 算一注
          betQuantity = num1
        }
        else if (this.betQuantityType === 1) {
          // 二维数组形式，算注数
          for (let w = 0; w < betNumberArrArr.length; w++) {
            if (betNumberArrArr[w].length <= 0) {
              betQuantity = 0
              break
            } else {
              betQuantity = this.getArrayByArrays(betNumberArrArr).length
            }
          }
        }
        else if (this.betQuantityType === 2) {
          // 组三复式，算注数
          if (betNumberA.length < 2) {
            betQuantity = 0
          } else {
            betQuantity = (this.combination(betNumberA.length, 2)) * 2
          }
        }
        else if (this.betQuantityType === 3) {
          // 组六复式，算注数
          if (betNumberA.length < 3) {
            betQuantity = 0
          } else {
            betQuantity = this.combination(betNumberA.length, 3)
          }
        }
        else if (this.betQuantityType === 4) {
          // 二星 组选复式，算注数
          if (betNumberA.length < 2) {
            betQuantity = 0
          } else {
            betQuantity = this.combination(betNumberA.length, 2)
          }
        }
        else if (this.betQuantityType === 5) {
          // 任选二 直选，算注数 [[1,2],[3,4],[5,6]] // 13 14 23 24 15 16 25 26 35 36 45 46
          // console.log(betNumberArrArr)
          let maxArr = null // 不会有空数组的 二维数组
          maxArr = this.spliceBetNumberArrArr(betNumberArrArr, 5)
          // console.log(maxArr)
          switch (maxArr.length) {
            case 1:
              // 一组数据；0注
              betQuantity = 0
              break;
            case 2:
              betQuantity = this.getArrayByArrays(maxArr).length
              // console.log('2组')
              break;
            case 3:
              // let maxArr = [[1,2],[3,4],[5,6]]
              let arr31 = [maxArr[0], maxArr[1]]
              let arr32 = [maxArr[0], maxArr[2]]
              let arr33 = [maxArr[1], maxArr[2]]
              let len31 = this.getArrayByArrays(arr31).length
              let len32 = this.getArrayByArrays(arr32).length
              let len33 = this.getArrayByArrays(arr33).length
              betQuantity = len31 + len32 + len33
              // console.log('三组')
              break;
            case 4:
              // let maxArr = [[1,2],[3,4],[5,6].[7,8]]
              let arr41 = [maxArr[0], maxArr[1]]
              let arr42 = [maxArr[0], maxArr[2]]
              let arr43 = [maxArr[0], maxArr[3]]
              let arr44 = [maxArr[1], maxArr[2]]
              let arr45 = [maxArr[1], maxArr[3]]
              let arr46 = [maxArr[2], maxArr[3]]
              let len41 = this.getArrayByArrays(arr41).length
              let len42 = this.getArrayByArrays(arr42).length
              let len43 = this.getArrayByArrays(arr43).length
              let len44 = this.getArrayByArrays(arr44).length
              let len45 = this.getArrayByArrays(arr45).length
              let len46 = this.getArrayByArrays(arr46).length
              betQuantity = len41 + len42 + len43 + len44 + len45 + len46
              // console.log('4组')
              break;
            case 5:
              // let maxArr = [[1,2],[3,4],[5,6],[7,8],[9,0]]
              let arr51 = [maxArr[0], maxArr[1]]
              let arr52 = [maxArr[0], maxArr[2]]
              let arr53 = [maxArr[0], maxArr[3]]
              let arr54 = [maxArr[0], maxArr[4]]
              let arr55 = [maxArr[1], maxArr[2]]
              let arr56 = [maxArr[1], maxArr[3]]
              let arr57 = [maxArr[1], maxArr[4]]
              let arr58 = [maxArr[2], maxArr[3]]
              let arr59 = [maxArr[2], maxArr[4]]
              let arr510 = [maxArr[3], maxArr[4]]
              let len51 = this.getArrayByArrays(arr51).length
              let len52 = this.getArrayByArrays(arr52).length
              let len53 = this.getArrayByArrays(arr53).length
              let len54 = this.getArrayByArrays(arr54).length
              let len55 = this.getArrayByArrays(arr55).length
              let len56 = this.getArrayByArrays(arr56).length
              let len57 = this.getArrayByArrays(arr57).length
              let len58 = this.getArrayByArrays(arr58).length
              let len59 = this.getArrayByArrays(arr59).length
              let len510 = this.getArrayByArrays(arr510).length
              betQuantity = len51 + len52 + len53 + len54 + len55 + len56 + len57 + len58 + len59 + len510
              // console.log('5组')
              break;
            default:
              console.log('无')
          }
        }
        else if (this.betQuantityType === 6) {
          // 任选二 - 直选和值 / 组选和值
          if (moneyUnitArr.length >= 2) {
            let c = Math.floor(this.combination(moneyUnitArr.length, 2));
            let a = null, b = null, h = null;
            let f = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
            let g = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];
            for (let i = 0; i < betNumberA.length; i++) {
              a = a + g[betNumberA[i]];
              if (f.indexOf(betNumberA[i]) !== -1) {
                b = b + 1;
              }
            }
            if (this.odd_play == 38) {
              // console.log(a,b,c)
              // 直选和值
              h = ((a * c) * 2) - (b * c);
            } else if (this.odd_play == 40) {
              // 组选和值
              h = a * c;
              // h = a;
            }
            betQuantity = h
            betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
          } else {
            betQuantity = 0
          }
        }
        else if (this.betQuantityType === 7) {
          let s_num = Math.floor(this.combination(moneyUnitArr.length, 2));
          let x_num = Math.floor(this.combination(betNumberA.length, 2));
          betQuantity = s_num * x_num
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if (this.betQuantityType === 8) {
          // 任选三 直选，算注数
          // console.log(betNumberArrArr)
          let maxArr = null // 不会有空数组的 二维数组
          maxArr = this.spliceBetNumberArrArr(betNumberArrArr, 5)
          // console.log(maxArr)
          switch (maxArr.length) {
            case 1:
              // 一组数据；0注
              betQuantity = 0
              break;
            case 2:
              betQuantity = 0
              // console.log('2组')
              break;
            case 3:
              // let maxArr = [[1,2],[3,4],[5,6]]
              let arr31 = [maxArr[0], maxArr[1], maxArr[2]]
              let len31 = this.getArrayByArrays(arr31).length
              betQuantity = len31
              // console.log('三组')
              break;
            case 4:
              // let maxArr = [[1,2],[3,4],[5,6].[7,8]] 0 1 2 3
              let arr41 = [maxArr[0], maxArr[1], maxArr[2]]
              let arr42 = [maxArr[0], maxArr[1], maxArr[3]]
              let arr43 = [maxArr[0], maxArr[2], maxArr[3]]
              let arr44 = [maxArr[1], maxArr[2], maxArr[3]]
              let len41 = this.getArrayByArrays(arr41).length
              let len42 = this.getArrayByArrays(arr42).length
              let len43 = this.getArrayByArrays(arr43).length
              let len44 = this.getArrayByArrays(arr44).length
              betQuantity = len41 + len42 + len43 + len44
              // console.log('4组')
              break;
            case 5:
              // let maxArr = [[1,2],[3,4],[5,6],[7,8],[9,0]] 0 1 2 3 4
              let arr51 = [maxArr[0], maxArr[1], maxArr[2]]
              let arr52 = [maxArr[0], maxArr[1], maxArr[3]]
              let arr53 = [maxArr[0], maxArr[1], maxArr[4]]
              let arr54 = [maxArr[0], maxArr[2], maxArr[3]]
              let arr55 = [maxArr[0], maxArr[2], maxArr[4]]
              let arr56 = [maxArr[0], maxArr[3], maxArr[4]]
              let arr57 = [maxArr[1], maxArr[2], maxArr[3]]
              let arr58 = [maxArr[1], maxArr[2], maxArr[4]]
              let arr59 = [maxArr[1], maxArr[3], maxArr[4]]
              let arr510 = [maxArr[2], maxArr[3], maxArr[4]]
              let len51 = this.getArrayByArrays(arr51).length
              let len52 = this.getArrayByArrays(arr52).length
              let len53 = this.getArrayByArrays(arr53).length
              let len54 = this.getArrayByArrays(arr54).length
              let len55 = this.getArrayByArrays(arr55).length
              let len56 = this.getArrayByArrays(arr56).length
              let len57 = this.getArrayByArrays(arr57).length
              let len58 = this.getArrayByArrays(arr58).length
              let len59 = this.getArrayByArrays(arr59).length
              let len510 = this.getArrayByArrays(arr510).length
              betQuantity = len51 + len52 + len53 + len54 + len55 + len56 + len57 + len58 + len59 + len510
              // console.log('5组')
              break;
            default:
              console.log('无')
          }
        }
        else if (this.betQuantityType === 9) {
          // 任选三 - 直选和值 / 组选和值
          betQuantity = 0
          if (moneyUnitArr.length >= 3) {
            let a = Math.floor(this.combination(moneyUnitArr.length, 3));
            let num = 0
            if (this.odd_play == 42) {
              // 直选和值
              for (let i = 0; i < betNumberA.length; i++) {
                if (betNumberA[i] == 0|| betNumberA[i] == 27) {
                  num = num+1
                } else if (betNumberA[i] == 1|| betNumberA[i] == 26) {
                  num = num+3
                } else if (betNumberA[i] == 2|| betNumberA[i] == 25) {
                  num = num+6
                } else if (betNumberA[i] == 3|| betNumberA[i] == 24) {
                  num = num+10
                } else if (betNumberA[i] == 4|| betNumberA[i] == 23) {
                  num = num+15
                } else if (betNumberA[i] == 5|| betNumberA[i] == 22) {
                  num = num+21
                } else if (betNumberA[i] == 6|| betNumberA[i] == 21) {
                  num = num+28
                } else if (betNumberA[i] == 7|| betNumberA[i] == 20) {
                  num = num+36
                } else if (betNumberA[i] == 8|| betNumberA[i] == 19) {
                  num = num+45
                } else if (betNumberA[i] == 9|| betNumberA[i] == 18) {
                  num = num+55
                } else if (betNumberA[i] == 10|| betNumberA[i] == 17) {
                  num = num+63
                } else if (betNumberA[i] == 11|| betNumberA[i] == 16) {
                  num = num+69
                } else if (betNumberA[i] == 12 || betNumberA[i] == 15) {
                  num = num+73
                } else if (betNumberA[i] == 13 || betNumberA[i] == 14) {
                  num = num+75
                }
              }
            } else if (this.odd_play == 45) {
              // 组选和值
              for (let i = 0; i < betNumberA.length; i++) {
                if (betNumberA[i] == 0|| betNumberA[i] == 1 || betNumberA[i] == 26 || betNumberA[i] == 27) {
                  num = num+1
                } else if (betNumberA[i] == 2|| betNumberA[i] == 25) {
                  num = num+2
                } else if (betNumberA[i] == 3|| betNumberA[i] == 24) {
                  num = num+3
                } else if (betNumberA[i] == 4|| betNumberA[i] == 23) {
                  num = num+4
                } else if (betNumberA[i] == 5|| betNumberA[i] == 22) {
                  num = num+5
                } else if (betNumberA[i] == 6|| betNumberA[i] == 21) {
                  num = num+7
                } else if (betNumberA[i] == 7|| betNumberA[i] == 20) {
                  num = num+8
                } else if (betNumberA[i] == 8|| betNumberA[i] == 19) {
                  num = num+10
                } else if (betNumberA[i] == 9|| betNumberA[i] == 18) {
                  num = num+12
                } else if (betNumberA[i] == 10|| betNumberA[i] == 17) {
                  num = num+13
                } else if (betNumberA[i] == 11|| betNumberA[i] == 16) {
                  num = num+14
                } else if (betNumberA[i] == 12 || betNumberA[i] == 13 || betNumberA[i] == 14 || betNumberA[i] == 15) {
                  num = num+15
                }
              }
            }
            betQuantity = num * a
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if(this.betQuantityType === 10){
          // console.log(moneyUnitArr)
          if(moneyUnitArr.length < 3){
            betQuantity = 0
          } else {
            let a = this.combination(moneyUnitArr.length, 3) // 个十百千万中任三个组成 一注
            let b = this.combination(betNumberA.length, 2) // 0-9中任两个组成 一注，然后分开乘2（ps: 23,拆分就是：223 332）
            betQuantity = a * (b * 2)
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if(this.betQuantityType === 11){
          // console.log(moneyUnitArr)
          if(moneyUnitArr.length >= 3 && betNumberA.length >= 3){
            let a = this.combination(moneyUnitArr.length, 3) // 个十百千万中任三个组成 一注
            let b = this.combination(betNumberA.length, 3) // 0-9中任三个组成 一注
            // console.log(a, b)
            betQuantity = a * b
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if (this.betQuantityType === 12) {
          // 任选四 直选，算注数
          // console.log(betNumberArrArr)
          let maxArr = null // 不会有空数组的 二维数组
          maxArr = this.spliceBetNumberArrArr(betNumberArrArr, 5)
          // console.log(maxArr)
          switch (maxArr.length) {
            case 1:
              // 一组数据；0注
              betQuantity = 0
              break;
            case 2:
              betQuantity = 0
              // console.log('2组')
              break;
            case 3:
              betQuantity = 0
              break;
            case 4:
              // let maxArr = [[1,2],[3,4],[5,6].[7,8]] 0 1 2 3
              let arr41 = [maxArr[0], maxArr[1], maxArr[2], maxArr[3]]
              let len41 = this.getArrayByArrays(arr41).length
              betQuantity = len41
              // console.log('4组')
              break;
            case 5:
              // let maxArr = [[1,2],[3,4],[5,6],[7,8],[9,0]] 0 1 2 3 4
              let arr51 = [maxArr[0], maxArr[1], maxArr[2], maxArr[3]]
              let arr52 = [maxArr[0], maxArr[1], maxArr[2], maxArr[4]]
              let arr53 = [maxArr[0], maxArr[1], maxArr[3], maxArr[4]]
              let arr54 = [maxArr[0], maxArr[2], maxArr[3], maxArr[4]]
              let arr55 = [maxArr[1], maxArr[2], maxArr[3], maxArr[4]]
              let len51 = this.getArrayByArrays(arr51).length
              let len52 = this.getArrayByArrays(arr52).length
              let len53 = this.getArrayByArrays(arr53).length
              let len54 = this.getArrayByArrays(arr54).length
              let len55 = this.getArrayByArrays(arr55).length
              betQuantity = len51 + len52 + len53 + len54 + len55
              // console.log('5组')
              break;
            default:
              console.log('无')
          }
        }
        else if(this.betQuantityType === 13){
          // console.log(moneyUnitArr)
          if(moneyUnitArr.length >= 4 && betNumberA.length >= 4){
            let a = this.combination(moneyUnitArr.length, 4) // 个十百千万中任四个组成 一注
            let b = this.combination(betNumberA.length, 4) // 0-9中任四个组成 一注
            // console.log(a, b)
            betQuantity = a * b
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if(this.betQuantityType === 14){
          // console.log(betNumberArrArr)
          if(betNumberArrArr[0].length>=1 && betNumberArrArr[1].length>=2 && moneyUnitArr.length>=4){
            let a = this.combination(moneyUnitArr.length, 4) // 个十百千万中任四个组成 一注
            let arr = this.getNumbers(betNumberArrArr[1], 2) // 得到二维数组
            // console.log(arr)
            let num = 0
            for(let i = 0 ; i < betNumberArrArr[0].length ; i++){
              for(let j = 0 ; j < arr.length ; j++){
                if((arr[j].join('')).indexOf(betNumberArrArr[0][i]) < 0 ){
                  // 没有
                  num++
                }
              }
            }
            betQuantity = num * a
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if(this.betQuantityType === 15) {
          let a = this.combination(betNumberA.length, 2)
          let b = this.combination(moneyUnitArr.length, 4)
          if(betNumberA.length >=2 && moneyUnitArr.length>=4){
            betQuantity = a * b
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else if(this.betQuantityType === 16){
          // console.log(betNumberArrArr)
          if(betNumberArrArr[0].length>=1 && betNumberArrArr[1].length>=1 && moneyUnitArr.length>=4){
            let a = this.combination(moneyUnitArr.length, 4) // 个十百千万中任四个组成 一注
            let arr = this.getNumbers(betNumberArrArr[1], 1) // 得到二维数组
            console.log(arr)
            let num = 0
            for(let i = 0 ; i < betNumberArrArr[0].length ; i++){
              for(let j = 0 ; j < arr.length ; j++){
                if((arr[j].join('')).indexOf(betNumberArrArr[0][i]) < 0 ){
                  // 没有
                  num++
                }
              }
            }
            betQuantity = num * a
          } else {
            betQuantity = 0
          }
          betNumber = gsbqwStr.trim() + ':' + betNumberArr.join('')
        }
        else {
          alert('待开发');
          betQuantity = 0
        }
        // console.log(this.betQuantityType)
        this.betData = {
          betQuantity: betQuantity,
          betNumber: betNumber,
          betMoney: betQuantity * 2,
          rate: this.betData.rate,
          odd_play: this.odd_play,
          odd_title: this.betData.odd_title,
          cateid: this.id,
          title: this.title
        }
      },
      // 对二维数组 进行 删除 为空的数组（参数：arr, num:循环次数）
      spliceBetNumberArrArr(arr, num) {
        // arr二维数组 , num循环次数
        for (let i = 0; i < num; i++) {
          for (let w = 0; w < arr.length; w++) {
            if (arr[w].length <= 0) {
              arr.splice(w, 1)
            }
          }
        }
        return arr
      },
      // 清空投注
      clearBetDataFn() {
        let dataList = this.dataList
        for (let i = 0; i < dataList.length; i++) {
          for (let k = 0; k < dataList[i].topFont.length; k++) {
            dataList[i].topFont[k].active = false
          }
          for (let j = 0; j < dataList[i].btmNum.length; j++) {
            dataList[i].btmNum[j].active = false
          }
        }
        this.calcBetFn()
      },
      // 将 二维数组排列组合 -> 获取新排列的数组 （例：[[1,2],[3,4]] => ['13','14','23','24']）
      getArrayByArrays(arrays) {
        var arr = [""];
        for (var i = 0; i < arrays.length; i++) {
          arr = this.getValuesByArray(arr, arrays[i]);
        }
        return arr;
      },
      getValuesByArray(arr1, arr2) {
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
          var v1 = arr1[i];
          for (var j = 0; j < arr2.length; j++) {
            var v2 = arr2[j];
            var value = v1 + v2;
            arr.push(value);
          }
        }
        return arr;
      },
      // 排列组合算法(m: 数组长度, n:...)
      combination(m, n) {
        return this.factorial(m, n) / this.factorial(n, n); //就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
      },
      factorial(m, n) {
        var num = 1;
        var count = 0;
        for (var i = m; i > 0; i--) {
          if (count == n) { //当循环次数等于指定的相乘个数时，即跳出for循环
            break;
          }
          num = num * i;
          count++;
        }
        return num;
      },
      // 一维数组排列组合 变 二维数组;source: 二维数组 count: 要取出多少项组合
      getNumbers(source, count, isPermutation = false) {
        //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
        let currentList = source.map((item) => [item]);
        if (count === 1) {
          return currentList;
        }
        let result = [];
        //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
        for (let i = 0; i < currentList.length; i++) {
          let current = currentList[i];
          //如果是排列的方式，在取count-1时，源数组中排除当前项
          let children = [];
          if (isPermutation) {
            children = this.getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
          }
          //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
          else {
            children = this.getNumbers(source.slice(i + 1), count - 1, isPermutation);
          }
          for (let child of children) {
            result.push([...current, ...child]);
          }
        }
        return result;
      },
      returnFn() {
        let me = this;
        if(this.$store.state.BettingData[0]){
          this.$confirm('返回后将清除购物车选择的号码', '注意').then(({ result }) => {
            if (result) {
              this.$store.state.BettingData = [];
              me.$router.back(-1);
            }
          })
        }else{
          me.$router.back(-1);
        }
      },
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
        background: url('../../../assets/top_bar_back.png') 50% no-repeat;
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

    .am-popover-item-ui {
      width: 100%;
      padding: 0 8px;
      position: relative;

      li {
        padding: 8px;
        border-bottom: 1px #f5f5f5 solid;
        text-align: center;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .am-popover-item-ui::before {
    content: '';
    position: absolute;
    right: 10px;
    top: -5px;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #fff transparent;
    width: 0;
    height: 0;
  }

  .menuTitle___3jHiP {
    -webkit-writing-mode: tb-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: tb-rl;
    white-space: normal;
    letter-spacing: 3px;
    width: .3rem;
    font-weight: 100;
    font-size: .26rem;
    margin-right: 3px;
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

    .parentTitle___1fCnq {
      background: #fff;
      font-size: .36rem;
      color: #9b9b9b;
      letter-spacing: 2px;
      padding: .16rem 0;
    }

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

  .activeTitle___143cx {
    padding: .1rem 0;
  }

  .lotteryTitle___4KqNL {
    text-align: center;
    font-size: .3rem;
    line-height: .36rem;
  }

  .lotteryWinView___1zcag > span {
    padding-left: 0.1rem;
    font-size: 0.33rem;
  }

  .lotteryWinView___1zcag > span:first-child {
    padding-left: 0;
  }

  .lottery-page .content .btnContainer___2HDeL {
    height: 0.6rem;
    line-height: 0.6rem;
  }

  .lottery-page .content .selectNumBody___9bXff .selectMark___1Dj8V {
    margin-left: 0;
  }

  .lottery-page .content .selectNumBody___9bXff .selectNumItem___3nDoA {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0.12rem 0.16rem;
  }

  /* */
  .checkContainer___2-1YR {
    padding: .3rem 0;
    height: .4rem;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: .28rem;

    .checkBox___2jX8D {
      margin: 0 .1rem;
      width: .5rem;
      height: .5rem;
    }

    .iconCheck___2HmbD {
      background: url(../../../assets/icon_uncheck.png) 50% no-repeat;
      background-size: contain;
      width: .4rem;
      height: .4rem;
    }

    .iconChecked___1tkhj {
      background: url(../../../assets/icon_checked.png) 50% no-repeat;
      background-size: contain;
      width: .4rem;
      height: .4rem;
    }
  }
  .scrollView___1ZMYS{max-height: 2.3rem;overflow-y: auto;-webkit-overflow-scrolling: touch;}
</style>
