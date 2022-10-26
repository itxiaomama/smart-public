<template>
  <div class="my_content">
    <div class="mybox">
      <div class="photo">
        <van-image width="70" height="70" fit="cover" round src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <span
          >{{user}}<br /><label class="complay">杭州巨安科技有限公司</label><br /><span class="address"
            ><van-icon name="location-o" />琪炜智创园</span
          ></span
        >
      </div>
      <div class="common">
        <div class="title">常用功能</div>
        <van-grid square>
          <van-grid-item v-for="(item, index) in common" :key="index" :icon=item.url :text="item.title" />
        </van-grid>
      </div>
      <div class="other">
        <div class="title">其他功能</div>
        <ul>
          <li>
            <div class="service" />
            <span>客服中心</span>
            <van-icon name="arrow" color="#9296AF" size="12"/>
          </li>
          <li>
            <div class="todo-list" />
            <span>意见反馈</span>
            <van-icon name="arrow" color="#9296AF" size="12"/>
          </li>
          <li>
            <div class="question" />
            <span>常见问题</span>
            <van-icon name="arrow" color="#9296AF"  size="12"/>
          </li>
          <li>
            <div class="warning" />
            <span>关于我们</span>
            <van-icon name="arrow" color="#9296AF" size="12"/>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/wx/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/wx/lease">
        <span>租赁</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/wx/property">
        <span>管理</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/wx/service">
        <span>服务</span>
        <template #icon="props">
          <img :src="props.active ? icon3.active : icon3.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/wx/personal">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon4.active : icon4.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from 'vant'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'personal',
  data() {
    return {
      active: 4,
      common: [
        { title: '我的绑定', url: require('@/assets/img/my/binding.png') ,path:'binding'},
        { title: '我的租赁', url: require('@/assets/img/my/myLease.png'),path:'lease' },
        { title: '我的活动', url: require('@/assets/img/my/activity.png'),path:'activity' },
        { title: '我的访客', url: require('@/assets/img/my/visitor.png'),path:'visitor' },
        { title: '我的报修', url: require('@/assets/img/my/report.png') ,path:'report'},
        { title: '我的投诉', url: require('@/assets/img/my/complaint.png'),path:'complaint' },
        { title: '我的申请', url: require('@/assets/img/my/application.png'),path:'application' }
      ],
      active:4,
      icon: {
        active: require('@/assets/img/my/home2.png'),
        inactive: require('@/assets/img/my/home.png')
      },
      icon1: {
        active: require('@/assets/img/my/lease2.png'),
        inactive: require('@/assets/img/my/lease.png')
      },
      icon2: {
        active: require('@/assets/img/my/administration2.png'),
        inactive: require('@/assets/img/my/administration.png')
      },
      icon3: {
        active: require('@/assets/img/my/service2.png'),
        inactive: require('@/assets/img/my/service.png')
      },
      icon4: {
        active: require('@/assets/img/my/my2.png'),
        inactive: require('@/assets/img/my/my.png')
      },
      code: '',
      userToken: '',
      user:''
    }
  },
  activated() {
    var that = this
    if (that.code === null || that.code === '' || that.code === 'null') {
      that.gettoken()
    }
  },
  mounted() {
    this.getCode()
  },
  methods: {
      ...mapMutations(['changeLogin']),
    gettoken() {
      var that = this
      var data = {
        park_id: 1,
        tenant_id: 2,
        redirect_uri: 'https://park.cngiantech.com/wx/personal'
      }

      axios.post('/api/system/auth/wx/code', data).then(res => {
        // window.location.href = res.data
        location.href = res.data.data
      })
    },
    getCode() {
      var that = this
      that.code = this.getQueryString('code')
      var data = {
        park_id: 1,
        tenant_id: 2,
        code: that.code
      }
      axios.post('/api/system/auth/wx/login', data).then(res => {
        Toast.success('授权登录成功')
        that.userToken = 'Bearer ' + res.data.data.access_token // 将用户token保存到vuex中
        this.changeLogin({ Authorization: that.userToken })
        if (res.data.data.is_bind_mobile === false) {
          this.$router.push({ path: '/wx/login4' }) //跳绑定手机号页面
        } 
          if (res.data.status_code === 201) {
            axios
              .get('/api/system/auth/me')
              .then(res => {
                that.user=res.data.user_name
              })
          }
      
        console.log(res.data.status_code)
      })
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg) //获取url中"?"符后的字符串并正则匹配
      var context = ''
      if (r != null) context = r[2]
      reg = null
      r = null
      return context == null || context == '' || context == 'undefined' ? '' : context
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.my_content {
  height: 100%;
  background: linear-gradient(
    180deg,
    #bed3ff 0%,
    rgba(230, 238, 255, 0.85) 18%,
    rgba(216, 228, 255, 0.75) 41%,
    rgba(223, 233, 255, 0.68) 59%,
    rgba(226, 234, 252, 0.62) 81%,
    rgba(216, 229, 255, 0.4) 100%
  );
  .mybox {
    height: 100%;
    font-weight: 600;
    width: 94%;
    margin: auto;
    .title{
      font-size: 28px;
      color:#252B50;
      font-family: "PingFang SC-Medium";
    }
    .photo {
      height: 14%;
      width: 90%;
      margin: auto;
      padding-top: 5%;
      line-height: 1.5rem;
   
      span {
        color: #252b50;
        font-size: 32px;
        margin-top: 3%;


        .complay {
          color: #636676;
          font-size: 24px;
          font-weight: 400;
        }
        .address {
          color: #252b50;
          font-weight: 400;
          font-size: 20px;
        }
      }
    }
    .common {
      background: #fff;
     border-radius: 12px 12px 12px 12px;
      padding: 3%;
    }
    .other {
    
      background: #fff;
      margin-top: 5%;
     border-radius: 12px 12px 12px 12px;
      padding: 3%;
      box-sizing: border-box;
      ul {
        margin: 5% auto;
        width: 94%;
        height: 100%;
        i {
          font-size: 48px;
          margin-top: 2%;
        }
        li {
          height: 20%;
          line-height: 50px;
          font-size: 24px;
          color: #252b50;
          font-weight: 400;
          margin:3%;
          i{
            float: right;
          }
          span {
            padding-left: 5%;
            font-size: 24px;
          }
          .service {
            width: 48px;
            height: 48px;
            background: url('../../assets/img/my/customer_service.png') no-repeat;
            background-size: cover;
            float: left;
          }
          .todo-list {
            width: 48px;
            height: 48px;
            background: url('../../assets/img/my/feedback.png') no-repeat;
            background-size: cover;
            float: left;
          }
          .question {
            width: 48px;
            height: 48px;
            background: url('../../assets/img/my/problem.png') no-repeat;
            background-size: cover;
            float: left;
          }
          .warning {
            width: 48px;
            height: 48px;
            background: url('../../assets/img/my/about.png') no-repeat;
            background-size: cover;
            float: left;
          }
        }
      }
    }
  }
}
</style>
<style>
.van-image--round {
  float: left;
  margin-right: 5%;
  border-radius: 30%;
}
[class*='van-hairline']::after {
  border: none;
}
</style>