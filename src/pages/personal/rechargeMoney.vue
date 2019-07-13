<template>
    <div class="recharge-money">
        <BackHeader title="充值" rightContent="充值明细"></BackHeader>
        <div class="content">
            <div class v-if="dataInfo.type!=3">
                <!-- is_online 0 线下支付, 1 线上支付 -->
                <img class="qr-code" :src="dataInfo.qrcode" alt v-if="dataInfo.is_online==0" />
                <div class="flex___16JOt ipt-box" v-if="dataInfo.is_online==0">
                    <input class="ipt" type="text" v-model="name" placeholder="存款人姓名" />
                </div>
                <div class v-if="dataInfo.is_online==1">
                    <form :action="payParam.tjurl" method="post">
                        <input type="hidden" v-for="(d,i) in payParam.native" :key="i" :name="i" :value="d"/>
                        <input type="submit" id="parParamSubmit" value="提交" style="display: none"/>
                    </form>
                </div>
                <div class="flex___16JOt ipt-box">
                    <input class="ipt" type="number" v-model="money" placeholder="存款金额"/>
                    <span class="yuan">元</span>
                </div>
                <div class="moneyList___3YmWD">
                    <div :class="['moneyItem___NT5hw', item.active?'moneyItemActive___1PXyI':'']" v-for="(item, index ) in moneyList" :key="index" @click="selectMoneyFn(index)">{{item.num}}元</div>
                </div>
            </div>
            <div class v-else>
                <div class="flex___16JOt ipt-box">
                    <input class="ipt" type="text" v-model="name" placeholder="存款人姓名"/>
                </div>
                <div class="flex___16JOt ipt-box">
                    <input class="ipt" type="number" v-model="money" placeholder="存款金额"/>
                    <span class="yuan">元</span>
                </div>
                <div class="moneyList___3YmWD">
                    <div :class="['moneyItem___NT5hw', item.active?'moneyItemActive___1PXyI':'']" v-for="(item, index ) in moneyList" :key="index" @click="selectMoneyFn(index)">{{item.num}}元</div>
                </div>
            </div>
            <div class="buttonContainer___3tU5D" v-if="dataInfo.type!=3">
                <button class="color1___3wpTZ" @click="onSubmit">提交申请</button>
            </div>
            <div class="buttonContainer___3tU5D" v-else>
                <button class="color1___3wpTZ" @click="layerShow">提交申请</button>
            </div>
            <div class="layer scale_0">
                <div class="listView___36MjA">
                    <div class="bankItem___4FmCL">
                        <table>
                            <tr>
                                <td>充值金额</td>
                                <td style="color: red;">{{money}}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>收款银行</td>
                                <td>{{dataInfo.k_bank}}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>收款人</td>
                                <td id="kName">{{dataInfo.k_name}}</td>
                                <td>
                                    <div class="copy-btn copy_btn_name" data-clipboard-action="copy" :data-clipboard-text="dataInfo.k_name" id="copy_btn_name" @click="copyKname">复制</div>
                                </td>
                            </tr>
                            <tr>
                                <td>收款卡号</td>
                                <td id="kCard">{{dataInfo.k_card_number}}</td>
                                <td>
                                    <div class="copy-btn copy_btn_card" data-clipboard-action="copy" :data-clipboard-text="dataInfo.k_card_number" id="copy_btn_card" @click="copyKcard">复制</div>
                                </td>
                            </tr>
                        </table>
                        <div class="tips">请按照提示充值金额转账</div>
                        <div class="btn-box">
                            <div class="btn-style btn-close" @click="layerClose">取消</div>
                            <div class="btn-style btn-sub" @click="onSubmit">确认</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { DoCharge, BeforeRecharge } from "../../axios/api.js";

