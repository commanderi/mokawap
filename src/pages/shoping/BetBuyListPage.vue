<template>
<!-- 购物车 -->
    <div class="BetBuyListPage">
        <!-- header -->
        <div class="am-navbar am-navbar-dark">
            <div class="navbar am-navbar-left" role="button">
                <span class="am-navbar-left-icon" aria-hidden="true">
                    <div class="iconBack" @click="returnFn()"></div>
                </span>
            </div>
            <div class="navbar am-navbar-title">
                <div class="menuTitle___3jHiP">{{ this.$route.query.title }}</div>
            </div>
            <div class="navbar am-navbar-right">
                <div class="" v-on:click="clearList">清空列表</div>
            </div>
        </div>
        <!-- 主要内容 -->
        <div class="content">
            <div class="lotteryBetTimer">
                <div class="flex___16JOt carTopContainer___3jVtM">
                    <div><div class="currentIssueId___1xhbZ" v-if="thisperDta!==null">距{{ thisperDta.next_stage }}期截止</div><div class="timer___1tSLt">{{ hms.hour }}:{{ hms.minute }}:{{ hms.second }}</div></div>
                    <div class="flex___16JOt balanceContainer___2hZR6"><div>你的余额</div><div class="money___1ePqq"><span>{{ leftoverMoney }}元</span><div class="iconRefresh___1zlW0"></div></div></div>
                </div>
                <div class="betList___3egKT">
                    <div class="betListHeader___2RBLY"></div>
                    <div class="betListBody___23Ahq">
                        <div class="flex___16JOt betItem___oDlG_" v-for="(d,i) in BettingData" :key="i">
                            <div class="selectContainer___2dD7r">
                                <div class="selectNoText___2Qney">{{ d.number }}</div>
                                <div class="selectTotalText___14JWU">{{ d.odd_title }} {{ d.note }}注 {{ d.one_money }}元 × {{ multiple }}倍</div>
                            </div>
                            <div class="iconRemove___3CKmq" v-on:click="clearListMe(i)"></div>
                        </div>
                        <!-- 底部锯齿背景 -->
                        <div class="betListFooter___SznUY"></div>
                    </div>
                </div>
                <div class="goNumContainer">
                    <button class="zengjian" v-on:click="multipleFn(1)">－</button>
                    <label>投</label>
                    <input type="text" v-model="multiple" disabled>
                    <label>倍</label>
                    <button class="zengjian" v-on:click="multipleFn(2)">＋</button>
                </div>
            </div>
        </div>
        <!-- footer -->
        <div class="footerContainer">
            <div class="theme2___13ElA undefined button___3xxsI">清空</div>
            <div class="flex___16JOt betInfoContainer___1NCFx">
                <div v-if="allnote!==null || allmoney!==null">{{ allnote }}注 &nbsp;&nbsp; 共{{ allmoney }}元</div>
                <div v-else>0注 &nbsp;&nbsp; 共0元</div>
            </div>
            <div class="theme1___341L1 undefined button___3xxsI" v-on:click="paying">付款</div>
        </div>
    </div>
