<template>
  <div class="add-feedback">
    <BackHeader title="意见反馈"></BackHeader>
    <div class="content">
      <div class="container___2eirO">
        <div class="am-list-item am-input-item am-list-item-middle feedbackInput___2vKlF">
          <div class="am-list-line" style="padding-bottom: .2rem;">
            <div class="am-input-label am-input-label-3">标题</div>
            <div class="am-input-control">
              <input maxlength="25" v-model="title" placeholder="请输入反馈标题" type="text" value="">
            </div>
          </div>
        </div>
        <div class="feedbackInput___2vKlF am-list-item am-textarea-item am-textarea-item-single-line">
          <div class="am-textarea-label am-textarea-label-3">内容</div>
          <div class="am-textarea-control wang">
            <textarea maxlength="100" v-model="content" placeholder="请输入反馈内容" rows="1"></textarea>
          </div>
        </div>
        <div class="buttonContainer___3tU5D">
          <button class="color1___3wpTZ" @click="onSubmit">提交</button>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { AddFeedBack } from '../../axios/api.js'

  export default {
    name: 'add-feedback',
    data() {
      return {
        title: '',
        content: ''
      }
    },
    computed: {
      ...mapState(["loginInfo"])
    },
    components: {
      BackHeader
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');

    },
    methods: {
      onSubmit() {
        if(this.title === '') {
          this.$toast.error('请输入标题')
          return false
        }
        if(this.content === '') {
          this.$toast.error('请输入内容')
          return false
        }
        let param = {
          title: this.title,
          content: this.content,
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }
        let loading = this.$loading()
        AddFeedBack(param).then(res => {
          loading.close()
          if(res.ret == 200){
            this.$toast.success(res.msg)
            setTimeout(() => {
              this.$router.back(-1)
            }, 1500)
          } else {
            this.$toast.error(res.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">

</style>
