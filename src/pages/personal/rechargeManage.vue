<template>
  <div class="recharge-manage">
    <BackHeader title="充值类型" rightContent="充值明细"></BackHeader>
    <div class="content">
      <div class="flex___16JOt userInfo___19C7D">
        <div class="logo___1d2J- userImg___173Sq" style="background-color: rgb(103, 208, 109);">{{headPortraitText}}</div>
        <div class="userText___1umjg">
          <div>{{userInfo.mobile}}</div>
          <div>余额：<span>{{userInfo.money}}</span></div>
        </div>
      </div>
      <!-- -->
      <div class="flex___16JOt warn___3NMbE">
        <div class="iconInfo___266An"></div>
        充值时，部分支付渠道充值金额随机1位小数，请您在付款时确认。
      </div>
      <div>
        <div class="titleTips___2yGa5">请选择充值类型</div>
        <div class="am-list">
          <div class="am-list-body">
            <mu-container>
              <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')">
                <div slot="header"><img src="../../assets/45475.png" style="width:0.75rem;margin-right:0.1rem">微&emsp;信</div>
                <p @click="changePage('/rechargeMoney', {item: JSON.stringify(item)})" v-for="(item, index) in dataList" :key="index" v-if="item.type==1">{{ item.title }}</p>
              </mu-expansion-panel>
              <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')">
                <div slot="header"><img src="../../assets/45785.png" style="width:0.75rem;margin-right:0.1rem">支付宝</div>
                <p @click="changePage('/rechargeMoney', {item: JSON.stringify(item)})" v-for="(item, index) in dataList" :key="index" v-if="item.type==2">{{ item.title }}</p>
              </mu-expansion-panel>
              <mu-expansion-panel :expand="panel === 'panel3'" @change="toggle('panel3')">
                <div slot="header"><img src="../../assets/45786.png" style="width:0.75rem;margin-right:0.1rem">银行卡</div>
                <p @click="changePage('/rechargeMoney', {item: JSON.stringify(item)})" v-for="(item, index) in dataList" :key="index" v-if="item.type==3">{{ item.title }}</p>
              </mu-expansion-panel>
            </mu-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { GetPersonalInfo, GetRechargeWays } from '../../axios/api.js'

  export default {
    name: 'recharge-manage',
    data() {
      return {
        headPortraitText: '',
        userInfo: {},
        dataList: [],
        panel: ''
      }
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
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      //
      this.getPersonalInfo()
      this.getRechargeWays()
    },
    methods: {
      // 获取个人信息
      getPersonalInfo() {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          let mobile = (res.data.mobile).split('')
          this.headPortraitText = mobile[0] + mobile[mobile.length-1]
          this.userInfo = res.data
        })
      },
      kao:function(){
        console.log(5855)
      },
      // 获取充值方式
      getRechargeWays() {
        GetRechargeWays({
          type: 0,
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          let dataList = res.data
          this.dataList = dataList
        })
      },
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel;
      }
    }
  }
</script>
<style scoped lang="less">
.mu-expansion-panel-header>div{
  display: flex;
  justify-content:center;
  align-items:center;
}
.mu-expansion-panel-content>p{
  text-align: left;
  height: 1rem;
  line-height: 1rem;
  border-top: 1px solid #f1f1f1;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  color: #001;
}
.mu-expansion-panel-content>p:last-child{
  padding-bottom: 0;
}
.container>.mu-expansion-panel{
  padding: 0.1rem 0;
}
</style>
