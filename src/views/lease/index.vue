<template>
  <div class="lease">
    <div class="top">
      <ul>
        <li class="active">办公场地</li>
        <li>商铺店面</li>
        <li>停车位</li>
        <li>广告位</li>
      </ul>
    </div>
    <div class="content">
      <van-dropdown-menu active-color="#6377F5">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
        <van-dropdown-item v-model="value4" :options="option4" />
      </van-dropdown-menu>
      <span class="sort"></span>
      <div class="list">
        <div class="listOne" v-for="(item, index) in list" :key="index">
          <div class="left">
            <img :src="item.img" />
            <span :class="{ leftState: Number(item.state) === 0, leftState1: Number(item.state) === 1, leftState2: Number(item.state) === 2 }">{{
              type(item.state)
            }}</span>
          </div>
          <div class="right">
            <span>{{ item.name }}</span
            ><label class="address">{{ item.address }}</label> <br /><span class="floor">{{ item.floor }}</span
            ><span class="area">{{ item.area }}</span> <br /><span v-for="(items, ids) in label" :key="ids" class="label">{{ items }}</span> <br />
            <div class="footer">
              <span class="price">{{ item.price }}</span
              ><span :class="{ state: Number(item.state) === 0, state1: Number(item.state) === 1, state2: Number(item.state) === 2 }">看房预约</span>
            </div>
          </div>
        </div>
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
// import { Field, Icon, Button } from 'vant'
// import { setToken } from '@/utils/auth'
// import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      active: 1,
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
      option1: [
        { text: '区域', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '面积', value: 0 },
        { text: '好评排序', value: 1 },
        { text: '销量排序', value: 2 }
      ],
      option3: [
        { text: '租金', value: 0 },
        { text: '好评排序', value: 1 },
        { text: '销量排序', value: 2 }
      ],
      option4: [
        { text: '筛选', value: 0 },
        { text: '好评排序', value: 1 },
        { text: '销量排序', value: 2 }
      ],
      list: [
        {
          name: 'A-1102',
          address: '琪炜智创园6幢',
          floor: '简装·11层',
          area: '179m²',
          label: '南北通透,超大阳台,地址可注册 ',
          price: '2.5元/m²·天',
          state: 0,
          img: require('@/assets/img/img1.png')
        },
        {
          name: 'B-1102',
          address: '琪炜智创园6幢',
          floor: '简装·11层',
          area: '179m²',
          label: '南北通透,超大阳台,地址可注册 ',
          price: '2.5元/m²·天',
          state: 1,
          img: require('@/assets/img/img2.png')
        },
        {
          name: 'A-1102',
          address: '琪炜智创园6幢',
          floor: '简装·11层',
          area: '179m²',
          label: '南北通透,超大阳台,地址可注册 ',
          price: '2.5元/m²·天',
          state: 2,
          img: require('@/assets/img/img3.png')
        },
        {
          name: 'B-1102',
          address: '琪炜智创园6幢',
          floor: '简装·11层',
          area: '179m²',
          label: '南北通透,超大阳台,地址可注册 ',
          price: '2.5元/m²·天',
          state: 0,
          img: require('@/assets/img/img4.png')
        },
        {
          name: 'A-1102',
          address: '琪炜智创园6幢',
          floor: '简装·11层',
          area: '179m²',
          label: '南北通透,超大阳台,地址可注册 ',
          price: '2.5元/m²·天',
          state: 1,
          img: require('@/assets/img/img1.png')
        }
      ],
      label: []
    }
  },
  activated() {
    this.getdata()
  },
  methods: {
    type(id) {
      if (id === 0) {
        return '空置'
      }
      if (id === 1) {
        return '转租'
      }
      if (id === 2) {
        return '预定'
      }
      if (id === 3) {
        return '待退'
      }
    },
    getdata() {
      for (let i = 0; i < this.list.length; i++) {
        this.label = this.list[i].label.split(',')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.lease {
  height: 100%;
  background: #f5f7fb;
  .top {
    width: 94%;
    margin: 2% auto;
    height: 7%;
    ul {
      height: 100%;
      padding-top: 2%;
      .active {
        background: url('../../assets/img/office_space.png') 0% 0% no-repeat;
        background-size: 100% 100%;
        color: #fff;
      }
      li {
        float: left;
        width: 23%;
        height: 80px;
        line-height: 80px;
        margin-left: 2%;
        background: #ffffff;
        border-radius: 12px 12px 12px 12px;
        color: #9296af;
        font-size: 28px;
        text-align: center;
      }
    }
  }
  .content {
    margin: auto;
    background: #fff;

    .listOne {
      width: 94%;
      height: 220px;
      margin: 4% auto;
    }
    .left {
      float: left;
      width: 30%;
      background: #eee;
      border-radius: 12px 12px 12px 12px;
      height: 220px;
      position: relative;
      .leftState {
        background: #6377f5;
        font-size: 20px;
        color: #fff;
        border-radius: 12px 0px 12px 0px;
        height: 28px;
        line-height: 28px;
        width: 60px;
        display: block;
        text-align: center;
        position: absolute;
        top: 0;
      }
      .leftState1 {
        background: #fb8753;
        font-size: 20px;
        color: #fff;
        border-radius: 12px 0px 12px 0px;
        height: 28px;
        line-height: 28px;
        width: 60px;
        display: block;
        text-align: center;
        position: absolute;
        top: 0;
      }
      .leftState2 {
        background: #32cbc7;
        font-size: 20px;
        color: #fff;
        border-radius: 12px 0px 12px 0px;
        height: 28px;
        line-height: 28px;
        width: 60px;
        display: block;
        text-align: center;
        position: absolute;
        top: 0;
      }
    }
    .right {
      float: left;
      line-height: 45px;
      padding-left: 5%;
      width: 65%;
      span:nth-child(1) {
        color: #252b50;
        font-size: 40px;
        font-weight: bold;
      }
      .address {
        margin-left: 5%;
      }
      .address,
      .floor {
        font-size: 24px;
        color: #636676;
        font-weight: 500;
      }
      .area {
        color: #6377f5;
        font-size: 24px;
        margin-left: 5%;
        font-weight: bold;
      }
      .label {
        font-size: 20px;
        color: #636676;
        background: #edf3ff;
        margin-left: 2%;
        padding: 2%;
        border-radius: 4px 4px 4px 4px;
      }
      .footer {
        padding-top: 5%;
        .price {
          font-weight: 500;
          color: #fb8753;
          font-size: 36px;
          float: left;
        }
        .state {
          margin-left: 17%;
          background: #6377f5;
          border-radius: 40px 40px 40px 40px;
          color: #fff;
          font-size: 24px;
          border: 2px solid #6377f5;
          width: 144px;
          display: block;
          text-align: center;
          float: left;
        }
        .state1 {
          width: 144px;
          color: #6377f5;
          border: 2px solid #6377f5;
          text-align: center;
          font-size: 24px;
          border-radius: 40px 40px 40px 40px;
          margin-left: 17%;
          display: block;
          float: left;
        }
        .state2 {
          width: 144px;
          background: #eeeeee;
          font-size: 24px;
          color: #9296af;
          border-radius: 40px 40px 40px 40px;
          margin-left: 17%;
          text-align: center;
          display: block;
          float: left;
        }
      }
    }

    .van-dropdown-menu {
      width: 90%;
    }
    .list {
      padding-bottom: 140px;
    }
    .sort {
      background: url('../../assets/img/sort.png') 0% 0% no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 2%;
      top: 10%;
      width: 48px;
      height: 48px;
    }
  }
}
::v-deep.van-dropdown-menu__bar {
  box-shadow: none;
}
::v-deep.van-tabbar {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
