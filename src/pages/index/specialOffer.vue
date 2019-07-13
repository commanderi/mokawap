<template>
    <div class="special-offer">
        <BackHeader title="优惠活动"></BackHeader>
        <div class="content">
            <div class="listItem___30aEI" v-for="(item, index) in dataList" :key="index" @click="changePage('/specialOfferDetails', {id: item.id})">
                <div class="title___2Pzgk">{{item.title}}</div>
                <img class="img___3qy1Q" :src="item.img_url" />
                <div class="summary___3bIKG">VIP全新升级</div>
                <div class="info___b8aGm">查看详情</div>
            </div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { GetFavourableActivity } from "@/axios/api.js";
export default {
    name: "special-offer",
    data() {
        return {
            dataList: []
        };
    },
    components: {
        BackHeader
    },
    beforeRouteLeave(to, from, next) {
        if (to.name === "index" || to.name === "personal") {
            document
                .querySelector("body")
                .setAttribute("style", "background:#292d30 !important;");
        }
        next();
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        this.getDataList();
    },
    methods: {
        getDataList() {
            GetFavourableActivity().then(res => {
                this.dataList = res.data;
            });
        }
    }
};
</script>
<style scoped lang="less">
.content {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 1.1rem 0.2rem 0.2rem;
    overflow: hidden;
    text-align: left;
    .listItem___30aEI {
        background: #fff;
        border: 1px solid #f5f5f5;
        margin: 0 auto 0.2rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.2rem 0.24rem 0;
        border-radius: 5px;
    }
    .title___2Pzgk {
        font-size: 0.32rem;
    }
    .img___3qy1Q {
        max-width: 100%;
        height: auto;
        margin: 3px auto;
        width: 100%;
    }
    .summary___3bIKG {
        font-size: 0.28rem;
        color: #999;
        line-height: 22px;
    }
    .info___b8aGm {
        border-top: 1px solid #ddd;
        font-size: 0.32rem;
        margin-top: 5px;
        line-height: 0.6rem;
    }
}
</style>
