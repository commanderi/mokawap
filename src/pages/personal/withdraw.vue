<template>
    <div class="withdraw">
        <BackHeader title="账户提现" rightContent="提现明细"></BackHeader>
        <div class="content">
            <div class="betInfo___3JqT8">
                <div>有效投注：{{dataInfo.has_betting_money}}</div>还需投注：{{dataInfo.fact_betting_money}}
            </div>
            <div class="container___1tlbc">
                <div class="listView___36MjA">
                    <div class="bankItem___4FmCL">
                        <table>
                            <tr>
                                <td>开户银行</td>
                                <td>{{dataInfo.bank}}</td>
                            </tr>
                            <tr>
                                <td>银行卡号</td>
                                <td>{{dataInfo.bank_card}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex___16JOt ipt-box">
                <input class="ipt" type="number" v-model="money" :placeholder="'可提款金额'+dataInfo.money" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"/>
                <span class="yuan">元</span>
            </div>
            <div class="flex___16JOt ipt-box">
                <input class="ipt" type="password" maxlength="4" v-model="money_password" placeholder="提款密码"/>
            </div>
            <div class="buttonContainer___3tU5D">
                <button class="color1___3wpTZ" @click="onSubmit">提现</button>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetWithdrawData, DoWithdrawals } from "../../axios/api.js";

export default {
    name: "withdraw",
    data() {
        return {
            dataInfo: {},
            money: "",
            money_password: ""
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
        this.getData();
    },
    methods: {
        getData() {
            GetWithdrawData({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                this.dataInfo = res.data;
            });
        },
        onSubmit() {
            if (this.money == "") {
                this.$toast.error("请输入提款金额");
                return false;
            }
            if (this.money_password == "") {
                this.$toast.error("请输入提款密码");
                return false;
            }
            const loading = this.$loading();
            DoWithdrawals({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                money: this.money,
                money_password: this.money_password
            }).then(res => {
                if (res.ret == 200) {
                    loading.close();
                    this.$toast.success(res.msg);
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 1500);
                } else {
                    loading.close();
                    this.$toast.error(res.msg);
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
.buttonContainer___3tU5D {
    margin: 1.5rem;
}
.qr-code {
    width: 40%;
    max-width: 3rem;
    margin-top: 0.2rem;
}
.container___1tlbc {
    margin-top: 0.3rem;
}
.bankItem___4FmCL {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 0.16rem 0.24rem;
    border-radius: 5px;
    padding: 0.26rem 0.4rem 0 0.24rem;
    font-size: 0.28rem;
    background: #fff;
    text-align: left;
    td {
        padding-bottom: 0.2rem;
        overflow: hidden;
    }
    td:first-child {
        color: #999;
        width: 1.4rem;
    }
}
.betInfo___3JqT8 {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    margin-top: 0.3rem;
}
</style>
