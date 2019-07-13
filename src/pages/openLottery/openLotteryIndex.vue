<template>
    <div class="open-lottery-index">
        <div class="headers">
            <div class="box">
                <div class></div>
                <div class="title">开奖大厅</div>
                <div class></div>
            </div>
        </div>
        <div class="content">
            <ul class="list-view-section-body">
                <template v-for="(item, index) in dataList">
                    <li
                        class="listItem___9-JCA"
                        @click="changePage('PK10/BJPK10', {id:item.id, title: item.name})"
                        :key="index"
                        v-if="item.id==3||item.id==4"
                    >
                        <img class="listItemImg___LLQ1h" :src="item.cate_img" :alt="item.name" />
                        <div class="listItem___3Iww8">
                            <div class="flex___16JOt listItemChild___3-Nq6">
                                <div class="gameNameInChinese___2cQL3">{{item.name}}</div>
                                <div class="lastPlanNo___2-qZP">第{{item.stage}}期</div>
                                <div class="lastOpenTime___sKspB">{{item.dateline}}</div>
                            </div>
                            <!-- 北京PK拾 -->
                            <div class="flex___16JOt openCode___2FB7l">
                                <div
                                    :class="['pk10State___2NHa8', 'pk10State'+num]"
                                    v-for="(num, i) in item.number"
                                    :key="i"
                                ></div>
                            </div>
                        </div>
                    </li>
                    <li
                        class="listItem___9-JCA"
                        @click="changePage('SSC/CQSSC', {id: item.id, title: item.name})"
                        :key="index"
                        v-else
                    >
                        <img class="listItemImg___LLQ1h" :src="item.cate_img" :alt="item.name" />
                        <div class="listItem___3Iww8">
                            <div class="flex___16JOt listItemChild___3-Nq6">
                                <div class="gameNameInChinese___2cQL3">{{item.name}}</div>
                                <div class="lastPlanNo___2-qZP">第{{item.stage}}期</div>
                                <div class="lastOpenTime___sKspB">{{item.dateline}}</div>
                            </div>
                            <!-- 新疆时时彩 -->
                            <div class="flex___16JOt openCode___2FB7l">
                                <div
                                    class="num___1g-CB"
                                    v-for="(num, i) in item.number"
                                    :key="i"
                                >{{num}}</div>
                                <!--<div class="flex___16JOt numInfo___8Fkkk">大单|牛七</div>-->
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <TabBar active="3"></TabBar>
    </div>
</template>
<script>
import TabBar from "@/components/tabBar.vue";
import { mapState } from "vuex";
import { GetNewOpenNumber } from "../../axios/api.js";
export default {
    name: "open-lottery-index",
    data() {
        return {
            dataList: []
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        TabBar
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            GetNewOpenNumber().then(res => {
                let list = res.data;
                for (let i = 0; i < list.length; i++) {
                    list[i].number = list[i].number.split(",");
                    if (list[i].stage.length >= 8) {
                        list[i].stage = list[i].stage.substr(9);
                    }
                }
                this.dataList = res.data;
            });
        }
    }
};
</script>
<style scoped lang="less">
.headers {
    width: 100%;
    background: #13171a;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;

    .box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 0.2rem;
        color: #ffc252;
        font-size: 0.28rem;

        .title {
            font-size: 0.34rem;
        }

        div {
            line-height: 0.9rem;
        }
    }
}
.mered {
    background-color: #e4393c !important;
    border: 1px solid #e4393c !important;
    color: #fff !important;
}
.meblue {
    background-color: #2f8fff !important;
    border: 1px solid #2f8fff !important;
    color: #fff !important;
}
.megreen {
    background-color: #60b630 !important;
    border: 1px solid #60b630 !important;
    color: #fff !important;
}
</style>
