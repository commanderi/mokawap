<template>
    <div class="InvitationList">
        <BackHeader title="邀请码列表"></BackHeader>
        <div class="InvitationList_content">
            <div class="InvitationList_content_title">
                <span>邀请码</span>
                <span>工资返点</span>
                <span>赔率</span>
                <span>状态</span>
                <span>已注册</span>
                <span>操作</span>
            </div>
            <ul class="InvitationList_content_ul" v-if="InvitationData!=null">
                <li v-for="(d,i) in InvitationData" :key="i">
                    <span>{{ d.code }}</span>
                    <span>{{ d.wage_percent*100+'%' }}</span>
                    <span>{{ d.base }}</span>
                    <span>{{ d.status==1 ? '已开启' : '已禁用' }}</span>
                    <span>{{ d.register_number }}</span>
                    <button :class="['lf_copy_btn_name'+i]" data-clipboard-action="copy" :data-clipboard-text="d.link" v-on:click="copyFn(d.link,i)">复制</button>
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
        },
        copyFn(link,index){
            const _this = this;
            let clipboard = new this.clipboard(".lf_copy_btn_name"+index);
            clipboard.on("success", function() {
                _this.$toast.success("复制成功");
            });
            clipboard.on("error", function() {
                _this.$toast.success("复制失败");
            });
        },
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
    padding: 0.22rem 2%;
    display: flex;
    justify-content:space-between;
}
.InvitationList_content_ul{
    display: block;
    width: 100%;
    height: auto;
    overflow-y: auto;
    padding: 0 2%;
    background-color: #fff;
}
.InvitationList_content_ul>li{
    padding: 0.32rem 0;
    border-bottom: 1px solid #efeeee;
    display: flex;
    justify-content:space-between;
    align-items: center;
}
.InvitationList_content_ul>li:last-child{
    border-bottom: 0px solid #efeeee;
}
.InvitationList_content_title>span{
    min-width: 16.66%;
}
.InvitationList_content_title>span:nth-of-type(4){
    min-width: 16%;
}
.InvitationList_content_title>span:nth-of-type(5){
    min-width: 16%;
}
.InvitationList_content_title>span:nth-of-type(6){
    min-width: 17.98%;
}
.InvitationList_content_ul>li>span:nth-of-type(1){
    min-width: 16.66%;
}
.InvitationList_content_ul>li>span:nth-of-type(2){
    min-width: 16.66%;
}
.InvitationList_content_ul>li>span:nth-of-type(3){
    min-width: 16.66%;
}
.InvitationList_content_ul>li>span:nth-of-type(4){
    min-width: 16%;
}
.InvitationList_content_ul>li>span:nth-of-type(5){
    min-width: 16%;
}
.InvitationList_content_ul>li>button{
    min-width: 17.98%;
    padding: 0.13rem 0;
    border-radius: 4px;
    background-color: #fdd835;
    border: 0px solid #ccc;
    color: #fff;
    font-size: 0.3rem;
}
</style>

