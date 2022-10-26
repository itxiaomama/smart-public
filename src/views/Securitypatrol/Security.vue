<template>
  <div class="security_content">
    <van-tabs v-model="active" color="#32CBC7">
      <van-tab title="日常巡更" class="daily">
        <div class="dailyList" v-for="(item, index) in list" :key="index">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :title="index" name="1">
              <van-steps direction="vertical" active-color="#32CBC7" inactive-color="#9296AF">
                <van-step v-for="(job, ids) in item" :key="ids" :active="job.status === 1">
                  <span> {{ job.start_time }}~{{ job.end_time }}</span>
                  <span class="jobcontent" @click="gotodetail(job.id, job.name)"
                    >{{ job.name }}<br /><label>ID：{{ job.id }}</label></span
                  >
                </van-step>
              </van-steps>
            </van-collapse-item>
          </van-collapse>
          <!-- <span class="dailytime">{{ item.time }}</span> -->
        </div>
      </van-tab>
      <van-tab title="设备巡检" class="device">
        <van-collapse v-model="activeName2" accordion>
          <van-collapse-item title="异常情况" name="1">内容1</van-collapse-item>
          <van-collapse-item title="设施设备" name="2">内容2</van-collapse-item>
          <van-collapse-item title="装修管理" name="3">内容3</van-collapse-item>
          <van-collapse-item title="消防设施、器材" name="4">内容4</van-collapse-item>
          <van-collapse-item title="公共秩序" name="5">内容5</van-collapse-item>
          <van-collapse-item title="特殊情况" name="6">内容6</van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
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
      active: 0,
      active1: 0,
      activeNames: '1',
      activeName2: '1',
      list: [],
      token: 'Bearer '
    }
  },
  mounted() {
    this.getdata()
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
    getdata() {
      var that = this

      axios
        .get('/api/prop/patrolTask/taskList')
        .then(res => {
          if (res.status === 401) {
            this.$router.push({ path: '/wx/login3' })
          }
          if (res.status === 200) {
            that.list = res.data.data
          }
        })
        .err(alert(err.data.status))
    },
    getdata() {
      var that = this

      axios.get('/api/prop/patrolTask/taskList').then(res => {
        console.log(res.data)
        that.list = res.data.data
      })
    },
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    switchLoginWay() {
      this.password = this.code = ''
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password'
    },

    gotodetail(id, name) {
      window.location.href = '/wx/dailyPatrol?id=' + id + '&&name=' + name
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
.security_content {
  font-weight: 700;
  background: linear-gradient(180deg, rgba(167, 243, 241, 0.4) 0%, #f5f7fb 41%, #f5f7fb 60%, #f5f7fb 81%, #f5f7fb 100%);
  font-family: 'PingFang SC-Medium';
  min-height: 100%;
}

.jobcontent label {
  font-size: 20px;
  font-weight: 500;
}
.dailyList {
  margin: auto;
  min-height: 100px;
}
.listIcon {
  background: url('../../assets/img/renw.png') 50% 50% #f5f7fb no-repeat;
  background-size: cover;
  width: 50%;
  height: 100%;
  float: left;
}
::v-deep .van-step--vertical .van-step__circle-container,
::v-deep.van-step--vertical .van-step__line {
  left: 40%;
  top: 20%;
}

::v-deep.van-steps__items,
::v-deep.van-step--vertical {
  height: 108px;
}

::v-deep.van-steps--vertical {
  height: 100% !important;
  padding: 0 !important;
}

::v-deep .van-tab__pane,
.van-tab__pane-wrapper {
  width: 90%;
  margin: auto;
}
</style>
<style>
.van-step--vertical .van-step__line {
  width: 1px !important;
}
.jobcontent {
  padding: 2% 5%;
  float: right;
  width: 40%;
  background: url('../../assets/img/renw.png') 2% 50% #fff no-repeat !important;
  background-size: 17% 50%;
  padding-left: 10% !important;
  border-radius: 6px 6px 6px 6px;
}
.van-tabs__content {
  width: 94%;
  margin: 5% auto;
}

.van-steps,
.van-tabs__nav,
.van-collapse-item__content {
  background: rgba(255, 255, 255, 0);
}
.daily .van-cell--clickable {
  background: #32cbc7;
  border-radius: 6px 6px 6px 6px;
  color: #fff;
  font-size: 28px;
  width: 70%;
  padding: 10px 30px 10px 30px;
}
.daily .van-collapse-item__content {
  padding: 0;
}
.daily .van-collapse-item__wrapper {
  min-height: 100px !important;
}
.daily .van-cell__right-icon {
  color: #fff;
}
.daily .van-cell--clickable:active {
  background: #32cbc7;
}
.device .van-collapse-item {
  margin: 0 0% 2% 0%;
}

.van-icon-checked:before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background-color: #32cbc7;
  border-radius: 50%;
}
.van-step--process > .van-step__line {
  background: #32cbc7 !important;
}
</style>
