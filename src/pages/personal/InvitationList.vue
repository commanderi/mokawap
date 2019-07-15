<template>
    <div class="InvitationList">
        <BackHeader title="邀请码列表"></BackHeader>
        <div class="InvitationList_content">
            <div class="InvitationList_content_title">
                <span>邀请码</span>
                <span>工资返点</span>
                <span>赔率</span>
                <span>邀请码状态</span>
                <span>注册用户数</span>
                <span>操作</span>
            </div>
            <ul v-if="InvitationData!=null">
                <li v-for="(d,i) in InvitationData" :key="i">
                    <!-- // "wage_percent":   //工资返点
                    // "percent": "0.980", //邀请码赔率
                    // "status": 1, //状态
                    // "register_number": 0, //注册用户数
                    // "link": //邀请链接 -->
                    <span>{{ d.code }}</span>
                    <span>{{ d.wage_percent }}</span>
                    <span>{{ d.percent }}</span>
                    <span>{{ d.status }}</span>
                    <span>{{ d.register_number }}</span>
                    <button>{{ d.link }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPersonalInfo,GetPromotionLinks } from "../../axios/api.js";
export default {
    name: "InvitationList",
    data() {
        return {
            userInfo: {},
            InvitationData:null,
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
        this.getPromotionLinks();
    },
    methods: {
        // 获取邀请码
        getPromotionLinks() {
            GetPromotionLinks({
                token: this.loginInfo.token,
                uid: this.loginInfo.id
            }).then(res => {
                if(res.ret==200){
                    this.InvitationData = res.data;
                }
            });
        }
    }
}
</script>
<style scoped>
.InvitationList_content{
    padding-top:0.9rem; 
}
.InvitationList_content_title{
    width: 100%;
    height: auto;
}
.InvitationList_content_title>span{
    
}
</style>

