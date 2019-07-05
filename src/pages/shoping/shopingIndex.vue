<template>
    <div class="shoping-index">
        <div class="headers">
            <div class="box">
                <div class="am-navbar-left"></div>
                <div class="title">彩票大厅</div>
                <div class="am-navbar-right" @click="switchPattern">
                    <div :class="['barIcon', pattern?'iconGrid':'iconList']"></div>
                </div>
            </div>
        </div>
        <!-- 彩种菜单 -->
        <div class="flex segmentBody___8yTQa">
            <div class="flex segmentBody">
                <div class="fixSegment___2FnJf" :class="muenact==0 ? 'active' : ''" v-on:click="colorSwitch(0,'')">全部彩种</div>
                <div class="segmentScroll___2zidR">
                    <div class="segmentItem___38Trc" :class="muenact==1 ? 'active' : ''" v-on:click="colorSwitch(1,'SSC')">时时彩</div>
                    <div class="segmentItem___38Trc" :class="muenact==2 ? 'active' : ''" v-on:click="colorSwitch(2,'PK10')">PK拾</div>
                </div>
            </div>
        </div>
        <!-- 彩种列表式 -->
        <div class="contentContainer___2KmRP container___1VqEi" v-if="pattern">
            <ul v-if="kindData!=null">
                <template v-for="(d,i) in kindData">
                    <!-- pk10 -->
                    <li class="listItem___1BA9t" :key="i" v-if="d.id==3||d.id==4" @click="changePage('PK10/BJPK10', {id:d.id,title:d.name})">
                        <img class="listItemImg" :src="d.cate_img">
                        <div class="listItemRight___3_yMH">
                            <div class="flex rightItem1___2D7FW">
                                <div class="gameNameInChinese">{{ d.name }}</div>
                                <div class="lastIssueNumber___l2NrN">第{{ Number(d.next_stage)-1 }}期</div>
                            </div>
                            <div class="flex openCode___3zDkY">
                                <template v-for="(m,u) in d.last_open_number.split(',')">
                                    <img v-if="m=='01'" src="../../assets/pkf1.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='02'" src="../../assets/pkf2.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='03'" src="../../assets/pkf3.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='04'" src="../../assets/pkf4.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='05'" src="../../assets/pkf5.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='06'" src="../../assets/pkf6.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='07'" src="../../assets/pkf7.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='08'" src="../../assets/pkf8.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='09'" src="../../assets/pkf9.png" class="pk10State" :key="u">
                                    <img v-else-if="m=='10'" src="../../assets/pkf10.png" class="pk10State" :key="u">
                                </template>
                            </div>
                            <div class="flex rightItem3___2G1TZ">
                                <div>距离第{{ d.next_stage }}期截止还有</div>
                                <div>{{ hour[i] }}:{{ minute[i] }}:{{ second[i] }}</div>
                            </div>
                        </div>
                    </li>
                    <!-- 时时彩 -->
                    <li class="listItem___1BA9t" :key="i" v-else @click="changePage('SSC/CQSSC', {id:d.id,title:d.name})">
                        <img class="listItemImg" :src="d.cate_img">
                        <div class="listItemRight___3_yMH">
                            <div class="flex rightItem1___2D7FW">
                                <div class="gameNameInChinese">{{ d.name }}</div>
                                <div class="lastIssueNumber___l2NrN">第{{ Number(d.next_stage)-1 }}期</div>
                            </div>
                            <div class="flex openCode___3zDkY">
                                <template v-for="(m,h) in d.last_open_number.split(',')">
                                    <div class="num___1g-CB" :key="h">{{ m }}</div>
                                </template>
                            </div>
                            <div class="flex rightItem3___2G1TZ">
                                <div>距离第{{ d.next_stage }}期截止还有</div>
                                <div>{{ hour[i] }}:{{ minute[i] }}:{{ second[i] }}</div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <!-- 彩种方格式 -->
        <div class="contentContainer___2KmRP container___1VqEi" v-else>
            <div class="flex lotteryGrid___NVc6-" v-if="kindData!=null">
                <template v-for="(d,i) in kindData">
                    <!-- pk10 -->
                    <div class="gridItem___2sSIr" :key="i" v-if="d.id==3||d.id==4" @click="changePage('PK10/BJPK10', {id:d.id,title:d.name})">
                        <img class="gridItemImg___3nqhZ" :src="d.cate_img">
                        <div class="gameNameInChinese___2oU7A">{{ d.name }}</div>
                        <div class="timer___1iI1P">{{ hour[i] }}:{{ minute[i] }}:{{ second[i] }}</div>
                    </div>
                    <!-- 时时彩 -->
                    <div class="gridItem___2sSIr" :key="i" v-else @click="changePage('SSC/CQSSC', {id:d.id,title:d.name})">
                        <img class="gridItemImg___3nqhZ" :src="d.cate_img">
                        <div class="gameNameInChinese___2oU7A">{{ d.name }}</div>
                        <div class="timer___1iI1P">{{ hour[i] }}:{{ minute[i] }}:{{ second[i] }}</div>
                    </div>
                </template>
            </div>
        </div>
        <!-- 底部大菜单 -->
        <TabBar active="2"></TabBar>
    </div>
