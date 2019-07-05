<template>
  <div class="password-manage">
    <BackHeader title="安全中心"></BackHeader>
    <div class="content">
      <div class="am-list">
        <div class="am-list-body">
          <div class="am-list-item am-list-item-middle" @click="changePage('/restLogin', {})">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconLoginPassword___1SUxh"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">登录密码</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('/changeTradePassword', {})">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconRecharge___1mEQH"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">提现密码</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('/addBankCard', {})">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconBank___b1Gdo"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">绑定银行卡</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
          <!--<div class="am-list-item am-list-item-middle">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconBank___b1Gdo"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">提款信息管理</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'

  export default {
    name: 'password-manage',
    data() {
      return {}
    },
    components: {
      BackHeader
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');

    },
    methods: {}
  }
</script>
<style scoped lang="less">

</style>
