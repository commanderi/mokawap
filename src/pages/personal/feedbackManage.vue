<template>
  <div class="feedback">
    <BackHeader title="意见反馈" rightContent="我要反馈"></BackHeader>
    <div class="content">
      <!--<div class="tabs___GR8qK">
        <div :class="['tabItem___15C8_', item.active?'active___1RQIG':'']" v-for="(item, index) in typeList" @click="getTypeZH(index)">{{item.name}}</div>
      </div>-->
      <div class="flex___16JOt date-box" style="border-bottom: 2px #f5f5f5 solid;">
        <div class="start-date-l">
          <mu-date-input v-model="start_time" placeholder="开始日期" full-width no-display @change="startDateFn"></mu-date-input>
        </div>
        <div class="date-font">至</div>
        <div class="emd-date-r">
          <mu-date-input v-model="end_time" placeholder="结束日期" full-width no-display @change="endDateFn"></mu-date-input>
        </div>
      </div>
      <div class="listItem___5wikh commissionHead___10IQ7">
        <div class="col1___15xrA">标题</div>
        <div class="col2___3-mCy">内容</div>
        <div class="col3___P77uV">回复时间</div>
      </div>
      <div class="container___20GfH" v-if="dataList.length>=1">
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list style="padding: 0;">
            <template>
              <div class="list-view-section-body" v-for="(item, index) in dataList" :key="index">
                <div class="listItem___5wikh">
                  <div class="col1___15xrA">{{item.title}}</div>
                  <div class="col2___3-mCy">{{item.content}}</div>
                  <div class="col3___P77uV">{{item.create_at}}</div>
                </div>
              </div>
            </template>
          </mu-list>
        </mu-load-more>
      </div>
      <!-- 暂无数据 -->
      <div class="flex___16JOt container___2qnaf" v-if="dataList.length<=0">
        <div class="imgError___64CBy"></div>
        <div class="errorText1___3qfol">暂无反馈</div>
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
  import { GetFeedBackList } from '../../axios/api.js'

  export default {
    name: 'feedback',
    data() {
      return {
        refreshing: false,
        loading: false,
        page: 1, // 当前页数
        last_page: 0, // 总共多少也
        start_time: '',
        end_time: '',
        typeList: [],
        dataList: []
      }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      // this.start_time = this.time(new Date().getTime())
      // this.end_time = this.time(new Date().getTime())

      this.getData()
    },
    methods: {
      getData() {
        GetFeedBackList({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          start: this.start_time,
          end: this.end_time
        }).then(res => {
          this.loading = false;
          let list = res.data.data
          let dataList = this.dataList
          for (var i = 0 ; i < list.length; i++) {
            dataList.push(list[i])
          }
          this.dataList = dataList
          this.last_page = res.data.last_page
        })
      },
      load() {
        if(this.last_page > this.page) {
          // 总页数 > 当前页数
          this.page += 1
          this.loading = true;
          this.getData()
        }
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