</template>
<script>
import {getHotCate} from '@/axios/api.js'
import TabBar from '@/components/tabBar.vue'
export default {
    name: 'shoping-index',
    data() {
        return {
            pattern: true,
            muenact:0,
            laftname:'',
            kindData:null,
            hour:[], //时
            minute:[], //分
            second:[], //秒
            timestamp:[],
            time:null,
            loginInfo:{},
        }
    },
    components: {
        TabBar
    },
    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.colorSwitch();
    },
    destroyed() {
        clearInterval(this.time)
    },
    methods: {
        switchPattern() {
            this.pattern = !this.pattern
        },
        // 顶部主彩种的切换
        colorSwitch:function(id=0,name){
            clearInterval(this.time);
            getHotCate({'kind':name}).then(res => {
                if(res.ret==200){
                    this.kindData = res.data;
                    this.timestamp = [];
                    this.muenact = id;
                    this.laftname = name;
                    for(let i=0;i<res.data.length;i++){
                        this.timestamp.push(res.data[i].open_time)
                    }
                    this.calculatingTime();
                }else{
                    console.log('请求出错:',res);
                }
            })
        },
        // 倒计时
        calculatingTime:function(){
            let fen = this.timestamp;
            this.time = setInterval(() => {
                let min = Math.min.apply(null, this.timestamp);
                this.hour = [];
                this.minute = [];
                this.second = [];
                for (let i = 0; i < fen.length; i++) {
                    this.hour.push(Math.floor((fen[i]/3600)%24));
                    this.minute.push(Math.floor((fen[i]/60)%60));
                    this.second.push(Math.floor(fen[i]%60));
                    if(this.hour[i]<10){
                        this.hour[i] = '0'+this.hour[i];
                    }
                    if(this.minute[i]<10){
                        this.minute[i] = '0'+this.minute[i];
                    }
                    if(this.second[i]<10){
                        this.second[i] = '0'+this.second[i];
                    }
                    if(min==0 && i==(fen.length-1)){
                        clearInterval(this.time);
                        this.colorSwitch(this.muenact,this.laftname);
                    }
                    this.timestamp[i]--
                }
            }, 1000);
        },
    },
}
</script>
<style scoped lang="less">
    .headers {
        width: 100%;
        background: #13171a;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;

        .box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 .2rem;
            color: #ffc252;
            font-size: .28rem;

        div {
            line-height: .9rem;
            box-sizing: border-box;
        }

        .title {
            font-size: .36rem;
        }

        .am-navbar-left {
            padding-left: .3rem;
            font-size: .32rem;
        }

        .am-navbar-right {
            -ms-flex-pack: end;
            justify-content: flex-end;
            font-size: .32rem;
        }

        .barIcon {
            width: .6rem;
            height: .6rem;
            margin-top: .15rem;
        }

        .iconGrid {
            background: url(../../assets/top_bar_sudoku.png) 50% no-repeat;
            background-size: contain;
        }

        .iconList {
            background: url(../../assets/top_bar_list.png) 50% no-repeat;
            background-size: contain;
        }
    }
}
// 追加
.saizi___1zlet{
    margin-right: 0.15rem;
}
.gridItem___2sSIr{
    touch-action: pan-y;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.gridItem___2sSIr{
    width: 2.5rem;
}
.pk10State{
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.1rem;
}
.num___1g-CB{
    flex-wrap: wrap;
    width: 0.48rem;
    margin: 0.06rem 0.12rem 0.06rem 0;
    border-radius: 50%;
    height: 0.48rem;
    text-align: center;
    line-height: 0.48rem;
    background: #fe9c00;
    color: #410000;
}
.lf_open_num{
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: nowrap;
    text-align: left;
}
.lf_open_num > span{
    width: 0.45rem;
    height: 0.45rem;
    line-height: 0.45rem;
    background-color: #ccc;
    text-align: center;
    border-radius: 50%;
    font-size: 0.3rem;
    margin: 0.1rem 0.05rem 0.1rem 0.05rem;
    color: #fff;
    display: inline-block;
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
.k3Bg___VmRJu{
    padding: 0px 0px 0px 0px!important;
    margin: 0.12rem 0rem!important;
}
</style>
