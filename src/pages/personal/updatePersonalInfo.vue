<template>
  <div class="updatePersonalInfo">
    <BackHeader :title="title"></BackHeader>
    <div class="content">
      <div class="am-list">
        <div class="am-list-body">

          <div class="am-list-item am-input-item am-list-item-middle" v-if="title=='绑定手机号'">
            <div class="am-list-line">
              <div class="am-input-control">
                <input type="number" v-model="tel" maxlength="11" placeholder="请输入手机号"value="">
              </div>
            </div>
          </div>
          <div class="am-list-item am-input-item am-list-item-middle" v-if="title=='真实姓名'">
            <div class="am-list-line">
              <div class="am-input-control">
                <input type="text" v-model="true_name" maxlength="11" placeholder="请输入真实姓名"value="">
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="buttonContainer___jUMe-">
        <button class="color1___3wpTZ" @click="onSubmit">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex'
  import { GetPersonalInfo, EditPersonal } from '../../axios/api.js'
  export default {
    name: 'updatePersonalInfo',
    data() {
      return {
        title: '',
        userInfo: {},
        true_name: '',
        tel: '',
        nickname: ''
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
      this.title = this.$route.query.title
      this.getPersonalInfo()
    },
    methods: {
      getPersonalInfo() {
        GetPersonalInfo({
          token: this.loginInfo.token,
          uid: this.loginInfo.id
        }).then(res =>{
          this.userInfo = res.data
          this.tel = res.data.tel
          this.true_name = res.data.true_name
          this.nickname = res.data.nickname
        })
      },
      onSubmit() {
        let telR = /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0|1|3|5|6|7|8]|18[0-9]|19[1|8|9])\d{8}$/
        if(!telR.test(this.tel)){
          this.$toast.error('请输入正确的手机号码')
          return false
        }
        let loading = this.$loading()
        EditPersonal({
          token: this.loginInfo.token,
          uid: this.loginInfo.id,
          tel: this.tel,
          true_name: this.true_name,
          nickname: this.nickname
        }).then(res => {
          loading.close()
          if(res.ret == 200) {
            this.$router.back(-1)
          }else{
            this.$toast.error(res.msg)
          }
        })
      },

    }
  }
</script>
<style scoped lang="less">
  .content{
    padding-top: .9rem;
  }
  .buttonContainer___jUMe- {
    margin: .6rem;
  }
</style>
