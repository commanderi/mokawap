<template>
  <div class="notice">
    <BackHeader title="公告"></BackHeader>
    <div class="content">
      <div class="am-wingblank am-wingblank-lg">
        <ul>
          <li class="listItem" v-for="(d,i) in dataList" :key="i">
            <div class="">{{ d.content_lb }}</div>
            <div class="listTime">{{ d.create_time }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { GetNotice } from '@/axios/api.js'
  export default {
    name: 'notice',
    data() {
      return {
        dataList: null
      }
    },
    components: {
      BackHeader
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      this.getNotice();
    },
    methods: {
      getNotice() {
        GetNotice().then(res => {
          this.dataList = res.data
        })
      },
    }
  }
</script>
<style scoped lang="less">

</style>
