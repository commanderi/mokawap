<template>
  <div class="collect-list">
    <BackHeader title="个人收藏" rightContent="清空收藏"></BackHeader>
    <div class="content">
      <ul class="list-view-section-body">
        <li class="markItem___2xxxi" v-for="i in num">
          <div class="listItem___16rri" @click="changePage('/lotteryPage', {})" >
            <img src="https://media.bjmoduo.com/09d860d3-0edb-47ff-844b-082a93158d42.png" alt="" class="imgLogo___2iU6F">
            <div class="listRightItem___1gyI8">
              <div class="title___1fXIB">天津时时彩</div>
              <div class="description___3MrZp">每10分钟一期</div>
            </div>
          </div>
          <div class="cancelMark___3G1FT">取消收藏</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  export default {
    name: 'collect-list',
    data() {
      return {
        num: 10
      }
    },
    components: {
      BackHeader
    },
    mounted() {

    },
    methods: {}
  }
</script>
<style scoped lang="less"></style>
