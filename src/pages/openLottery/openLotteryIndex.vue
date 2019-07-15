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
                    <!-- PK10 -->
                    <li class="listItem___9-JCA" @click="changePage('openLotteryDetails', {id:item.id, title: item.name,type:'PK10'})" :key="index" v-if="item.id==3||item.id==4">
                        <img class="listItemImg___LLQ1h" :src="item.cate_img" :alt="item.name" />
                        <div class="listItem___3Iww8">
                            <div class="flex___16JOt listItemChild___3-Nq6">
                                <div class="gameNameInChinese___2cQL3">{{item.name}}</div>
                                <div class="lastPlanNo___2-qZP">第{{item.stage}}期</div>
                                <div class="lastOpenTime___sKspB">{{item.dateline}}</div>
                            </div>
                            <div class="flex___16JOt openCode___2FB7l">
                                <div v-for="(num, i) in item.number.split(',')" :key="i" :class="['pk10State___2NHa8', 'pk10State'+num]"></div>
                            </div>
                        </div>
                    </li>
                    <!-- 时时彩 -->
                    <li class="listItem___9-JCA" @click="changePage('openLotteryDetails', {id: item.id, title: item.name,type:'SSC'})" :key="index" v-else>
                        <img class="listItemImg___LLQ1h" :src="item.cate_img" :alt="item.name" />
                        <div class="listItem___3Iww8">
                            <div class="flex___16JOt listItemChild___3-Nq6">
                                <div class="gameNameInChinese___2cQL3">{{item.name}}</div>
                                <div class="lastPlanNo___2-qZP">第{{item.stage}}期</div>
                                <div class="lastOpenTime___sKspB">{{item.dateline}}</div>
                            </div>
                            <div class="flex___16JOt openCode___2FB7l">
                                <div class="num___1g-CB" v-for="(num, i) in item.number.split(',')" :key="i">{{num}}</div>
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
            dataList: null,
            thisTime: null,
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
        let str1 = new Date().getFullYear();
        let str2 = new Date().getMonth()+1;
        let str3 = new Date().getDate();
        if(str2<'10'){str2 = '0'+str2}
        if(str3<'10'){str3 = '0'+str3}
        this.thisTime = str1+'-'+str2+'-'+str3;
    },
    methods: {
        getData() {
            GetNewOpenNumber().then(res => {
                let reg = new RegExp(this.thisTime,"g");
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].dateline = res.data[i].dateline.replace(reg,'');
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
