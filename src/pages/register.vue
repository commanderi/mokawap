<template>
  <div class="register">
    <BackHeader title="注册"></BackHeader>
    <!--  -->
    <div class="center">
      <form class="form" id="register-form">
        <label for="username" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9A2.1,2.1 0 0,1 14.1,8A2.1,2.1 0 0,1 12,10.1A2.1,2.1 0 0,1 9.9,8A2.1,2.1 0 0,1 12,5.9Z"></path>
          </svg>
          <input class="form-input" id="username" placeholder="用户名(4-11位字母和数字)" v-model="form.mobile" required="" type="text"></label>
        <label for="password" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"></path>
          </svg>
          <input class="form-input" id="password" placeholder="请输入大小写字母和数字组成的6-15个字符" v-model="form.password" required="" type="password">
          <svg id="password-toggle" @click="passwordToggle" class="form-inputIcon" data-active="false"
               viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
          </svg>
        </label>
        <label for="repeatPassword" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"></path>
          </svg>
          <input class="form-input" id="repeatPassword" placeholder="确认密码" v-model="repeatPsd" required="" type="password"></label>
        <label for="validateCode" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"></path>
          </svg>
          <input class="form-input" id="validateCode" placeholder="验证码" type="text" v-model="form.code" style="width: 54%;">
          <img :src="codeImg" @click="getVerificationCode" class="form-inputImg">
        </label>
        <label for="phoneNumber" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#000000"
                  d="M16,18H7V4H16M11.5,22A1.5,1.5 0 0,1 10,20.5A1.5,1.5 0 0,1 11.5,19A1.5,1.5 0 0,1 13,20.5A1.5,1.5 0 0,1 11.5,22M15.5,1H7.5A2.5,2.5 0 0,0 5,3.5V20.5A2.5,2.5 0 0,0 7.5,23H15.5A2.5,2.5 0 0,0 18,20.5V3.5A2.5,2.5 0 0,0 15.5,1Z"></path>
          </svg>
          <input class="form-input" id="phoneNumber" placeholder="请输入11位手机号码" type="tel" v-model="form.tel">
        </label>
        <label for="affCode" class="form-inputLabel" data-required="true">
          <svg class="form-inputIcon" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M16.5,6.5A2,2 0 0,1 18.5,8.5A2,2 0 0,1 16.5,10.5A2,2 0 0,1 14.5,8.5A2,2 0 0,1 16.5,6.5M16.5,12A3.5,3.5 0 0,0 20,8.5A3.5,3.5 0 0,0 16.5,5A3.5,3.5 0 0,0 13,8.5A3.5,3.5 0 0,0 16.5,12M7.5,6.5A2,2 0 0,1 9.5,8.5A2,2 0 0,1 7.5,10.5A2,2 0 0,1 5.5,8.5A2,2 0 0,1 7.5,6.5M7.5,12A3.5,3.5 0 0,0 11,8.5A3.5,3.5 0 0,0 7.5,5A3.5,3.5 0 0,0 4,8.5A3.5,3.5 0 0,0 7.5,12M21.5,17.5H14V16.25C14,15.79 13.8,15.39 13.5,15.03C14.36,14.73 15.44,14.5 16.5,14.5C18.94,14.5 21.5,15.71 21.5,16.25M12.5,17.5H2.5V16.25C2.5,15.71 5.06,14.5 7.5,14.5C9.94,14.5 12.5,15.71 12.5,16.25M16.5,13C15.3,13 13.43,13.34 12,14C10.57,13.33 8.7,13 7.5,13C5.33,13 1,14.08 1,16.25V19H23V16.25C23,14.08 18.67,13 16.5,13Z"></path>
          </svg>
          <input class="form-input" id="affCode" placeholder="邀请码只能是字母或数字" v-model="form.invite_code" type="text" >
        </label>
      </form>
      <div class="form-btnRow"><label for="agreement" class="form-agreement">
        <input type="checkbox" class="form-agreementCheckbox" id="agreement" checked="checked">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="form-checkboxIcon">
          <path
            d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>
        </svg>
        <span class="form-agreementSpan">我已看过并同意《 <a href="javascript:void(0)" id="agreement-link">用户购彩服务协议</a>》</span></label>
        <div id="response-message">
          <div id="err-msg" aria-live="polite"></div>
          <div id="success-msg" aria-live="polite"></div>
        </div>
        <a href="javascript:void(0)" id="submit" class="btn form-registerBtn--indigo" @click="registerSubmit">立即注册</a>
        <!--<a href="javascript:void(0)" id="register-toggle" hidden="false" class="btn form-registerBtn&#45;&#45;white">免费试玩</a>-->
        <!--<a href="javascript:void(0)" class="form-returnBtn">快速登入</a>-->
      </div>
    </div>
    <footer><p>2010-2019 © <span id="siteName">摩咖娱乐</span> 版权所有。</p></footer>
  </div>
