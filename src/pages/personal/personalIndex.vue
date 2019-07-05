<template>
  <div class="personal-index">
    <div class="topContainer___2UC_K">
      <div class="flex___16JOt topContainerItem1___2NnQ4">
        <div class="" @click="changePage('/personalInfo', {})">
          <div class="logo___1d2J- userImg___3N7cI" style="background-color: rgb(68, 177, 245);">{{headPortraitText}}</div>
        </div>
        <div class="flex___16JOt userInfo___rqYIg">
          <div class="userName___2xczY">{{userInfo.mobile}}
            <div class="iconService___BeN5z" @click="changePage('/set', {})"></div>
          </div>
          <div class="flex___16JOt topTools___2LYwZ">
            <div class="signButton___1JN1z" v-if="userInfo.is_sign_today==0" @click="signTodayFn">今日签到</div>
            <div class="signText___dleZu" v-if="userInfo.is_sign_today==1">已签到</div>
          </div>
        </div>
      </div>
      <div class="topContainerItem2____UouI">您已连续签到{{userInfo.sign_day}}天 小投注大梦想</div>
    </div>
    <!-- -->
    <div class="flex___16JOt balanceContainer___2vXKL">
      <div class="flex___16JOt balanceContainerItem1___1TSRO">
        <div class="totalMoney___WXZd-">余额:<span>{{total}}</span></div>
        <div :class="['iconSee___18kvM', isSeeActive?'iconSeeActive___24cKf':'']" @click="iconSeeActiveFn"></div>
      </div>
      <div class="platformBag___2u5Dl" @click="changePage('/walletPage', {})">钱包详情</div>
      <div class="balanceButton___1mvnF" @click="updatePersonal">刷新余额</div>
    </div>
    <!-- -->
    <div class="flex___16JOt container___2y7R5">
      <div class="itemButton___WiNyI" @click="changePage('/rechargeManage', {})">
        <div class="iconRecharge__3 iconRecharge___3AMOM"></div>
        充值
      </div>
      <div class="itemButton___WiNyI" @click="onTiKuanFn">
        <div class="iconRecharge__3 iconWithdraw___280c1"></div>
        提款
      </div>
      <div class="itemButton___WiNyI" @click="changePage('/transferManage', {})">
        <div class="iconRecharge__3 iconTransfer___3XAYX"></div>
        转账
      </div>
    </div>
    <!-- -->
    <div class="container___2mloe">
      <div class="am-flexbox menu___2L1Fk am-flexbox-wrap am-flexbox-align-center">
        <div class="listItem___2ymWf" @click="changePage('/gameRecord', {})">
          <div class="imgLogo___lVVf1 tz_record___39i2R"></div>
          <div>
            <div class="title___2Wqcz">投注记录</div>
            <div class="description___2Tb1C">查看所参与的游戏记录</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/transactionManage', {})">
          <div class="imgLogo___lVVf1 ct_record___1RITo"></div>
          <div>
            <div class="title___2Wqcz">充提记录</div>
            <div class="description___2Tb1C">查看充值提款记录</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/accountHistoryList', {title: '账目明细', junior_id: userInfo.id})">
          <div class="imgLogo___lVVf1 account___jPkmK"></div>
          <div>
            <div class="title___2Wqcz">账变明细</div>
            <div class="description___2Tb1C">查看帐户资金变动记录</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/personReport', {})">
          <div class="imgLogo___lVVf1 user_sheet___1yCmt"></div>
          <div>
            <div class="title___2Wqcz">个人报表</div>
            <div class="description___2Tb1C">查看自己的数据汇总</div>
          </div>
        </div>
      </div>
      <!-- -->
      <div class="am-flexbox menu___2L1Fk am-flexbox-wrap am-flexbox-align-center">
        <div class="listItem___2ymWf" @click="changePage('/personalInfo', {})">
          <div class="imgLogo___lVVf1 personal_info___tgD0u"></div>
          <div>
            <div class="title___2Wqcz">个人信息</div>
            <div class="description___2Tb1C">查看和编辑个人信息</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/passwordManage', {})">
          <div class="imgLogo___lVVf1 secure___2nYV_"></div>
          <div>
            <div class="title___2Wqcz">安全中心</div>
            <div class="description___2Tb1C">密码与银行卡管理</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/myMessage', {})">
          <div class="imgLogo___lVVf1 person_news___zHhbE"></div>
          <div>
            <div class="title___2Wqcz">我的消息</div>
            <div class="description___2Tb1C">查看系统</div>
          </div>
        </div>
        <!--<div class="listItem___2ymWf" @click="changePage('/collectList', {})">
          <div class="imgLogo___lVVf1 shoucang___3kvvl"></div>
          <div>
            <div class="title___2Wqcz">彩票收藏</div>
            <div class="description___2Tb1C">收藏关注的彩票</div>
          </div>
        </div>-->
      </div>
      <!-- 注意 -->
      <div class="flex___16JOt warn___3k6fM">
        <div class="iconInfo___2RS6h"></div>
        注意：代理仅适用于彩票游戏
      </div>
      <!-- -->
      <div class="am-flexbox menu___2L1Fk am-flexbox-wrap am-flexbox-align-center">
        <div class="listItem___2ymWf" @click="changePage('/agentUser', {})">
          <div class="imgLogo___lVVf1 user_manager___YNuXc"></div>
          <div>
            <div class="title___2Wqcz">用户管理</div>
            <div class="description___2Tb1C">对下级成员管理</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/agentCommission', {})">
          <div class="imgLogo___lVVf1 agent_commission___3-2c5"></div>
          <div>
            <div class="title___2Wqcz">代理佣金</div>
            <div class="description___2Tb1C">查看下级贡献的佣金</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/teamReport', {})">
          <div class="imgLogo___lVVf1 team_sheet___25WmK"></div>
          <div>
            <div class="title___2Wqcz">团队报表</div>
            <div class="description___2Tb1C">查看团队的数据汇总</div>
          </div>
        </div>
        <div class="listItem___2ymWf" @click="changePage('/agentCenter', {})">
          <div class="imgLogo___lVVf1 agent_more___1wbeT"></div>
          <div>
            <div class="title___2Wqcz">代理中心</div>
            <div class="description___2Tb1C">代理中心的所有内容</div>
          </div>
        </div>
      </div>
      <!-- -->
      <div class="am-flexbox menu___2L1Fk am-flexbox-wrap am-flexbox-align-center">
        <div class="listItem___2ymWf" @click="changePage('/specialOffer', {})">
          <div class="imgLogo___lVVf1 promotions___lYeSc"></div>
          <div>
            <div class="title___2Wqcz">福利中心</div>
            <div class="description___2Tb1C">优惠与返利</div>
          </div>
        </div>
        <!--<div class="listItem___2ymWf">
          <div class="imgLogo___lVVf1 invite_friends___3DGBF"></div>
          <div>
            <div class="title___2Wqcz">邀请好友</div>
            <div class="description___2Tb1C">邀请好友，赚取更多收益</div>
          </div>
        </div>-->
        <div class="listItem___2ymWf" @click="changePage('/feedbackManage', {})">
          <div class="imgLogo___lVVf1 feedback___3qUcz"></div>
          <div>
            <div class="title___2Wqcz">意见反馈</div>
            <div class="description___2Tb1C">意见提出与查看反馈</div>
          </div>
        </div>
        <!--<div class="listItem___2ymWf">
          <div class="imgLogo___lVVf1 help_center___1NsIk"></div>
          <div>
            <div class="title___2Wqcz">帮助中心</div>
            <div class="description___2Tb1C">新手指南</div>
          </div>
        </div>-->
      </div>

    </div>

    <!--  -->
    <TabBar active="4"></TabBar>
  </div>