export default {
    name: "recharge-money",
    data() {
        return {
            dataInfo: {},
            money: "",
            name: "",
            moneyList: [
                {
                    active: false,
                    num: 100
                },
                {
                    active: false,
                    num: 200
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
                    num: 5000
                },
                {
                    active: false,
                    num: 10000
                }
            ],
            payParam: {
                native: {
                    pay_amount: "",
                    pay_applydate: "",
                    pay_attach: "",
                    pay_bankcode: "",
                    pay_callbackurl: "",
                    pay_md5sign: "",
                    pay_memberid: "",
                    pay_notifyurl: "",
                    pay_orderid: "",
                    pay_productname: ""
                },
                tjurl: ""
            }
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
    mounted() {
        let _this = this;
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        this.dataInfo = JSON.parse(this.$route.query.item);
    },
    methods: {
        copyKname() {
            let _this = this;
            let clipboard = new this.clipboard(".copy_btn_name");
            clipboard.on("success", function() {
                _this.$toast.success("复制成功");
            });
            clipboard.on("error", function() {
                _this.$toast.success("复制失败");
            });
        },
        copyKcard() {
            let _this = this;
            let clipboard = new this.clipboard(".copy_btn_card");
            clipboard.on("success", function() {
                _this.$toast.success("复制成功");
            });
            clipboard.on("error", function() {
                _this.$toast.success("复制失败");
            });
        },
        selectMoneyFn(index) {
            let moneyList = this.moneyList;
            for (let i = 0; i < moneyList.length; i++) {
                moneyList[i].active = false;
            }
            moneyList[index].active = true;
            this.money = "" + moneyList[index].num + ""; // 转成字符串
            this.moneyList = moneyList;
        },
        layerShow() {
            if (this.name == "") {
                this.$toast.error("请输入存款人姓名");
                return false;
            }
            if (this.money == "") {
                this.$toast.error("请输入充值金额");
                return false;
            }
            // console.log(this.money)
            if (this.money.split(".").length < 2) {
                // 只有整数，才会加上随机数
                this.money =
                    parseFloat(this.money) +
                    parseFloat(Math.random().toFixed(2));
            }
            $(".layer").addClass("scale_1");
        },
        layerClose() {
            $(".layer").removeClass("scale_1");
        },
        onSubmit() {
            let dataInfo = this.dataInfo;
            let param = "";
            if (dataInfo.is_online == 1) {
                // 线上支付
                // 获取 线上支付 参数
                if (this.money == "") {
                    this.$toast.error("请输入充值金额");
                    return false;
                }
                param = {
                    token: this.loginInfo.token,
                    uid: this.loginInfo.id,
                    money: this.money,
                    recharge_id: this.dataInfo.id
                };
                BeforeRecharge(param).then(res => {
                    if (res.ret == 200) {
                        this.payParam = res.data;
                        setTimeout(() => {
                            $("#parParamSubmit").click();
                        }, 500);
                    } else {
                        this.$toast.error(res.msg);
                    }
                });
            } else {
                // 线下支付
                if (dataInfo.type == 1 || dataInfo.type == 2) {
                    // 微信 、 支付宝
                    if (this.name == "") {
                        this.$toast.error("请输入存款人姓名");
                        return false;
                    }
                }
                if (dataInfo.type == 3) {
                    // 银行卡
                }
                param = {
                    token: this.loginInfo.token,
                    uid: this.loginInfo.id,
                    recharge_id: this.dataInfo.id,
                    name: this.name,
                    money: this.money
                };
                DoCharge(param).then(res => {
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
.layer {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
}
.scale_0 {
    transform: scale(0, 0);
    -o-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -moz-transform: scale(0, 0);
    -webkit-transform: scale(0, 0);
    transition: 0.3s;
    -o-transition: 0.3s;
    -ms-transition: 0.3s;
    -moz-transition: 0.3s;
    -webkit-transition: 0.3s;
}
.scale_1 {
    transform: scale(1, 1);
    -o-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transition: 0.3s;
    -o-transition: 0.3s;
    -ms-transition: 0.3s;
    -moz-transition: 0.3s;
    -webkit-transition: 0.3s;
}
.listView___36MjA {
    margin-top: 50%;
}
.bankItem___4FmCL {
    flex-direction: column;
}
.btn-box {
    width: 100%;
    margin-top: 0.6rem;
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: center;
}
.btn-style {
    width: 2rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    border-radius: 0.3rem;
}
.btn-close {
    margin-right: 0.6rem;
    border: 1px #e6e6e6 solid;
}
.btn-sub {
    color: #fff;
    background-color: #f57500;
}
.copy-btn {
    padding: 0 0.1rem;
    background: #e6e6e6;
    border-radius: 0.1rem;
    margin: 0 0.1rem;
}
.tips {
    font-size: 0.24rem;
    color: red;
}
</style>