</template>
<script>
  import BackHeader from '@/components/backHeader.vue'
  import { Register } from '@/axios/api.js'

  export default {
    name: 'register',
    data() {
      return {
        codeImg: '',
        repeatPsd: '', // 重复密码
        form: {
          mobile: '',
          password: '',
          code: '',
          tel: '',
          invite_code: ''
        }
      }
    },
    components: {
      BackHeader
    },
    destroyed() {
      document.querySelector('body').setAttribute('style', 'background:#292d30 !important;');
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background:#f5f5f5 !important;');
      this.getVerificationCode()
      let that = this
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          that.registerSubmit();
        }
      }
    },
    methods: {
      getVerificationCode() {
        this.codeImg = 'http://api.vs04o.cn/login/get_verification_code?'+new Date().getTime()
      },
      // 是否显示密码
      passwordToggle() {
        let status = $("#password-toggle").attr('data-active')
        if (status == 'true') {
          $("#password-toggle").attr('data-active', false)
          $("input#password").attr('type', 'password')
          $("input#repeatPassword").attr('type', 'password')
        } else {
          $("#password-toggle").attr('data-active', true)
          $("input#password").attr('type', 'text')
          $("input#repeatPassword").attr('type', 'text')
        }
      },
      registerSubmit() {
        let form = this.form
        let mobileR = /^.{4,11}$/
        let psdR = /^.{6,15}$/
        let telR = /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0|1|3|5|6|7|8]|18[0-9]|19[1|8|9])\d{8}$/
        if(!mobileR.test(form.mobile)){
          this.$toast.error('请输入4-11位字母和数字，至少含有一个字母')
          return false
        }
        if(!psdR.test(form.password)) {
          this.$toast.error('请输入大小写字母和数字组成的6-15个字符')
          return false
        }else{
          if(this.repeatPsd !== form.password){
            this.$toast.error('两次密码输入不一致')
            return false
          }
        }
        if(form.code === '') {
          this.$toast.error('请输入验证码')
          return false
        }
        if(!telR.test(form.tel)){
          this.$toast.error('请输入正确的手机号码（首次提款需要验证）')
          return false
        }
        // if(form.invite_code === '') {
        //   this.$toast.error('请输入邀请码')
        //   return false
        // }
        if(!$("#agreement").is(':checked')){
          this.$toast.error('请勾选用户购彩服务协议')
          return false
        }
        let loading = this.$loading()
        Register(form).then(res => {
          loading.close()
          if(res.ret == 200) {
            this.$toast.success('注册成功')
            setTimeout(()=>{
              this.$router.push('/')
            }, 1500)
          }else{
            this.$toast.error(res.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .center {
    margin: .9rem auto 0;
    padding: .2rem .32rem;
    font-size: .2rem;
  }

  .form {
    width: 100%;
    margin: 0 auto;
  }

  .form-inputLabel[data-required='true'] {
    display: block;
  }

  .form-inputLabel {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    border-style: solid;
    display: none;
    margin-bottom: .32rem;
    position: relative;
    width: 100%;
  }

  .form-inputLabel[data-required='true']::before {
    color: red;
    content: '*';
    font-size: .4rem;
    left: 100%;
    padding-left: .1rem;
    position: absolute;
    top: .16rem;
  }

  .form-inputIcon {
    display: inline-block;
    margin-left: .16rem;
    vertical-align: middle;
  }

  .form-input {
    background-color: transparent;
    border-width: 0;
    box-sizing: border-box;
    display: inline-block;
    height: .8rem;
    line-height: .8rem;
    outline: none;
    vertical-align: middle;
    width: 85%;
    font-size: .24rem;
  }

  .form-input#password {
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .form-inputIcon#password-toggle {
    margin-top: 8px;
    margin-right: 0.1rem;
    float: right;
  }

  .form-btnRow {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: auto;
  }

  .form-agreement {
    cursor: pointer;
    display: block;
    font-size: .26rem;
    margin: .16rem auto;
    white-space: nowrap;
    width: 100%;
  }

  .form-agreementCheckbox {
    position: absolute;
    visibility: hidden;
  }

  .form-agreementCheckbox:checked ~ .form-checkboxIcon path {
    fill: #60b630;
  }

  .form-checkboxIcon {
    display: inline-block;
    vertical-align: middle;
  }

  .form-checkboxIcon path {
    fill: #9a9a9a;
  }

  .form-inputIcon#password-toggle[data-active='true'] path {
    fill: #f20320;
  }

  .form-inputIcon path {
    fill: #9a9a9a;
  }

  .form-agreementSpan {
    vertical-align: middle;

    a {
      color: #0348ff;
    }
  }

  .btn {
    border-radius: 6px;
    color: #4c4c4c;
    float: left;
    line-height: .82rem;
    padding: 0 .16rem;
    text-decoration: none;
  }

  .form-registerBtn--indigo {
    display: inline-block;
    float: none;
    margin: .16rem auto;
    width: 80%;
    background-color: #f20320;
    color: #fff;
    font-size: .3rem;
  }
  .form-inputImg{
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }
  .form-registerBtn--white {
    display: inline-block;
    float: none;
    margin: .16rem auto;
    width: 80%;
    background-color: #fff;
    color: #f20320;
    font-weight: bold;
  }

  .form-returnBtn {
    background-color: transparent;
    color: #f20320;
    float: left;
    font-size: 0.26rem;
    font-weight: normal;
    margin: .1rem auto 0 10%;
    text-align: left;
    text-decoration: none;
  }

  footer {
    color: #9a9a9a;
    font-size: 0.24rem;
    overflow: auto;
    text-align: center;
    width: 100%;
    padding: .3rem 0;
  }
</style>
