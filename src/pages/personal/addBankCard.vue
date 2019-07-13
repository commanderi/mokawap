<template>
    <div class="add-bank-card">
        <BackHeader title="添加银行卡信息"></BackHeader>
        <div class="content">
            <div class="am-list">
                <div class="am-list-header">请绑定持卡人本人银行卡</div>
                <div class="am-list-body">
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-label am-input-label-5">持卡人</div>
                            <div class="am-input-control">
                                <input maxlength="30" v-model="form.true_name" placeholder="请输入持卡人姓名" type="text" value/>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-label am-input-label-5">银行卡号</div>
                            <div class="am-input-control">
                                <input v-model="form.bank_card" placeholder="请输入银行卡号" maxlength="23" type="tel" value/>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item selectItem___4UUg- am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">银行名称</div>
                            <div class="am-input-control">
                                <input v-model="form.bank" placeholder="请输入开户银行" maxlength="23" type="text" value/>
                            </div>
                        </div>
                        <div class="am-list-ripple" style="display: none;"></div>
                    </div>
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-label am-input-label-5">开户支行</div>
                            <div class="am-input-control">
                                <input v-model="form.branch_bank" placeholder="请输入省市区（县）" type="text" value/>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item am-input-item am-list-item-middle" v-if="dataInfo.money_password==0">
                        <div class="am-list-line">
                            <div class="am-input-label am-input-label-5">提现密码</div>
                            <div class="am-input-control">
                                <input v-model="form.money_password" placeholder="请设置提现密码" maxlength="4" type="password" value/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text___3J4ZR">温馨提示:如果没有您需要的银行名称,请联系客服</p>
            <div class="buttonContainer___2RiKR">
                <button class="color1___3wpTZ" @click="onSubmit">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPersonalInfo, BangCard } from "../../axios/api.js";

export default {
    name: "add-bank-card",
    data() {
        return {
            dataInfo: {},
            form: {
                bank: "",
                bank_card: "",
                branch_bank: "",
                true_name: "",
                money_password: ""
            }
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
        this.getData();
    },
    methods: {
        getData() {
            GetPersonalInfo({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                this.dataInfo = res.data;
                this.form.bank = res.data.bank;
                this.form.bank_card = res.data.bank_card;
                this.form.branch_bank = res.data.branch_bank;
                this.form.true_name = res.data.true_name;
                // this.form = res.data
            });
        },
        onSubmit() {
            let form = this.form;
            if (form.true_name == "") {
                this.$toast.error("请输入持卡人姓名");
                return false;
            }
            if (form.bank_card == "") {
                this.$toast.error("请输入银行卡号");
                return false;
            }
            if (form.bank == "") {
                this.$toast.error("请输入银行名称");
                return false;
            }
            if (form.branch_bank == "") {
                this.$toast.error("请输入开户支行");
                return false;
            }
            if (this.dataInfo.money_password == 0) {
                if (form.money_password == "") {
                    this.$toast.error("请设置提现密码");
                    return false;
                }
            }
            form.token = this.loginInfo.token;
            form.uid = this.loginInfo.id;
            BangCard(form).then(res => {
                if (res.ret == 200) {
                    this.$toast.success(res.msg);
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 1500);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
</style>
