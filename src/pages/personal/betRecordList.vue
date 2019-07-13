<template>
    <div class="betRecord-list">
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
                            <div :class="['menuItem___2Mzkn', item.active?'active':'']" v-for="(item, index) in playingList" :key="index" @click="confirmPlaying(index)">{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar am-navbar-right" style="position: relative;"></div>
        </div>
        <!-- -->
        <div class="content">
            <div class="flex___16JOt date-box">
                <div class="start-date-l">
                    <mu-date-input v-model="start_time" placeholder="开始日期" full-width @change="startDateFn"></mu-date-input>
                </div>
                <div class="date-font">至</div>
                <div class="emd-date-r">
                    <mu-date-input type="date" v-model="end_time" placeholder="结束日期" full-width @change="endDateFn"></mu-date-input>
                </div>
            </div>
            <div class="listItem___1Wjc2 commissionHead___2ZQTL">
                <div class="col1 col1___1U4LE">期数</div>
                <div class="col2 col2___1RM10">彩种名称</div>
                <div class="col3 col3___2MrIS">投注号码</div>
                <div class="col4 col4___1YeO9">投注金额</div>
                <div class="col5 col5___3KLE8">状态</div>
            </div>
            <div class="table-list-box" v-if="dataList.length>=1">
                <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
                    <mu-list>
                        <template>
                            <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index" @click="changePage('/betRecordDetails', {id: item.id})">
                                <div class="col1">{{item.stage}}</div>
                                <div class="col2">{{item.name}}</div>
                                <div class="col3">{{item.number}}</div>
                                <div class="col4">{{item.money}}</div>
                                <div class="col5" v-if="item.is_c==0">
                                    <div v-if="item.state==0">待开奖</div>
                                    <div v-else>
                                        <div v-if="item.code==0">未中奖</div>
                                        <div v-else style="color: red;">已中奖</div>
                                    </div>
                                </div>
                                <div class="col5" v-else>已撤销</div>
                            </div>
                        </template>
                    </mu-list>
                </mu-load-more>
            </div>
            <!-- -->
            <div class="no-data" v-if="dataList.length<=0">
                <div class="imgError___64CBy"></div>
                <div class="errorText2___1uaqX">暂无当前状态数据</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { BettingRecord } from "../../axios/api";

export default {
    name: "betRecord-list",
    data() {
        return {
            refreshing: false,
            loading: false,
            isSelect: false,
            type: "",
            start_time: "",
            end_time: "",
            page: 1, // 当前页数
            last_page: 0, // 总共多少页
            dataList: [],
            selectText: "全部订单",
            playingList: [
                {
                    type: null,
                    active: true,
                    name: "全部订单"
                },
                {
                    type: 1,
                    active: false,
                    name: "中奖订单"
                },
                {
                    type: 2,
                    active: false,
                    name: "未中奖订单"
                },
                {
                    type: 3,
                    active: false,
                    name: "已取消订单"
                },
                {
                    type: 4,
                    active: false,
                    name: "待开奖订单"
                }
            ]
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        this.start_time = this.time(new Date().getTime(), true);
        this.end_time = this.time(new Date().getTime(), false);
        //
        this.getData();
    },
    methods: {
        getData() {
            let param = {
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                type: this.type,
                start_time: this.start_time,
                end_time: this.end_time,
                page: this.page
            };
            BettingRecord(param).then(res => {
                this.loading = false;
                let list = res.data.data;
                let dataList = this.dataList;
                for (var i = 0; i < list.length; i++) {
                    dataList.push(list[i]);
                }
                this.dataList = dataList;
                this.last_page = res.data.last_page;
            });
        },
        load() {
            if (this.last_page > this.page) {
                // 总页数 > 当前页数
                this.page += 1;
                this.loading = true;
                this.getData();
            }
        },
        returnFn() {
            this.$router.back(-1);
        },
        //  显示
        showSelectLotteryFn() {
            this.isSelect = true;
        },
        hideAssistantFn() {
            this.isSelect = false;
        },
        //
        confirmPlaying(index) {
            let playingList = this.playingList;
            for (var i = 0; i < playingList.length; i++) {
                playingList[i].active = false;
            }
            playingList[index].active = true;
            this.type = playingList[index].type;
            this.selectText = playingList[index].name;
            this.isSelect = false;
            this.resetData();
            this.getData();
        },
        startDateFn(e) {
            this.start_time = this.time(e.getTime(), true);
            // console.log(e);
            this.resetData();
            this.getData();
        },
        endDateFn(e) {
            this.end_time = this.time(e.getTime(), false);
            this.resetData();
            this.getData();
        },
        resetData() {
            this.dataList = [];
            this.page = 1;
        },
        // 时间戳转换成  //2017-05-08 10:31:27
        time(value, type) {
            var time = new Date(value);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            // return year+'-'+this.add(month)+'-'+this.add(date)+' '+this.add(hours)+':'+this.add(minutes)+':'+this.add(seconds);
            if (type) {
                return (year + "-" + this.add(month) + "-" + this.add(date) + " 00:00:00");
            } else {
                return (year + "-" + this.add(month) + "-" + this.add(date) + " 23:59:59");
            }
        },
        add(m) {
            return m < 10 ? "0" + m : m;
        }
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
            background: url("../../assets/top_bar_back.png") 50% no-repeat;
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
    background: rgba(0, 0, 0, 0.6);
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
</style>
