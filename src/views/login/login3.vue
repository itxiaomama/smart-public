<template>
  <div class="login">
    <div class="header">
      <h3>用户登录</h3>
      <span>请登录您注册的手机号和密码</span>
    </div>
    <div class="content">
      <van-field placeholder="请输入手机号码" v-model="loginForm.login_name" label="86|" :error-message="login_nameError" />
      <!-- 密码-->
      <van-field
        v-if="!showP"
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field v-if="showP" v-model="sms" center clearable placeholder="请输入验证码">
        <template #button>
          <van-button size="small" color="#6377F5" type="primary" round @click="getverify()">发送验证码</van-button>
        </template>
      </van-field>
      <div class="more-wrap">
        <div class="switch-way" @click="switchLoginWay">{{ showP ? '密码登录' : '验证码登录' }}</div>
        <div class="link" to="/register">忘记密码</div>
      </div>
      <div class="button-wrap">
        <van-button size="large" @click="handleLogin" color="#6377F5" type="info">登录</van-button>
      </div>
    </div>
    <div class="footer">登录即代表您同意<a>《用户协议》</a>和<a>《隐私政策》</a></div>
  </div>
</template>
<script>
import { Field, Icon, Button, Toast } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        login_name: 'wl',
        password: '123456'
      },
      showP: false,
      code: '',
      sms: '',
      loginWay: 'password',
      passwordType: 'password',
      login_nameError: ''
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    sendVerifyCode() {
      this.login_nameError = ''
      if (!this.mobile) {
        // 根据需求做判断
        this.mobile = '手机号码必填'
      }
    },
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    switchLoginWay() {
      var that = this
      console.log(that.showP)
      that.showP = !that.showP

      that.password = that.code = ''
      that.loginWay = that.loginWay === 'password' ? 'verifyCode' : 'password'
    },
    handleLogin() {
      var that = this

      axios.post('/api/system/auth', that.loginForm).then(res => {
        if (res.data.status_code === 201) {
          Toast.success('登录成功')
          this.$router.push({ path: 'home' })
          that.userToken = 'Bearer ' + res.data.data.access_token
          console.log(that.userToken)
          this.changeLogin({ Authorization: that.userToken })
          // Cookies.set('Token', res.data.data.access_token) //登录成功后将token存储在cookie之中
          if (res.data.data.is_bind_mobile === false) {
            this.$router.push({ path: '/wx/login4' })
          } else {
            // this.$router.push({ path: '/wx/personal' })
          }
        }
      })
    },
    getverify() {
      var _this = this
      var data = {
        mobile: _this.loginForm.mobile
      }
      axios.post('/api/system/auth/m/verify', data).then(res => {
        if (res.data.status_code === 201) {
          Toast.success('验证码发送成功')
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
.header {
  width: 100%;
  color: #fff;
  align-items: center;
  padding: 10% 5%;
  h3 {
    font-size: 56px;

    margin: 10% 0% 0% 0%;
  }
  span {
    font-size: 28px;
  }

  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.content {
  width: 90%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  margin: auto;
  .button-wrap {
    width: 100%;
    height: auto;
    margin-top: 20%;

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
  font-size: 28px;
  color: #546af6;
  a.link {
    color: #546af6;
  }
}
</style>
<style>
.login .van-cell {
  border-radius: 60px;
  margin-top: 5%;
}
.content .van-cell {
  height: 100px;
  line-height: 50px;
}
</style>
