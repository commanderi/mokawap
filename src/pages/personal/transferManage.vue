<template>
    <div class="transfer">
        <BackHeader title="转账"></BackHeader>
        <div class="content">
            <div class="container___2Zckg">
                <div class="title___3Uwbx">自动额度转账</div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">中心钱包</div>
                        <div class="money___H0tTR">{{userInfo.money}}</div>
                    </div>
                </div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">AG游戏</div>
                        <div class="money___H0tTR">{{agMoney}}</div>
                    </div>
                    <div class="rightOption___34ejk">
                        <div class="button3___3mPn4" @click="yiJianZhuanRuFn('AG')">一键转入</div>
                        <div class="button4___1bFnx" @click="getGameMoney('AG')">刷 新</div>
                    </div>
                </div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">沙巴体育</div>
                        <div class="money___H0tTR">{{ibcMoney}}</div>
                    </div>
                    <div class="rightOption___34ejk">
                        <div class="button3___3mPn4" @click="yiJianZhuanRuFn('IBC')">一键转入</div>
                        <div class="button4___1bFnx" @click="getGameMoney('IBC')">刷 新</div>
                    </div>
                </div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">开元棋牌</div>
                        <div class="money___H0tTR">{{kyMoney}}</div>
                    </div>
                    <div class="rightOption___34ejk">
                        <div class="button3___3mPn4" @click="yiJianZhuanRuFn('KY')">一键转入</div>
                        <div class="button4___1bFnx" @click="getGameMoney('KY')">刷 新</div>
                    </div>
                </div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">传奇电子</div>
                        <div class="money___H0tTR">{{cqMoney}}</div>
                    </div>
                    <div class="rightOption___34ejk">
                        <div class="button3___3mPn4" @click="yiJianZhuanRuFn('CQ')">一键转入</div>
                        <div class="button4___1bFnx" @click="getGameMoney('CQ')">刷 新</div>
                    </div>
                </div>
                <div class="flex___16JOt moneyItem___3oXcd">
                    <div class="leftContent___3KvzI">
                        <div class="label___VWwdx">JDB电子</div>
                        <div class="money___H0tTR">{{jdbMoney}}</div>
                    </div>
                    <div class="rightOption___34ejk">
                        <div class="button3___3mPn4" @click="yiJianZhuanRuFn('JDB')">一键转入</div>
                        <div class="button4___1bFnx" @click="getGameMoney('JDB')">刷 新</div>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="am-list">
                <div class="am-list-body">
                    <div class="am-flexbox am-flexbox-align-center">
                        <div class="am-flexbox-item">
                            <div class="am-list-item">
                                <mu-select v-model="typeLeft" full-width @change="selectLeft">
                                    <mu-option v-for="(city,index) in selectListLeft" :key="index" :label="city.name" :value="city.game"></mu-option>
                                </mu-select>
                            </div>
                        </div>
                        <div class="center-ico">
                            <div class="iconChange___2VYnn"></div>
                        </div>
                        <div class="am-flexbox-item" style="margin-left: 0;">
                            <div class="am-list-item" style="padding-left: 0;">
                                <mu-select v-model="typeRight" full-width @change="selectRight">
                                    <mu-option v-for="(city,index) in selectListRight" :key="index" :label="city.name" :value="city.game"></mu-option>
                                </mu-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- -->
            <div class="moneyList___3YmWD" style="margin: .3rem 0.2rem;">
                <div :class="['moneyItem___NT5hw', item.active?'moneyItemActive___1PXyI':'']" v-for="(item, index ) in moneyList" :key="index" @click="selectMoneyFn(index)">{{item.num}}元</div>
            </div>
            <!--  -->
            <div class="am-list" style="margin: .3rem 0;">
                <div class="am-list-body">
                    <div class="am-list-item am-input-item am-list-item-middle moneyInput___3iqLX">
                        <div class="am-list-line">
                            <div class="am-input-label am-input-label-2">￥</div>
                            <div class="am-input-control">
                                <input v-model="money" placeholder maxlength="8" type="number" value="50"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="buttonContainer___3qyk5">
                <button class="color1___3wpTZ" @click="onSubmit">确认转账</button>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPersonalInfo, GetGameMoney, MoneyToGame } from "../../axios/api.js";

