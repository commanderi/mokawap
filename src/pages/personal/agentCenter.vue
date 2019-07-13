<template>
    <div class="agent-center">
        <BackHeader title="代理中心"></BackHeader>
        <div class="content">
            <div class="flex___16JOt userInfo___2YImc">
                <div class="logo___1d2J- undefined" style="background-color: rgb(103, 208, 109);">{{headPortraitText}}</div>
                <div class="userInfoText___3RiCn">
                    <div>
                        <span>用户名：</span>
                        {{userInfo.mobile}}
                    </div>
                    <div>
                        <span>帐户余额：</span>
                        <span class="money___1fpOb">{{userInfo.money}}元</span>
                    </div>
                    <div>
                        <span>彩票返点：</span>
                        {{userInfo.base}}
                    </div>
                </div>
            </div>
            <!-- -->
            <div class="am-list">
                <div class="am-list-body">
                    <div class="am-list-item am-list-item-middle" @click="changePage('/addAgent', '')">
                        <div class="am-list-line">
                            <div class="am-list-content">下级开户</div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                        </div>
                        <div class="am-list-ripple" style="display: none;"></div>
                    </div>
                    <div class="am-list-item am-list-item-middle" @click="changePage('/agentUser', {})">
                        <div class="am-list-line">
                            <div class="am-list-content">用户管理</div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                        </div>
                        <div class="am-list-ripple" style="display: none;"></div>
                    </div>
                    <div class="am-list-item am-list-item-middle" @click="changePage('/agentCommission', {})">
                        <div class="am-list-line">
                            <div class="am-list-content">代理佣金</div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                        </div>
                        <div class="am-list-ripple" style="display: none;"></div>
                    </div>
                    <div class="am-list-item am-list-item-middle" @click="changePage('/teamReport', {})">
                        <div class="am-list-line">
                            <div class="am-list-content">报表统计</div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                        </div>
                        <div class="am-list-ripple" style="display: none;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPersonalInfo } from "../../axios/api.js";
export default {
    name: "agent-center",
    data() {
        return {
            headPortraitText: "",
            userInfo: {}
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

        this.getPersonalInfo();
    },
    methods: {
        getPersonalInfo() {
            GetPersonalInfo({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                let mobile = res.data.mobile.split("");
                this.headPortraitText = mobile[0] + mobile[mobile.length - 1];
                this.userInfo = res.data;
            });
        }
    }
};
</script>
<style scoped lang="less">
</style>
