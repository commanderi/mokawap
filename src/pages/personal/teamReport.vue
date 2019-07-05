<template>
  <div class="team-report">
    <BackHeader title="团队报表"></BackHeader>
    <div class="content">
      <div class="flex___16JOt date-box">
        <div class="start-date-l">
          <mu-date-input v-model="start" placeholder="开始日期" full-width no-display @change="startDateFn"></mu-date-input>
        </div>
        <div class="date-font">至</div>
        <div class="emd-date-r">
          <mu-date-input v-model="end" placeholder="结束日期" full-width no-display @change="endDateFn"></mu-date-input>
        </div>
      </div>
      <!-- -->
      <div class="am-list container___5IQBA">
        <div class="am-list-body">
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">总盈亏
                <!--<div class="iconTip___2VMhH">?</div>-->
              </div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.win_lose}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">投注总金额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.betting_money}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">中奖总金额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.winning_money}} 元</div>
              </div>
            </div>
          </div>
          <!--<div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">佣金总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">0 元</div>
              </div>
            </div>
          </div>-->
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">充值总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.recharge_total}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">提款总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.withdraw_total}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">转入总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.transfer_in}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">转出总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.transfer_out}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">优惠总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.sale_money}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">返点总额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.back_money}} 元</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { GetTeamReport } from '../../axios/api.js'

  export default {
    name: 'team-report',
    data() {
      return {
        start: '',
        end: '',
        dataInfo: {}
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

      this.start = this.time(new Date().getTime(),true)
      this.end = this.time(new Date().getTime(),false)

      this.getData()
    },
    methods: {
      getData() {
        GetTeamReport({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          start: this.start,
          end: this.end
        }).then(res => {
          this.dataInfo = res.data
        })
      },
      startDateFn(e) {
        this.start = this.time(e.getTime(), true)
        this.getData()
      },
      endDateFn(e) {
        this.end = this.time(e.getTime(), false)
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
