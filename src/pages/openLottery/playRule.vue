<template>
    <div class="playRule">
        <BackHeader title="玩法说明"></BackHeader>
        <div class="content">
            <div class="box" v-html="dataInfo.play_rule"></div>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetPlayRule } from "../../axios/api.js";
export default {
    name: "playRule",
    data() {
        return {
            dataInfo: {}
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    beforeCreate() {
        $(document).scrollTop(0);
    },
    destroyed() {
        document
            .querySelector("body")
            .setAttribute("style", "background:#292d30 !important;");
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
            GetPlayRule({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                cate: this.$route.query.id
            }).then(res => {
                if (res.ret == 200) {
                    this.dataInfo = res.data;
                    setTimeout(() => {
                        $(".box ol").css({
                            display: "block",
                            width: "100%"
                        });
                    }, 100);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
.box {
    width: 100%;
}
</style>
