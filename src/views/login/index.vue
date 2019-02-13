<template>
  <div class="login-container">
    <div class="bg-wrapper"></div>
    <div class="content">
      <div class="header">
        <div class="logo">
          <svg-icon icon-class="logo"/>
        </div>
      </div>
      <div class="main-content">
        <div class="login-form__wrapper">
          <div class="input-form-group username">
            <div class="icon-wrapper">
              <svg-icon icon-class="user"/>
            </div>
            <div class="input-wrapper">
              <input v-model="loginForm.username" class="input-form" type="text" name="username" placeholder="请输入您的用户名">
            </div>
          </div>

          <div class="input-form-group password">
            <div class="icon-wrapper">
              <svg-icon icon-class="password-02"/>
            </div>
            <div class="input-wrapper">
              <input v-model="loginForm.password" class="input-form" type="password" name="password" placeholder="请输入您的密码">
            </div>
          </div>

          <div class="input-form-button">
            <button class="button" @click="login">登 录</button>
          </div>

          <div class="forget-pwd__wrapper">
            <!-- <router-link to="/resetpwd">忘记密码?</router-link> -->
            <a href="javascript:;" @click="forgetPwd">忘记密码?</a>
          </div>

        </div>
      </div>
      <div class="footer" v-if="isHidden">
        <div class="fl">
          <span class="spacing">借钱就找</span>, <span class="spacing">渤源资本</span>
        </div>
        <md-icon name="arrow-right" size="lg"></md-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { Icon, InputItem, Field, Button, Toast} from 'mand-mobile'

  export default {
    name: 'LoginPage',
    /* eslint-disable */
    components: {
      [Icon.name]: Icon,
      [InputItem.name]: InputItem,
      [Field.name]: Field,
      [Button.name]: Button
    },
    data() {
      return {
        isHidden: true,
        screenHeight: 0,
        originHeight: 0,
        loginForm: {
          username: '',
          password: '',
          rememberMe: true
        },
        redirect: ''
      }
    },
    watch: {
      screenHeight(val) {
        if (this.originHeight != val) {
          this.isHidden = false
        } else {
          this.isHidden = true
        }
      },
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted() {
      const self = this
      this.screenHeight = this.originHeight = document.body.clientHeight
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          self.screenHeight = window.screenHeight
        })()
      }
    },
    methods: {
      login() {
        if (!this.loginForm.username || !this.loginForm.password) {
          Toast.info('账号或密码不能为空哦~')
          return
        } else {
          Toast.loading('登录中')
          this.$store.dispatch('Login', this.loginForm).then(response => {
            Toast.hide()
            this.$router.push({ path: this.redirect || '/' })
          }).catch(error => {
            Toast.failed('账号或密码错误~')
            setTimeout(() => {
              Toast.hide()
            }, 3000)
          })
        }
      },
      forgetPwd() {
        Toast.info('请联系管理员重置密码~')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $textColor: #f1f1f1;

  .input-form::-webkit-input-placeholder {
    color: #ccc;
  }
  .input-form:-moz-placeholder {
    color: #ccc;
  }
  .input-form:-ms-input-placeholder {
    color: #ccc;
  }
  .login-container {
    width: 100vw;
    height: 100vh;
    background: url(../../assets/img/bg.jpg) no-repeat center center;
    background-size: cover;
    .bg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #1c3368;
      opacity: .85;
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 100;
    }
  }

  .header,
  .main-content,
  .footer {
    width: 100%;
  }

  .header {
    height: 30%;
    min-height: 300px;
    position: relative;

    .logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 150px;
      line-height: 2;
      text-align: center;
      color: #ddd;
    }
  }

  .main-content {
    height: 60%;
    .login-form__wrapper {
      width: 80%;
      height: 500px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    .input-form-group {
      width: 100%;
      height: 100px;
      background: rgba(255, 255, 255, .25);
      border-radius: 20px;
      display: flex;
      & + .input-form-group {
        margin-top: 20px;
      }
      .icon-wrapper {
        width: 120px;
        height: 100%;
        text-align: center;
        font-size: 70px;
        color: #ccc;
        line-height: 1.425;
      }
      .input-wrapper {
        flex: 1;
        .input-form {
          width: 100%;
          height: 100%;
          border: none;
          vertical-align: super;
          background: transparent;
          font-size: 30px;
          color: $textColor;
          outline: none;
        }
      }
    }
    .input-form-button {
      width: 100%;
      height: 100px;
      background-image: linear-gradient( 135deg, #fc9153 10%, #E96D71 100%);
      margin-top: 60px;
      border-radius: 50px;
      text-align: center;
      line-height: 1.3;
      box-shadow: 0 2px 4px 2px rgba(0, 0, 0, .15);
      transition: all .04s ease-in;
      .button {
        width: inherit;
        height: inherit;
        font-size: 40px;
        border: none;
        background: transparent;
        outline: none;
        color: $textColor;
        vertical-align: super;
        user-select: none;
        border-radius: inherit;
      }
      &:active {
        transform: translateY(2px);
      }
    }
    .forget-pwd__wrapper {
      width: 100%;
      height: 100px;
      text-align: center;
      font-size: 30px;
      padding-top: 20px;
      & > a {
        color: #ccc;
        text-decoration: none;
      }
    }
    
  }

  .footer {
    margin-bottom: 100px;
    font-size: 28px;
    color: #748bb5;
    display: flex;
    justify-content: center;

    .fl {
      padding-top: 5px;
    }

    .spacing {
      letter-spacing: 5px;
    }
  }
</style>
