<template>
<!-- 香港六合彩 -->
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
                <div class="duoge" @click="showSelectLotteryFn">
                    <div>
                        <div v-if="getData!==null">{{ getData[selectSwitch].name }}</div>
                        <template v-if="getData!==null">
                            <div style="font-size:0.25rem" v-if="getData[selectSwitch].play_rule.length>1">{{ getData[selectSwitch].play_rule[selectSecondary].title }}</div>
                        </template>
                    </div>
                    <div class="sanjiao___2WERR"></div>
                </div>
                <div class="am-popover-inner" v-if="isSelect">
                    <div class="parentTitle___1fCnq">选择玩法</div>
                    <div class="body___1t9uH">
                        <div class="menuBody___2PhYY">
                            <div :class="['menuItem___2Mzkn', selectSwitch==index ? 'active' : '']" v-for="(item, index) in getData" @click="confirmPlaying(item,index)" :key="index">{{item.name}}</div>
                        </div>
                        <template v-if="getData[selectSwitch].play_rule[selectSecondary]!=undefined">
                            <div class="activeTitle___143cx" v-if="getData[selectSwitch].play_rule.length>1">{{ getData[selectSwitch].play_rule[selectSecondary].title }}</div>
                        </template>
                        <div class="menuBody___2PhYY" style="margin-bottom:0.2rem" v-if="getData[selectSwitch].play_rule.length>1">
                            <div class="menuItem___2Mzkn" v-for="(d,i) in getData[selectSwitch].play_rule" :key="i" :class="selectSecondary==i ? 'active' : ''" v-on:click="selectPly(i,d)">{{ d.title }}</div>
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
                        <li @click="changePage('/openLotteryDetails', {id: cateid, title: title, type: 'LHC'})">开奖历史</li>
                        <!--<li>走势图</li>-->
                        <li @click="changePage('/playRule', {id: cateid})">玩法说明</li>
                        <!--<li>收藏彩票</li>-->
                    </ul>
                </div>
            </div>
        </div>
        <!-- 主要 -->
        <div class="content">
            <div class="lotteryBetTimer___1mgMG">
                <div class="container___3PZA2" v-if="lastNumber.number!==0">
                    <div>{{ lastNumber.stage }}期开奖号码</div>
                    <div class="openCode___1mDSr openCode_liwai lf_open_num">
                        <template v-for="(f,j) in lastNumber.number">
                            <span :key="j" class="meblue" v-if="f==10||f==41">{{ f }}</span>
                            <span :key="j" class="mered" v-else-if="f%11 == 1 || f%11 == 2 || f%11 == 7 || f%11 == 8">{{ f }}</span>
                            <span :key="j" class="meblue" v-else-if="f%11 == 3 || f%11 == 4 || f%11 == 9">{{ f }}</span>
                            <span :key="j" class="megreen" v-else>{{ f }}</span>
                        </template>
                    </div>
                    <div class="openCode___1mDSr lf_open_attr">
                        <span v-for="(a,b) in lastNumber.attr" :key="b">{{ a }}</span>
                    </div>
                </div>
                <div class="container___3PZA2" v-else>
                    <div v-if="thisperDta!==null">正在获取{{Number(thisperDta.next_stage)-1}}开奖数据</div>
                    <div class="lotteryWinView___1zcag">
                        <div>等待开奖...</div>
                    </div>
                </div>
                <div>
                    <div class="currentIssueId___1xhbZ" v-if="thisperDta!==null">距{{ thisperDta.next_stage }}期截止</div>
                    <div class="timer___1tSLt">{{ hms.hour }}:{{ hms.minute }}:{{ hms.second }}</div>
                </div>
            </div>
            <div class="flexContainer___3DQxK">
                <!-- 开奖历史 -->
                <div class="container___3ub3Q" id="qiCiHeight">
                    <div class="listTitle___3ZzbJ">
                        <div class="uniqueIssueNumber___3PLvy">期次</div>
                        <div class="number___i-ryQ">开奖号码</div>
                    </div>
                    <div class="scrollView___1ZMYS">
                        <table class="table___19NyN">
                            <tr v-for="(d,i) in NearTen" :key="i">
                                <td>
                                    <div class="uniqueIssueNumberTd___20CZH">第{{ d.stage }}期</div>
                                </td>
                                <td>
                                    <div class="openCode___1mDSr lf_open_num">
                                        <template v-for="(f,j) in d.number" >
                                            <span :key="j" class="meblue" v-if="f==10||f==41">{{ f }}</span>
                                            <span :key="j" class="mered" v-else-if="f%11 == 1 || f%11 == 2 || f%11 == 7 || f%11 == 8">{{ f }}</span>
                                            <span :key="j" class="meblue" v-else-if="f%11 == 3 || f%11 == 4 || f%11 == 9">{{ f }}</span>
                                            <span :key="j" class="megreen" v-else>{{ f }}</span>
                                        </template>
                                    </div>
                                    <div class="openCode___1mDSr lf_open_attr">
                                        <span v-for="(a,b) in d.detail" :key="b">{{ a }}</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="optionContainer___3nqVi">
                        <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: cateid, title: title, type: 'LHC'})">
                            <div class="moreIcon___3fQEy"></div>
                            点击查看更多开奖历史
                        </div>
                    </div>
                </div>
                <div class="container___btf3a" id="tableQiCi" :style="{top: tableTop + 'px'}">
                    <div class="container___K0zBX">
                        <div class="dropIcon___3fbhG" @click="showQiCiTable"></div>
                        <div class="container1___3TtZg">
                            <div class="shakeBtn">余额:{{ leftoverMoney }}</div>
                            <div class="returnCat" v-if="BettingData.length>=1" v-on:click="backCart">返回购物车<i class="lf_num">{{ BettingData.length }}</i> </div>
                        </div>
                    </div>
                    <!-- 特码（数字） -->
                    <div class="betContainer___2sw-n" v-if="selectSwitch==0 || selectSwitch==4 || selectSwitch==5">
                        <ul>
                            <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                <div class="title___3GwzV">选码</div>
                                <div class="selectItemRight___3lZk3">
                                    <div class="flex___16JOt btnContainer___2HDeL">
                                        <template v-for="(text, i) in 12">
                                            <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                        </template>
                                    </div>
                                    <div class="flex___16JOt selectNumBody___9bXff">
                                        <div class="selectMark___1Dj8V" v-for="(n,j) in 49" :key="j">
                                            <template v-if="n==10||n==41">
                                                <div class="selectNumItem___3nDoA thisblue" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 1 || n%11 == 2 || n%11 == 7 || n%11 == 8">
                                                <div class="selectNumItem___3nDoA thisred" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 3 || n%11 == 4 || n%11 == 9">
                                                <div class="selectNumItem___3nDoA thisblue" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else>
                                                <div class="selectNumItem___3nDoA thisgreen" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <span v-if="getData!=null">{{ getData[selectSwitch].play_rule[selectSecondary].odds[0].rate }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 两面（文字） -->
                    <div class="betContainer___2sw-n" v-else-if="selectSwitch==1 || selectSwitch==3 || selectSwitch==6 || selectSwitch==7 || selectSwitch==8 || selectSwitch==9">
                        <div class="flex___16JOt textSelectContainer___3XYpJ">
                            <div class="selectTitle___1ty1e">
                                <div class="titleContent___3T3te">种类</div>
                                <div class="oddContent___3XJT0">赔率</div>
                            </div>
                            <div class="flex___16JOt selectNumBody___1zxKo">
                                <div class="selectMark___2QrYY" v-for="(d,i) in UpdatePage.play_rule[selectSecondary].odds" :key="i">
                                    <div class="selectNumItem___1Engk" v-on:click="radioText($event,0,i,d.rule)">{{ d.rule }}</div>
                                    <div class="oddNum___1fCBl">{{ d.rate }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 色波（特殊显示） -->
                    <div class="betContainer___2sw-n" v-else-if="selectSwitch==2">
                        <div class="flex___16JOt textSelectContainer___3XYpJ">
                            <div class="selectTitle___1ty1e">
                                <div class="titleContent___3T3te">种类</div>
                                <div class="oddContent___3XJT0">赔率</div>
                            </div>
                            <div class="selectNumBody" v-if="selectSecondary==0">
                                <div class="selectMark" v-for="(d,i) in UpdatePage.play_rule[selectSecondary].odds" :key="i">
                                    <div class="selectNumItem___2YkJu state0" v-on:click.stop="radioText($event,0,i,d.rule)">
                                        <template v-if="i==0">
                                            <div class="colorName___1wuHo Ired">{{ d.rule }}</div>
                                            <div class="flex___16JOt info___2v4gC">
                                                <template v-for="(m,v) in 49">
                                                    <template v-if="m%11 == 1 || m%11 == 2 || m%11 == 7 || m%11 == 8">
                                                        <div class="numInfoItem___3CjXV Ired" :key="v">{{ m<10 ? '0'+m : m }}</div>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                        <template v-else-if="i==1">
                                            <div class="colorName___1wuHo Iblue">{{ d.rule }}</div>
                                            <div class="flex___16JOt info___2v4gC">
                                                <template v-for="(m,v) in 49">
                                                    <template v-if="m%11 == 3 || m%11 == 4 || m%11 == 9">
                                                        <div class="numInfoItem___3CjXV Iblue" :key="v">{{ m<10 ? '0'+m : m }}</div>
                                                    </template>
                                                    <template v-else-if="m==10||m==41">
                                                        <div class="numInfoItem___3CjXV Iblue" :key="v">{{ m<10 ? '0'+m : m }}</div>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div  class="colorName___1wuHo Igreen">{{ d.rule }}</div>
                                            <div class="flex___16JOt info___2v4gC">
                                                <template v-for="(m,v) in 49">
                                                    <template v-if="m==10||m==41"></template>
                                                    <template v-else-if="m%11 == 1 || m%11 == 2 || m%11 == 7 || m%11 == 8"></template>
                                                    <template v-else-if="m%11 == 3 || m%11 == 4 || m%11 == 9"></template>
                                                    <template v-else>
                                                        <div class="numInfoItem___3CjXV Igreen" :key="v">{{ m<10 ? '0'+m : m }}</div>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="oddNum___3BeFf">赔率:{{ d.rate }}</div>
                                </div>
                            </div>
                            <div class="flex___16JOt selectNumBody___1zxKo" v-else-if="selectSecondary==1 || selectSecondary==2">
                                <div class="selectMark___2QrYY" v-for="(d,i) in UpdatePage.play_rule[selectSecondary].odds" :key="i">
                                    <div class="selectNumItem___1Engk" v-on:click="radioText($event,0,i,d.rule)">{{ d.rule }}</div>
                                    <div class="oddNum___1fCBl">{{ d.rate }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 自选不中、连码（数字）排列组合 -->
                    <div class="betContainer___2sw-n" v-if="selectSwitch==10 || selectSwitch==12">
                        <ul>
                            <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                <div class="title___3GwzV">选码</div>
                                <div class="selectItemRight___3lZk3">
                                    <div class="flex___16JOt btnContainer___2HDeL">
                                        <template v-for="(text, i) in 1">
                                            <div class="btnItem___21_fq" v-on:click="clearData" :key="i">清</div>
                                        </template>
                                    </div>
                                    <div class="flex___16JOt selectNumBody___9bXff">
                                        <div class="selectMark___1Dj8V" v-for="(n,j) in 49" :key="j">
                                            <template v-if="n==10||n==41">
                                                <div class="selectNumItem___3nDoA thisblue" v-on:click="radio_10($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 1 || n%11 == 2 || n%11 == 7 || n%11 == 8">
                                                <div class="selectNumItem___3nDoA thisred" v-on:click="radio_10($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 3 || n%11 == 4 || n%11 == 9">
                                                <div class="selectNumItem___3nDoA thisblue" v-on:click="radio_10($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <template v-else>
                                                <div class="selectNumItem___3nDoA thisgreen" v-on:click="radio_10($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                            </template>
                                            <span>{{ getData[selectSwitch].play_rule[selectSecondary].odds[0].rate }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 连肖连尾（文字）排列组合-->
                    <div class="betContainer___2sw-n" v-else-if="selectSwitch==11">
                        <div class="flex___16JOt textSelectContainer___3XYpJ">
                            <div class="selectTitle___1ty1e">
                                <div class="titleContent___3T3te">种类</div>
                                <div class="oddContent___3XJT0">赔率</div>
                            </div>
                            <div class="flex___16JOt selectNumBody___1zxKo">
                                <div class="selectMark___2QrYY" v-for="(d,i) in UpdatePage.play_rule[selectSecondary].odds" :key="i">
                                    <div class="selectNumItem___1Engk" v-on:click="radioText_11($event,0,i,d.rule)">{{ d.rule }}</div>
                                    <div class="oddNum___1fCBl">{{ d.rate }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- footer -->
            <div class="footerContainer___qA5nn">
                <div class="theme2___13ElA undefined button___3xxsI" v-on:click="clearData">清空</div>
                <div class="flex___16JOt betInfoContainer___1hnNI" v-if="selData!=null">
                    <div class="betText___3JQwN">{{ selData.number }}</div>
                    <div>共{{ selData.note }}注<span class="totalMoney___1N9Cj">{{ selData.note*SingleAmount }}元</span></div>
                </div>
                <div class="theme1___341L1 undefined button___3xxsI" v-on:click="setBetting(1)">确定</div>
            </div>
        </div>
        <div class="Mask scale_0">
            <div class="am-modal-wrap">
                <div class="am-modal-content">
                    <div class="am-modal-header">
                        <div class="am-modal-title">注单设定</div>
                    </div>
                    <div class="am-modal-body">
                        <div class="betBaseContainer">
                            <p class="betBaseContainer_p" v-if="selData!=null">最高赔率：{{ selData.rate }}</p>
                            <div class="flex___16JOt moneyInfo___1K8xW">
                                <div class="jine">单注金额：</div>
                                <div class="am-list-item am-input-item am-list-item-middle moneyBase___2PFgO am-input-focus am-input-android" style="width:40%">
                                    <div class="am-list-line">
                                        <div class="am-input-control">
                                            <input maxlength="7" type="text" v-on:input="getSingleAmount" v-on:focus="fa" v-model="SingleAmount" pattern="[0-9]*" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                                        </div>
                                    </div>
                                </div>
                                <div class="selectMode___3rpny">
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(1)">元</div>
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==0.1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.1)">角</div>
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==0.01 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.01)">分</div>
                                </div>
                            </div>
                            <div class="selectMoney">
                                <button v-for="(d,i) in SingleAmountArr" :key="i" :class="SingleAmount==d ? 'modeItemActive' : ''" v-on:click="selSingleAmount(d)">{{ d }}</button>
                            </div>
                            <div class="textInfo">
                                <p>注数：{{ selData.note }}</p>
                                <p>总金额：{{ TotalAmount }}元</p>
                                <p>单注最小金额为<span class="maxBonus">0.01</span>元</p>
                            </div>
                        </div>
                    </div>
                    <div class="am-modal-footer">
                        <div class="am-modal-button-group-h">
                            <button class="am-modal-button" v-on:click="setBetting(0)">取消</button>
                            <button class="am-modal-button" v-on:click="toShoppingCart()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
import { getLotteryOdds } from '@/axios/api.js'
import { GetPersonalInfo } from '@/axios/api.js'
import { getNextTimeStage } from '@/axios/api.js'
import { getLastOneNumber } from '@/axios/api.js'
import { getLastOpenNumber } from '@/axios/api.js'
import { mapState } from 'vuex'
export default {
    name: 'XGLHC',
    data() {
        return {
            tableTop: 0,
            isAssistant: false, // is助手
            isSelect: false,
            checkvariable:null, //多选
            userArr:[], //单选
            selectSwitch:0, //选择的一级玩法
            selectSecondary:0, //选择的二级玩法
            getData:null, //获取的数据
            thisperDta:null, //当前期数状态
            time:null, //当前期数倒计时函数
            meTime:null, //定时获取上一期开奖结果的函数
            hms:{hour:0,minute:0,second:0}, //时分秒
            NearTen:null, //近十期开奖号码
            maxormin:[], //该玩法下所有赔率
            lastNumber:{stage:0,number:0,attr:0},
            UpdatePage:null, //选择的玩法，通过选择的玩法更新个小彩种的页面视图
            selData:{note:0,number:null,rate:null},
            YuanAngle:1, //元角分
            SingleAmount:2, //单注金额
            NotesNumber:0, //注数
            TotalAmount:0, //总金额
            SingleAmountArr:[10,50,100,200,500,1000,5000,10000,50000],
            duoxuanfont:['全','大','小','单','双','清'],
            paifont:['选码'],
            readyData:{number:null,note:null,rate:null,odd_play:null,one_money:null,money:null,multiple:null,odd_title:null},
            meStatus:null,
            cateid:this.$route.query.id,//彩种id
            title:this.$route.query.title,
            SecondaryData:null,
            leftoverMoney:0, //余额
            loginInfo:{},
        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.getLotteryData();
        this.getThisTime();
        this.getlast10();
        GetPersonalInfo({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
            if(res.ret==200){
                this.leftoverMoney = res.data.money;
            }
        });
    },
    computed:{
        ...mapState(["BettingData"])
    },
    methods: {
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
        // 返回购物车
        backCart() {
            this.$router.push({ path:'/BetBuyListPage', query:{id: this.cateid,title: this.title}});
        },
        fa:function(){
            this.SingleAmount = '';
        },
        // 获取具体的彩种数据
        getLotteryData:function(){
            getLotteryOdds({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.cateid}).then(res => {
                if(res.ret==200){
                    this.getData = res.data;
                    this.UpdatePage = res.data[0];//获取页面进入时的默认玩法数据
                    // console.log('全部数据',this.getData);
                    // console.log('默认第一条数据',this.UpdatePage);
                }else{
                    console.warn('异常:',res);
                }
            })
        },
        // 获取当前彩票的倒计时时间
        getThisTime:function(){
            getNextTimeStage({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.cateid}).then(res => {
                if(res.ret==200){
                    this.thisperDta = res.data;
                    clearInterval(this.time);
                    this.thisTermTime();
                    this.getlastterm();
                }else{
                    console.warn('异常:',res);
                }
            });
        },
        // 获取上一期开奖号码
        getlastterm:function(){
            getLastOneNumber({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.cateid,'stage':this.thisperDta.next_stage-1}).then(res => {
                if(res.ret==200){
                    this.lastNumber.number = res.data[0].number;
                    this.lastNumber.stage = res.data[0].stage;
                    this.lastNumber.attr = res.data[0].detail;
                    clearInterval(this.meTime);
                }else{
                    clearInterval(this.meTime);
                    this.meTime = setInterval(() => {
                        this.getlastterm();                        
                    }, 15000);
                    console.warn('异常:',res);
                }
            })
        },
        // 获取最近10期的开奖结果
        getlast10:function(){
            // alert('手机上不执行3')
            getLastOpenNumber({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.cateid}).then(res => {
                if(res.ret==200){
                    this.NearTen = res.data;
                }else{
                    console.warn('异常:',res);
                }
            })
        },
        // 当前期数倒计时
        thisTermTime:function(){
            let c = this.thisperDta.open_time;
            this.time = setInterval(() => {
                this.hms.hour = (Math.floor(c/3600));
                this.hms.minute = (Math.floor((c/60)%60));
                this.hms.second = (Math.floor(c%60));
                if(this.hms.hour<10){
                    this.hms.hour = '0'+this.hms.hour;
                }
                if(this.hms.minute<10){
                    this.hms.minute = '0'+this.hms.minute;
                }
                if(this.hms.second<10){
                    this.hms.second = '0'+this.hms.second;
                }
                // console.log(this.hms.hour,this.hms.minute,this.hms.second)
                c--;
                if(c<1){
                    clearInterval(this.time);
                    this.getThisTime();
                }
            }, 1000);
        },
        // 清空选择的数据
        clearData:function(){
            this.userArr = [];
            this.selData = {note:0,number:null,rate:null}
            this.maxormin = [];
            $('.selectNumBody___9bXff').children().children().removeClass('selectNumItemActive');
            $('.selectNumItem___3nDoA,.selectNumItem___1Engk').removeClass('meblue mered megreen meStatus');
        },
        // 购彩助手 show
        showAssistantFn() {
            this.isAssistant = true;
        },
        // 购彩助手 hide
        hideAssistantFn() {
            this.isAssistant = false;
            this.isSelect = false;
        },
        //  显示玩法
        showSelectLotteryFn() {
            this.isSelect = true;
        },
        // 选择一级玩法
        confirmPlaying(data,index) {
            // console.log('选择一级玩法：',data);
            this.UpdatePage = data;
            this.selectSwitch = index;
            this.selectSecondary = 0;
            if(data.play_rule.length<=1){
                this.isSelect = false;
                this.userArr[0] = [];
                $('.selectNumItem___3nDoA,.selectNumItem___1Engk').removeClass('meblue mered megreen meStatus');
            }
            this.clearData();
        },
        // 选择的二级玩法
        selectPly:function(i,data){
            // console.log('选择的二级玩法:',data);
            this.selectSecondary = i;
            this.isSelect = false;
            this.SecondaryData = data;
            $('.selectNumItem___3nDoA,.selectNumItem___1Engk').removeClass('meblue mered megreen meStatus');
            this.userArr[0] = [];
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
        // 设置投注
        setBetting:function(num){
            // console.log(this.selData)
            if(this.selData.note<1){
                this.$alert('选择的号码不符合投注规则', '提示');
            }else{
                if(this.selData.number==''||this.selData.number==null){
                    this.$alert('号码选择有误', '提示');
                }else{
                    if(num==1){
                        this.TotalAmount = this.selData.note*this.SingleAmount;
                        $('.Mask').addClass('scale_1');
                    }else{
                        this.YuanAngle = 1;
                        this.SingleAmount = 2;
                        $('.Mask').removeClass('scale_1');
                    }
                }
            }
        },
        // 监听单笔金额输入框
        getSingleAmount:function(){
            this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
        },
        // 选择的单笔金额
        selSingleAmount:function(num){
            this.SingleAmount = num;
            this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
        },
        // 设置元角分
        setYuanAngle:function(num){
            this.YuanAngle = num;
            this.TotalAmount = this.changeTwoDecimal_f((this.selData.note*this.SingleAmount)*this.YuanAngle);
        },
        // 文字的多选
        checkText(e,y,x){
            this.userArr[y] = [];
            let dom = $('.selectNumBody___9bXff').eq(y).children();
            $(dom).children().removeClass('selectNumItemActive');
            for (let index = 1; index <= 10; index++) {
                if(x==0){
                    $(dom).eq(index-1).children().addClass('selectNumItemActive');
                    this.userArr[y].push(index);
                }else if(x==1 && index>5){
                    $(dom).eq(index-1).children().addClass('selectNumItemActive');
                    this.userArr[y].push(index);
                }else if(x==2 && index<6){
                    $(dom).eq(index-1).children().addClass('selectNumItemActive');
                    this.userArr[y].push(index);
                }else if(x==3 && index%2!=0){
                    $(dom).eq(index-1).children().addClass('selectNumItemActive');
                    this.userArr[y].push(index);
                }else if(x==4 && index%2==0){
                    $(dom).eq(index-1).children().addClass('selectNumItemActive');
                    this.userArr[y].push(index);
                }
            }
            this.selData = this.getNumber(this.userArr);
            // console.log('多选',this.userArr[0])
        },
        // 文字的单选
        radioText(e, y, x, text){
            if(!this.userArr[y]){
                this.userArr[y] = [];
            }
            switch (this.selectSwitch) {
                case 1:case 3:case 6:case 7:case 8:case 9:
                    if(this.userArr[y].indexOf(text) === -1){
                        this.userArr[y].push(text);
                        $(e.target).addClass('meStatus');
                    }else{
                        this.userArr[y].splice(this.userArr[y].indexOf(text),1);
                        $(e.target).removeClass('meStatus');
                    }
                break;
                case 2:
                    if(this.selectSecondary==0){
                        if(this.userArr[y].indexOf(text) === -1){
                            this.userArr[y].push(text);
                            if(x==0){
                                $(e.currentTarget).addClass('mered').find('div').removeClass('Ired');
                            }else if(x==1){
                                $(e.currentTarget).addClass('meblue').find('div').removeClass('Iblue');
                            }else{
                                $(e.currentTarget).addClass('megreen').find('div').removeClass('Igreen');
                            }
                        }else{
                            this.userArr[y].splice(this.userArr[y].indexOf(text),1);
                            if(x==0){
                                $(e.currentTarget).removeClass('mered').find('div').addClass('Ired');
                            }else if(x==1){
                                $(e.currentTarget).removeClass('meblue').find('div').addClass('Iblue');
                            }else{
                                $(e.currentTarget).removeClass('megreen').find('div').addClass('Igreen');
                            }
                        }
                    }else{
                        if(this.userArr[y].indexOf(text) === -1){
                            this.userArr[y].push(text);
                            $(e.target).addClass('meStatus');
                        }else{
                            this.userArr[y].splice(this.userArr[y].indexOf(text),1);
                            $(e.target).removeClass('meStatus');
                        }
                    }
                break;
            }
            this.selData = this.getNumber(this.userArr);
            // console.log('单选',this.userArr[0]);
        },
        // 数字的多选
        check(e, y, x) {
            this.userArr[y] = [];
            let dom = $('.selectNumBody___9bXff').eq(0).children();
            $('.selectNumItem___3nDoA').removeClass('meblue mered megreen');
            for (let i = 1; i < 50; i++) {
                if(x==0){
                    if(i==10 || i==41){
                        $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                    }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                        $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('mered');
                    }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                        $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                    }else{
                        $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('megreen');
                    }
                    this.userArr[y].push(i);
                }else if(x==1){
                    if(i>24){
                        if(i==10 || i==41){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('mered');
                        }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else{
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('megreen');
                        }
                        this.userArr[y].push(i);
                    }
                }else if(x==2){
                    if(i<25){
                        if(i==10 || i==41){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('mered');
                        }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else{
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('megreen');
                        }
                        this.userArr[y].push(i);
                    }
                }else if(x==3){
                    if(i%2!==0){
                        if(i==10 || i==41){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('mered');
                        }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else{
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('megreen');
                        }
                        this.userArr[y].push(i);
                    }
                }else if(x==4){
                    if(i%2==0){
                        if(i==10 || i==41){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('mered');
                        }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('meblue');
                        }else{
                            $(dom[i-1]).children('.selectNumItem___3nDoA').addClass('megreen');
                        }
                        this.userArr[y].push(i);
                    }
                }else{
                    if(i==10 || i==41){
                        $(dom).children('.selectNumItem___3nDoA').removeClass('meblue');
                    }else if(i%11 == 1 || i%11 == 2 || i%11 == 7 || i%11 == 8){
                        $(dom).children('.selectNumItem___3nDoA').removeClass('mered');
                    }else if(i%11 == 3 || i%11 == 4 || i%11 == 9){
                        $(dom).children('.selectNumItem___3nDoA').removeClass('meblue');
                    }else{
                        $(dom).children('.selectNumItem___3nDoA').removeClass('megreen');
                    }
                }
            }
            this.selData = this.getNumber(this.userArr);
            // console.log(this.userArr)
        },
        // 数字的单选
        radio(e, y, x, text) {
            if(!this.userArr[y]){
                this.userArr[y] = [];
            }
            if(this.userArr[y].indexOf(x) === -1){
                this.userArr[y].push(x);
                if (x==10 || x==41) {
                    e.target.className = 'selectNumItem___3nDoA meblue';
                } else if (x%11 == 1 || x%11 == 2 || x%11 == 7 || x%11 == 8) {
                    e.target.className = 'selectNumItem___3nDoA mered';
                } else if (x%11 == 3 || x%11 == 4 || x%11 == 9) {
                    e.target.className = 'selectNumItem___3nDoA meblue';
                } else {
                    e.target.className = 'selectNumItem___3nDoA megreen';
                }
            }else{
                this.userArr[y].splice(this.userArr[y].indexOf(x),1);
                if (x==10 || x==41) {
                    e.target.className = 'selectNumItem___3nDoA thisblue';
                } else if (x%11 == 1 || x%11 == 2 || x%11 == 7 || x%11 == 8) {
                    e.target.className = 'selectNumItem___3nDoA thisred';
                } else if (x%11 == 3 || x%11 == 4 || x%11 == 9) {
                    e.target.className = 'selectNumItem___3nDoA thisblue';
                } else {
                    e.target.className = 'selectNumItem___3nDoA thisgreen';
                }
            }
            this.selData = this.getNumber(this.userArr);
        },
        // 自选不中、连码(排列组合选法)
        radio_10:function(e, y, x, text){
            if(!this.userArr[y]){
                this.userArr[y] = [];
            }
            if(this.userArr[y].indexOf(x) === -1){
                this.userArr[y].push(x);
                if (x==10 || x==41) {
                    e.target.className = 'selectNumItem___3nDoA meblue';
                } else if (x%11 == 1 || x%11 == 2 || x%11 == 7 || x%11 == 8) {
                    e.target.className = 'selectNumItem___3nDoA mered';
                } else if (x%11 == 3 || x%11 == 4 || x%11 == 9) {
                    e.target.className = 'selectNumItem___3nDoA meblue';
                } else {
                    e.target.className = 'selectNumItem___3nDoA megreen';
                }
            }else{
                this.userArr[y].splice(this.userArr[y].indexOf(x),1);
                if (x==10 || x==41) {
                    e.target.className = 'selectNumItem___3nDoA thisblue';
                } else if (x%11 == 1 || x%11 == 2 || x%11 == 7 || x%11 == 8) {
                    e.target.className = 'selectNumItem___3nDoA thisred';
                } else if (x%11 == 3 || x%11 == 4 || x%11 == 9) {
                    e.target.className = 'selectNumItem___3nDoA thisblue';
                } else {
                    e.target.className = 'selectNumItem___3nDoA thisgreen';
                }
            }
            switch (this.SecondaryData.odd_play) {
                case 28:
                    this.selData = this.getNumber(this.userArr,5);                    
                break;
                case 29:
                    this.selData = this.getNumber(this.userArr,6);                    
                break;
                case 30:
                    this.selData = this.getNumber(this.userArr,7);                    
                break;
                case 31:
                    this.selData = this.getNumber(this.userArr,8);                    
                break;
                case 32:
                    this.selData = this.getNumber(this.userArr,9);                    
                break;
                case 33:
                    this.selData = this.getNumber(this.userArr,10);                    
                break;
                case 34:
                    this.selData = this.getNumber(this.userArr,11);                    
                break;
                case 35:
                    this.selData = this.getNumber(this.userArr,12);                    
                break;
                case 45:case 46:
                    this.selData = this.getNumber(this.userArr,3);                    
                break;
                case 47:case 48:case 49:
                    this.selData = this.getNumber(this.userArr,2);
                break;
                case 50:
                    this.selData = this.getNumber(this.userArr,4);                    
                break;
            }
        },
        // 连肖连尾(排列组合选法)
        radioText_11:function(e, y, x, text){
            if(!this.userArr[y]){
                this.userArr[y] = [];
            }
            switch (this.SecondaryData.odd_play) {
                case 36:case 37:case 38:case 39:
                    if(this.userArr[y].indexOf(text) === -1){
                        this.userArr[y].push(text);
                        $(e.target).addClass('meStatus');
                    }else{
                        this.userArr[y].splice(this.userArr[y].indexOf(text),1);
                        $(e.target).removeClass('meStatus');
                    }
                break;
            }
            switch (this.SecondaryData.odd_play) {
                case 36:
                    this.selData = this.getNumber(this.userArr,2);
                break;
                case 37:
                    this.selData = this.getNumber(this.userArr,3);
                break;
                case 38:
                    this.selData = this.getNumber(this.userArr,4);
                break;
                case 39:
                    this.selData = this.getNumber(this.userArr,5);
                break;
            }
        },
        // 购物车
        toShoppingCart:function(){
            // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率,multiple:投注倍数,cate:彩种id,name:子彩种名称
            this.readyData = {
                number:this.selData.number,
                odd_play:this.UpdatePage.play_rule[this.selectSecondary].odd_play,
                note:this.selData.note,
                money:this.TotalAmount,
                one_money:this.changeTwoDecimal_f(this.SingleAmount*this.YuanAngle),
                rate:this.selData.rate,
                multiple:null,
                odd_title:this.UpdatePage.name
            };
            this.$store.state.cateID = this.cateid;
            this.$store.commit("increment",this.readyData);
            this.$router.push({ path:'/BetBuyListPage', query:{id: this.cateid,title: this.title}});
        },
        // 获取注数
        getNumber(arr,k){
            let obj = {};
            let tem = null;
            let meArr = this.findArrs(arr);
            for(let i=0;i<meArr.length;i++){
                if(meArr[i] == "" || typeof(meArr[i]) == "undefined"){
                    meArr.splice(i,1);
                    i = i-1;
                }
            };
            tem = arr.join('|').replace(/,/g,' ');
            let num = [];
            if(this.maxormin!==null){
                for (let a = 0; a < this.UpdatePage.play_rule.length; a++) {
                    for (let b = 0; b < this.UpdatePage.play_rule[a].odds.length; b++) {
                        this.maxormin.push(this.UpdatePage.play_rule[a].odds[b].rate);
                    }
                }
            }
            // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率,multiple:投注倍数
            try {
                switch (this.SecondaryData.odd_play) {
                    case 28:case 29:case 30:case 31:case 32:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 45:case 46:case 47:case 48:case 49:case 50:
                        return obj = {
                            'note':Math.floor(this.combination(this.userArr[0].length,k)),
                            'number':tem,
                            'rate':Math.max(...this.maxormin)
                        };
                    break;
                    default:
                        return obj = {
                            'note':meArr.length,
                            'number':tem,
                            'rate':Math.max(...this.maxormin)
                        };
                    break;
                }
            } catch (error) {
                return obj = {
                    'note':meArr.length,
                    'number':tem,
                    'rate':Math.max(...this.maxormin)
                };
            }
            
            this.maxormin = [];
        },
        // 排列组合算法
        combination:function(m,n){
            return this.factorial(m,n)/this.factorial(n,n); //就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
        },
        factorial:function(m,n){
            var num = 1;
            var count = 0;
            for(var i = m;i > 0;i--){
                if(count == n){ //当循环次数等于指定的相乘个数时，即跳出for循环
                    break;
                }
                num = num * i;
                count++;
            }
            return num;
        },
        //提取字符串中最大值与最小值
        maxnumAndminnum:function(numbers) {
            numbers = numbers.split(',').map(Number)
            return Math.max.apply(0, numbers) + ' ' + Math.min.apply(0, numbers)
        },
        // 强制保留两位小数点函数
        changeTwoDecimal_f:function (x) {
            var f_x = parseFloat(x);
            if (isNaN(f_x)){
                console.log('function:changeTwoDecimal->parameter error');
                return false;
            }
            f_x = Math.round(f_x*100)/100;
            var s_x = f_x.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0){
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2){
                s_x += '0';
            }
            return Number(s_x);
        },
        // 将多维数组转换成一维数组
        findArrs:function(input){
            const stack = [...input];
            const res = [];
            while (stack.length) {
                const next = stack.pop();
                if (Array.isArray(next)) {
                    stack.push(...next);
                } else {
                    res.push(next);
                }
            }
            return res.reverse();
        },
    },
    destroyed() {
        document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
        clearInterval(this.time)
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
    width: 2.1rem;
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
.lotteryWinView___1zcag>span{
    padding-left: 0.1rem;
    font-size: 0.33rem;
}
.lotteryWinView___1zcag>span:first-child{
    padding-left: 0rem;
}
.lottery-page .content .btnContainer___2HDeL{
    height: 0.6rem;
    line-height: 0.6rem;
}
.lottery-page .content .selectNumBody___9bXff .selectMark___1Dj8V{
    margin-left: 0rem;
}
.lottery-page .content .selectNumBody___9bXff .selectNumItem___3nDoA {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0.12rem 0.16rem 0 0.16rem;
}
.lf_open_num>span{
    width: 0.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    background-color: #ccc;
    text-align: center;
    border-radius: 50%;
    font-size: 0.3rem;
    margin: 0.1rem 0.05rem 0 0.05rem;
    color: #fff;
}
.lf_open_attr>span{
    width: 0.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.26rem;
    margin: 0 0.05rem;
    color: #fff;
}
.openCode_liwai>span{
    margin: 0rem 0.05rem 0 0.05rem;
}
.scrollView___1ZMYS{
    width: 100%;
    max-height: 5rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.duoge{
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    line-height: 14px;
    height: 38px;
    padding: 0 0.1rem;
    border: 1px solid #ffc252;
    border-radius: 3px;
    font-size: 0.32rem;
}
.selectMark___1Dj8V>span{
    font-size: 0.2rem;
    color: #a0a0a0;
}
.thisred{
    color: #e4393c!important;
    border: 1px solid #e4393c!important;
}
.thisblue{
    color: #2f8fff!important;
    border: 1px solid #2f8fff!important;
}
.thisgreen{
    color: #60b630!important;
    border: 1px solid #60b630!important;
}

.mered{
    background-color: #e4393c!important;
    border: 1px solid #e4393c!important;
    color: #fff!important;
}
.meblue{
    background-color: #2f8fff!important;
    border: 1px solid #2f8fff!important;
    color: #fff!important;
}
.megreen{
    background-color: #60b630!important;
    border: 1px solid #60b630!important;
    color: #fff!important;
}
.selectNumBody{
    margin-top: 10px;
    width: 100%;
    overflow: hidden;
}
.selectMark{
    margin: 0 0.2rem 0 0.4rem;
    text-align: center;
    color: #fff;
}
.selectNumItem___2YkJu {
    width: 100%;
    font-size: 0.35rem;
    background: #fff;
    border-radius: 5px;
    border: 1px solid;
}
.colorName___1wuHo {
    padding: 5px 0;
}
.info___2v4gC {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0px 15px 8px 15px;
    text-align: start;
    font-size: 0.3rem;
    opacity: .4;
}
.numInfoItem___3CjXV {
    white-space: normal;
    padding-right: 8px;
}
.oddNum___3BeFf {
    color: #a0a0a0;
    margin: 5px 0 12px;
    font-size: 0.2rem;
}
.Ired{
    color: #e4393c;
}
.Iblue{
    color: #2f8fff;
}
.Igreen{
    color: #60b630;
}
.scrollView___1ZMYS{max-height: 2.3rem;overflow-y: auto;-webkit-overflow-scrolling: touch;}
</style>
