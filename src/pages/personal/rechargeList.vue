<template>
  <div class="recharge-list">
    <BackHeader :title="title"></BackHeader>
    <div class="content">
      <div class="tabs___GR8qK" v-if="type==3">
        <div :class="['tabItem___15C8_', item.active?'active___1RQIG':'']" v-for="(item, index) in typeList" @click="getTypeZH(index)">{{item.name}}</div>
      </div>
      <div class="flex___16JOt date-box" v-if="type==3">
        <div class="start-date-l">
          <mu-date-input v-model="start_time" placeholder="开始日期" full-width no-display @change="startDateFn"></mu-date-input>
        </div>
        <div class="date-font">至</div>
        <div class="emd-date-r">
          <mu-date-input v-model="end_time" placeholder="结束日期" full-width no-display @change="endDateFn"></mu-date-input>
        </div>
      </div>
      <!-- 充值 和 提款 记录 -->
      <div class="" v-if="type!=3">
        <div class="listItem___1Wjc2 commissionHead___2ZQTL">
          <div class="col1 col1___1U4LE">交易时间</div>
          <div class="col2 col2___1RM10">收支单号</div>
          <div class="col3 col3___2MrIS">交易状态</div>
          <div class="col4 col4___1YeO9">交易金额</div>
        </div>
        <div class="table-list-box" v-if="dataList.length>=1">
          <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <mu-list>
              <template>
                <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index">
                  <div class="col1">{{item.create_at}}</div>
                  <div class="col2">{{item.order_no}}</div>
                  <div class="col3">
                    <div class="" v-if="type==1" style="width: 100%;">
                      <span class="" v-if="item.status==0">已关闭</span>
                      <span class="blur-color" v-if="item.status==1">未完成</span>
                      <span class="red-color" v-if="item.status==2">已完成</span>
                      <span class="" v-if="item.status==3">已关闭</span>
                    </div>
                    <div class="" v-if="type==2" style="width: 100%;">
                      <span class="blur-color" v-if="item.status==1">审核中</span>
                      <span class="red-color" v-if="item.status==2">成功</span>
                      <span class="" v-if="item.status==3">失败</span>
                    </div>
                  </div>
                  <div class="col5">{{item.money}}</div>
                </div>
              </template>
            </mu-list>
          </mu-load-more>
        </div>
      </div>
      <!-- 转账记录 -->
      <div class="" v-else>
        <div class="listItem___1Wjc2 commissionHead___2ZQTL">
          <div class="col1 col1___1U4LE">订单编号</div>
          <div class="col2 col2___1RM10">转账类型</div>
          <div class="col3 col3___2MrIS">转账金额</div>
          <div class="col5 col4___1YeO9">状态</div>
          <div class="col6 col4___1YeO9">创建时间</div>
        </div>
        <div class="table-list-box" v-if="dataList.length>=1">
          <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <mu-list>
              <template>
                <div class="flex___16JOt list-box" v-for="(item, index) in dataList" :key="index">
                  <div class="col1">{{item.order_no}}</div>
                  <div class="col2">{{item.name}}</div>
                  <div class="col3">{{item.money}}</div>
                  <div class="col5">{{item.game_status}}</div>
                  <div class="col6">{{item.create_at}}</div>
                </div>
              </template>
            </mu-list>
          </mu-load-more>
        </div>
      </div>
      <!-- 暂无数据 -->
      <div class="flex___16JOt container___2qnaf" v-if="dataList.length<=0">
        <div class="imgError___64CBy"></div>
        <div class="errorText1___3qfol">暂无记录</div>
        <div class="errorText2___1uaqX">大奖不等待，速去购彩吧~</div>
        <!--<div class="buttonContainer___3tdAY">-->
          <!--<button class="color1___3wpTZ">立即充值</button>-->
        <!--</div>-->
      </div>

    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { RechargeRecord, WithdrawRecord, TransferDetail } from '../../axios/api.js'
  export default {
    name: 'recharge-list',
    data() {
      return {
        refreshing: false,
        loading: false,
        type: '',
        title: '',
        page: 1, // 当前页数
        last_page: 0, // 总共多少也
        dataList: [],
        cate: 21,
        start_time: '',
        end_time: '',
        typeList: [
          {
            name: '真人AG',
            cate: 21,
            active: true
          },
          {
            name: '沙巴体育',
            cate: 27,
            active: false
          },
          {
            name: '开元棋牌',
            cate: 35,
            active: false
          },
          {
            name: 'JDB电子',
            cate: 36,
            active: false
          },
          {
            name: '传奇电子',
            cate: 37,
            active: false
          }
        ]
      }
    },
    beforeCreate() {
      $(document).scrollTop(0);
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');

      this.type = this.$route.query.type
      this.title = this.$route.query.title
      // this.start_time = this.time(new Date().getTime())
      // this.end_time = this.time(new Date().getTime())
      //
      this.getData()
    },
    methods: {
      getData() {
        let param = {
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          page: this.page
        }
        if(this.type == 1){
          // 充值记录
          RechargeRecord(param).then(res => {
            this.msg(res)
          })
        } else if(this.type == 2){
          // 提款记录
          WithdrawRecord(param).then(res => {
            this.msg(res)
          })
        } else if(this.type == 3){
          // 转账记录
          TransferDetail({
            cate: this.cate, // 21 AG; 27 沙巴体育
            start_time: this.start_time,
            end_time: this.end_time,
            token: this.loginInfo.token,
            uid: this.loginInfo.id,
            page: this.page
          }).then(res => {
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
      getTypeZH(index) {
        let typeList = this.typeList
        for(var i = 0 ; i < typeList.length ; i++) {
          typeList[i].active = false
        }
        typeList[index].active = true
        this.cate = typeList[index].cate
        this.dataList = []
        this.page = 1
        this.getData()
      },
      startDateFn(e) {
        this.start_time = this.time(e.getTime(), true)
        this.dataList = []
        this.page = 1
        this.getData()
      },
      endDateFn(e) {
        this.end_time = this.time(e.getTime(), false)
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
  .listItem___1Wjc2.commissionHead___2ZQTL{
    margin-top: 0;
  }
  .listItem___1Wjc2.commissionHead___2ZQTL,
  .flex___16JOt.list-box{
    div{
      width: 25%;
    }
  }
  .blur-color{
    color: #538135;
  }
  .red-color{
    color: #f20320;
  }
</style>
