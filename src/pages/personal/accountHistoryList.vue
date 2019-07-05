<template>
  <div class="account-history-list">
    <BackHeader :title="title"></BackHeader>
    <div class="content">
      <div class="c-head">
        <div class="flex___16JOt segmentBody___8yTQa">
          <div :class="['fixSegment___2FnJf', type==''?'active___1PvS_':'']" @click="typeGetData('')">全部</div>
          <div class="segmentScroll___2zidR">
            <div :class="['segmentItem___38Trc', type==index+1?'active___1PvS_':'']"
                 v-for="(item, index) in typeList" :key="index"
                 @click="typeGetData(item.type)"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="flex___16JOt date-box ">
          <div class="box start-date-l"></div>
          <div class="box date-font">
            <mu-date-input v-model="date" placeholder="选择日期" full-width no-display @change="dateSelectFn"></mu-date-input>
          </div>
          <div class="box emd-date-r"></div>
        </div>
      </div>
      <!-- -->
      <div class="listItem___1Wjc2 commissionHead___2ZQTL">
        <div class="col1 col1___1U4LE">名称</div>
        <div class="col2 col2___1RM10">订单号</div>
        <div class="col3 col3___2MrIS">金额</div>
        <div class="col4 col4___1YeO9">余额</div>
        <div class="col5 col5___3KLE8">创建时间</div>
      </div>
      <div class="table-list-box"  v-if="dataList.length>=1">
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <template>
              <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index">
                <div class="col1">{{item.name}}</div>
                <div class="col2">{{item.order_no}}</div>
                <div class="col3">{{item.money}}</div>
                <div class="col4">{{item.balance}}</div>
                <div class="col5">{{item.create_at}}</div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>

      </div>
      <!-- -->
      <div class="no-data" v-if="dataList.length<=0">
        <div class="imgError___64CBy"></div>
        <div class="errorText2___1uaqX">暂无账户明细</div>
      </div>


    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { AccountDetail } from '../../axios/api.js'

  export default {
    name: 'account-history-list',
    data() {
      return {
        refreshing: false,
        loading: false,
        date: '',
        page: 1,
        last_page: 0,
        dataList: [],
        type: '',
        title: '',
        junior_id: '',
        typeList: [
          {
            type: 1,
            active: false,
            name: '充值'
          },
          {
            type: 2,
            active: false,
            name: '派彩'
          },
          {
            type: 3,
            active: false,
            name: '佣金'
          },
          {
            type: 4,
            active: false,
            name: '优惠'
          },
          {
            type: 5,
            active: false,
            name: '投注'
          },
          {
            type: 6,
            active: false,
            name: '反水'
          },
          {
            type: 7,
            active: false,
            name: '取消派彩'
          },
          {
            type: 8,
            active: false,
            name: '取消优惠'
          },
          {
            type: 9,
            active: false,
            name: '撤单'
          },
          {
            type: 10,
            active: false,
            name: '转入'
          },
          {
            type: 11,
            active: false,
            name: '转出'
          },
          {
            type: 12,
            active: false,
            name: '提现'
          },
          {
            type: 13,
            active: false,
            name: '取消提现'
          }
        ]
      }
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      this.date = this.time(new Date().getTime())
      //
      this.junior_id = this.$route.query.junior_id
      this.title = this.$route.query.title
      this.getData()
    },
    methods: {
      getData() {
        // exp 1充值2派彩3佣金4优惠5投注6反水7取消派彩8取消优惠9撤单10转入11转出12提现13取消提现
        AccountDetail({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          date: this.date,
          exp: this.type,
          junior_id: this.junior_id, // 	下级id ,代理获取下级账户明细时传
          page: this.page
        }).then(res => {
          this.msg(res)
        })
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
      //
      typeGetData(type) {
        this.type = type
        this.dataList = []
        this.page = 1
        this.getData()
      },
      // 选择时间
      dateSelectFn(e) {
        // console.log(e.getTime())
        // console.log(e);
        this.date = this.time(e.getTime())
        this.dataList = []
        this.page = 1
        this.getData()
      },
      load() {
        if(this.last_page > this.page) {
          // 总页数 > 当前页数
          this.page += 1
          this.loading = true;
          this.getData()
        }
      },
      // 时间戳转换成  //2017-05-08 10:31:27
      time(value){
        var time = new Date(value);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year+'-'+this.add(month)+'-'+this.add(date);
        // return year+'-'+add(month)+'-'+add(date)+' '+add(hours)+':'+add(minutes)+':'+add(seconds);
      },
      add(m){
        return m<10?'0'+m:m
      }
    }
  }
</script>
<style scoped lang="less">
  .date-box{
    .box{
      width: 33.33333%;
    }
  }
</style>
