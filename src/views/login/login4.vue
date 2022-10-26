<template>
  <div class="login">
    <div class="header">
      <h3>新用户绑定手机号</h3>
      <span>园区采用实名制，请绑定您的手机号</span>
    </div>
    <div class="content">
      <van-field placeholder="请输入手机号码" v-model="loginForm.mobile" label="86|" :error-message="login_nameError" />
      <!-- 密码-->
     
      <van-field  v-model="loginForm.verify" center clearable placeholder="请输入验证码">
        <template #button>
          <van-button size="small" color="#6377F5" type="primary" round @click="getverify()">发送验证码</van-button>
        </template>
      </van-field>
      
      <div class="button-wrap">
        <van-button size="large" @click="handleLogin" color="#6377F5" type="info">登录</van-button>
      </div>
    </div>
    <div class="footer">登录即代表您同意<a>《用户协议》</a>和<a>《隐私政策》</a></div>
  </div>
</template>
<script>
import { Field, Icon, Button } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import { Toast } from 'vant'
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        verify: ''
      },
      code: '',
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
      console.log("绑定流程")
      var _this = this
      var data = {
        mobile: _this.loginForm.mobile,
        verify: _this.loginForm.verify,
        code:_this.$route.query.code
      }
      console.log(data)

      axios.post('/api/system/auth/wx/bind', data).then(res => {
        if (res.data.status_code === 201) {
          
          Toast.success('绑定成功')
          this.$router.push({ path: 'wx/guard' })
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
