<template>
  <div class="login">
    <div class="header">
      <h3>新用户绑定手机号</h3>
      <span>园区采取实名制，请绑定您的手机号</span>
    </div>
    <div class="content">
      <van-field
        placeholder="手机号码"
        v-model="loginForm.login_name"
        left-icon="phone-o"
        :error-message="login_nameError"
      />
      <!-- eye -->
      <van-field
        v-if="loginWay === 'password'"
        placeholder="登录密码"
        v-model="loginForm.password"
        left-icon="lock"
        :type="passwordType"
      >
        <van-icon
          slot="right-icon"
          @click="switchPasswordType"
          :name="passwordIcon"
        />
      </van-field>
      <div class="button-wrap">
        <van-button size="large" @click="handleLogin" type="info"
          >登录</van-button
        >
      </div>
      <div class="more-wrap">
        <router-link class="link" to="/register">没有账号？去注册</router-link>
        <div class="switch-way" @click="switchLoginWay">
          {{ loginWayObj.toggleMsg }}
        </div>
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
        login_name: 'wl',
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

          this.$router.push({ path: '/wx/home' })
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
    a{
      color:#7184FA;
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
  width: 94%;
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
</style>
