<template>
    <div class="lottery-page">
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
                <div class="titleContainer___foEz3" v-on:click="openMuen">
                    <div class="lotteryTitle___4KqNL" v-if="playData!=null">
                        <div>{{ playData[NavOne_index].name }}</div>
                        <span>{{ playData[NavOne_index].play_rule[NavTwoFont].title }}</span>
                    </div>
                    <div class="sanjiao___2WERR"></div>
                </div>
                <div class="am-popover-inner_masks" v-show="selectMuen">
                    <div class="am-popover-inner">
                        <div class="parentTitle___1fCnq">选择玩法</div>
                        <div class="body___1t9uH">
                            <div class="menuBody___2PhYY" v-if="playData!=null">
                                <div :class="['menuItem___2Mzkn',NavOne_index==i ? 'active' : '']" v-for="(d,i) in playData" :key="i" v-on:click="selectOneNav(d,i)">{{ d.name }}</div>
                            </div>
                        </div>
                        <div class="activeTitle___143cx" v-if="NavTwoData!=null">{{ NavTwoData[NavTwoFont].title }}</div>
                        <div class="menuBody___2PhYY">
                            <template v-for="(data,k) in NavTwoData">
                                <div :class="['menuItem___2Mzkn',NavTwo_index==d.id ? 'active' : '']" v-for="d in data.odds" v-bind:key="d.id" v-on:click="selectTwoNav(d,k)">{{ d.rule }}</div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 购彩助手 -->
            <div class="navbar am-navbar-right" style="position: relative;">
                <div v-on:click="gczs(1)">购彩助手</div>
                <div class="lottery-mask" v-show="assistant" v-on:click="gczs(0)">
                    <div class="am-popover-content">
                        <ul class="am-popover-item-ui">
                            <li @click="changePage('/gameRecord', {})">投注记录</li>
                            <li @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'ssc'})">开奖历史</li>
                            <li @click="changePage('/playRule', {id: id})">玩法说明</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主要 -->
        <div class="content">
            <div class="lotteryBetTimer___1mgMG">
                <div class="container___3PZA2">
                    <div>54125期</div>
                    <div class="lotteryWinView___1zcag">
                        <div class="flex___16JOt openCode___2oEky">
                            <div class="flex___16JOt sscItem___1-Qyy" v-for="(item, index) in 10" :key="index">
                                <div class="num___31j0E">{{item}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container___3PZA2" style="display:none">
                    <div>正在获取5412541期</div>
                    <div class="flex___16JOt lotteryWinView___1zcag">
                        <div style="margin-right: .2rem;">等待开奖...</div>
                    </div>
                </div>
                <div>
                    <div class="currentIssueId___1xhbZ">距8541234期截止</div>
                    <div class="timer___1tSLt">{{hms.hour}}:{{hms.minute}}:{{hms.second}}</div>
                </div>
            </div>
            <div class="flexContainer___3DQxK">
                <div class="container___3ub3Q" id="qiCiHeight">
                    <div class="listTitle___3ZzbJ">
                        <div class="uniqueIssueNumber___3PLvy">期次</div>
                        <div class="number___i-ryQ">开奖号码</div>
                    </div>
                    <div class="scrollView___1ZMYS">
                        <table class="table___19NyN">
                            <tr v-for="(d,index) in tenIssuesData" :key="index">
                                <td>
                                    <div class="uniqueIssueNumberTd___20CZH">{{ d.stage }}期</div>
                                </td>
                                <td>
                                    <div class="openCode___1mDSr">
                                        <div class="openCode___1mDSr">
                                            <div class="flex___16JOt sscItem___2s3g1" v-for="(sub,index) in d.number" :key="index">
                                                <div class="num____BOq0">{{ sub }}</div>
                                            </div>
                                            <div class="numInfo___1PtxZ">{{ d.detail[0] }}||{{ d.detail[1] }}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="optionContainer___3nqVi">
                        <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'ssc'})">
                            <div class="moreIcon___3fQEy"></div>
                            <span>点击查看更多开奖历史</span>
                        </div>
                    </div>
                </div>
                <div class="container___btf3a" id="tableQiCi" :style="{top: tableTop + 'px'}">
                    <div class="container___K0zBX">
                        <div class="dropIcon___3fbhG" @click="showQiCiTable"></div>
                        <div class="container1___3TtZg">
                            <div class="balance___3VTdb">余额：5555元</div>
                            <div class="returnCat">返回购物车<i class="lf_num">k</i></div>
                        </div>
                    </div>
                    <div class="betContainer___2sw-n">
                        <ul>
                            <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 10" :key="index">
                                <div class="title___3GwzV">哈哈2</div>
                                <div class="selectItemRight___3lZk3">
                                    <!-- font -->
                                    <div class="flex___16JOt btnContainer___2HDeL">
                                        <div v-for="(top, i) in 10" :key="i" class="btnItem___21_fq btnItemActive">{{ top }}</div>
                                    </div>
                                    <!-- number -->
                                    <div class="flex___16JOt selectNumBody___9bXff">
                                        <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                            <div class="selectNumItem___3nDoA selectNumItemActive">{{ btm }}</div>
                                        </div>
                                    </div>
                                    <!--  -->
                                    <div class="flex___16JOt checkContainer___2-1YR">
                                        <div class v-for="(bt, k) in 10" :key="k">
                                            <div class="checkBox___2jX8D iconChecked___1tkhj iconCheck___2HmbD"></div>
                                            {{bt}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footerContainer___qA5nn">
                <div class="theme2___13ElA undefined button___3xxsI">清空</div>
                <div class="flex___16JOt betInfoContainer___1hnNI">
                    <div class="betText___3JQwN">4545646546546</div>
                    <div>共845注<span class="totalMoney___1N9Cj">541元</span></div>
                </div>
                <div class="theme1___341L1 undefined button___3xxsI">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import LotteryLayer from "@/components/lotteryLayer.vue";
import {
    GetPersonalInfo,
    getLotteryOdds,
    getLastOneNumber,
    getNextTimeStage,
    getLastOpenNumber
} from "@/axios/api.js";
import { mapState } from "vuex";
export default {
    name: "SSC",
    data() {
        return {
            NavOne_index:0,
            NavTwo_index:1,
            NavTwoFont:0,
            playData:null, //玩法数据
            tenIssuesData:null, //近十期数据
            NavTwoData:null, //二级菜单数据
            selectMuen:false, //菜单打开关闭
            assistant:false, //购彩助手
            tableTop:0,
            hms: {
                hour: 0,
                minute: 0,
                second: 0
            },
            loginInfo:{},
            id: '',
            title: '',
        };
    },
    computed: {
        ...mapState(["BettingData"])
    },
    components: {
        LotteryLayer
    },
    destroyed() {
        document.querySelector("body").setAttribute("style", "background:#292d30 !important;");
        // clearInterval(this.time);
        // clearInterval(this.time10);
    },
    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.id = this.$route.query.id
        this.title = this.$route.query.title
        this.getPlayingData();
        this.getLastOpenNumber();
    },
    methods: {
        // 一级菜单选择
        selectOneNav:function(data,index){
            this.NavOne_index = index;
            this.NavTwoFont = 0;
            // this.NavTwo_index = data.play_rule[0].odds[0].id;
            this.NavTwoData = data.play_rule;
        },
        // 二级菜单选择
        selectTwoNav:function(data,k){
            this.NavTwoFont = k;
            this.NavTwo_index = data.id;
            this.selectMuen = false;
            console.log(data);
        },
        // show hide 期次
      showQiCiTable() {
        let qiCiHeight = $("#qiCiHeight").height()
        if (this.tableTop <= 0) {
            this.tableTop = qiCiHeight;
            $('.dropIcon___3fbhG').css('transform','rotate(180deg)');
            this.getLastOpenNumber();
        } else {
            this.tableTop = 0;
            $('.dropIcon___3fbhG').css('transform','rotate(0deg)');
        }
      },
        // 打开菜单
        openMuen:function(){
            this.selectMuen = true;
        },
        // 购彩助手
        gczs:function(a){
            if(a){
                this.assistant = true;
            }else{
                this.assistant = false;
            }
        },
        returnFn:function(){
            let me = this;
            if (this.$store.state.BettingData[0]) {
                this.$confirm("返回后将清除购物车选择的号码", "注意")
                .then(({ result }) => {
                    if (result) {
                        this.$store.state.BettingData = [];
                        me.$router.back(-1);
                    }
                });
            } else {
                me.$router.back(-1);
            }
        },
        // 获取玩法数据
        getPlayingData:function() {
            const loading = this.$loading();
            getLotteryOdds({'token': this.loginInfo.token,'uid': this.loginInfo.id,'cate': this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.playData = res.data;
                    this.NavTwoData = res.data[0].play_rule;
                    loading.close();
                } else {
                    loading.close();
                    this.$alert(res, '请求出错').then((result) => {
                        if(result){
                            this.returnFn();
                        }
                    })
                }
            })
        },
        // 获取最近10期结果
        getLastOpenNumber:function() {
            getLastOpenNumber({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.tenIssuesData = res.data
                } else {
                    console.log('请求出错:', res);
                }
            })
        },
        // 获取当前最近一期
        getLastOneNumber:function(next_stage) {
            getLastOneNumber({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id,stage: parseInt(next_stage)-1})
            .then(res => {
                if (res.ret == 200) {
                    this.lastOneData = res.data[0];
                } else {
                    console.log('请求出错:', res);
                }
                // this.getLastOpenNumber()
            })
        },
        // 获取下一期开奖时间
        getNextTimeStage:function() {
            getNextTimeStage({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.nextTimeData = res.data;
                } else {
                    console.log('请求出错:', res);
                }
            })
        },
    }
};
</script>
<style scoped lang="less">
.am-navbar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 0.9rem;
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
            background: url("../../../assets/top_bar_back.png") 50% no-repeat;
            background-size: contain;
            width: 0.64rem;
            height: 0.64rem;
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
    background: rgba(0, 0, 0, 0.75);
}

