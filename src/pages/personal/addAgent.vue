<template>
    <div class="add-agent">
        <!-- header -->
        <div class="am-navbar am-navbar-dark">
            <div class="navbar am-navbar-left" role="button">
                <span class="am-navbar-left-icon" aria-hidden="true">
                    <div class="iconBack" @click="returnFn()"></div>
                </span>
            </div>
            <div class="navbar am-navbar-title">
                <div class="segment___2jfIA">
                    <div class="segmentItem___13fnL active___3sLqm" @click="switchTypeFn(1)">下级开户</div>
                    <div class="segmentItem___13fnL" @click="switchTypeFn(2)">邀请码</div>
                </div>
            </div>
            <div class="navbar am-navbar-right"></div>
        </div>
        <!-- -->
        <div class="content">
            <!-- 下级开户 -->
            <div class="module" v-if="titleType==1">
                <div class="typeSelectContainer___2sJku">
                    <div class="typeItem___RTnEd active">
                        <div class="iconAgent___BkWYl"></div>
                        <div class="textItem___3nXOL">代理账号</div>
                    </div>
                </div>
                <div class="flex___16JOt typeContainer___3sFzL">
                    <div class="userTypesLabel___1XNYo">开户类型</div>
                    <div class="radioContainer___2-DV5">
                        <div :class="['radioContainer___17rez', kaiHuTypeActive==index?'iconActive___1llOG':'']" v-for="(item, index) in xiaJiKaiHuType" :key="index" @click="openTypeFn(index)">
                            <div class="iconRadio___1-_b1"></div>
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <!-- 精准开户 -->
                <div v-if="kaiHuTypeActive==0">
                    <div class="am-list">
                        <div class="am-list-body">
                            <div class="am-list-item am-input-item am-list-item-middle">
                                <div class="am-list-line">
                                    <div class="am-input-label am-input-label-5">用户名：</div>
                                    <div class="am-input-control">
                                        <input maxlength="12" v-model="mobile" placeholder="请输入用户名" type="text" value/>
                                    </div>
                                </div>
                            </div>
                            <div class="am-list-item selectItem___3zjIv am-list-item-middle">
                                <div class="am-list-line">
                                    <div class="am-input-label am-input-label-5" style="line-height: .88rem;">彩票返点：</div>
                                    <div class="am-input-control">
                                        <mu-select v-model="base" full-width @change="backRebatesSelect">
                                            <mu-option v-for="(city,index) in backRebatesList" :key="index" :label="city.base+'-'+city.percent+'(赔率)'" :value="city.base"></mu-option>
                                        </mu-select>
                                    </div>
                                </div>
                                <div class="am-list-ripple" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tips___ZxDcn">初始密码为：123456</div>
                    <div class="containerBtn___KctAC">
                        <button class="color1___3wpTZ" @click="kaiHuSubmit">立即开户</button>
                    </div>
                </div>
                <!-- 生成邀请码 -->
                <div v-else>
                    <div class="am-list">
                        <div class="am-list-body">
                            <div class="am-list-item am-input-item am-list-item-middle">
                                <div class="am-list-line">
                                    <div class="am-input-label am-input-label-5">邀请码：</div>
                                    <div class="am-input-control">
                                        <input maxlength="12" v-model="code" placeholder="点击选码随机生成" type="text" value disabled/>
                                    </div>
                                    <div class="am-input-extra">
                                        <div class="createCode___5Ds8c" @click="getProduceCode">点击选码</div>
                                    </div>
                                </div>
                            </div>
                            <div class="am-list-item selectItem___3zjIv am-list-item-middle">
                                <div class="am-list-line">
                                    <div class="am-input-label am-input-label-5" style="line-height: .88rem;">彩票返点：</div>
                                    <div class="am-input-control">
                                        <mu-select v-model="base" full-width @change="backRebatesSelect">
                                            <mu-option v-for="(city,index) in backRebatesList" :key="index" :label="city.base+'-'+city.percent+'(赔率)'" :value="city.base"></mu-option>
                                        </mu-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="containerBtn___KctAC">
                        <button class="color1___3wpTZ" @click="addProduceCodeSubmit">生成邀请码</button>
                    </div>
                </div>
            </div>
            <!-- 邀请码 list -->
            <div class="module" v-if="titleType==2">
                <div class="flex___16JOt container___XQ04F">
                    <div class="listItem___mD7l4 codeHead___1rkbD">
                        <div class="col1___1MWxh">邀请码</div>
                        <!--<div class="col2___HHr9w">类型</div>-->
                        <div class="col3___2EGl_">返点</div>
                        <div class="col4___oVRjw">状态</div>
                        <div class="col5___1oqNg">操作</div>
                    </div>
                    <div class="listBody___3sgl1">
                        <div class="listItem___mD7l4" v-for="(item, index) in promotionList" :key="index">
                            <div class="col1___1MWxh">{{item.code}}</div>
                            <!--<div class="col2___HHr9w">{{item.}}</div>-->
                            <div class="col3___2EGl_">{{item.base}}</div>
                            <div class="col4___oVRjw">
                                <span v-if="item.status==0">禁用</span>
                                <span v-if="item.status==1">启用</span>
                            </div>
                            <div class="col5___1oqNg">
                                <div class="editBtn___1lNy1" @click="editCode(item)">修改</div>
                                <!--<div class="copy___147Ip editBtn___1lNy1">复制</div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 修改 邀请码 -->
                <div class="am-modal-mask" @click="hideMask" v-if="isEdit"></div>
                <div class="editContainer___2eLfG" v-if="isEdit">
                    <table class="editContainer-table">
                        <tbody>
                            <tr>
                                <td>邀请码：</td>
                                <td>{{editForm.code}}</td>
                            </tr>
                            <tr>
                                <td>用户类型：</td>
                                <td>
                                    <div class="flex___16JOt">
                                        <div class="radioContainer___3GUNp">
                                            <div class="radioContainer___17rez iconActive___1llOG">
                                                <div class="iconRadio___1-_b1"></div>代理
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>用户状态：</td>
                                <td>
                                    <div class="flex___16JOt">
                                        <div class="radioContainer___3GUNp">
                                            <div :class="['radioContainer___17rez', editForm.status==index?'iconActive___1llOG':''] " v-for="(item, index) in statusType" :key="index" @click="statusTypeFn(index)">
                                                <div class="iconRadio___1-_b1"></div>
                                                {{item.name}}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>返点：</td>
                                <td>
                                    <div class="selectContainer___PBQ01">
                                        <mu-select v-model="editForm.base" full-width @change="backRebatesSelect">
                                            <mu-option v-for="(city,index) in backRebatesList" :key="index" :label="city.base+'-'+city.percent+'(赔率)'" :value="city.base"></mu-option>
                                        </mu-select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="containerBtn___wElEf">
                        <div class="color1___3wpTZ" @click="editCodeSubmit">确认修改</div>
                        <!--<div class="color1___3wpTZ editBtn___3mygW">删除</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import {
    GetBackRebates,
    ProduceCode,
    MewMember,
    AddProduceCode,
    GetPromotionLinks,
    EditProduceCode
} from "../../axios/api.js";
export default {
    name: "add-agent",
    data() {
        return {
            kaiHuTypeActive: 0,
            titleType: 1,
            mobile: "", // 用户名
            base: "", // 返点
            code: "", // 邀请码
            isEdit: false,
            xiaJiKaiHuType: [
                {
                    name: "精准开户"
                },
                {
                    name: "生成邀请码"
                }
            ],
            statusType: [
                {
                    name: "禁用"
                },
                {
                    name: "启用"
                }
            ],
            backRebatesList: [],
            promotionList: [],
            editForm: {
                code: "",
                status: "",
                base: ""
            }
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        $(".segmentItem___13fnL").click(function() {
            $(this)
                .addClass("active___3sLqm")
                .siblings()
                .removeClass("active___3sLqm");
        });
        $(".typeItem___RTnEd").click(function() {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
        // 赔率返点列表
        this.getBackRebates();
    },
    methods: {
        returnFn() {
            this.$router.back(-1);
        },
        // 顶部 切换
        switchTypeFn(type) {
            this.titleType = type;
            if (type == 2) {
                this.getPromotionLinks();
            }
        },
        openTypeFn(type) {
            this.kaiHuTypeActive = type;
        },
        editCode(item) {
            this.isEdit = true;
            this.editForm = {
                code: item.code,
                status: item.status,
                base: item.base
            };
        },
        statusTypeFn(index) {
            this.editForm.status = index;
        },
        hideMask() {
            this.isEdit = false;
            this.base = this.backRebatesList[0].base;
        },
        // 获取 我的邀请码
        getPromotionLinks() {
            GetPromotionLinks({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                this.promotionList = res.data;
            });
        },
        // 获取 赔率返点列表
        getBackRebates() {
            GetBackRebates({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                this.backRebatesList = res.data;
                this.base = res.data[0].base;
            });
        },
        // 选择返点
        backRebatesSelect(e) {
            this.base = e;
        },
        // 点击选码
        getProduceCode() {
            ProduceCode({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                if (res.ret == 200) {
                    this.code = res.data.code;
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        // 立即开户
        kaiHuSubmit() {
            let mobileExp = /^[A-Za-z][A-Za-z0-9]+$/;
            if (this.mobile === "") {
                this.$toast.error("请输入用户名");
                return false;
            }
            if (!mobileExp.test(this.mobile)) {
                this.$toast.error("用户名由字母或数字组成");
                return false;
            }
            let param = {
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                mobile: this.mobile,
                password: "123456",
                base: this.base
            };
            MewMember(param).then(res => {
                this.msg(res);
            });
        },
        // 生成邀请码
        addProduceCodeSubmit() {
            if (this.code === "") {
                this.$toast.error("请输入邀请码");
                return false;
            }
            let param = {
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                code: this.code,
                status: 1, // 0关闭1开启
                base: this.base
            };
            AddProduceCode(param).then(res => {
                this.msg(res);
            });
        },
        // 编辑 邀请码
        editCodeSubmit() {
            let param = this.editForm;
            param.token = this.loginInfo.token;
            param.uid = this.loginInfo.id;
            EditProduceCode(param).then(res => {
                if (res.ret == 200) {
                    this.$toast.success(res.msg);
                    this.isEdit = false;
                    setTimeout(() => {
                        this.getPromotionLinks();
                    }, 1500);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        msg(res) {
            if (res.ret == 200) {
                this.$toast.success(res.msg);
                setTimeout(() => {
                    this.$router.back(-1);
                }, 1500);
            } else {
                this.$toast.error(res.msg);
            }
        }
    }
};
</script>
<style scoped lang="less">
.am-navbar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 0.9rem;
    display: flex;
    justify-content: space-between;
    color: #ffc252;
    background: #292d30;
}

.navbar {
    flex: 1 1;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.am-navbar-left {
    padding-left: 15px;
    font-size: 16px;

    .am-navbar-left-icon {
        margin-right: 5px;
        display: inherit;

        .iconBack {
            background: url("../../assets/top_bar_back.png") 50% no-repeat;
            background-size: contain;
            width: 0.64rem;
            height: 0.64rem;
        }
    }
}

.am-navbar-title {
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 18px;
    white-space: nowrap;

    .segment___2jfIA {
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .segmentItem___13fnL {
        text-align: center;
        width: 1.8rem;
        max-width: 2rem;
        height: 0.52rem;
        font-size: 0.24rem;
        line-height: 0.5rem;
        -webkit-transition: all 0.1s linear;
        -o-transition: 0.1s all linear;
        transition: all 0.1s linear;
        background-color: #fff;
        color: #2571bf;
        border-top: 1px solid #2571bf;
        border-bottom: 1px solid #2571bf;

        &:first-child {
            border-bottom-left-radius: 4px;
            border-top-left-radius: 4px;
            border-left: 1px solid #2571bf;
        }

        &:last-child {
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
            border-right: 1px solid #2571bf;
        }

        &.active___3sLqm {
            color: #fff;
            background-color: #2571bf;
        }
    }
}

.am-navbar-right {
    -ms-flex-pack: end;
    justify-content: flex-end;
    font-size: 16px;
    margin-right: 15px;
}
</style>
