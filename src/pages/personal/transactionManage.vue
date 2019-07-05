<template>
  <div class="transaction-manage">
    <BackHeader title="交易明细"></BackHeader>
    <div class="content">
      <div class="am-list-body">
        <div class="am-list-item am-list-item-middle" @click="changePage('/rechargeList', {type: 1, title: '充值记录'})">
          <div class="am-list-thumb">
            <div class="img___2XU-u iconPay___2H6vn"></div>
          </div>
          <div class="am-list-line">
            <div class="am-list-content">充值记录</div>
            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
          </div>
        </div>
        <div class="am-list-item am-list-item-middle" @click="changePage('/rechargeList', {type: 2, title: '提款记录'})">
          <div class="am-list-thumb">
            <div class="img___2XU-u iconWithdraw___n6jns"></div>
          </div>
          <div class="am-list-line">
            <div class="am-list-content">提款记录</div>
            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
          </div>
        </div>
        <div class="am-list-item am-list-item-middle" @click="changePage('/rechargeList', {type: 3, title: '转账记录'})">
          <div class="am-list-thumb">
            <div class="img___2XU-u iconWithdraw___n6jns"></div>
          </div>
          <div class="am-list-line">
            <div class="am-list-content">转账记录</div>
            <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'

  export default {
    name: 'transaction-manage',
    data() {
      return {}
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    components: {
      BackHeader
    },
    mounted() {
    },
    methods: {}
  }
</script>
