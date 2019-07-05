<template>
  <div class="gameRecord-list">
    <!-- header -->
    <BackHeader title="游戏投注记录"></BackHeader>
    <!-- -->
    <div class="content">
      <div class="flex___16JOt date-box">
        <div class="start-date-l">
          <mu-date-input v-model="start_time" placeholder="开始日期" full-width @change="startDateFn"></mu-date-input>
        </div>
        <div class="date-font">至</div>
        <div class="emd-date-r">
          <mu-date-input v-model="end_time" placeholder="结束日期" full-width @change="endDateFn"></mu-date-input>
        </div>
      </div>
      <!-- -->
      <!--  -->
      <div class="listItem___1Wjc2 commissionHead___2ZQTL">
        <div class="col1 col1___1U4LE">用户名</div>
        <div class="col2 col2___1RM10">游戏名称</div>
        <div class="col3 col3___2MrIS">投注金额</div>
        <div class="col4 col4___1YeO9">有效投注金额</div>
        <div class="col5 col5___3KLE8">派彩金额</div>
        <div class="col6 col5___3KLE8">盈亏</div>
      </div>
      <div class="table-list-box" v-if="dataList.length>=1">
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <template>
              <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index"  @click="changePage('/betRecordDetails', {id: item.id})">
                <div class="col1">{{item.username}}</div>
                <div class="col2">{{item.gameCode}}</div>
                <div class="col3">{{item.betAmount}}</div>
                <div class="col4">{{item.validBetAmount}}</div>
                <div class="col5">{{item.winAmount}}</div>
                <div class="col6">{{item.netPnl}}</div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>
      </div>
      <!-- -->
      <div class="no-data" v-if="dataList.length<=0">
        <div class="imgError___64CBy"></div>
        <div class="errorText2___1uaqX">暂无当前状态数据</div>
      </div>

    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { GetAgBettingDetail, GetIbcBettingDetail, getKyBetting_detail, getCqBetting_detail, getJdbBetting_detail } from "../../axios/api";
  export default {
    name: 'gameRecord-list',
    data() {
      return {
        refreshing: false,
        loading: false,
        start_time: '',
        end_time: '',
        page: 1, // 当前页数
        last_page: 0, // 总共多少页
        dataList: []

      }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      // this.start_time = this.defaultTime(new Date().getTime(), 's')
      // this.end_time = this.defaultTime(new Date().getTime(), 'e')
      this.getData('' , '')
    },
    methods: {
      getData(start_time, end_time) {
        let param = {
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          start_time: start_time,
          end_time: end_time,
          page: this.page
        }
        if (this.$route.query.type == 1) {
          // AG游戏记录
          GetAgBettingDetail(param).then(res => {
            this.msg(res)
          })
        } else if (this.$route.query.type == 2) {
          // 沙巴体育游戏记录
          GetIbcBettingDetail(param).then(res => {
            this.msg(res)
          })
        } else if (this.$route.query.type == 3) {
          // 开元棋牌
          getKyBetting_detail(param).then(res => {
            this.msg(res)
          })
        } else if (this.$route.query.type == 4) {
          // 传奇电子
          getCqBetting_detail(param).then(res => {
            this.msg(res)
          })
        } else if (this.$route.query.type == 5) {
          // JDB电子
          getJdbBetting_detail(param).then(res => {
            this.msg(res)
          })
        }

      },
      msg(res) {
        this.loading = false;
        let list = res.data.data
        let dataList = this.dataList
        for (var i = 0 ; i < list.length; i++) {
          dataList.push(list[i])
        }
        this.dataList = dataList
        this.last_page = res.data.last_page
      },
      load() {
        if(this.last_page > this.page) {
          // 总页数 > 当前页数
          this.page += 1
          this.loading = true;
          this.getData(this.start_time, this.end_time)
        }

      },
      startDateFn(e) {
        // console.log(e);
        this.start_time = this.time(e.getTime(), true)
        this.resetData()
        this.getData(this.start_time, this.end_time)
      },
      endDateFn(e) {
        this.end_time = this.time(e.getTime(), false)
        this.resetData()
        this.getData(this.start_time, this.end_time)
      },
      resetData(){
        this.dataList = []
        this.page = 1
      },
      // 时间戳转换成  //2017-05-08 10:31:27
      time (value, type) {
        var time = new Date(value);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        // return year+'-'+this.add(month)+'-'+this.add(date)+' '+this.add(hours)+':'+this.add(minutes)+':'+this.add(seconds);
        if(type){
          return year+'-'+this.add(month)+'-'+this.add(date)+' 00:00:00';
        }else {
          return year + '-' + this.add(month) + '-' + this.add(date) + ' 23:59:59';
        }
      },
      add(m){
        return m<10?'0'+m:m
      }
    }
  }
</script>
<style scoped lang="less">

</style>
