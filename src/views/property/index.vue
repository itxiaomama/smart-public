<template>
  <div class="property">
    <div class="warp">
      <span>每日一阅</span>
      <ul>
        <li><label>25</label><br /><span>今日报修</span></li>
        <li><label>3</label><br /><span>今日投诉</span></li>
        <li><label>104</label><br /><span>今日绑定</span></li>
      </ul>
    </div>
    <div class="manager">
      <label class="titile">物业管家</label>
      <ul>
        <li><span>报修工单</span><br /><span class="span2">待处理<label>0</label>单</span></li>
        <li><span>投诉建议</span><br /><span class="span2">待处理<label>0</label>单</span></li>
        <li><span>抄表录入</span></li>
        <li><span>设备巡检</span></li>
        <li @click="security"><span>安防巡更</span></li>
        <li><span>安防记录</span></li>
      </ul>
    </div>
    <div class="bill">
      <label class="titile">账单管理</label>
      <ul>
        <li>
          <span>待交费</span><br /><span class="span2"><label>320</label>元</span>
        </li>
        <li>
          <span>已交费</span><br /><span class="span2"><label>1578</label>元</span>
        </li>
        <li>
          <span>今日/30天交费</span><br /><span class="span2"><label>320</label>元</span>
        </li>
        <li><span>上门收费</span></li>
        <li><span>物业账单</span></li>
        <li><span>租赁交费</span></li>
        <li><span>停车交费</span></li>
        <li><span>统计分析</span></li>
        <li><span>搜索</span></li>
      </ul>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>物业</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>管家</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>招商</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>消息</span>
        <template #icon="props">
          <img :src="props.active ? icon3.active : icon3.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
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
      active: 0,
      icon: {
        active: require('@/assets/img/property/property.png'),
        inactive: require('@/assets/img/property/property2.png')
      },
      icon1: {
        active: require('@/assets/img/property/housekeeper.png'),
        inactive: require('@/assets/img/property/housekeeper2.png')
      },
      icon2: {
        active: require('@/assets/img/property/attract_investment.png'),
        inactive: require('@/assets/img/property/attract_investment2.png')
      },
      icon3: {
        active: require('@/assets/img/property/information.png'),
        inactive: require('@/assets/img/property/information2.png')
      },
      icon4: {
        active: require('@/assets/img/property/my.png'),
        inactive: require('@/assets/img/property/my2.png')
      }
    }
  },
  mounted() {
    //监听浏览器左上角返回事件
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  methods: {
    security() {
      this.$router.push('/wx/security')
    },
    /**
     * 点击界面返回时，刷新界面
     */
    goBack: function () {
      this.$router.push('/wx/home')
    }
  },
  //界面销毁时取消监听，防止对后续界面影响
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false)
  }
}
</script>
<style lang="scss" scoped>
.property {
  height: 100%;
  width: 96%;
  margin: auto;

  .warp {
    background: url('../../assets/img/property/read_once_a day.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 20%;
    span:nth-child(1) {
      padding-left: 10%;
      line-height: 80px;
      font-size: 32px;

      font-weight: bold;
      color: #252b50;
    }
    ul {
      background: linear-gradient(360deg, #15c4bf 0%, #99ebe9 100%);
      border-radius: 0px 0px 12px 12px;

      width: 100%;

      li {
        float: left;
        width: 33%;
        text-align: center;
        margin-top: 5%;
        line-height: 50px;
        label {
          font-size: 36px;
          font-family: D-DIN-Bold, D-DIN;
          font-weight: bold;
          color: #252b50;
        }
        span {
          font-size: 24px;

          font-weight: 500;
          color: #636676;
        }
      }
    }
  }
  .manager {
    width: 100%;
    height: 30%;
    .titile {
      float: left;
      width: 100%;
      color: #252b50;
      font-size: 28px;
      font-weight: bold;
      margin: 0% 5%;
      margin-top: 7%;
    }
    ul {
      width: 100%;
      height: 100%;
      li:nth-child(1) {
        background: url('../../assets/img/property/repair.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(2) {
        background: url('../../assets/img/property/Complaints_suggestions.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(3) {
        background: url('../../assets/img/property/meter_reading.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(4) {
        background: url('../../assets/img/property/equipment_patrol _inspection.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(5) {
        background: url('../../assets/img/property/container1.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(6) {
        background: url('../../assets/img/property/container2.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li {
        background: #ffffff;
        box-shadow: 0px 0px 20px 2px #e9eef7;
        border-radius: 12px 12px 12px 12px;
        height: 60%;
        width: 30%;
        margin-left: 3%;
        margin-top: 3%;
        line-height: 15px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        span:nth-child(1) {
          font-size: 24px;
          font-weight: 500;
          color: #252b50;
          padding-top: 16%;
          display: block;
        }
        .span2 {
          font-size: 20px;
          font-weight: 400;
          color: #636676;
          label {
            color: #fb8753;
            padding-right: 5%;
            padding-left: 5%;
          }
        }
      }
    }
  }
  .bill {
    width: 100%;
    height: 30%;
    padding-bottom: 110%;
    .titile {
      float: left;
      width: 100%;
      color: #252b50;
      font-size: 28px;
      font-weight: bold;
      margin: 0% 5%;
      margin-top: 7%;
    }
    ul {
      width: 100%;
      height: 100%;
      li:nth-child(1) {
        background: url('../../assets/img/property/container3.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(2) {
        background: url('../../assets/img/property/paid_fees.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(3) {
        background: url('../../assets/img/property/pay_today.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(4) {
        background: url('../../assets/img/property/door_to_door charging.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(5) {
        background: url('../../assets/img/property/utility_bill.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(6) {
        background: url('../../assets/img/property/rental_ payment.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(7) {
        background: url('../../assets/img/property/parking_lot.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(8) {
        background: url('../../assets/img/property/container4.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li:nth-child(9) {
        background: url('../../assets/img/property/search.png') 50% 30% no-repeat #fff;
        padding: 15% 0%;
      }
      li {
        background: #ffffff;
        box-shadow: 0px 0px 20px 2px #e9eef7;
        border-radius: 12px 12px 12px 12px;
        height: 60%;
        width: 30%;
        line-height: 15px;
        margin-left: 3%;
        margin-top: 3%;
        float: left;
        text-align: center;
        box-sizing: border-box;
        span:nth-child(1) {
          font-size: 24px;
          font-weight: 500;
          color: #252b50;
          padding-top: 16%;
          display: block;
        }
        .span2 {
          font-size: 20px;
          font-weight: 400;
          color: #636676;
          label {
            color: #fb8753;
            padding-right: 5%;
          }
        }
      }
    }
  }
}
.property ::v-deep.van-tabbar-item--active {
  color: #252b50 !important;
}
.property ::v-deep.van-tabbar-item {
  color: #9296af;
}
</style>
