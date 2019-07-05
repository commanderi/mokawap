<template>
  <div class="game-record">
    <BackHeader title="投注记录"></BackHeader>
    <div class="content">
      <div class="am-list">
        <div class="am-list-header">个人</div>
        <div class="am-list-body">
          <div class="am-list-item am-list-item-middle" @click="changePage('betRecordList', {})">
            <div class="am-list-line">
              <div class="am-list-content">个人投注记录</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="am-list">
        <div class="am-list-header">游戏</div>
        <div class="am-list-body">
          <div class="am-list-item am-list-item-middle" @click="changePage('gameRecordList', {type: 1})">
            <div class="am-list-line">
              <div class="am-list-content">真人AG</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('gameRecordList', {type: 2})">
            <div class="am-list-line">
              <div class="am-list-content">沙巴体育</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('gameRecordList', {type: 3})">
            <div class="am-list-line">
              <div class="am-list-content">开元棋牌</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('gameRecordList', {type: 4})">
            <div class="am-list-line">
              <div class="am-list-content">传奇电子</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
          <div class="am-list-item am-list-item-middle" @click="changePage('gameRecordList', {type: 5})">
            <div class="am-list-line">
              <div class="am-list-content">JDB电子</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'

  export default {
    name: 'open-lottery-details',
    data() {
      return {
        num: 10
      }
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
    },
    methods: {}
  }
</script>
<style scoped lang="less">

</style>
