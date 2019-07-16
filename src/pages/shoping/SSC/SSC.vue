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
                            <li @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'SSC'})">开奖历史</li>
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
                            <div class="flex___16JOt sscItem___1-Qyy" v-for="(item, index) in data.lastOneNumber.number" :key="index">
                                <div class="num___31j0E">{{item}}</div>
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
                        <div class="moreBtn___3O84Q" @click="changePage('/openLotteryDetails', {id: id, title: title, type: 'SSC'})">
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
                    <!-- 五星 -->
                    <div class="betContainer___2sw-n" v-if="NavOne_index==0">
                        <template v-if="NavTwo_index==1">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==2">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" v-model="textareaData" placeholder="示列:01234 12345" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==3||NavTwo_index==4||NavTwo_index==5">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">选号</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==6">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">和值</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in ['大','小','单','双']" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ btm }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==7">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">选号</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==8||NavTwo_index==9||NavTwo_index==10||NavTwo_index==11||NavTwo_index==12">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                                    <div class="title___3GwzV" v-if="NavTwo_index==10">{{ item==1 ? '三重号' : '单号' }}</div>
                                    <div class="title___3GwzV" v-else-if="NavTwo_index==11">{{ item==1 ? '三重号' : '二重号' }}</div>
                                    <div class="title___3GwzV" v-else-if="NavTwo_index==12">{{ item==1 ? '四重号' : '单　号' }}</div>
                                    <div class="title___3GwzV" v-else>{{ item==1 ? '二重号' : '单号' }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 四星 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==1">
                        <template v-if="NavTwo_index==13||NavTwo_index==19">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 4" :key="index">
                                    <div class="title___3GwzV">{{ NavTwo_index==13 ? titleArr[index+1] : titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==14||NavTwo_index==20">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" v-model="textareaData" placeholder="示列:0124 1234" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==15||NavTwo_index==17||NavTwo_index==21||NavTwo_index==23">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV" v-if="NavTwo_index==15||NavTwo_index==21">选号</div>
                                    <div class="title___3GwzV" v-else-if="NavTwo_index==17||NavTwo_index==23">二重号</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==16||NavTwo_index==18||NavTwo_index==22||NavTwo_index==24">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                                    <div class="title___3GwzV" v-if="NavTwo_index==18||NavTwo_index==24">{{ item==1 ? '三重号' : '单号' }}</div>
                                    <div class="title___3GwzV" v-else-if="NavTwo_index==16||NavTwo_index==22">{{ item==1 ? '二重号' : '单号' }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 后三、中三、前三 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==2||NavOne_index==3||NavOne_index==4">
                        <template v-if="NavTwo_index==25||NavTwo_index==31||NavTwo_index==37">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 3" :key="index">
                                    <div class="title___3GwzV">{{ NavTwo_index==25 ? titleArr[index+2] : (NavTwo_index==37 ? titleArr[index] : titleArr[index+1]) }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==26||NavTwo_index==30||NavTwo_index==32||NavTwo_index==36||NavTwo_index==38||NavTwo_index==42">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" v-model="textareaData" placeholder="示列:012 123" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==27||NavTwo_index==33||NavTwo_index==39">
                            <div class="lf_buttonxuan">
                                <button v-for="(btm, j) in 28" :key="j" :class="[userArr[0].indexOf(j)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,j)">{{ j }}</button>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==28||NavTwo_index==29||NavTwo_index==34||NavTwo_index==35||NavTwo_index==40||NavTwo_index==41">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">{{ NavTwo_index==28||NavTwo_index==34||NavTwo_index==40 ? '组三' : '组六' }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 后二、前二 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==5||NavOne_index==6">
                        <template v-if="NavTwo_index==43||NavTwo_index==49">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                                    <div class="title___3GwzV">{{ NavTwo_index==43 ? titleArr[index+3] : titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==44||NavTwo_index==50||NavTwo_index==48||NavTwo_index==54">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" v-model="textareaData" placeholder="示列:01 12" v-on:input="textareaDataFn"></textarea>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==45||NavTwo_index==51">
                            <div class="lf_buttonxuan">
                                <button v-for="(btm, j) in 19" :key="j" :class="[userArr[0].indexOf(j)>-1 ? 'selectNumItem_button' : '']" v-on:click="singleSelectFn($event,0,j)">{{ j }}</button>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==47||NavTwo_index==53">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">组选</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==46||NavTwo_index==52">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 2" :key="index">
                                    <div class="title___3GwzV">和值</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in ['大','小','单','双']" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ btm }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 定位胆 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==7">
                        <template>
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 不订胆 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==8">
                        <template>
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">不定胆</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- 任二 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==9">
                        <template v-if="NavTwo_index==62">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==63">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" type='tel' v-model="textareaData" placeholder="示列:01 12" v-on:input="textareaDataFn"></textarea>
                            </div>
                            <div class="flex___16JOt checkContainer___2-1YR" v-if="NavTwo_index==63||NavTwo_index==64||NavTwo_index==66||NavTwo_index==67||NavTwo_index==68||NavTwo_index==69||NavTwo_index==71">
                                <div class v-for="(bt, k) in titleArr" :key="k" v-on:click="selectClassFn($event,k)">
                                    <div :class="['checkBox___2jX8D',rxArr.indexOf(k)===-1 ? 'iconCheck___2HmbD' : 'iconChecked___1tkhj']"></div>
                                    <span class="checkBox_span">{{bt}}</span>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==64">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">号码</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="flex___16JOt checkContainer___2-1YR">
                                <div class v-for="(bt, k) in titleArr" :key="k" v-on:click="selectClassFn($event,k)">
                                    <div :class="['checkBox___2jX8D',rxArr.indexOf(k)===-1 ? 'iconCheck___2HmbD' : 'iconChecked___1tkhj']"></div>
                                    <span class="checkBox_span">{{bt}}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- 任三 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==10">
                        <template v-if="NavTwo_index==65">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="NavTwo_index==66||NavTwo_index==69">
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" type='tel' v-model="textareaData" placeholder="示列:012 123" v-on:input="textareaDataFn"></textarea>
                            </div>
                            <div class="flex___16JOt checkContainer___2-1YR" v-if="NavTwo_index==63||NavTwo_index==64||NavTwo_index==66||NavTwo_index==67||NavTwo_index==68||NavTwo_index==69||NavTwo_index==71">
                                <div class v-for="(bt, k) in titleArr" :key="k" v-on:click="selectClassFn($event,k)">
                                    <div :class="['checkBox___2jX8D',rxArr.indexOf(k)===-1 ? 'iconCheck___2HmbD' : 'iconChecked___1tkhj']"></div>
                                    <span class="checkBox_span">{{bt}}</span>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="NavTwo_index==67||NavTwo_index==68">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                    <div class="title___3GwzV">号码</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="flex___16JOt checkContainer___2-1YR">
                                <div class v-for="(bt, k) in titleArr" :key="k" v-on:click="selectClassFn($event,k)">
                                    <div :class="['checkBox___2jX8D',rxArr.indexOf(k)===-1 ? 'iconCheck___2HmbD' : 'iconChecked___1tkhj']"></div>
                                    <span class="checkBox_span">{{bt}}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- 任四 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==11">
                        <template v-if="NavTwo_index==70">
                            <ul>
                                <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 5" :key="index">
                                    <div class="title___3GwzV">{{ titleArr[index] }}</div>
                                    <div class="selectItemRight___3lZk3">
                                        <div class="flex___16JOt btnContainer___2HDeL">
                                            <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                        </div>
                                        <div class="flex___16JOt selectNumBody___9bXff">
                                            <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                                <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                            <div class="betContainer_font">
                                <p>{{ tipArr[0] }}</p>
                                <p>{{ tipArr[1] }}</p>
                                <textarea class="metextarea" cols="100" rows="8" type='tel' v-model="textareaData" placeholder="示列:0123 1234" v-on:input="textareaDataFn"></textarea>
                            </div>
                            <div class="flex___16JOt checkContainer___2-1YR" v-if="NavTwo_index==63||NavTwo_index==64||NavTwo_index==66||NavTwo_index==67||NavTwo_index==68||NavTwo_index==69||NavTwo_index==71">
                                <div class v-for="(bt, k) in titleArr" :key="k" v-on:click="selectClassFn($event,k)">
                                    <div :class="['checkBox___2jX8D',rxArr.indexOf(k)===-1 ? 'iconCheck___2HmbD' : 'iconChecked___1tkhj']"></div>
                                    <span class="checkBox_span">{{bt}}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- 趣味 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==12">
                        <ul>
                            <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                <div class="title___3GwzV">选号</div>
                                <div class="selectItemRight___3lZk3">
                                    <div class="flex___16JOt btnContainer___2HDeL">
                                        <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                    </div>
                                    <div class="flex___16JOt selectNumBody___9bXff">
                                        <div class="selectMark___1Dj8V" v-for="(btm, j) in 10" :key="j">
                                            <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ j }}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 龙虎 -->
                    <div class="betContainer___2sw-n" v-else-if="NavOne_index==13">
                        <ul>
                            <li class="flex___16JOt numContainer___K07vd" v-for="(item, index) in 1" :key="index">
                                <div class="title___3GwzV">龙虎</div>
                                <div class="selectItemRight___3lZk3">
                                    <div class="flex___16JOt btnContainer___2HDeL">
                                        <div v-for="(top, i) in footerArr" :key="i" :class="['btnItem___21_fq',DesignationArr[index].num==i ? 'btnItemActive' : '']" v-on:click="multipleSelectFn($event,index,i)">{{ top }}</div>
                                    </div>
                                    <div class="flex___16JOt selectNumBody___9bXff">
                                        <div class="selectMark___1Dj8V" v-for="(btm, j) in ['龙','虎','和']" :key="j">
                                            <div :class="['selectNumItem___3nDoA',userArr[index].indexOf(j)>-1 ? 'selectNumItemActive' : '']" v-on:click="singleSelectFn($event,index,j)">{{ btm }}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
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
import { singleSelect,multipleSelect,getTextareaData,singleSelectChinese,selectClass } from "@/assets/js/ssc.js"
import { mapState } from "vuex";
export default {
    name: "SSC",
    data() {
        return {
            NavOne_index:0,
            NavTwo_index:1,
            NavOneData:null,//默认一级菜单数据
            NavTwoData:null,//默认二级菜单数据
            NavTwoFont:'复式',
            timeFn:null,
            timeFnNum:5,
            SingleAmountArr:[10,50,100,200,500,1000,5000,10000,50000],
            SingleAmount:0,
            YuanAngle:1,
            selectMuen:false, //菜单打开关闭
            assistant:false, //购彩助手
            time:null, //倒计时
            titleArr:['万位','千位','百位','十位','个位'],
            footerArr:['全','大','小','单','双','清'],
            tipArr:['1.多注号码请用一个空格隔开','2.可复制号码粘贴到输入框'],
            userArr:[[],[],[],[],[]],
            userArrChinese:[[],[]],
            rxArr:[], //任选
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
            case 5:case 11:case 12:case 14: //二十分钟一期
                this.timeFnNum = 20000;
            break;
            case 9:case 17: //十分钟一期
                this.timeFnNum = 15000;
            break;
            case 8:case 16:case 15: //五分钟一期
                this.timeFnNum = 10000;
            break;
            default: //小于分钟一期
                this.timeFnNum = 5000;
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
                case 6:case 46:case 52:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:
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
                case 6:case 46:case 52:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:
                    this.clearUserArr();
                    this.userArrChinese = [[],[]];
                break;
                default:
                    multipleSelect(e,y,x,this.$data);
                break;
            }
        },
        // 任选234
        selectClassFn:function(e,index){
            selectClass(e,index,this.$data);
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
            switch (this.NavTwo_index) {
                case 63:case 64: //任选2默认选中的
                    this.rxArr = [3,4];
                break;
                case 66:case 67:case 68:case 69: //任选3默认选中的
                    this.rxArr = [2,3,4];
                break;
                case 71: //任选4默认选中的
                    this.rxArr = [1,2,3,4];
                break;
                default:
                    this.rxArr = [];
                break;
            };
            for (let i = 0; i < 5; i++) {
                this.DesignationArr[i].num = null;
            }
        },
        // 获取玩法数据
        getPlayingData:function() {
            const loading = this.$loading();
            getLotteryOdds({'token': this.loginInfo.token,'uid': this.loginInfo.id,'cate': this.$route.query.id})
            .then(res => {
                if (res.ret == 200) {
                    loading.close();
                    this.NavOneData = res.data;
                    this.NavTwoData = res.data[0].play_rule;
                    this.bettingInfo.rate = res.data[0].play_rule[0].odds[0].rate;
                    this.bettingInfo.odd_play = res.data[0].play_rule[0].odds[0].odd_play;
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
                    this.data.lastOpenNumber = res.data;
                } else {
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
                            this.getLastOpenNumber();
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
</style>

