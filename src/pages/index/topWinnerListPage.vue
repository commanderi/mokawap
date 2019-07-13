<template>
    <div class="to-winner-list-page">
        <BackHeader title="最新榜单"></BackHeader>
        <div class="content">
            <table class="topWinnerList" cellpadding="0" border="0" cellspacing="0">
                <tr>
                    <td>用户名</td>
                    <td>中奖金额</td>
                    <td>彩种</td>
                </tr>
                <tr v-for="(d,i) in dataList" :key="i">
                    <td>{{ d.mobile }}</td>
                    <td>
                        <span>喜中{{ d.z_money }}元</span>
                    </td>
                    <td>{{ d.name }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { GetLatestWinnersList } from "@/axios/api.js";
export default {
    name: "to-winner-list-page",
    data() {
        return {
            dataList: null
        };
    },
    beforeCreate() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        $(document).scrollTop(0);
    },
    destroyed() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#292d30 !important;");
    },
    components: {
        BackHeader
    },
    mounted() {
        GetLatestWinnersList({ type: 2 }).then(res => {
            this.dataList = res.data;
        });
    },
    methods: {}
};
</script>
