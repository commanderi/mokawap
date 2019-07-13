<template>
    <div class="wallet-page">
        <BackHeader title="我的钱包"></BackHeader>
        <div class="content">
            <div class="flex___16JOt itemContainer___2o15N">
                <div>中心钱包</div>
                <div class="flex___16JOt itemContent___OxQCu">
                    <div><span class="money___2FiHu">{{userInfo.money}}</span>元</div>
                    <img src="../../assets/refresh.png" class="iconRefresh___vYbCq" @click="myMoneyFn"/>
                </div>
            </div>
            <div class="flex___16JOt itemContainer___2o15N">
                <div>AG</div>
                <div class="flex___16JOt itemContent___OxQCu" @click="getGameMoney('AG')">
                    <div><span class="money___2FiHu">{{agMoney}}</span>元</div>
                    <img src="../../assets/refresh.png" alt class="iconRefresh___vYbCq" />
                </div>
            </div>
            <div class="flex___16JOt itemContainer___2o15N">
                <div>沙巴体育</div>
                <div class="flex___16JOt itemContent___OxQCu" @click="getGameMoney('IBC')">
                    <div><span class="money___2FiHu">{{ibcMoney}}</span>元</div>
                    <img src="../../assets/refresh.png" alt class="iconRefresh___vYbCq" />
                </div>
            </div>
            <div class="flex___16JOt itemContainer___2o15N">
                <div>开元棋牌</div>
                <div class="flex___16JOt itemContent___OxQCu" @click="getGameMoney('KY')">
                    <div><span class="money___2FiHu">{{kyMoney}}</span>元</div>
                    <img src="../../assets/refresh.png" alt class="iconRefresh___vYbCq" />
                </div>
            </div>
            <div class="flex___16JOt itemContainer___2o15N">
                <div>传奇电子</div>
                <div class="flex___16JOt itemContent___OxQCu" @click="getGameMoney('CQ')">
                    <div><span class="money___2FiHu">{{cqMoney}}</span>元</div>
                    <img src="../../assets/refresh.png" alt class="iconRefresh___vYbCq" />
                </div>
            </div>
            <div class="flex___16JOt itemContainer___2o15N">
                <div>JDB电子</div>
                <div class="flex___16JOt itemContent___OxQCu" @click="getGameMoney('JDB')">
                    <div><span class="money___2FiHu">{{jdbMoney}}</span>元</div>
                    <img src="../../assets/refresh.png" alt class="iconRefresh___vYbCq" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPersonalInfo, GetGameMoney } from "@/axios/api.js";
export default {
    name: "wallet-page",
    data() {
        return {
            userInfo: {},
            agMoney: "刷新钱包",
            ibcMoney: "刷新钱包",
            kyMoney: "刷新钱包",
            cqMoney: "刷新钱包",
            jdbMoney: "刷新钱包",
            loading: ""
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    beforeCreate() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
    },
    destroyed() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#292d30 !important;");
    },
    mounted() {
        this.getPersonalInfo();
    },
    methods: {
        // 获取个人信息
        getPersonalInfo(loading) {
            GetPersonalInfo({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                if (loading) {
                    loading.close();
                }
                this.userInfo = res.data;
            });
        },
        myMoneyFn() {
            let loading = this.$loading();
            this.getPersonalInfo(loading);
        },
        // 获取游戏余额
        getGameMoney(game) {
            let loading = this.$loading();
            GetGameMoney({
                game: game,
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                loading.close();
                if (game == "AG") {
                    this.agMoney = res.data.game_money;
                } else if (game == "IBC") {
                    this.ibcMoney = res.data.game_money;
                } else if (game == "KY") {
                    this.kyMoney = res.data.game_money;
                } else if (game == "CQ") {
                    this.cqMoney = res.data.game_money;
                } else if (game == "JDB") {
                    this.jdbMoney = res.data.game_money;
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
</style>
