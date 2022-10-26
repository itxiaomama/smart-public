<template>
  <div class="login">
    <div class="header">
      <div class="logo"></div>
      <span>极力打造更专业的智慧园区</span>
    </div>
    <div class="login2_content">
      <span class="login2_titile">选择您的登录方式</span>
      <div style="margin: 16px">
        <van-button class="wechat" round block type="info" native-type="submit">微信登录</van-button>
      </div>
      <div style="margin: 16px">
        <van-button class="mobile" round block type="info" native-type="submit">手机号登录</van-button>
      </div>
    </div>
    <div class="footer">登录即代表您同意<a>《用户协议》</a>和<a>《隐私政策》</a></div>
  </div>
</template>
<script>
import { Field, Icon, Button } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        login_name: 'xu',
        password: '123456'
      },

      code: '',
      loginWay: 'password',
      passwordType: 'password',
      login_nameError: ''
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    sendVerifyCode() {
      this.login_nameError = ''
      if (!this.login_name) {
        // 根据需求做判断
        this.login_nameError = '手机号码必填'
      }
    },
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    switchLoginWay() {
      this.password = this.code = ''
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password'
    },
    handleLogin() {
      var _this = this
      axios.post('/api/system/auth', _this.loginForm).then(res => {
        if (res.data.status_code === 201) {
          sessionStorage.setItem('token', 'Bearer ' + res.data.data.access_token) //存储到本地  res 是后端返回的token
          sessionStorage.setItem('userName', this.loginForm.login_name)
          _this.changeLogin({ Authorization: 'Bearer ' + res.data.data.access_token })

          this.$router.push({ path: '/visitors' })
        }
      })
    }
  },
  computed: {
    loginWayObj: function () {
      if (this.loginWay === 'password') {
        return {
          icon: 'closed-eye',
          toggleMsg: '验证码登录'
        }
      }
      return {
        icon: 'eye',
        toggleMsg: '密码登录'
      }
    },
    passwordIcon: function () {
      return this.passwordType === 'password' ? 'closed-eye' : 'eye'
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  background: url('../../assets/img/login/login-bg.png') 0% 0% no-repeat;
  background-size: cover;
  min-height: 100%;
  font-weight: 800;
  .logo {
    background: url('../../assets/img/login/logo.png') 0% 0% no-repeat;
    height: 70px;
    margin: auto;
    width: 50%;
  }
  .footer {
    position: absolute;
    bottom: 5%;
    width: 94%;
    margin: auto;
    font-size: 24px;
    text-align: center;
    a {
      color: #7184fa;
    }
  }
}
.login2_content {
  .login2_titile {
    color: #fff;
  }
}
.header {
  margin: auto;
  color: #fff;
  align-items: center;
  padding: 20% 5%;
  h3 {
    font-size: 56px;

    margin: 10% 0% 0% 0%;
  }
  span {
    font-size: 36px;
    width: 70%;
    margin: 5% auto;
    display: block;
  }
}
.login2_content {
  width: 80%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  margin: auto;
  .button-wrap {
    width: 100%;
    height: auto;
    margin-top: 10%;

    .van-button {
      border-radius: 60px;
    }
  }
}
.more-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
  a.link {
    color: #1989fa;
  }
  .switch-way {
    color: #333;
  }
}
</style>
<style>
.login .van-cell {
  border-radius: 60px;
  margin-top: 5%;
}

.wechat {
  background: url('../../assets/img/login/Wechat.png') #fff 20% 50% no-repeat;
  color: #252b50;
  font-size: 36px;
  height: 120px;
  line-height: 120px;
}
.mobile {
  background: url('../../assets/img/login/mobile.png') #fff 20% 50% no-repeat;
  color: #252b50;
  font-size: 36px;
  height: 120px;
  line-height: 120px;
}
.wechat:hover {
  background: url('../../assets/img/login/Wechat2.png') #6377f5 20% 50% no-repeat;
  color: #fff;
}
.mobile:hover {
  background: url('../../assets/img/login/mobile2.png') #6377f5 20% 50% no-repeat;
  color: #fff;
}
.mobile > .van-button__text,
.wechat > .van-button__text {
  color: #252b50;
}
</style>
