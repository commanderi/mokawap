<template>
<!-- 江苏快三 -->
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
              <span v-if="(preSwitchIndex==0&&subSwitchIndex==0)||playingList[preSwitchIndex].play_rule.length<=1">{{playingList[preSwitchIndex].name}}</span>
              <div class="lotteryTitle___4KqNL" v-else>
                <div>{{playingList[preSwitchIndex].name}}</div>
                {{playingList[preSwitchIndex].play_rule[subSwitchIndex].title}}
              </div>
              <div class="sanjiao___2WERR"></div>
            </div>
            <div class="am-popover-inner" v-if="isSelect">
                <div class="parentTitle___1fCnq">选择玩法</div>
                <div class="body___1t9uH">
                    <div class="menuBody___2PhYY">
                        <div :class="['menuItem___2Mzkn', preSwitchIndex==index ? 'active' : '']" v-for="(item, index) in playingList" @click="confirmPlaying(item,index)" :key="index">{{item.name}}</div>
                    </div>
                </div>
                <div class="activeTitle___143cx" v-if="playingList[preSwitchIndex].play_rule.length>=2">
                  {{playingList[preSwitchIndex].play_rule[subSwitchIndex].title}}
                </div>
                <div class="menuBody___2PhYY" v-if="playingList[preSwitchIndex].play_rule.length>=2">
                  <div :class="['menuItem___2Mzkn', subSwitchIndex==index ? 'active' : '']"
                       v-for="(item, index) in playingList[preSwitchIndex].play_rule"
                       @click="confirmPlayingSub(item,index)" :key="index">{{item.title}}
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
                    <li @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'k3'})">开奖历史</li>
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
                <div class="flex___16JOt lotteryWinView___1zcag">
                  <div style="margin-right: .2rem;" v-for="(item, index) in lastOneData.number" :key="index">{{item}}</div>
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
                                  <div class="k3Bg___3TxYQ">
                                    <div :class="['saizi___2YnXL', 'sazi'+sub] " v-for="(sub, index) in item.number" :key="index"></div>
                                  </div>
                                  <div class="sumInfo___c34mA">和值：{{item.detail[0]}}</div>
                                  <div class="numInfo___1PtxZ">{{item.detail[1]}}</div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="optionContainer___3nqVi">
                    <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'k3'})">
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
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in dataList" :key="index">
                            <div class="flex___16JOt" v-if="(odd_pan==1&&odd_play==1)">
                              <div class="title___3GwzV">{{item.name}}</div>
                              <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                  <template v-for="(text, i) in item.topFont">
                                    <div :class="['btnItem___21_fq', text.active ? 'btnItemActive' : '']" @click="selectTextFn(index, i)" :key="i">{{text.text}}</div>
                                  </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                  <div class="selectMark___1Dj8V" @click="selectNumFn(index, j)" v-for="(nb, j) in item.odds" :key="j">
                                    <div :class="['selectNumItem___3nDoA', nb.active ? 'selectNumItemActive' : '']">{{nb.rule}}</div>
                                    <div class="oddNum___3pd8l">{{nb.rate}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex___16JOt" v-else-if="(odd_pan==1&&odd_play==2)">
                              <div class="flex___16JOt textSelectContainer___3XYpJ">
                                <div class="selectTitle___1ty1e">
                                  <div class="titleContent___">和值</div>
                                  <div class="oddContent___">赔率</div>
                                </div>
                                <div class="flex___16JOt selectNumBody___1zxKo">
                                  <div class="selectMark___2QrYY" @click="selectDaXiao(index)" v-for="(item, index) in dataList[0].odds" :key="index">
                                    <div :class="['selectNumItem___1Engk', item.active?'selectNumItemActive___-kIko':'']">{{item.rule}}</div>
                                    <div class="oddNum___1fCBl">{{item.rate}}</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div class="flex___16JOt" v-else-if="(odd_pan==2&&odd_play==3)||(odd_pan==4&&odd_play==6)">
                              <div class="flex___16JOt textSelectContainer___3XYpJ">
                                <div class="selectTitle___1ty1e">
                                  <div class="titleContent___">号码</div>
                                </div>
                                <div class="flex___16JOt selectNumBody___1zxKo">
                                  <div class="selectMark___2QrYY" @click="selectDaXiao(index)" v-for="(item, index) in dataList[0].odds" :key="index">
                                    <div :class="['selectNumItem___2zOQb', item.active?'selectNumItemActive___-kIko':'']">{{item.rule}}</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div class="flex___16JOt" v-else-if="(odd_pan==2&&odd_play==4)||(odd_pan==5&&odd_play==7)">
                              <div class="flex___16JOt textSelectContainer___3XYpJ">
                                <div class="selectTitle___1ty1e">
                                  <div class="titleContent___">号码</div>
                                </div>
                                <div class="flex___16JOt selectNumBody___1zxKo">
                                  <div class="selectMark___1vXhE" v-for="(item, index) in dataList[0].odds" :key="index">
                                    <div class="selectMark___2QrYY" @click="selectDaXiao(index)">
                                      <div :class="['selectNumItem___1Engk', item.active?'selectNumItemActive___-kIko':'']">{{item.rule}}</div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <div class="flex___16JOt" v-if="(odd_pan==3&&odd_play==5)||(odd_pan==5&&odd_play==8)||(odd_pan==6&&odd_play==9)||(odd_pan==7&&odd_play==11)">
                              <div class="title___3GwzV">{{item.name}}</div>
                              <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                  <template v-for="(text, i) in item.topFont">
                                    <div :class="['btnItem___21_fq', text.active ? 'btnItemActive' : '']" @click="selectTextFn(index, i)" :key="i">{{text.text}}</div>
                                  </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                  <div class="selectMark___1Dj8V" @click="selectNumFn(index, j)" v-for="(nb, j) in item.odds" :key="j">
                                    <div :class="['selectNumItem___3nDoA', nb.active ? 'selectNumItemActive' : '']">{{nb.rule}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex___16JOt" v-if="(odd_pan==6&&odd_play==10)">
                              <div class="title___3GwzV">{{item.name}}</div>
                              <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                  <template v-for="(text, i) in item.topFont">
                                    <div :class="['btnItem___21_fq', text.active ? 'btnItemActive' : '']" @click="selectTextFn(index, i)" :key="i">{{text.text}}</div>
                                  </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                  <div class="selectMark___1Dj8V" @click="selectNumFn(index, j)" v-for="(nb, j) in item.odds" :key="j">
                                    <div :class="['selectNumItem___3nDoA', nb.active ? 'selectNumItemActive' : '']">{{nb.rule}}</div>
                                  </div>
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
import {getLotteryOdds, GetPersonalInfo, getNextTimeStage, getLastOneNumber, getLastOpenNumber} from '@/axios/api.js'
import { mapState } from 'vuex'
export default {
    name: 'JSK3',
    data() {
        return {
          isShowLayer: false,
          id: '',
          title: '',
          userInfo: {},
          nextTimeData: {},
          lastOneData: null,
          lastOpenNumber: [], // 最近10期数据
          tableTop: 0,
          isAssistant: false, // is助手
          isSelect: false,
          preSwitchIndex: 0,
          subSwitchIndex: 0,
          playingList:null, //获取的玩法数据
          odd_pan: null,
          odd_play: null,
          betQuantityType: 0, // 根据投注类型，计算投注号码 方法不同
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
          topText: [
            {
              active: false,
              text: '全'
            }
          ],
          dataList: [], // 玩法对应 选择投注的数据
          time: null,
          hms: {
            hour: 0,
            minute: 0,
            second: 0
          }, //时分秒
          loginInfo:{},
        }
    },
    computed:{
      ...mapState(["BettingData"])
    },
    components: {
      LotteryLayer
    },
    destroyed() {
        document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
        clearInterval(this.time);
    },
    mounted() {
      this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      this.id = this.$route.query.id
      this.title = this.$route.query.title
      this.getLotteryData();
      this.getPersonalInfo()
      this.getNextTimeStage()
    },
    methods: {
      backCart() {
        // 返回购物车
        this.$router.push({ path:'/BetBuyListPage', query:{title: this.title}});
      },
      showLotteryLayerFn() {
        if(this.betData.betQuantity <=0){
          this.$alert('号码选择有误', '提示');
          return
        }
        this.isShowLayer = true
      },
        // 获取具体的彩种数据
        getLotteryData:function(){
            getLotteryOdds({
              'token':this.loginInfo.token,
              'uid':this.loginInfo.id,
              'cate': this.id
            }).then(res => {
                if(res.ret==200){
                  this.playingList = res.data;
                  this.getDataList(res.data[0], res.data[0].odd_pan, res.data[0].play_rule[0].odd_play)
                }else{
                    console.log('请求出错:',res);
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
            clearInterval(this.time);
            this.thisTermTime();
            setTimeout(() => {
              this.getLastOneNumber(res.data.next_stage)
              this.getLastOpenNumber()
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
            if (res.ret == 200) {
              this.lastOneData = res.data[0]
            } else {
              this.lastOneData = null
            }
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
        // 选择玩法 1
        confirmPlaying(data,index) {
          this.preSwitchIndex = index;
          this.subSwitchIndex = 0;
          this.getDataList(data, this.playingList[index].odd_pan, this.playingList[index].play_rule[0].odd_play)
          if(data.play_rule.length <=1 ) {
            this.isSelect = false
          }
        },
        // 选择玩法 2
        confirmPlayingSub(data, index) {
          this.subSwitchIndex = index;
          this.getDataList(data, this.playingList[this.preSwitchIndex].odd_pan, this.playingList[this.preSwitchIndex].play_rule[index].odd_play)
          this.isSelect = false
        },
        // 选择玩法 3 变化 dataList
        getDataList(data, odd_pan, odd_play) {
          this.odd_pan = odd_pan
          this.odd_play = odd_play
          // console.log(odd_pan, odd_play);
          if(odd_pan == 1 && odd_play == 1){
            this.betQuantityType = 0
            // 和值
            let list = this.playingList[0].play_rule[0].odds
            let odds = []
            for(let i = 0 ; i < list.length ; i++) {
              odds.push({
                active: false,
                rule: list[i].rule,
                rate: list[i].rate
              })
            }
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
                odds: odds
              }
            ]
          } else if(odd_pan == 1 && odd_play == 2) {
            this.betQuantityType = 0
            // 和值 大小单双
            let list = this.playingList[0].play_rule[1].odds
            let odds = []
            for(let i = 0 ; i < list.length ; i++) {
              odds.push({
                active: false,
                rule: list[i].rule,
                rate: list[i].rate
              })
            }
            this.dataList = [
              {
                odds: odds
              }
            ]
          } else if(odd_pan == 2 && odd_play == 3) {
            this.betQuantityType = 1
            // 三同号 通选
            this.dataList = [
              {
                odds: [
                  {
                    active: false,
                    rule: '三同号通选'
                  }
                ]
              }
            ]
          } else if(odd_pan == 2 && odd_play == 4) {
            this.betQuantityType = 2
            // 三同号 单选
            this.dataList = [
              {
                odds: [
                  {
                    active: false,
                    rule: '111',
                    bet: 1
                  },
                  {
                    active: false,
                    rule: '222',
                    bet: 2
                  },
                  {
                    active: false,
                    rule: '333',
                    bet: 3
                  },
                  {
                    active: false,
                    rule: '444',
                    bet: 4
                  },
                  {
                    active: false,
                    rule: '555',
                    bet: 5
                  },
                  {
                    active: false,
                    rule: '666',
                    bet: 6
                  }
                ]
              }
            ]
          } else if((odd_pan == 3 && odd_play == 5)||(odd_pan == 6 && odd_play == 9)||(odd_pan == 7 && odd_play == 11)){
            if(odd_pan == 3 && odd_play == 5) {
              // 三不同号
              this.betQuantityType = 3
            }
            if(odd_pan == 6 && odd_play == 9) {
              // 二不同号
              this.betQuantityType = 5
            }
            if(odd_pan == 7 && odd_play == 11) {
              // 猜一个号
              this.betQuantityType = 6
            }
            this.dataList = [
              {
                name: '号码',
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
                odds: [
                  {
                    active: false,
                    rule: 1
                  },
                  {
                    active: false,
                    rule: 2
                  },
                  {
                    active: false,
                    rule: 3
                  },
                  {
                    active: false,
                    rule: 4
                  },
                  {
                    active: false,
                    rule: 5
                  },
                  {
                    active: false,
                    rule: 6
                  }
                ]
              }
            ]
          } else if(odd_pan == 4 && odd_play == 6){
            this.betQuantityType = 1
            // 三连号通选
            this.dataList = [
              {
                odds: [
                  {
                    active: false,
                    rule: '三连号通选'
                  }
                ]
              }
            ]
          } else if(odd_pan == 5 && odd_play == 7) {
            this.betQuantityType = 2
            // 二同号 复选
            this.dataList = [
              {
                odds: [
                  {
                    active: false,
                    rule: '11',
                    val: '1|1|*'
                  },
                  {
                    active: false,
                    rule: '22',
                    val: '2|2|*'
                  },
                  {
                    active: false,
                    rule: '33',
                    val: '3|3|*'
                  },
                  {
                    active: false,
                    rule: '44',
                    val: '4|4|*'
                  },
                  {
                    active: false,
                    rule: '55',
                    val: '5|5|*'
                  },
                  {
                    active: false,
                    rule: '66',
                    val: '6|6|*'
                  }
                ]
              }
            ]
          } else if(odd_pan == 5 && odd_play == 8) {
            this.betQuantityType = 4
            // 二同号 单选
            this.dataList = [
              {
                name: '同号',
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
                odds: [
                  {
                    active: false,
                    rule: '11'
                  },
                  {
                    active: false,
                    rule: '22'
                  },
                  {
                    active: false,
                    rule: '33'
                  },
                  {
                    active: false,
                    rule: '44'
                  },
                  {
                    active: false,
                    rule: '55'
                  },
                  {
                    active: false,
                    rule: '66'
                  }
                ]
              },
              {
                name: '不同号',
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
                odds: [
                  {
                    active: false,
                    rule: '1'
                  },
                  {
                    active: false,
                    rule: '2'
                  },
                  {
                    active: false,
                    rule: '3'
                  },
                  {
                    active: false,
                    rule: '4'
                  },
                  {
                    active: false,
                    rule: '5'
                  },
                  {
                    active: false,
                    rule: '6'
                  }
                ]
              }
            ]
          } else if(odd_pan == 6 && odd_play == 10) {
            // 二不同号 托胆
            this.betQuantityType = 4
            this.dataList = [
              {
                name: '胆码',
                topFont: [
                  {
                    active: false,
                    text: '清'
                  }
                ],
                odds: [
                  {
                    active: false,
                    rule: '1'
                  },
                  {
                    active: false,
                    rule: '2'
                  },
                  {
                    active: false,
                    rule: '3'
                  },
                  {
                    active: false,
                    rule: '4'
                  },
                  {
                    active: false,
                    rule: '5'
                  },
                  {
                    active: false,
                    rule: '6'
                  }
                ]
              },
              {
                name: '拖码',
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
                odds: [
                  {
                    active: false,
                    rule: '1'
                  },
                  {
                    active: false,
                    rule: '2'
                  },
                  {
                    active: false,
                    rule: '3'
                  },
                  {
                    active: false,
                    rule: '4'
                  },
                  {
                    active: false,
                    rule: '5'
                  },
                  {
                    active: false,
                    rule: '6'
                  }
                ]
              }
            ]
          }
          this.getMaxArrNumber(data)
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
        // 和值-大小单双
        selectDaXiao(index) {
          let dataList = this.dataList
          dataList[0].odds[index].active = !dataList[0].odds[index].active
          this.calcBetFn()
        },
        // 0全 1大 2小 3单 4双 5清
        selectTextFn(index, subIndex) {
          let dataList = this.dataList
          if(this.odd_pan==6&&this.odd_play==10&&dataList[index].topFont.length==1) {
            dataList[index].odds.forEach((item, i) => {
              item.active = false
            })
            return false
          }
          if (subIndex != 5) {
            dataList[index].topFont[subIndex].active = !dataList[index].topFont[subIndex].active
          }
          dataList[index].topFont.forEach((item, i) => {
            if (subIndex != i) {
              item.active = false
            }
          })
          if (subIndex == 0) {
            dataList[index].odds.forEach((item, i) => {
              item.active = dataList[index].topFont[subIndex].active
            })

          } else if (subIndex == 1) {
            if((this.odd_pan==3&&this.odd_play==5)||
              (this.odd_pan==5&&this.odd_play==8)||
              (this.odd_pan==6&&this.odd_play==9)||
              (this.odd_pan==6&&this.odd_play==10)||
              (this.odd_pan==7&&this.odd_play==11)
            ){
              dataList[index].odds.forEach((item, i) => {
                if (i + 1 >= 4) {
                  item.active = dataList[index].topFont[subIndex].active
                } else {
                  item.active = false
                }
              })
            } else {
              dataList[index].odds.forEach((item, i) => {
                if (i + 1 >= 9) {
                  item.active = dataList[index].topFont[subIndex].active
                } else {
                  item.active = false
                }
              })
            }
          } else if (subIndex == 2) {
            if((this.odd_pan==3&&this.odd_play==5)||
              (this.odd_pan==5&&this.odd_play==8)||
              (this.odd_pan==6&&this.odd_play==9)||
              (this.odd_pan==6&&this.odd_play==10)||
              (this.odd_pan==7&&this.odd_play==11)
            ){
              dataList[index].odds.forEach((item, i) => {
                if (i + 1 <= 3) {
                  item.active = dataList[index].topFont[subIndex].active
                } else {
                  item.active = false
                }
              })
            } else {
              dataList[index].odds.forEach((item, i) => {
                if (i + 1 <= 8) {
                  item.active = dataList[index].topFont[subIndex].active
                } else {
                  item.active = false
                }
              })
            }

          } else if (subIndex == 3) {
            dataList[index].odds.forEach((item, i) => {
              if ((i + 1) % 2 != 0) {
                item.active = dataList[index].topFont[subIndex].active
              } else {
                item.active = false
              }
            })
          } else if (subIndex == 4) {
            dataList[index].odds.forEach((item, i) => {
              if ((i + 1) % 2 == 0) {
                item.active = dataList[index].topFont[subIndex].active
              } else {
                item.active = false
              }
            })
          } else if (subIndex == 5) {
            dataList[index].odds.forEach((item, i) => {
              item.active = false
            })
          }
          if((this.odd_pan==5&&this.odd_play==8)|| this.odd_pan==6&&this.odd_play==10){
            this.delRepeatArr(index)
          } else {
            this.calcBetFn()
          }
        },
        //
        selectNumFn(index, subIndex) {
          let dataList = this.dataList
          if (this.odd_pan==6&&this.odd_play==10) {
            if(index == 0){
              // 胆码 只能单选
              dataList[0].odds.forEach((item, i) => {
                if(i!=subIndex){
                  item.active = false
                }
              })
            }
          }
          dataList[index].odds[subIndex].active = !dataList[index].odds[subIndex].active

          if((this.odd_pan==5&&this.odd_play==8)|| this.odd_pan==6&&this.odd_play==10){
            this.delRepeatArr(index)
          } else {
            this.calcBetFn()
          }
        },
        // (0, 1)两组号码，去重
        delRepeatArr(index) {
          let dataList = this.dataList
            if(index == 0) {
              dataList[0].odds.forEach((item, i) => {
                if(item.active){
                  dataList[1].odds[i].active = false
                }
              })
            } else {
              dataList[1].odds.forEach((item, i) => {
                if(item.active){
                  dataList[0].odds[i].active = false
                }
              })
          }
          this.calcBetFn()
        },
      // 清空投注
      clearBetDataFn() {
        let dataList = this.dataList
        for (let i = 0; i < dataList.length; i++) {
          if(dataList[i].topFont) {
            for (let k = 0; k < dataList[i].topFont.length; k++) {
              dataList[i].topFont[k].active = false
            }
          }
          for (let j = 0; j < dataList[i].odds.length; j++) {
            dataList[i].odds[j].active = false
          }
        }
        this.calcBetFn()
      },
      // 计算投注数组
      calcBetFn() {
        let dataList = this.dataList
        let betNumberArr = [] // 一维数组 (ps: ['1 2 3', '4 5 6'])
        let betNumberArrArr = [] // 二维数组 (ps: [[1,2],[3,4]])
        let betNumberA = [] // 数组 (ps: [1, 2, 3, 4])
        let splitArr = [] // 数组（ps：['1 2 3', '4 5 6']）
        let num1 = 0 // 选中一个 就算投注一个
        for (let i = 0; i < dataList.length; i++) {
          betNumberArr.push('')
          splitArr.push('')
          betNumberArrArr.push([])
          for (let j = 0; j < dataList[i].odds.length; j++) {
            if (dataList[i].odds[j].active) {
              num1++
              betNumberArr[i] = (betNumberArr[i] + ' ' + dataList[i].odds[j].rule).trim()
              if (dataList[i].odds[j].bet) {
                splitArr[i] = (splitArr[i] + ' ' + dataList[i].odds[j].bet).trim()
              }
              if (dataList[i].odds[j].val) {
                splitArr[i] = splitArr[i] + ',' + dataList[i].odds[j].val
              }
              betNumberArrArr[i].push(dataList[i].odds[j].rule)
              betNumberA.push(dataList[i].odds[j].rule)
            }
          }
          if (i !== dataList.length - 1) {
            betNumberArr[i] = betNumberArr[i] + '|'
          }
        }
        let betQuantity = 0
        let betNumber = betNumberArr.join('')
        if (this.betQuantityType == 0) {
          betQuantity = num1
        } else if (this.betQuantityType == 1) {
          if (betNumberA.length >= 1) {
            betQuantity = 1
            betNumber = '*|*|*'
          } else {
            betQuantity = 0
            betNumber = ''
          }
        } else if(this.betQuantityType == 2) {
          betQuantity = num1
          betNumber = splitArr.join('').replace(',','')
        } else if(this.betQuantityType == 3) {
          if (betNumberA.length<3) {
            betQuantity = 0
          } else {
            betQuantity = this.combination(betNumberA.length, 3)
          }
        } else if(this.betQuantityType == 4) {
          if(betNumberArrArr[0].length <=0 || betNumberArrArr[1].length <=0) {
            betQuantity = 0
          } else {
            betQuantity = this.getArrayByArrays(betNumberArrArr).length
          }
        } else if(this.betQuantityType == 5) {
          if (betNumberA.length<2) {
            betQuantity = 0
          } else {
            betQuantity = this.combination(betNumberA.length, 2)
          }
        } else if(this.betQuantityType == 6) {
          betQuantity = (betNumberA.length) * 21
        }
        // console.log(betNumberArr)
        // console.log(betNumberArrArr)
        // console.log(betNumberA)
        this.betData = {
          betQuantity: betQuantity, // 投注数量
          betNumber: betNumber, // 投注号码
          betMoney: betQuantity * 2, // 投注金额
          rate: this.betData.rate,
          odd_play: this.odd_play,
          odd_title: this.betData.odd_title,
          cateid: this.id,
          title: this.title
        }
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
.oddNum___3pd8l {
  color: #a0a0a0;
  margin: .1rem 0 .2rem;
  font-size: .2rem;
}
.activeTitle___143cx {
  padding: .1rem 0;
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
.lotteryTitle___4KqNL {
  text-align: center;
  font-size: .3rem;
  line-height: .36rem;
}

.textSelectContainer___3XYpJ {
  padding: .1rem 0 0 5%;
  overflow: hidden;
  .selectTitle___1ty1e {
    margin-top: .5rem;
  }
  .oddContent___, .titleContent___ {
    height: .4rem;
    line-height: .4rem;
    font-size: .28rem;
    text-align: center;
    padding-right: .2rem;
    width: 1.04rem;
  }
  .titleContent___ {
    background: url(../../../assets/bg_place01.png) 50% no-repeat;
    background-size: contain;
    color: #676767;
  }
  .oddContent___ {
    background: url(../../../assets/bg_place02.png) 50% no-repeat;
    background-size: contain;
    margin-top: 15px;
    color: #999;
  }
  .selectNumBody___1zxKo {
    -ms-flex: 1 1;
    flex: 1 1;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    margin: .24rem 0 .18rem .04rem;
  }
  .selectMark___2QrYY, .selectNumItem___1Engk {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .selectMark___2QrYY {
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: .28rem;
  }
  .selectNumItem___1Engk {
    -ms-flex-pack: center;
    justify-content: center;
    color: #f44a2e;
    width: 1.2rem;
    height: .8rem;
    font-size: .34rem;
    background: #fff;
    border-radius: 5px;
    &.selectNumItemActive___-kIko {
      background: #f4492d;
      color: #fff;
    }
  }
  .oddNum___1fCBl {
    color: #a0a0a0;
    margin: 5px 0 .2rem;
    font-size: .2rem;
  }
}
.selectNumItem___2zOQb {
  -ms-flex-pack: center;
  justify-content: center;
  color: #f44a2e;
  width: 1.8rem;
  height: .8rem;
  line-height: .8rem;
  font-size: .32rem;
  background: #fff;
  border-radius: 5px;
  &.selectNumItemActive___-kIko {
    background: #f4492d;
    color: #fff;
  }
}
.selectMark___1vXhE {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-right: .6rem;
  margin-bottom: .4rem;
}
.k3Bg___3TxYQ {
  width: 2.2rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #fe9c00;
  padding: .06rem .2rem;
  border-radius: 15px;
  margin: .02rem 0;
  .saizi___2YnXL {
    width: .36rem;
    height: .36rem;
  }
  .sazi1{
    background: url(../../../assets/dice1.png) 50% no-repeat;
    background-size: contain;
  }
  .sazi2{
     background: url(../../../assets/dice2.png) 50% no-repeat;
     background-size: contain;
   }
  .sazi3{
    background: url(../../../assets/dice3.png) 50% no-repeat;
    background-size: contain;
  }
  .sazi4{
    background: url(../../../assets/dice4.png) 50% no-repeat;
    background-size: contain;
  }
  .sazi5{
    background: url(../../../assets/dice5.png) 50% no-repeat;
    background-size: contain;
  }
  .sazi6{
    background: url(../../../assets/dice6.png) 50% no-repeat;
    background-size: contain;
  }
  .numInfo___1PtxZ, .sumInfo___c34mA {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-left: .2rem;
    text-align: left;
  }
  .sumInfo___c34mA {
    width: 1rem;
  }
}
.scrollView___1ZMYS{max-height: 2.3rem;overflow-y: auto;-webkit-overflow-scrolling: touch;}
</style>