export default {
    name: "transfer",
    data() {
        return {
            userInfo: {},
            agMoney: "刷新余额",
            ibcMoney: "刷新余额",
            kyMoney: "刷新余额",
            cqMoney: "刷新余额",
            jdbMoney: "刷新余额",
            typeLeft: "",
            typeRight: "",
            money: "",
            selectListLeft: [
                {
                    name: "中心钱包",
                    game: ""
                },
                {
                    name: "真人AG",
                    game: "AG"
                },
                {
                    name: "沙巴体育",
                    game: "IBC"
                },
                {
                    name: "开元棋牌",
                    game: "KY"
                },
                {
                    name: "传奇电子",
                    game: "CQ"
                },
                {
                    name: "JDB电子",
                    game: "JDB"
                }
            ],
            selectListRight: [
                {
                    name: "真人AG",
                    game: "AG"
                },
                {
                    name: "沙巴体育",
                    game: "IBC"
                },
                {
                    name: "开元棋牌",
                    game: "KY"
                },
                {
                    name: "传奇电子",
                    game: "CQ"
                },
                {
                    name: "JDB电子",
                    game: "JDB"
                }
            ],
            moneyList: [
                {
                    active: false,
                    num: 50
                },
                {
                    active: false,
                    num: 100
                },
                {
                    active: false,
                    num: 300
                },
                {
                    active: false,
                    num: 500
                },
                {
                    active: false,
                    num: 1000
                },
                {
                    active: false,
                    num: 2000
                },
                {
                    active: false,
                    num: 3000
                },
                {
                    active: false,
                    num: 5000
                }
            ]
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    beforeCreate() {
        $(document).scrollTop(0);
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
        this.getPersonalInfo();
        this.typeRight = "AG";
    },
    methods: {
        selectMoneyFn(index) {
            let moneyList = this.moneyList;
            for (let i = 0; i < moneyList.length; i++) {
                moneyList[i].active = false;
            }
            moneyList[index].active = true;
            this.money = moneyList[index].num;
            this.moneyList = moneyList;
        },
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
        },
        // 一键转入
        yiJianZhuanRuFn(game) {
            let loading = this.$loading();
            MoneyToGame({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                type: 2, //1转出2传入
                game: game,
                way: 1 // 1一键转入转出 2输入金额转入转出
            }).then(res => {
                loading.close();
                if (res.ret == 200) {
                    this.$toast.success(res.msg);
                    this.mounted();
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        selectLeft(game) {
            let selectListRight = [];
            if (game == "") {
                selectListRight = [
                    {
                        name: "真人AG",
                        game: "AG"
                    },
                    {
                        name: "沙巴体育",
                        game: "IBC"
                    },
                    {
                        name: "开元棋牌",
                        game: "KY"
                    },
                    {
                        name: "传奇电子",
                        game: "CQ"
                    },
                    {
                        name: "JDB电子",
                        game: "JDB"
                    }
                ];
                this.typeRight = "AG";
            } else if (game == "AG" || game == "IBC" || game == "KY" || game == "CQ" || game == "JDB") {
                selectListRight = [
                    {
                        name: "个人中心",
                        game: ""
                    }
                ];
                this.typeRight = "";
            }
            this.selectListRight = selectListRight;
        },
        selectRight(e) {},
        onSubmit() {
            // console.log(this.typeLeft)
            // console.log(this.typeRight)
            let type = "";
            let game = "";
            if (this.typeLeft == "") {
                // 转出
                type = 1;
                game = this.typeRight;
            }
            if (this.typeRight == "") {
                // 转入
                type = 2;
                game = this.typeLeft;
            }
            if (this.money == "") {
                this.$toast.error("请输入转账金额");
                return false;
            }
            let loading = this.$loading();
            MoneyToGame({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                type: type, //1转出2传入
                game: game,
                money: this.money,
                way: 2 // 1一键转入转出 2输入金额转入转出
            }).then(res => {
                loading.close();
                if (res.ret == 200) {
                    this.$toast.success(res.msg);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
.am-list-item {
    .mu-input {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}
</style>