</template>
<script>
import { getNextTimeStage } from '@/axios/api.js'
import { GetPersonalInfo } from '@/axios/api.js'
import { postbetting } from '@/axios/api.js'
import { mapState } from 'vuex'
export default {
    name: 'BetBuyListPage',
    data() {
        return {
            thisperDta:null,
            hms:{hour:0,minute:0,second:0}, //时分秒
            time:null, //当前期数倒计时函数
            allnote:null, //总注数
            allmoney:null, //总金额
            temmoney:null,
            multiple:1,
            leftoverMoney:0, //余额
            loginInfo:{},
        }
    },
    destroyed() {
        document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
        this.getThisTime();
        for (let i = 0; i < this.BettingData.length; i++) {
            this.temmoney = this.temmoney+this.BettingData[i].money;
            this.allnote = this.allnote+this.BettingData[i].note;
        }
        this.allmoney = this.temmoney;
        GetPersonalInfo({'token':this.loginInfo.token,'uid':this.loginInfo.id}).then(res =>{
            if(res.ret==200){
                this.leftoverMoney = res.data.money;
            }
        })
        this.allmoney = 0;
        // 计算中间的高度 实现自适应
        this.CalculeteHeight();
        for (let i = 0; i < this.BettingData.length; i++) {
            this.BettingData[i].money = (this.BettingData[i].one_money*this.BettingData[i].note)*this.multiple;
            this.allmoney += ((this.BettingData[i].one_money*this.BettingData[i].note)*this.multiple);
        }
    },
    watch:{
        BettingData(){
            if(this.BettingData.length<=0){
                this.allmoney = null;
            }
        },
        // multiple(val){
        //     if(val==null||val==''){
        //         this.multiple = 1;
        //     }
        //     this.allmoney = val*this.temmoney;
        // }
    },
    computed:{
        ...mapState(["BettingData"])
    },
    methods: {
        CalculeteHeight(){
            let otherHeightAdd = $('.flex___16JOt.carTopContainer___3jVtM').outerHeight()+$('.goNumContainer').outerHeight()+$('.flex___16JOt.betInfoContainer___1NCFx').outerHeight()+$('.am-navbar.am-navbar-dark').outerHeight()
            let betListHeight = $(window).height() - otherHeightAdd;
            $('.betList___3egKT').height(betListHeight);
        },
        // 获取当前彩票的倒计时时间
        getThisTime:function(){
            if(!this.BettingData[0]){
                this.$alert('没有投注号码,请重新选择', '注意');
            }else{
                getNextTimeStage({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.$route.query.id}).then(res => {
                    if(res.ret==200){
                        this.thisperDta = res.data;
                        clearInterval(this.time);
                        this.thisTermTime();
                    }else{
                        console.warn('异常:',res);
                    }
                });
            }
            
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
                c--;
                if(c<1){
                    clearInterval(this.time);
                    this.$alert('第'+this.thisperDta.next_stage+'期投注已截止,投注时请注意期号变化', '注意');
                    this.getThisTime();
                }
            }, 1000);
        },
        returnFn() {
            this.$router.back(-1);
        },
        // 清空列表
        clearList:function(){
            this.$store.state.BettingData = [];
            this.allmoney = null;
            this.allnote = null;
            this.temmoney = null;
            for (let i = 0; i < this.BettingData.length; i++) {
                this.temmoney = this.temmoney+this.BettingData[i].money;
                this.allnote = this.allnote+this.BettingData[i].note;
            }
            this.allmoney = this.temmoney;
        },
        // 倍数加减
        multipleFn:function(n){
            if(n==1){
                if(this.multiple<=1){
                    return
                }else{
                    this.multiple--;
                }
            }else{
                this.multiple++;
            }
            this.allmoney = 0;
            for (let i = 0; i < this.BettingData.length; i++) {
                this.BettingData[i].money = (this.BettingData[i].one_money*this.BettingData[i].note)*this.multiple;
                this.allmoney += ((this.BettingData[i].one_money*this.BettingData[i].note)*this.multiple);
            }

        },
        // 删除某一项
        clearListMe:function(i){
            this.$store.state.BettingData.splice(i,1);
            this.allmoney = null;
            this.allnote = null;
            this.temmoney = null;
            for (let i = 0; i < this.BettingData.length; i++) {
                this.temmoney = this.temmoney+this.BettingData[i].money;
                this.allnote = this.allnote+this.BettingData[i].note;
            }
            this.allmoney = this.temmoney;
        },
        // 付款
        paying:function(){
            if(this.BettingData.length<1){
                this.$alert('没有号码,无法完成投注', '提示').then((result) => {});
            }else{
                for (let i = 0; i < this.BettingData.length; i++) {
                    this.BettingData[i].multiple = this.multiple;
                    if(this.BettingData[i].one_money<0.01||this.BettingData[i].one_money<'0.01'){
                        this.$alert('单注金额最小为0.01元', '提示');
                        return
                    }
                }
                const loading = this.$loading();
                postbetting({'token':this.loginInfo.token,'uid':this.loginInfo.id,'cate':this.$route.query.id,'list':JSON.stringify(this.BettingData)}).then(res => {
                    if(res.ret==200){
                        loading.close();
                        this.$alert(res.msg, '提示').then((result) => {
                            if(result){
                                this.clearList();
                                setTimeout(() => {
                                    this.returnFn();
                                }, 500);
                            }
                        });
                    }else{
                        loading.close();
                        this.$alert(res.msg, '提示');
                    }
                });
            }
        },
    },
    destroyed() {
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
.lotteryBetTimer{
    width: 100%;
    height: auto;
    margin-top: 0.9rem;

}
.footerContainer{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #000;
}
.theme2___13ElA {
    background: #000;
}
.theme1___341L1 {
    background: #d48f08;
}
.button___3xxsI {
    color: #000;
    font-size: 0.3rem;
    font-weight: 700;
    width: 1.3rem;
    height: 0.65rem;
    margin: 0.3rem 0.1rem;
    border-radius: 6px;
    line-height: 0.65rem;
}
.flex___16JOt {
    display: -ms-flexbox;
    display: flex;
}
.betInfoContainer___1NCFx {
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex: 1 1;
    flex: 1 1;
    color: #fff;
    font-size:0.2rem;
    overflow: hidden;
}
.totalMoney___rMpNg {
    font-size: 0.2rem;
    color: #eeee03;
}
.betText___RxLqk {
    text-align: center;
    width: 100%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content {
    position: relative;
    -ms-flex: 1 1;
    flex: 1 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    will-change: scroll-position;
}

.carTopContainer___3jVtM {
    padding: 0.2rem 0.1rem;
    font-size: 0.3rem;
    -ms-flex-pack: justify;
    justify-content: space-between;
    overflow: hidden;
    background: #fff;
}
.currentIssueId___1xhbZ {
    color: #333;
    text-align: right;
    white-space: nowrap;
}
.timer___1tSLt {
    clear: both;
    white-space: nowrap;
    margin-top: 0.08rem;
    font-size: 0.3rem;
    font-weight: 700;
    color: #d91d37;
    text-align: center;
}
.balanceContainer___2hZR6 {
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0.3rem;
}
.money___1ePqq {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0.05rem;
    font-size: 0.3rem;
}
.balanceContainer___2hZR6 span {
    color: #d91d37;
}
.iconRefresh___1zlW0 {
    background: url(../../assets/refresh.png) 50% no-repeat;
    background-size: contain;
    margin-left: 0.1rem;
    width: 0.35rem;
    height: 0.35rem;
}
.betList___3egKT {
    position: relative;
    width: 90%;
    // height: 65.5vh;
    height: 8.66rem;
    margin: 0px 5%;
}

.betListHeader___2RBLY {
    position: absolute;
    height: 7px;
    width: 100%;
    top: 0.2rem;
    background: url(../../assets/order_top.png) 50% no-repeat;
    background-size: contain;
}

.betListBody___23Ahq {
    position: absolute;
    height: 5rem;
    overflow: auto;
    width: 100%;
    top: 15px;
}
.betItem___oDlG_ {
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 6px;
    padding: 0.2rem 0 0.2rem 0.2rem;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
}
.betListFooter___SznUY {
    background: url(../../assets/order_bottom.png) 50% no-repeat;
    background-size: contain;
    height: 9px;
    margin: -2px 6px 0 6px;
}
.selectContainer___2dD7r {
    -ms-flex: 1 1;
    flex: 1 1;
    margin-right: .1rem;
}
.selectNoText___2Qney {
    margin-bottom: 5px;
    font-size: 0.4rem;
    font-weight: 700;
    color: #d91d37;
    text-align: left;
}
.selectTotalText___14JWU {
    color: #999;
    font-size: 0.3rem;
    text-align: left;
}
.iconRemove___3CKmq {
    margin-right: 0.4rem;
    background: url(../../assets/icon_qingchu.png) 50% no-repeat;
    background-size: contain;
    width: 0.6rem;
    height: 0.6rem;
}
.goNumContainer{
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 0.2rem 0;
    display: flex;
    justify-content:center;
    align-items: center;
}
.goNumContainer>input{
    width: 25%;
    text-align: center;
    margin: 0 0.1rem;
    height: 0.7rem;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    font-size: 0.35rem;
}
.goNumContainer>label{
    font-size: 0.35rem;
    color: #333;
}
.betInfoContainer___1NCFx>div{
    font-size: 0.35rem;
}
.zengjian{
    width: 0.65rem;
    height: 0.65rem;
    min-width: 0.65rem;
    min-height: 0.65rem;
    border: 0px solid #ccc;
    font-size: 0.4rem;
    text-align: center;
    background-color: #d48f08;
    border-radius: 4px;
    color: #fff;
    display: flex;
    justify-content:center;
}
.zengjian:nth-of-type(1){
    margin-right: 0.15rem;
}
.zengjian:nth-of-type(2){
    margin-left: 0.15rem;
}
</style>


