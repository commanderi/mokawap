<template>
<!-- 北京pk10 -->
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
            <div class="titleContainer___foEz3" @click="showSelectLotteryFn">
                <template v-if="getData!==null">
                    <span>{{ selectFont==null ? getData[0].name : selectFont }}</span>
                </template>
                <div class="sanjiao___2WERR"></div>
            </div>
            <div class="am-popover-inner" v-if="isSelect">
                <div class="parentTitle___1fCnq">选择玩法</div>
                <div class="body___1t9uH">
                    <div class="menuBody___2PhYY">
                        <div :class="['menuItem___2Mzkn', selectSwitch==index ? 'active' : '']" v-for="(item, index) in getData" @click="confirmPlaying(item,index)" :key="index">{{item.name}}</div>
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
                    <li @click="changePage('/openLotteryDetails', {id: cateid, title: title, type: 'PK10'})">开奖历史</li>
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
                <div class="lotteryWinView___1zcag">
                    <div class="openCode___1mDSr">
                        <template v-for="(d,j) in lastNumber.number">
                            <img v-if="lastNumber.number[j]=='01'" src="../../../assets/pkf1.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='02'" src="../../../assets/pkf2.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='03'" src="../../../assets/pkf3.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='04'" src="../../../assets/pkf4.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='05'" src="../../../assets/pkf5.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='06'" src="../../../assets/pkf6.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='07'" src="../../../assets/pkf7.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='08'" src="../../../assets/pkf8.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='09'" src="../../../assets/pkf9.png" class="pk10State" :key="j">
                            <img v-else-if="lastNumber.number[j]=='10'" src="../../../assets/pkf10.png" class="pk10State" :key="j">
                        </template>
                    </div>
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
                                <div class="openCode___1mDSr">
                                    <template v-for="(f,j) in 10">
                                        <img v-if="d.number[j]=='01'" src="../../../assets/pkf1.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='02'" src="../../../assets/pkf2.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='03'" src="../../../assets/pkf3.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='04'" src="../../../assets/pkf4.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='05'" src="../../../assets/pkf5.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='06'" src="../../../assets/pkf6.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='07'" src="../../../assets/pkf7.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='08'" src="../../../assets/pkf8.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='09'" src="../../../assets/pkf9.png" class="pk10State" :key="j">
                                        <img v-else-if="d.number[j]=='10'" src="../../../assets/pkf10.png" class="pk10State" :key="j">
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="optionContainer___3nqVi">
                    <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: cateid, title: title, type: 'PK10'})"><div class="moreIcon___3fQEy"></div>点击查看更多开奖历史</div>
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
                <!-- 定位胆 -->
                <div class="betContainer___2sw-n" v-if="selectSwitch==0">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 10" :key="index">
                            <div class="title___3GwzV">{{ paifont[index] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 前一 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==1">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                            <div class="title___3GwzV">{{ paifont[index] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 前二 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==2">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                            <div class="title___3GwzV">{{ paifont[index] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 前三 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==3">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 3" :key="index">
                            <div class="title___3GwzV">{{ paifont[index] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 后一 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==4">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                            <div class="title___3GwzV">{{ paifont[9] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 后二 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==5">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                            <div class="title___3GwzV">{{ paifont[index+8] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)" >{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 后三 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==6">
                    <ul>
                        <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 3" :key="index">
                            <div class="title___3GwzV">{{ paifont[index+7] }}</div>
                            <div class="selectItemRight___3lZk3">
                                <div class="flex___16JOt btnContainer___2HDeL">
                                    <template v-for="(text, i) in 10">
                                        <div v-if="i<=5" class="btnItem___21_fq" v-on:click="check($event,index,i)" :key="i">{{ duoxuanfont[i] }}</div>
                                    </template>
                                </div>
                                <div class="flex___16JOt selectNumBody___9bXff">
                                    <div class="selectMark___1Dj8V" v-for="(n,j) in 10" :key="j">
                                        <div class="selectNumItem___3nDoA" v-on:click="radio($event,index,n)">{{ n<10 ? '0'+n : n }}</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 第一名、第二名、第三名、第四名、第五名、冠亚和值、冠亚和 -->
                <div class="betContainer___2sw-n" v-else-if="selectSwitch==7||selectSwitch==8||selectSwitch==9||selectSwitch==10||selectSwitch==11||selectSwitch==12||selectSwitch==13">
                    <div class="flex___16JOt textSelectContainer___3XYpJ">
                        <div class="selectTitle___1ty1e">
                            <div class="titleContent___3T3te" v-if="selectSwitch==12||selectSwitch==13">和值</div>
                            <div class="titleContent___3T3te" v-else>{{ selectFont }}</div>
                            <div class="oddContent___3XJT0">赔率</div>
                        </div>
                        <div class="flex___16JOt selectNumBody___1zxKo">
                            <div class="selectMark___2QrYY" v-for="(d,i) in UpdatePage.play_rule[0].odds" :key="i">
                                <div class="selectNumItem___1Engk" v-on:click="radio($event,0,i,d.rule)">{{ d.rule }}</div>
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
                <div class="am-modal-header"><div class="am-modal-title">注单设定</div></div>
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
                                <!-- modeItemActive -->
                                <div class="modeItem___1u_Tu" :class="YuanAngle==1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(1)">元</div>
                                <div class="modeItem___1u_Tu" :class="YuanAngle==0.1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.1)">角</div>
                                <div class="modeItem___1u_Tu" :class="YuanAngle==0.01 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.01)">分</div>
                            </div>
                        </div>
                        <div class="selectMoney">
                            <!-- modeItemActive -->
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
    name: 'BJPK10',
    data() {
        return {
            tableTop: 0,
            isAssistant: false, // is助手
            isSelect: false,
            checkvariable:null, //多选
            userArr:[], //单选
            selectFont:null, //选择的彩种的文字
            selectSwitch:0, //选择的玩法
            getData:null, //获取的数据
            thisperDta:null, //当前期数状态
            time:null, //当前期数倒计时函数
            meTime:null, //定时获取上一期开奖结果的函数
            hms:{hour:0,minute:0,second:0}, //时分秒
            NearTen:null, //近十期开奖号码
            maxormin:[], //该玩法下所有赔率
            lastNumber:{stage:0,number:0},
            UpdatePage:null, //选择的玩法，通过选择的玩法更新个小彩种的页面视图
            selData:{note:0,number:null,rate:null},
            YuanAngle:1, //元角分
            SingleAmount:2, //单注金额
            NotesNumber:0, //注数
            TotalAmount:0, //总金额
            SingleAmountArr:[10,50,100,200,500,1000,5000,10000,50000],
            duoxuanfont:['全','大','小','单','双','清'],
            paifont:['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
            readyData:{number:null,note:null,rate:null,odd_play:null,one_money:null,money:null,multiple:null,odd_title:null},
            meStatus:null,
            leftoverMoney:0, //余额
            cateid:this.$route.query.id,//彩种id
            title:this.$route.query.title,
            loginInfo:{},
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
    },
    destroyed() {
        clearInterval(this.time)
        document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.getLotteryData();
        this.getThisTime();
        this.getlast10();
        GetPersonalInfo({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
            if(res.ret==200){
                this.leftoverMoney = res.data.money;
            }
        });
        document.addEventListener("visibilitychange", function(){
            if(document.hidden){
                clearInterval(this.time);
            }else{
                this.getLotteryData();
                this.getThisTime();
                this.getlast10();
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
        // 获取具体的彩种数据
        getLotteryData:function(){
            getLotteryOdds({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.cateid}).then(res => {
                if(res.ret==200){
                    this.getData = res.data;
                    this.UpdatePage = res.data[0];//获取页面进入时的默认玩法数据
                }else{
                    console.warn('异常:',res);
                }
            })
        },
        fa:function(){
            this.SingleAmount = '';
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
                this.hms.hour = (Math.floor((c/3600)%24));
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
            $('.selectNumItem___1Engk').removeClass('meStatus');
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
        confirmPlaying(data,index) {
            // console.log('选择的玩法数据：',data)
            this.UpdatePage = data;
            this.selectFont = data.name;
            this.selectSwitch = index;
            this.isSelect = false;
            this.clearData();
        },
        
        // show hide 期次
        showQiCiTable() {
            let qiCiHeight = $("#qiCiHeight").height()
            if (this.tableTop <= 0) {
                this.tableTop = qiCiHeight;
                $('.dropIcon___3fbhG').css('transform','rotate(180deg)');
                this.getlast10();
            } else {
                this.tableTop = 0
                $('.dropIcon___3fbhG').css('transform','rotate(0deg)');
            }
        },
        // 设置投注
        setBetting:function(num){
            if(this.selData.number==''||this.selData.number==null){
                this.$alert('号码选择有误', '提示');
            }else if(this.selData.note<=0){
                this.$alert('请至少选择一注', '提示');
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
        // 多选
        check(e, y, x) {
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
            // this.checkvariable = x;
            // console.log(this.userArr)
        },
        // 单选
        radio(e, y, x, text) {
            if(!this.userArr[y]){
                this.userArr[y] = [];
            }
            switch (this.selectSwitch) {
                case 7:case 8:case 9:case 10:case 11:case 12:case 13:
                    if(this.userArr[y].indexOf(text) === -1){
                        this.userArr[y].push(text);
                        $(e.target).addClass('meStatus');
                    }else{
                        this.userArr[y].splice(this.userArr[y].indexOf(text),1);
                        $(e.target).removeClass('meStatus');
                    }
                break;
                default:
                    if(this.userArr[y].indexOf(x) === -1){
                        this.userArr[y].push(x);
                        $(e.target).addClass('selectNumItemActive');
                    }else{
                        this.userArr[y].splice(this.userArr[y].indexOf(x),1);
                        $(e.target).removeClass('selectNumItemActive');
                    }
                break;
            }
            this.selData = this.getNumber(this.userArr);
        },
        // 购物车
        toShoppingCart:function(){
            // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率,multiple:投注倍数,cate:彩种id,name:子彩种名称
            this.readyData = {
                number:this.selData.number,
                odd_play:this.UpdatePage.play_rule[0].odd_play,
                note:this.selData.note,
                money:this.TotalAmount,
                one_money:this.changeTwoDecimal_f(this.SingleAmount*this.YuanAngle),
                rate:this.selData.rate,
                multiple:null,
                odd_title:this.UpdatePage.name
            };
            this.$store.commit("increment",this.readyData);
            this.$router.push({ path:'/BetBuyListPage', query:{id:this.cateid,title:this.title}});
        },
        // 获取注数
        getNumber(arr){
            let obj = {};
            let tem = null;
            let meArr = this.findArrs(arr);
            for(let i=0;i<meArr.length;i++){
                if(meArr[i] == "" || typeof(meArr[i]) == "undefined"){
                    meArr.splice(i,1);
                    i = i-1;
                }
            };
            if(this.selectSwitch==0 && arr.length<=9){
                arr[9] = [];
            }
            tem = arr.join('|').replace(/,/g,' ');
            let num = [];
            if(this.maxormin!==null){
                for (let a = 0; a < this.UpdatePage.play_rule.length; a++) {
                    for (let b = 0; b < this.UpdatePage.play_rule[a].odds.length; b++) {
                        this.maxormin.push(this.UpdatePage.play_rule[a].odds[b].rate);
                    }
                }
            }
            if(this.UpdatePage.play_rule[0].odd_play==3 || this.UpdatePage.play_rule[0].odd_play==6){
                if(this.userArr[0]!=null||this.userArr[0]!=undefined){
                    for (let i = 0; i < this.userArr[0].length; i++) {
                        if(this.userArr[1]!=null||this.userArr[1]!=undefined){
                            for (let j = 0; j < this.userArr[1].length; j++) {
                                let dusi = this.userArr[0][i];
                                let dusj = this.userArr[1][j];
                                if(dusi!=dusj){
                                    num.push(dusi+','+dusj);
                                }
                            }
                        }
                    }
                }
                return obj = {
                    'note':num.length,
                    'number':tem,
                    'rate':Math.max(...this.maxormin)
                };
                this.maxormin = [];
                return
            }else if(this.UpdatePage.play_rule[0].odd_play==4 || this.UpdatePage.play_rule[0].odd_play==7){
                if(this.userArr[0]!=null||this.userArr[0]!=undefined){
                    for (let i = 0; i < this.userArr[0].length; i++) {
                        if(this.userArr[1]!=null||this.userArr[1]!=undefined){
                            for (let j = 0; j < this.userArr[1].length; j++) {
                                if(this.userArr[2]!=null||this.userArr[2]!=undefined){
                                    for (let k = 0; k < this.userArr[2].length; k++) {
                                        let dusi = this.userArr[0][i];
                                        let dusj = this.userArr[1][j];
                                        let dusk = this.userArr[2][k];
                                        if(dusi!=dusj && dusi!=dusk && dusj!=dusk){
                                            num.push(dusi+','+dusj+','+dusk);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return obj = {
                    'note':num.length,
                    'number':tem,
                    'rate':Math.max(...this.maxormin)
                };
                this.maxormin = [];
                return
            }
            // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率,multiple:投注倍数
            return obj = {
                'note':meArr.length,
                'number':tem,
                'rate':Math.max(...this.maxormin)
            };
            this.maxormin = [];
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
    margin: 0.12rem 0.16rem;
}
.pk10State{margin: 0.06rem 0.03rem 0.06rem 0!important;}
.scrollView___1ZMYS{max-height: 2.3rem;overflow-y: auto;overflow-x: auto;-webkit-overflow-scrolling: touch;}
</style>
