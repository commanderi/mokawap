<template>
    <div class="open-lottery-details">
        <BackHeader :title="title"></BackHeader>
        <div class="content">
            <div class="list-view-section-body">
                <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
                    <mu-list style="padding: 0;">
                        <template>
                            <li class="listItem___3Iww8" v-for="(item,i) in dataList" :key="i">
                                <div class="flex___16JOt listItemChild___3-Nq6">
                                    <div class="lastPlanNo___2-qZP">第{{item.stage}}期</div>
                                    <div class="lastOpenTime___sKspB">{{item.dateline}}</div>
                                </div>
                                <!-- PK10 -->
                                <div class="flex___16JOt openCode___2FB7l" v-if="type=='PK10'">
                                    <template v-for="(d, i) in item.number">
                                        <img :key="i" v-if="d==1" src="../../assets/pkf1.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==2" src="../../assets/pkf2.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==3" src="../../assets/pkf3.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==4" src="../../assets/pkf4.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==5" src="../../assets/pkf5.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==6" src="../../assets/pkf6.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==7" src="../../assets/pkf7.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==8" src="../../assets/pkf8.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else-if="d==9" src="../../assets/pkf9.png" class="pk10State___2NHa8"/>
                                        <img :key="i" v-else src="../../assets/pkf10.png" class="pk10State___2NHa8"/>
                                    </template>
                                </div>
                                <!-- SSC -->
                                <div class="flex___16JOt openCode___2FB7l" v-else-if="type=='SSC'">
                                    <div class="num___1g-CB" v-for="(d, i) in item.number" :key="i">{{ d }}</div>
                                    <div class="flex___16JOt sumInfo___1BYxW" v-if="item.detail">{{item.detail[0]}}|{{item.detail[1]}}</div>
                                </div>
                                <!-- K3 -->
                                <div class="flex___16JOt openCode___2FB7l" v-else-if="type=='K3'">
                                    <div class="flex___16JOt k3Bg___dhMrB">
                                        <div :class="['saizi___1zlet', 'sazi'+d] " v-for="(d, i) in item.number" :key="i"></div>
                                    </div>
                                    <div class="flex___16JOt sumInfo___1BYxW" v-if="item.detail">和值：{{item.detail[0]}}</div>
                                    <div class="flex___16JOt numInfo___8Fkkk" v-if="item.detail">{{item.detail[1]}}</div>
                                </div>
                                <!-- 六合彩 -->
                                <div class="flex___16JOt openCode___2FB7l" v-else-if="type=='LHC'">
                                    <template v-for="(n, i) in item.number">
                                        <div class="flex___16JOt sixItem___3SrwG" :key="i">
                                            <template v-if="n==10||n==41">
                                                <div class="num___1g-CB meblue">{{ n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 1 || n%11 == 2 || n%11 == 7 || n%11 == 8">
                                                <div class="num___1g-CB mered">{{ n }}</div>
                                            </template>
                                            <template v-else-if="n%11 == 3 || n%11 == 4 || n%11 == 9">
                                                <div class="num___1g-CB meblue">{{ n }}</div>
                                            </template>
                                            <template v-else>
                                                <div class="num___1g-CB megreen">{{ n }}</div>
                                            </template>
                                            <div class="animal___-vKSR">{{ item.detail[i] }}</div>
                                        </div>
                                    </template>
                                </div>
                            </li>
                        </template>
                    </mu-list>
                </mu-load-more>
            </div>
        </div>
        <!--  -->
        <div class="am-wingblank am-wingblank-lg">
            <button class="color1___3wpTZ" @click="returnFn">立即下注</button>
        </div>
    </div>
</template>
<script>
import BackHeader from "@/components/backHeader.vue";
import { mapState } from "vuex";
import { GetNewOpenNumberDetail } from "../../axios/api.js";
export default {
    name: "open-lottery-details",
    data() {
        return {
            refreshing: false,
            loading: false,
            type: "",
            title: "",
            cate: "",
            page: 1,
            last_page: 0,
            dataList: []
        };
    },
    computed: {
        ...mapState(["loginInfo"])
    },
    components: {
        BackHeader
    },
    beforeCreate() {
        $(document).scrollTop(0);
    },
    mounted() {
        this.cate = this.$route.query.id;
        this.type = this.$route.query.type;
        this.title = this.$route.query.title;
        this.getData();
    },
    methods: {
        getData() {
            GetNewOpenNumberDetail({
                token: this.loginInfo.token,
                uid: this.loginInfo.id,
                cate: this.cate,
                page: this.page
            }).then(res => {
                this.loading = false;
                let list = res.data.data;
                let dataList = this.dataList;
                for (let i = 0; i < list.length; i++) {
                    if (this.type == "SSC" || this.type == "K3" || this.type == "PK10" || this.type == "LHC") {
                        list[i].number = list[i].number.split(",");
                    }
                    dataList.push(list[i]);
                }
                this.dataList = dataList;
                this.last_page = res.data.last_page;
            });
        },
        load() {
            if (this.last_page > this.page) {
                // 总页数 > 当前页数
                this.page += 1;
                this.loading = true;
                this.getData();
            }
        },
        returnFn() {
            this.$router.back(-1);
        }
    }
};
</script>
<style scoped lang="less">
.open-lottery-details .list-view-section-body .pk10State___2NHa8 {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.04rem 0.06rem 0 0;
}
.mered {
    background-color: #e4393c !important;
    border: 1px solid #e4393c !important;
    color: #fff !important;
    width: 0.5rem;
    height: 0.5rem;
}
.meblue {
    background-color: #2f8fff !important;
    border: 1px solid #2f8fff !important;
    color: #fff !important;
    width: 0.5rem;
    height: 0.5rem;
}
.megreen {
    background-color: #60b630 !important;
    border: 1px solid #60b630 !important;
    color: #fff !important;
    width: 0.5rem;
    height: 0.5rem;
}
.open-lottery-details .content {
    padding-top: 0.9rem;
    margin-bottom: 0rem;
}
</style>