</template>
<script>
  import TabBar from '@/components/tabBar.vue'
  import { mapState } from 'vuex'
  import { GetPersonalInfo, SignIn, GetWithdrawData } from '@/axios/api.js'
  export default {
    name: 'personal-index',
    data() {
      return {
        isSeeActive: true,
        total: '0.00',
        userInfo: '',
        headPortraitText: '' // 头像text(取mobile字符串的第一个和最后一个)
      }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      TabBar
    },
    beforeRouteLeave(to, from, next){
      next()
      if(to.name==='specialOffer'){
        document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      }
    },
    beforeCreate() {
      $(document).scrollTop(0);
    },
    mounted() {
      this.getPersonalInfo()
    },
    methods: {
      // 是否显示余额
      iconSeeActiveFn() {
        if (this.isSeeActive) {
          this.total = '******'
        } else {
          this.total = this.userInfo.money
        }
        this.isSeeActive = !this.isSeeActive

      },
      // 获取个人信息
      getPersonalInfo(type) {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          if(type){
            if(res.ret == 200){
              this.$toast.success('刷新成功')
            }else{
              this.$toast.error(res.msg)
            }
          }
          let mobile = (res.data.mobile).split('')
          this.headPortraitText = mobile[0] + mobile[mobile.length-1]
          this.userInfo = res.data
          this.total = res.data.money
        })
      },
      // 签到
      signTodayFn() {
        SignIn({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          if(res.ret == 200){
            this.getPersonalInfo()
          }else{
            this.$toast.error(res.msg)
          }
        })
      },
      // 刷新余额
      updatePersonal() {
        this.getPersonalInfo(true)
      },
      // 提款
      onTiKuanFn() {
        GetWithdrawData({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res => {
          if (res.ret == 200) {
            let url = ''
            if (res.data.bank_card == '') {
              // 如果没绑定银行卡
              url = '/addBankCard'
            } else {
              url = 'withdraw'
            }
            this.$router.push({
              path: url,
              query:{}
            })
          } else {
            this.$toast.error(res.msg)
          }
        })
        // changePage('/addBankCard', {})
      }
    }
  }
</script>
<style scoped lang="less">

</style>
