<template>
    <div class="specialOffer-details">
        <BackHeader :title="title"></BackHeader>
        <div class="content">
            <div class="box" v-html="content"></div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { ActiveDetail } from "@/axios/api.js";
export default {
    name: "specialOffer-details",
    data() {
        return {
            title: "",
            content: ""
        };
    },
    components: {
        BackHeader
    },
    mounted() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#f5f5f5 !important;");
        this.getData();
    },
    methods: {
        getData() {
            ActiveDetail({
                active_id: this.$route.query.id
            }).then(res => {
                // console.log(res)
                this.title = res.data.title;
                this.content = res.data.content;
                setTimeout(() => {
                    $(".box img").css({
                        display: "block",
                        width: "100%"
                    });
                }, 100);
            });
        }
    }
};
</script>
<style scoped lang="less">
.specialOffer-details {
    .content {
        padding-top: 0.9rem;
        .box {
            width: 100%;
            overflow: hidden;
        }
    }
}
</style>
