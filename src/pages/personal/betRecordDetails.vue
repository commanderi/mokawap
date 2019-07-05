<template>
  <div class="betRecord-details">
    <BackHeader title="投注记录详情"></BackHeader>
    <div class="content">
      <!-- -->
      <div class="flex___16JOt userInfo___2YImc">
        <div class="logo___1d2J-" style="background: #67d06d;">{{headPortraitText}}</div>
        <div class="userInfoText___3RiCn">
          <div class="">
            <span>彩种名称：</span>
            {{dataInfo.cate_name}}
          </div>
          <div class="">
            <span>投注期号：</span>
            {{dataInfo.stage}}
          </div>
          <div class="">
            <span>玩法名称：</span>
            {{dataInfo.play_name}}
          </div>
        </div>
      </div>
      <!-- -->
      <div class="am-list container___5IQBA">
        <div class="am-list-body">
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">投注号码</div>
              <div class="am-list-extra">
                <div class="">{{dataInfo.number}}</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">投注金额</div>
              <div class="am-list-extra">
                <div class="">{{dataInfo.money}} 元</div>
              </div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">注数</div>
              <div class="am-list-extra">
                <div class="">{{dataInfo.note}}</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">是否开奖</div>
              <div class="am-list-extra">
                <div class="" v-if="dataInfo.state==0">未开奖</div>
                <div class="" v-if="dataInfo.state==1">已开奖</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">是否中奖</div>
              <div class="am-list-extra">
                <div class="" v-if="dataInfo.code==0">未中奖</div>
                <div class="" v-if="dataInfo.code==1">已中奖</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle" v-if="dataInfo.code==1">
            <div class="am-list-line">
              <div class="am-list-content">中奖金额</div>
              <div class="am-list-extra">
                <div class="priceUp___2qp16">{{dataInfo.z_money}} 元</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">是否已撤销</div>
              <div class="am-list-extra">
                <div class="" v-if="dataInfo.is_c==0">未撤销</div>
                <div class="" v-if="dataInfo.is_c==1">已撤销</div>
              </div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-line">
              <div class="am-list-content">投注时间</div>
              <div class="am-list-extra">
                <div class="">{{dataInfo.create_at}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- -->
      <div class="buttonContainer___jUMe-" v-if="dataInfo.state==0&&dataInfo.is_c==0">
        <button class="color1___3wpTZ" @click="cancelOrderFn">撤销投注</button>
      </div>

    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { BettingRecordDetail, GetPersonalInfo, CancelOrder } from "../../axios/api";
  export default {
    name: 'betRecord-details',
    data() {
      return {
        headPortraitText: '',
        dataInfo: {}
      }
    },
    computed: {
      ...mapState(['loginInfo'])
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');

      this.getData()
      this.getPersonalInfo()
    },
    methods: {
      getData() {
        BettingRecordDetail({
          id: this.$route.query.id,
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          this.dataInfo = res.data
        })
      },
      // 获取个人信息
      getPersonalInfo() {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          let mobile = (res.data.mobile).split('')
          this.headPortraitText = mobile[0] + mobile[mobile.length-1]
        })
      },
      cancelOrderFn() {
        let me = this;
        this.$confirm('是否要撤销该投注号码？', '提示').then(({ result }) => {
          if (result) {
            CancelOrder({
              token: me.loginInfo.token,
              uid: me.loginInfo.id,
              id: me.$route.query.id
            }).then(res => {
              if(res.ret == 200){
                me.$toast.success(res.msg)
                setTimeout(()=>{
                  this.getData()
                }, 1500)
              } else {
                me.$toast.error(res.msg)
              }
            })
          }
        })
      },
    }

  }
</script>
<style scoped lang="less">
  .am-list-extra{
    flex-basis: 70% !important;
    white-space: normal !important;
  }
  .buttonContainer___jUMe-{
    margin: 1rem .5rem;
  }
</style>
