<template>
    <div class="team-report">
        <BackHeader title="团队报表"></BackHeader>
        <div class="content">
            <div class="flex___16JOt date-box">
                <div class="start-date-l">
                    <mu-date-input v-model="start" placeholder="开始日期" full-width no-display @change="startDateFn"></mu-date-input>
                </div>
                <div class="date-font">至</div>
                <div class="emd-date-r">
                    <mu-date-input v-model="end" placeholder="结束日期" full-width no-display @change="endDateFn"></mu-date-input>
                </div>
            </div>
            <!-- -->
            <div class="am-list container___5IQBA">
                <div class="am-list-body" v-if="dataInfo!=null">
                    <mu-container>
                        <mu-paper :z-depth="1">
                            <mu-data-table height="" :columns="columns" :sort.sync="sort" @sort-change="getData" :data="dataInfo">
                                <template slot-scope="scope">
                                    <td class="is-center">{{scope.row.mobile}}</td>
                                    <td class="is-center">{{scope.row.recharge_total}}</td>
                                    <td class="is-center">{{scope.row.withdraw_total}}</td>
                                    <td class="is-center">{{scope.row.transfer_in}}</td>
                                    <td class="is-center">{{scope.row.transfer_out}}</td>
                                    <td class="is-center">{{scope.row.betting_money}}</td>
                                    <td class="is-center">{{scope.row.winning_money}}</td>
                                    <td class="is-center">{{scope.row.sale_money}}</td>
                                    <td class="is-center">{{scope.row.back_money}}</td>
                                    <td class="is-center">{{scope.row.win_lose}}</td>
                                    <td class="is-center">{{scope.row.yj_money}}</td>
                                    <td class="is-center">{{scope.row.up_mobile}}</td>
                                </template>
                            </mu-data-table>
                        </mu-paper>
                    </mu-container>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetTeamReport } from "../../axios/api.js";

export default {
    name: "team-report",
    data() {
        return {
            start: "",
            end: "",
            dataInfo: null,
            sort: {
                name: '',
                order: 'asc'
            },
            columns: [
                { align: 'center',title: '用户名'},
                { align: 'center',title: '充值金额'},
                { align: 'center',title: '提现金额'},
                { align: 'center',title: '代理转入'},
                { align: 'center',title: '代理转出'},
                { align: 'center',title: '总投注'},
                { align: 'center',title: '总中奖'},
                { align: 'center',title: '总优惠'},
                { align: 'center',title: '总工资'},
                { align: 'center',title: '总盈亏'},
                { align: 'center',title: '总佣金'},
                { align: 'center',title: '上级用户名'}
            ],
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    destroyed() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#292d30 !important;");
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");

        this.start = this.time(new Date().getTime(), true);
        this.end = this.time(new Date().getTime(), false);
        this.getData();
    },
    methods: {
        getData() {
            GetTeamReport({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                start: this.start,
                end: this.end
            }).then(res => {
                this.dataInfo = res.data;
            });
        },
        startDateFn(e) {
            this.start = this.time(e.getTime(), true);
            this.getData();
        },
        endDateFn(e) {
            this.end = this.time(e.getTime(), false);
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
.am-list-body{background: rgba(0, 0, 0, 0);}
</style>
