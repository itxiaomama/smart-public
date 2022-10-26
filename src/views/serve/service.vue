<template>
  <div class="serve">
    <label>琪炜智创园为你提供更便捷的服务 快来选择你需要的吧~</label>
    <ul>
      <li><span>在线缴费</span><br /><span class="span2">租金、物业费、水电费~</span></li>
      <li><span>园区活动</span><br /><span class="span2">有趣的活动快来参加吧~</span></li>
      <li><span>申报申请</span><br /><span class="span2">各类政策申报、物业申请~</span></li>
      <li><span>报事报修</span><br /><span class="span2">提交报修流程，在线接单~</span></li>
      <li><span>报事报修</span><br /><span class="span2">欢迎提出各类宝贵意见~</span></li>
      <li><span>报事报修</span><br /><span class="span2">党建动态、党建学习~</span></li>
    </ul>
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
import { Field, Icon, Button } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      active:3,
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
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.serve {
  height: 100%;
  width: 96%;
  margin: 4% auto;
  overflow: hidden;
  label {
    color: #252b50;
    font-size: 28px;
    margin: 5% auto;
    font-weight: bold;
    width: 60%;
    text-align: center;
    display: block;
  }
  ul {
    height: 80%;
    width: 100%;
    line-height: 20px;
    overflow: hidden;

    li:nth-child(1) {
      background: url('../../assets/img/icon@2x.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li:nth-child(2) {
      background: url('../../assets/img/icon@2x-4.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li:nth-child(3) {
      background: url('../../assets/img/icon@2x-2.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li:nth-child(4) {
      background: url('../../assets/img/icon@2x-5.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li:nth-child(5) {
      background: url('../../assets/img/icon@2x-3.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li:nth-child(6) {
      background: url('../../assets/img/icon@2x-6.png') 50% 20% no-repeat #fff;
      background-size: 60% 40%;
    }
    li {
      width: 43%;
      float: left;
      margin: 2% auto;
      padding: 20% 5%;
      margin-left: 5%;
      box-sizing: border-box;
      text-align: center;
      box-shadow: 0px 0px 60px 2px rgba(99, 119, 245, 0.2);
      border-radius: 40px 40px 40px 40px;
      height: 20%;

      span:nth-child(1) {
        font-size: 28px;
        color: #252b50;
        font-weight: bold;
        margin-top: 15%;
        display: block;
      }
      .span2 {
        font-size: 20px;
        font-weight: 400;
        color: #9296af;
      }
    }
  }
}
</style>
