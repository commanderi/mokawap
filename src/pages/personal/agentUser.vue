<template>
    <div class="agent-user">
        <BackHeader title="用户管理" rightContent="+添加用户"></BackHeader>
        <div class="content">
            <div>
                <div class="accountTitle___2qkhN">当前用户层级</div>
                <div class="flex___16JOt accountNavList___3nYLs">
                    <div class="navItem___2y29q" v-for="(item, index) in navItem" :key="index" @click="navItemFn(item.id, index)">{{item.name}}</div>
                </div>
            </div>
            <div class="flex___16JOt container___2A7Nq">
                <div class="listContainer___2HPrh">
                    <div class="scrollY___35KAl">
                        <div class="listItem___3j36s accountListHead___3LCiS">
                            <div class="col1___3vv91">用户名</div>
                            <div class="col3___2N93m">返点</div>
                            <div class="col4___DFnni">团队人数</div>
                            <div class="col4___DFnni">团队余额</div>
                            <div class="col4___DFnni">个人余额</div>
                            <div class="col4___DFnni">个人充值</div>
                            <div class="col4___DFnni">充值次数</div>
                            <div class="col4___DFnni">个人提款</div>
                            <div class="col4___DFnni">个人投注</div>
                        </div>
                    </div>
                    <div v-for="(item, index) in dataList" :key="index" @click="downListFn(index)">
                        <div class="listItem___3j36s">
                            <div class="col1___3vv91">{{item.mobile}}</div>
                            <div class="col3___2N93m">{{item.base}}</div>
                            <div class="col4___DFnni">{{item.team_number}}</div>
                            <div class="col4___DFnni">{{item.team_balance}}</div>
                            <div class="col4___DFnni">{{item.personal_balance}}</div>
                            <div class="col4___DFnni">{{item.personal_recharge}}</div>
                            <div class="col4___DFnni">{{item.personal_recharge_times}}</div>
                            <div class="col4___DFnni">{{item.personal_withdraw}}</div>
                            <div class="col4___DFnni">{{item.personal_betting}}</div>
                        </div>
                        <div class="flex___16JOt listItemOption___1LGdc" v-if="item.active">
                            <div class="optionItem___1MhVG" @click.stop="xiaJiUserFn(item)"><div class="iconItem___2aUkH icon1___dhQ8v"></div>下级</div>
                            <div class="optionItem___1MhVG" @click.stop="transfertoLower(item)"><div class="iconItem___2aUkH icon_zz"></div>转账</div>
                            <div class="optionItem___1MhVG" @click.stop="changePage('/accountHistoryList', {title:item.mobile+'报表',junior_id: item.id})">
                                <div class="iconItem___2aUkH icon5___3mv10"></div>报表
                            </div>
                        </div>
                    </div>
                    <div class="no-data" v-if="dataList.length<=0">
                        <div class="imgError___64CBy"></div>
                        <div class="errorText2___1uaqX">暂无下级用户</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetMyJunior, GetPersonalInfo, Transfertolower } from "../../axios/api.js";

export default {
    name: "agent-user",
    data() {
        return {
            navItem: [],
            dataList: []
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    destroyed() {
        document.querySelector("body").setAttribute("style", "background:#292d30 !important;");
    },
    mounted() {
        document.querySelector("body").setAttribute("style", "background:#f5f5f5 !important;");
        this.getData();
        this.getPersonalInfo();
    },
    methods: {
        getData() {
            GetMyJunior({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    data[i].active = false;
                }
                this.dataList = data;
            });
        },
        // 转账给下级
        transfertoLower:function(data){
            this.$prompt('转给：'+data.mobile, '请输入转账金额', {
                validator (value) {
                    return {
                        valid: /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(value),
                        message: '转账金额必须大于0'
                    }
                }
            }).then(({ result, value }) => {
                if (result) {
                    Transfertolower({
                        token: this.loginInfo.token,
                        uid: this.loginInfo.id,
                        lower_uid:data.id,
                        money:value
                    }).then(res => {
                        if (res.ret == 200) {
                            this.$toast.success(res.msg);
                            this.getData();
                        } else {
                            this.$toast.error(res.msg);
                        }
                    })
                }
            });
        },
        // 获取下级(点击下级)
        xiaJiUserFn(item) {
            GetMyJunior({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                junior_id: item.id
            }).then(res => {
                if (res.ret == 200) {
                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i].active = false;
                    }
                    this.dataList = data;
                    // 添加层级
                    this.navItem.push({
                        id: item.id,
                        name: item.mobile
                    });
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        // 点击当前层级 获取下级
        navItemFn(id, index) {
            GetMyJunior({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                junior_id: id
            }).then(res => {
                if (res.ret == 200) {
                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i].active = false;
                    }
                    this.dataList = data;
                    // 删除层级
                    this.navItem.splice(index + 1, this.navItem.length);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        getPersonalInfo() {
            GetPersonalInfo({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                this.navItem.push({
                    id: res.data.id,
                    name: res.data.mobile
                });
                // this.userInfo = res.data
            });
        },
        downListFn(index) {
            this.dataList[index].active = !this.dataList[index].active;
        }
    }
};
</script>
<style scoped lang="less">
</style>