.am-popover-content {
    width: 1.84rem;
    height: auto;
    background: #fff;
    position: absolute;
    top: 0.9rem;
    right: 0.2rem;
    z-index: 201;
    color: #333;
    font-size: 0.3rem;

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
    content: "";
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
    width: 0.3rem;
    font-weight: 100;
    font-size: 0.26rem;
    margin-right: 3px;
}

.titleContainer___foEz3 {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    line-height: 38px;
    height: 38px;
    padding: 0 0.1rem;
    border: 1px solid #ffc252;
    border-radius: 3px;
    font-size: 0.32rem;
}

.sanjiao___2WERR {
    margin-left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.16rem 0.14rem 0;
    border-color: #ffc252 transparent transparent;
}

.am-popover-inner {
    width: 92%;
    height: auto;
    background: #fff;
    position: absolute;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 201;
    color: #333;

    .parentTitle___1fCnq {
        background: #fff;
        font-size: 0.36rem;
        color: #9b9b9b;
        letter-spacing: 2px;
        padding: 0.16rem 0;
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
        margin: 0 0.1rem;
    }

    .menuItem___2Mzkn {
        background: #fff;
        width: 1.72rem;
        font-size: 0.24rem;
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
    padding: 0.1rem 0;
}

.lotteryTitle___4KqNL {
    text-align: center;
    font-size: 0.3rem;
    line-height: 0.36rem;
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
    padding: 0.3rem 0;
    height: 0.4rem;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0.28rem;

    .checkBox___2jX8D {
        margin: 0 0.1rem;
        width: 0.5rem;
        height: 0.5rem;
    }

    .iconCheck___2HmbD {
        background: url(../../../assets/icon_uncheck.png) 50% no-repeat;
        background-size: contain;
        width: 0.4rem;
        height: 0.4rem;
    }

    .iconChecked___1tkhj {
        background: url(../../../assets/icon_checked.png) 50% no-repeat;
        background-size: contain;
        width: 0.4rem;
        height: 0.4rem;
    }
}
.scrollView___1ZMYS {
    max-height: 2.3rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.am-popover-inner_masks{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}
</style>

