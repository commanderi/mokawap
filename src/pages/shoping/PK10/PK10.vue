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
                    <div class="lotteryTitle___4KqNL" v-if="NavOneData!=null">
                        <div>{{ NavOneData[NavOne_index].name }}</div>
                        <span>{{ NavTwoFont }}</span>
                    </div>
                    <div class="sanjiao___2WERR"></div>
                </div>
                <div class="am-popover-inner_masks" v-show="selectMuen">
                    <div class="am-popover-inner">
                        <div class="parentTitle___1fCnq">选择玩法</div>
                        <div class="body___1t9uH">
                            <div class="menuBody___2PhYY" v-if="NavOneData!=null">
                                <div :class="['menuItem___2Mzkn',NavOne_index==i ? 'active' : '']" v-for="(d,i) in NavOneData" :key="i" v-on:click="selectOneNav(d,i)">{{ d.name }}</div>
                            </div>
                        </div>
                        <div class="activeTitle___143cx" v-if="NavTwoData!=null">{{ NavTwoFont }}</div>
                        <div class="menuBody___2PhYY" v-if="NavTwoData!=null">
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
                            <li @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'pk10'})">开奖历史</li>
                            <li @click="changePage('/playRule', {id: id})">玩法说明</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主要 -->
        <div class="content">
            <div class="lotteryBetTimer___1mgMG">
                <div class="container___3PZA2" v-if="data.lastOneNumber!=null">
                    <div>{{ data.lastOneNumber.stage }}期</div>
                    <div class="lotteryWinView___1zcag">
                        <div class="flex___16JOt openCode___2oEky">
                            <div class="flex___16JOt sscItem___1-Qyy" v-for="(m, u) in data.lastOneNumber.number" :key="u">
                                <img v-if="m=='01'" src="../../../assets/pkf1.png" class="pk10State" :key="u">
                                <img v-else-if="m=='02'" src="../../../assets/pkf2.png" class="pk10State" :key="u">
                                <img v-else-if="m=='03'" src="../../../assets/pkf3.png" class="pk10State" :key="u">
                                <img v-else-if="m=='04'" src="../../../assets/pkf4.png" class="pk10State" :key="u">
                                <img v-else-if="m=='05'" src="../../../assets/pkf5.png" class="pk10State" :key="u">
                                <img v-else-if="m=='06'" src="../../../assets/pkf6.png" class="pk10State" :key="u">
                                <img v-else-if="m=='07'" src="../../../assets/pkf7.png" class="pk10State" :key="u">
                                <img v-else-if="m=='08'" src="../../../assets/pkf8.png" class="pk10State" :key="u">
                                <img v-else-if="m=='09'" src="../../../assets/pkf9.png" class="pk10State" :key="u">
                                <img v-else-if="m=='10'" src="../../../assets/pkf10.png" class="pk10State" :key="u">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container___3PZA2" v-else>
                    <div>正在获取上期开奖数据</div>
                </div>
                <div>
                    <div class="currentIssueId___1xhbZ" v-if="data.thisOpenTottery!=null">距{{ data.thisOpenTottery.next_stage }}期截止</div>
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
                            <tr v-for="(d,index) in data.lastOpenNumber" :key="index">
                                <td>
                                    <div class="uniqueIssueNumberTd___20CZH">{{ d.stage }}期</div>
                                </td>
                                <td>
                                    <div class="openCode___1mDSr">
                                        <div class="openCode___1mDSr">
                                            <div class="flex___16JOt sscItem___2s3g1" v-for="(m,u) in d.number" :key="u">
                                                <img v-if="m=='01'" src="../../../assets/pkf1.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='02'" src="../../../assets/pkf2.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='03'" src="../../../assets/pkf3.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='04'" src="../../../assets/pkf4.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='05'" src="../../../assets/pkf5.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='06'" src="../../../assets/pkf6.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='07'" src="../../../assets/pkf7.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='08'" src="../../../assets/pkf8.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='09'" src="../../../assets/pkf9.png" class="pk10State" :key="u">
                                                <img v-else-if="m=='10'" src="../../../assets/pkf10.png" class="pk10State" :key="u">
                                            </div>
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
                            <div class="balance___3VTdb">余额：{{ data.userInfo!=null ? data.userInfo.money : '0.00' }}元</div>
                            <div class="returnCat" v-show='!BettingData.length==0' @click="changePage('/BetBuyListPage', {id: id, title: title})">返回购物车<i class="lf_num">{{ BettingData.length }}</i></div>
                        </div>
                    </div>
                    <!-- 定位胆 -->
                    <div class="betContainer___2sw-n" v-if="NavOne_index==0">
                        <template v-if="NavTwo_index==91||NavTwo_index==92">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ NavTwo_index==91 ? titleArr[index] : titleArr[index+5] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 前一 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==1">
                        <template v-if="NavTwo_index==93">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 前二 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==2">
                        <template v-if="NavTwo_index==94">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==95">
                            <div class="betContainer_font">
                                <p v-for="(d,i) in tipArr" :key="i">{{ d }}</p>
                                <p class="tip_user">单注示列：01 05&nbsp;&nbsp;&nbsp;多注示列：0102 0506</p>
                                <textarea class="metextarea" cols="100" rows="8" type='number' v-model="textareaData" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-if="NavTwo_index==96">
                            <div class="lf_buttonxuan">
                                <button v-for="(num, j) in 19" :key="j" :class="[userArr[0].indexOf(num)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,num)" v-if="num>2">{{ num }}</button>
                            </div>
                        </template>
                    </div>
                    <!-- 前三 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==3">
                        <template v-if="NavTwo_index==97">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 3" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==98">
                            <div class="betContainer_font">
                                <p v-for="(d,i) in tipArr" :key="i">{{ d }}</p>
                                <p class="tip_user">单注示列：01 05 10&nbsp;&nbsp;&nbsp;多注示列：0102 0405 0708</p>
                                <textarea class="metextarea" cols="100" rows="8" type='number' v-model="textareaData" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-if="NavTwo_index==99">
                            <div class="lf_buttonxuan">
                                <button v-for="(num, j) in 27" :key="j" :class="[userArr[0].indexOf(num)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,num)" v-if="num>5">{{ num }}</button>
                            </div>
                        </template>
                    </div>
                    <!-- 前四 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==4">
                        <template v-if="NavTwo_index==100">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 4" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <div class="betContainer_font">
                                <p v-for="(d,i) in tipArr" :key="i">{{ d }}</p>
                                <p class="tip_user">单注示列：01 03 07 10&nbsp;&nbsp;&nbsp;多注示列：0102 0405 0708 0910</p>
                                <textarea class="metextarea" cols="100" rows="8" type='number' v-model="textareaData" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                    </div>
                    <!-- 前五 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==5">
                        <template v-if="NavTwo_index==102">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(num, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(num)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,num)">{{ num>9 ? num : '0'+num }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <div class="betContainer_font">
                                <p v-for="(d,i) in tipArr" :key="i">{{ d }}</p>
                                <p class="tip_user">单注示列：01 03 05 07 10<br>多注示列：0102 0405 0708 0306 0910</p>
                                <textarea class="metextarea" cols="100" rows="8" type='number' v-model="textareaData" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                    </div>
                    <!-- 大小单双、龙虎 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==6||NavOne_index==7">
                        <template v-if="NavTwo_index==104||NavTwo_index==105||NavTwo_index==106||NavTwo_index==107||NavTwo_index==108||NavTwo_index==109||NavTwo_index==110|NavTwo_index==111||NavTwo_index==112||NavTwo_index==113">
                            <div class="lf_buttonxuan">
                                <button v-for="(text, j) in ['大','小']" :key="j" :class="[userArr[0].indexOf(text)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,text)">{{ text }}</button>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index>113&&NavTwo_index<124">
                            <div class="lf_buttonxuan">
                                <button v-for="(text, j) in ['单','双']" :key="j" :class="[userArr[0].indexOf(text)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,text)">{{ text }}</button>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==124||NavTwo_index==125||NavTwo_index==126||NavTwo_index==127||NavTwo_index==128">
                            <div class="lf_buttonxuan">
                                <button v-for="(text, j) in ['龙','虎']" :key="j" :class="[userArr[0].indexOf(text)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,text)">{{ text }}</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="footerContainer___qA5nn">
                <div class="theme2___13ElA undefined button___3xxsI" v-on:click="clearUserArr">清空</div>
                <div class="flex___16JOt betInfoContainer___1hnNI">
                    <div class="betText___3JQwN">{{ bettingInfo.number }}</div>
                    <div>共{{ bettingInfo.bettingNumber }}注<span class="totalMoney___1N9Cj">{{ bettingInfo.allMoney }}元</span></div>
                </div>
                <div class="theme1___341L1 undefined button___3xxsI" v-on:click="setBettingFn">确定</div>
            </div>
        </div>
        <!-- 设置单注金额 -->
        <div class="Mask scale_0">
            <div class="am-modal-wrap">
                <div class="am-modal-content">
                    <div class="am-modal-header"><div class="am-modal-title">注单设定</div></div>
                    <div class="am-modal-body">
                        <div class="betBaseContainer">
                            <p class="betBaseContainer_p" v-if="bettingInfo.rate!=null">最高赔率：{{ bettingInfo.rate }}</p>
                            <div class="flex___16JOt moneyInfo___1K8xW">
                                <div class="jine">单注金额：</div>
                                <div class="am-list-item am-input-item am-list-item-middle moneyBase___2PFgO am-input-focus am-input-android" style="width:34%">
                                    <div class="am-list-line">
                                        <div class="am-input-control">
                                            <input type="text" class="j_Amount" v-on:input="ononeMoney($event)" v-model="oneMoney" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                                        </div>
                                    </div>
                                </div>
                                <div class="selectMode___3rpny">
                                    <!-- 切换元角分厘 -->
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(1)">元</div>
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==0.1 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.1)">角</div>
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==0.01 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.01)">分</div>
                                    <div class="modeItem___1u_Tu" :class="YuanAngle==0.001 ? 'modeItemActive' : ''" v-on:click="setYuanAngle(0.001)">厘</div>
                                </div>
                            </div>
                            <div class="selectMoney">
                                <!-- 选择单注金额 -->
                                <button v-for="(d,i) in SingleAmountArr" :key="i" :class="SingleAmount==d ? 'modeItemActive' : ''" v-on:click="selSingleAmount(d)">{{ d }}</button>
                            </div>
                            <div class="textInfo">
                                <p>注数：{{ bettingInfo.bettingNumber }}</p>
                                <p>总金额：{{ bettingInfo.allMoney }}元</p>
                                <p>单注最小金额为<span class="maxBonus">0.001</span>元</p>
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
import LotteryLayer from "@/components/lotteryLayer.vue";
import { GetPersonalInfo,getLotteryOdds,getLastOneNumber,getNextTimeStage,getLastOpenNumber} from "@/axios/api.js";
import { singleSelect,multipleSelect,getTextareaData,singleSelectChinese } from "@/assets/js/pk10.js"
import { mapState } from "vuex";
export default {
    name: "PK10",
    data() {
        return {
            NavOne_index:0,
            NavTwo_index:91,
            NavOneData:null,//默认一级菜单数据
            NavTwoData:null,//默认二级菜单数据
            NavTwoFont:'第1-5名',
            timeFn:null,
            timeFnNum:null,
            SingleAmountArr:[10,50,100,200,500,1000,5000,10000,50000],
            SingleAmount:0,
            YuanAngle:1,
            selectMuen:false, //菜单打开关闭
            assistant:false, //购彩助手
            time:null, //倒计时
            titleArr:['第一名','第二名','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
            footerArr:['全','大','小','单','双','清'],
            tipArr:['1.多注号码请用一个空格隔开','2.可复制号码粘贴到输入框'],
            userArr:[[],[],[],[],[]],
            userArrChinese:[[],[]],
            userArrLen:0,
            tableTop:0,
            textareaData:null, //单式
            id: '',
            title: '',
            loginInfo:{},
            oneMoney:2,//可操作单注金额
            DesignationArr:[
                {'num':null},
                {'num':null},
                {'num':null},
                {'num':null},
                {'num':null},
            ],
            // 投注信息
            bettingInfo:{
                number:'',
                allMoney:0, //总金额
                singleMoney:2, //单注金额
                bettingNumber:0, //注数
                setMultipleNumber:1, //投注倍数
                rate:null, //默认赔率
                odd_play:null, //默认玩法
            },
            // 获取的数据
            data:{
                lastOpenNumber:null, //近十期开奖号码数据
                thisOpenTottery:null, //当前期数数据
                lastOneNumber:null, //上一期开奖号码数据
                userInfo:null //用户数据
            },
            // 倒计时时分秒
            hms:{
                hour:0,
                minute:0,
                second:0,
            },
        };
    },
    computed: {
        ...mapState(["BettingData"])
    },
    watch:{
        id(){
            clearInterval(this.timeFn);
            clearInterval(this.time);
            this.timeFn = null;
            this.time = null;
        }
    },
    components: {
        LotteryLayer
    },
    destroyed() {
        document.querySelector("body").setAttribute("style", "background:#292d30 !important;");
        clearInterval(this.timeFn);
        clearInterval(this.time);
        this.timeFn = null;
        this.time = null;
    },
    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.id = this.$route.query.id;
        this.title = this.$route.query.title;
        switch (Number(this.$route.query.id)) {
            case 3:
                this.timeFnNum = 20000;
            break;
            default:
                this.timeFnNum = 10000;
            break;
        }
        GetPersonalInfo({'token': this.loginInfo.token,'uid': this.loginInfo.id})
            .then(res => {
                if (res.ret == 200) {
                    this.data.userInfo = res.data;
                } else {
                    this.$alert('获取余额出错');
                }
            })
        this.getPlayingData(); //获取玩法数据
        this.getLastOpenNumber(); //获取近十期开奖结果
        this.getNextTimeStage(); //获取结束投注时间
    },
    methods: {
        // 一级菜单选择
        selectOneNav:function(data,index){
            this.NavOne_index = index;
            this.NavTwoData = data.play_rule;
            this.clearUserArr();
        },
        // 二级菜单选择
        selectTwoNav:function(data,k){
            this.NavTwoFullData = data;
            this.NavTwoFont = data.rule;
            this.NavTwo_index = data.id;
            this.bettingInfo.rate = data.rate;
            this.selectMuen = false;
            this.bettingInfo.odd_play = data.odd_play;
            this.clearUserArr();
            console.log(data.id);
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
        ononeMoney:function(e){
            this.bettingInfo.singleMoney = this.oneMoney*this.YuanAngle;
            this.bettingInfo.allMoney = (this.bettingInfo.bettingNumber*this.oneMoney)*this.YuanAngle;
        },
        setBetting:function(){
            $('.Mask').removeClass('scale_1');
        },
        setBettingFn:function(){
            if(this.bettingInfo.bettingNumber<1){
                this.$alert("请至少选择一注投注号码", "提示")
            }else{
                $('.Mask').addClass('scale_1');
            }
        },
        selSingleAmount:function(d){
            this.oneMoney = d;
            this.setYuanAngle(1);
        },
        // 切换圆角分厘
        setYuanAngle:function(index){
            const singleMoney = this.oneMoney;
            this.YuanAngle = index;
            this.bettingInfo.singleMoney = singleMoney*index;
            this.bettingInfo.allMoney = (this.bettingInfo.singleMoney*this.bettingInfo.bettingNumber)*this.bettingInfo.setMultipleNumber;
        },
        // 打开菜单
        openMuen:function(){
            this.selectMuen = true;
        },
        // 购彩助手
        gczs:function(a){
            a ? this.assistant=true : this.assistant=false;
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
        textareaDataFn:function(){
            getTextareaData(this);
        },
        // 单选
        singleSelectFn:function(e,y,x){
            switch (this.NavTwo_index) {
                // 玩法是汉字的情况
                case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:
                case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:case 123:
                case 124:case 125:case 126:case 127:case 128:
                    singleSelectChinese(e,y,x,this.$data);
                break;
                default:
                    singleSelect(e,y,x,this.$data);
                break;
            }
        },
        // 多选
        multipleSelectFn(e,y,x){
            switch (this.NavTwo_index) {
                // 玩法是汉字的情况
                case 6:
                    this.clearUserArr();
                    this.userArrChinese = [[],[]];
                break;
                default:
                    multipleSelect(e,y,x,this.$data);
                break;
            }
        },
        // 跳转购物车
        toShoppingCart:function(){
            if(this.oneMoney<0.001){
                this.$alert('单笔最小投注金额必须大于0.001','提示')
            }else{
                let list = {
                    number:this.bettingInfo.number,
                    odd_play:this.bettingInfo.odd_play,
                    odd_id:this.NavTwo_index,
                    note:this.bettingInfo.bettingNumber,
                    money:this.bettingInfo.allMoney,
                    one_money:this.bettingInfo.singleMoney,
                    rate:this.bettingInfo.rate,
                    multiple:this.bettingInfo.setMultipleNumber,
                    odd_title:this.NavOneData[this.NavOne_index].name+'-'+this.NavTwoFont,
                };
                this.$store.commit("increment",list);
                this.$router.push({ path:'/BetBuyListPage', query:{id:this.id,title:this.title}});
            }
        },
        // 清除选择的投注数据
        clearUserArr:function(){
            this.userArr = [[],[],[],[],[]];
            this.userArrChinese = [[],[]];
            this.bettingInfo.number = '';
            this.bettingInfo.allMoney = 0;
            this.textareaData = null;
            this.bettingInfo.bettingNumber = 0;
            for (let i = 0; i < 5; i++) {
                this.DesignationArr[i].num = null;
            }
        },
        // 获取玩法数据
        getPlayingData:function() {
            // const loading = this.$loading();
            getLotteryOdds({'token': this.loginInfo.token,'uid': this.loginInfo.id,'cate': this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.NavOneData = res.data;
                    this.NavTwoData = res.data[0].play_rule;
                    this.bettingInfo.rate = res.data[0].play_rule[0].odds[0].rate;
                    this.bettingInfo.odd_play = res.data[0].play_rule[0].odds[0].odd_play;
                } else {
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
            const loading = this.$loading();
            getLastOpenNumber({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.data.lastOpenNumber = res.data;
                    loading.close();
                } else {
                    loading.close();
                    this.$alert(res.msg);
                }
            })
        },
        // 获取结束投注时间
        getNextTimeStage:function() {
            clearInterval(this.time);
            getNextTimeStage({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    this.data.thisOpenTottery = res.data;
                    this.thisTermTime();
                    this.getLastOneNumber();
                } else {
                    this.$alert(res.msg);
                }
            })
        },
        // 获取上一期开奖结果
        getLastOneNumber:function() {
            this.data.lastOneNumber = null;
            this.timeFn = setInterval(() => {
                if(this.data.lastOneNumber!=null){
                    clearInterval(this.timeFn);
                }else{
                    getLastOneNumber({token: this.loginInfo.token,uid: this.loginInfo.id,cate: this.$route.query.id,stage: parseInt(this.data.thisOpenTottery.next_stage)-1})
                    .then(res => {
                        if (res.ret == 200) {
                            this.data.lastOneNumber = res.data[0];
                        } else {
                            this.data.lastOneNumber = null;
                        }
                    })
                }
            }, this.timeFnNum);
        },
        // 当前期数倒计时
        thisTermTime:function(){
            let c = this.data.thisOpenTottery.open_time;
            this.time = setInterval(() => {
                this.hms.hour = Math.floor(c/3600)%24;
                this.hms.minute = Math.floor(c/60)%60;
                this.hms.second = Math.floor(c%60);
                if(this.hms.hour<10){this.hms.hour = '0'+this.hms.hour}
                if(this.hms.minute<10){this.hms.minute = '0'+this.hms.minute}
                if(this.hms.second<10){this.hms.second = '0'+this.hms.second}
                c--;
                // console.log(this.hms.hour,this.hms.minute,this.hms.second)
                if(c<1){
                    clearInterval(this.time);
                    clearInterval(this.timeFn);
                    this.getNextTimeStage();
                }
            }, 1000);
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
    // padding: 0.3rem 0;
    height: 0.4rem;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    // align-items: center;
    font-size: 0.28rem;

    .checkBox___2jX8D {
        margin: 0 0.1rem;
        width: 0.5rem;
        height: 0.5rem;
    }

    .iconCheck___2HmbD {
        background: url(../../../assets/icon_uncheck.png) 50% no-repeat;
        background-size: contain;
        // width: 0.4rem;
        // height: 0.4rem;
    }

    .iconChecked___1tkhj {
        background: url(../../../assets/icon_checked.png) 50% no-repeat;
        background-size: contain;
        // width: 0.4rem;
        // height: 0.4rem;
    }
}
.checkBox_span{
    color: #a09e9e;
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
.pk10State{
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.03rem;
}
</style>

