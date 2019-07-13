<template>
    <div class="personal-info">
        <BackHeader title="个人信息"></BackHeader>
        <div class="content">
            <div class="am-list">
                <div class="am-list-body">
                    <div class="am-list-item listItemImg___1xRsG am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">头像</div>
                            <div class="am-list-extra">
                                <div class="logo___1d2J- logoImg___1n8kh" style="background-color: #67d06d;float: right;">{{headPortraitText}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">用户名</div>
                            <div class="am-list-extra">{{userInfo.mobile}}</div>
                        </div>
                    </div>
                    <div class="am-list-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">真实姓名</div>
                            <div class="am-list-extra">{{userInfo.true_name}}</div>
                            <!--<div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>-->
                        </div>
                    </div>
                    <!-- <div class="am-list-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">身份信息</div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                        </div>
                    </div> -->
                    <div class="am-list-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">余额</div>
                            <div class="am-list-extra">{{userInfo.money}}</div>
                        </div>
                    </div>
                    <div class="am-list-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-list-content">彩票返点</div>
                            <div class="am-list-extra">{{userInfo.base}}</div>
                        </div>
                    </div>
                    <div class="am-list-item am-list-item-middle" @click="changePage('/updatePersonalInfo', {title: '绑定手机号'})">
                        <div class="am-list-line">
                            <div class="am-list-content">绑定手机</div>
                            <div class="am-list-extra">
                                <span v-if="!userInfo.tel" style="color: #ccc;">请绑定手机号</span>
                                <span v-else>{{userInfo.tel}}</span>
                            </div>
                            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
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
import { GetPersonalInfo } from "../../axios/api.js";

export default {
    name: "personal-info",
    data() {
        return {
            headPortraitText: "",
            userInfo: {}
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
