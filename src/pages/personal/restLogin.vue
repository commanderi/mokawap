<template>
    <div class="reset-login">
        <BackHeader title="修改登录密码"></BackHeader>
        <div class="content">
            <div class="am-list">
                <div class="am-list-body">
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-control">
                                <input v-model="form.old_password" maxlength="15" placeholder="请输入旧密码" type="password" value/>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-control">
                                <input v-model="form.new_password1" maxlength="15" placeholder="新密码(6-15位大小写字母和数字)" type="password" value/>
                            </div>
                        </div>
                    </div>
                    <div class="am-list-item am-input-item am-list-item-middle">
                        <div class="am-list-line">
                            <div class="am-input-control">
                                <input v-model="form.new_password2" maxlength="15" placeholder="请再次输入新密码" type="password" value/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttonContainer___jUMe-">
                <button class="color1___3wpTZ" @click="onSubmit">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { ModifyLoginPassword } from "../../axios/api.js";

export default {
    name: "reset-login",
    data() {
        return {
            form: {
                token: '',
                uid: '',
                old_password: "",
                new_password1: "",
                new_password2: ""
            }
        };
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
    },
    methods: {
        onSubmit() {
            this.form.token = this.loginInfo.token;
            this.form.uid = this.loginInfo.id;
            let param = this.form;
            let psdR = /^.{6,15}$/;
            if (!psdR.test(param.new_password1)) {
                this.$toast.error("请输入6-15位大小写字母和数字");
                return false;
            } else {
                if (param.new_password1 !== param.new_password2) {
                    this.$toast.error("两次密码输入不一致");
                    return false;
                }
            }
            let loading = this.$loading();
            ModifyLoginPassword(param).then(res => {
                loading.close();
                if (res.ret == 200) {
                    this.$toast.success("修改成功");
                    this.$store.state.loginInfo = null;
                    localStorage.removeItem("loginInfo");
                    setTimeout(() => {
                        this.$router.push("/");
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
