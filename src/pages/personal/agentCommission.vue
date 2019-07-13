<template>
    <div class="agent-commission">
        <BackHeader title="代理佣金"></BackHeader>
        <div class="content">
            <div class="flex___16JOt date-box">
                <div class="start-date-l">
                    <mu-date-input v-model="start_time" placeholder="开始日期" full-width no-display @change="startDateFn"></mu-date-input>
                </div>
                <div class="date-font">至</div>
                <div class="emd-date-r">
                    <mu-date-input v-model="end_time" placeholder="结束日期" full-width no-display @change="endDateFn"></mu-date-input>
                </div>
            </div>
            <div class="totalTitle___bKxbe">当前统计：</div>
            <div class="flex___16JOt totalContainer___3WPqi">
                <div class="flex___16JOt totalItem___3_HlG">
                    <img src="../../assets/commission.png" alt class="icon___37-Tf" />
                    <div>
                        <div class>佣金</div>
                        <div class="totalNum___2qsCu">{{total_yj_money}}</div>
                    </div>
                </div>
                <div class="flex___16JOt totalItem___3_HlG">
                    <img src="../../assets/bettingmoney.png" alt class="icon___37-Tf" />
                    <div>
                        <div class>投注金额</div>
                        <div class="totalNum___2qsCu">{{total_betting}}</div>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="listItem___1Wjc2 commissionHead___2ZQTL">
                <div class="col1 col1___1U4LE">期数</div>
                <div class="col2 col2___1RM10">投注金额</div>
                <div class="col3 col3___2MrIS">佣金</div>
                <div class="col4 col4___1YeO9">投注人数</div>
                <div class="col5 col5___3KLE8">状态</div>
            </div>
            <div class="table-list-box" v-if="dataList.length>=1">
                <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
                    <mu-list>
                        <template>
                            <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index">
                                <div class="col1">20180512023</div>
                                <div class="col2">121.00</div>
                                <div class="col3">121.00</div>
                                <div class="col4">121</div>
                                <div class="col5">在线</div>
                            </div>
                        </template>
                    </mu-list>
                </mu-load-more>
            </div>
            <!-- -->
            <div class="no-data" v-if="dataList.length<=0">
                <div class="imgError___64CBy"></div>
                <div class="errorText2___1uaqX">代理佣金数据为空</div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetAgentMoney } from "../../axios/api.js";
export default {
    name: "agent-commission",
    data() {
        return {
            refreshing: false,
            loading: false,
            start_time: "",
            end_time: "",
            page: 1, // 当前页数
            last_page: 0, // 总共多少页
            dataList: [],
            total_yj_money: "", // 佣金金额
            total_betting: "" // 投注金额
        };
    },
    destroyed() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#292d30 !important;");
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        this.start_time = this.time(new Date().getTime(), true);
        this.end_time = this.time(new Date().getTime(), false);

        this.getData();
    },
    methods: {
        getData() {
            let param = {
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                start: this.start_time,
                end: this.end_time
            };
            GetAgentMoney(param).then(res => {
                this.msg(res);
            });
        },
        msg(res) {
            this.loading = false;
            let list = res.data.data;
            let dataList = this.dataList;
            for (var i = 0; i < list.length; i++) {
                dataList.push(list[i]);
            }
            this.total_yj_money = res.data.total_yj_money;
            this.total_betting = res.data.total_betting;
            this.dataList = dataList;
            this.last_page = res.data.last_page;
        },
        load() {
            if (this.last_page > this.page) {
                // 总页数 > 当前页数
                this.page += 1;
                this.loading = true;
                this.getData(this.start_time, this.end_time);
            }
        },
        startDateFn(e) {
            this.start_time = this.time(e.getTime(), true);
            this.dataList = [];
            this.page = 1;
            this.getData();
        },
        endDateFn(e) {
            this.end_time = this.time(e.getTime(), false);
            this.dataList = [];
            this.page = 1;
            this.getData();
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
</style>
