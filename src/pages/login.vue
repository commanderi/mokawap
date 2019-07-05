<template>
  <div class="login">
    <BackHeader title="登录"></BackHeader>
    <!--  -->
    <div class="content">
      <div class="am-wingblank am-wingblank-lg">
        <div class="am-list-item am-input-item am-list-item-middle iconInput___VRme6">
          <div class="am-list-line">
            <div class="am-input-label am-input-label-5">
              <div class="iconUser___3cul6 icon___3B8sY"></div>
            </div>
            <div class="am-input-control">
              <input maxlength="12" focus="true" v-model="form.mobile" placeholder="请输入用户名" type="text" value="">
            </div>
          </div>
        </div>
        <div class="am-list-item am-input-item am-list-item-middle iconInput___VRme6">
          <div class="am-list-line">
            <div class="am-input-label am-input-label-5">
              <div class="iconPassword___JHCfx icon___3B8sY"></div>
            </div>
            <div class="am-input-control">
              <input maxlength="16" v-model="form.password" placeholder="请输入密码" type="password" value="">
            </div>
          </div>
        </div>
        <div class="am-list-item am-input-item am-list-item-middle iconInput___VRme6">
          <div class="am-list-line">
            <div class="am-input-label am-input-label-5">
              <div class="iconValidate___1uvNw icon___3B8sY"></div>
            </div>
            <div class="am-input-control">
              <input maxlength="10" v-model="form.code" placeholder="请输入验证码" type="text" value="">
            </div>
            <div class="am-input-extra">
              <div class="">
                <!-- axios/v1/account/webapi/account/validateCode/getValidatePic?webUniqueCode=0.5801985024285998 -->
                <img class="validateImg___2eIzH" :src="codeImg" @click="getVerificationCode">
              </div>
            </div>
          </div>
        </div>
        <div class="am-wingblank" style="margin-top: .3rem;">
          <div class="optionButton">
            <div class="" @click="onlineService">
              在线客服&gt;
            </div>
            <div class="" @click="forgetPassword">
              忘记密码
            </div>
          </div>
          <button class="color1___3wpTZ" @click="loginFn">立即登录</button>
          <button class="color1___3wpTZ" @click="changePage('/register', {})">立即注册</button>
          <!--<button class="color2___1Pobv">免费试玩</button>-->
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { mapState } from 'vuex';
  import { MemberLogin, GetKefu } from '@/axios/api.js'
  export default {
    name: 'login',
    data() {
      return {
        codeImg: '',
        form: {
          mobile: '', // test
          password: '', // 000000
          code: ''
        }
      }
    },
    computed: {
      ...mapState(["host", "loginInfo"])
    },
    components: {
      BackHeader
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      //  https://www.955c3.com 账号：zhihong1 密码：qw123456
      this.getVerificationCode()
      let that = this
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          that.loginFn();
        }
      }
    },
    methods: {
      getVerificationCode() {
        this.codeImg = this.host + '/login/get_verification_code?'+new Date().getTime()
      },
      loginFn() {
        let form = this.form
        if(form.mobile === ''){
          this.$toast.error('请输入用户名')
          return false
        }
        if(form.password === '') {
          this.$toast.error('请输入密码')
          return false
        }
        if(form.code === '') {
          this.$toast.error('请输入验证码')
          return false
        }
        let loading = this.$loading()
        MemberLogin(form).then(res => {
          loading.close()
          if(res.ret == 200) {
            let data = JSON.stringify(res.data)
            this.$store.state.loginInfo = res.data  // 如更改了用户信息，同时要执行这个两句话，储存vuex
            localStorage.setItem('loginInfo', data) // 如更改了用户信息，同时要执行这个两句话，储存localStorage
            setTimeout(()=>{
              this.$router.push('/')
            })
          } else {
            this.$toast.error(res.msg);
          }
        })
      },
      forgetPassword() {
        this.$confirm('如您忘记密码，请联系在线客服帮您解决', '温馨提示').then(({ result }) => {
          if (result) {
            // 确认
          }
        })
      },
      onlineService() {
        GetKefu().then(res => {
          if(res.ret == 200) {
            window.location.href = res.data.kefu
          } else {
            this.$toast.error(res.msg)
          }
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .content{
    margin-top: .9rem;
    width: 100%;
    overflow: hidden;
  }
  .am-wingblank.am-wingblank-lg {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: .3rem;
  }
  .am-list-item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    padding-left: 15px;
    min-height: 44px;
    background-color: #fff;
    vertical-align: middle;
    overflow: hidden;
    transition: background-color .2s;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: .3rem;
  }
  .am-list-item.am-input-item {
    height: 44px;
    padding-left: 15px;
  }
  .iconInput___VRme6 {
    background: #fff;
  }
  .am-list-item .am-list-line {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1 1;
    flex: 1 1;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    padding-right: 15px;
    overflow: hidden;
    align-items: center;
  }
  .am-list-item .am-input-label {
    width: auto !important;
    color: #000;
    font-size: 17px;
    margin-left: 0;
    margin-right: 5px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    padding: 2px 0;
  }
  .iconUser___3cul6 {
    background: url(../assets/user.png) 50% no-repeat;
    background-size: contain;
  }
  .iconPassword___JHCfx {
    background: url(../assets/password.png) 50% no-repeat;
    background-size: contain;
  }
  .iconValidate___1uvNw {
    background: url(../assets/validate_code.png) 50% no-repeat;
    background-size: contain;
  }
  .icon___3B8sY {
    width: .42rem;
    height: .42rem;
  }
  .am-list-item .am-input-control {
    font-size: 17px;
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .am-list-item .am-input-control input {
    color: #000;
    font-size: .32rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    padding: 2px 0;
    border: 0;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1;
    outline: none;
    border: none;
    text-align: left;
  }
  .am-list-item .am-input-extra {
    -ms-flex: initial;
    flex: initial;
    overflow: hidden;
    padding-right: 0;
    color: #888;
    font-size: 15px;
    margin-left: 5px;
  }
  .validateImg___2eIzH {
    width: 2.4rem;
    height: .5rem;
  }
  .optionButton{
    display: flex;
    justify-content: space-between;
    margin: .3rem 0;
  }
  .color1___3wpTZ, .color2___1Pobv {
    display: block;
    outline: 0 none;
    -webkit-appearance: none;
    box-sizing: border-box;
    padding: 0;
    text-align: center;
    font-size: 18px;
    height: 47px;
    line-height: 47px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: nowrap;
    border-radius: 5px;
    opacity: 1;
    transition: opacity .3s;
    width: 100%;
    border: 0;
    margin-bottom: .3rem;
  }
  .color1___3wpTZ {
    color: #fff;
    background-color: #f57500;
  }
  .color2___1Pobv {
    color: #f57500;
    background-color: #fff;
  }
</style>
