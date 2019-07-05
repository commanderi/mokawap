<template>
  <div class="set-page">
    <BackHeader title="设置"></BackHeader>
    <div class="content">
      <div class="am-list">
        <div class="am-list-body" style="overflow: hidden">
          <!--<div class="am-list-item am-list-item-middle">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconAgreement___3K-BX"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">法律声明</div>
              <div class="am-list-arrow am-list-arrow-horizontal"></div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>
          <div class="am-list-item am-list-item-middle">
            <div class="am-list-thumb">
              <div class="img___2XU-u iconAbout___3QEi0"></div>
            </div>
            <div class="am-list-line">
              <div class="am-list-content">关于我们</div>
              <div class="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
            </div>
            <div class="am-list-ripple" style="display: none;"></div>
          </div>-->
        </div>
      </div>
      <!-- -->
      <div class="buttonContainer___2RiKR">
        <div class="color1___3wpTZ" @click="logoutFn">退出</div>
      </div>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'set-page',
    data() {
      return {}
    },
    computed: {
      ...mapState(['loginInfo'])
    },
    beforeCreate() {
      $(document).scrollTop(0);
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
    methods: {
      logoutFn() {
        this.$store.state.loginInfo = null
        localStorage.removeItem('loginInfo')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped lang="less">

</style>
