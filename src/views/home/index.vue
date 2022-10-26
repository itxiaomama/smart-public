<template>
  <div class="home">
    <div class="one">
      <div class="top">
        <div class="left">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
        <div class="right">
          <ul>
            <li><span class="information"></span></li>
            <li><span class="search"></span></li>
            <li><span>20~32°C</span><br /><span>小雨转大雨</span></li>
            <li><span class="cloud"></span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="two">
      <div class="left">看房租房<br /><span>海量好房等你来</span><br /><span class="btn">去预约</span></div>
      <div class="right"><span>访客预约</span><span>企业入驻</span></div>
    </div>
    <div class="three">
      <div class="top">
        <span class="top_title"><span>今日</span>速递</span>
        <van-notice-bar
          mode="link"
          background="#EDF3FF"
          color="#252B50"
          left-label="今日速递"
          scrollable
          text="智慧园区采用信息化、平台化管理，带来的..."
        />
      </div>
      <ul class="icon">
        <van-swipe class="my-swipe" indicator-color="#6377F5" :loop="false">
          <van-swipe-item>
            <van-grid :column-num="4">
              <van-grid-item v-for="(item, index) in common.front" :key="index" :icon="item.url" :text="item.title" />
            </van-grid>
          </van-swipe-item>
          <van-swipe-item>
            <van-grid :column-num="4">
              <van-grid-item v-for="(item, index) in common.second" :key="index" :icon="item.url" :text="item.title" />
            </van-grid>
          </van-swipe-item>
        </van-swipe>
      </ul>
      <van-swipe class="my-swipe swipe_img" indicator-color="#6377F5">
        <van-swipe-item>
          <div class="banner"><label>智慧停车系统正式上线</label><br /><span>光速识别 无感停车</span></div></van-swipe-item
        >
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="four">
      <div class="title">
        热门房源<span>查看更多<van-icon name="arrow" /></span>
      </div>
      <ul>
        <li><span>2元/m²/天</span></li>
        <li><span>2元/m²/天</span></li>
        <li><span>2元/m²/天</span></li>
      </ul>
    </div>
    <div class="five">
      <div class="title">园区概况</div>
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="(item, index) in list" :title="item" :key="index">
          <ul>
            <li><span>13,922</span><br /><label>园区总人数</label></li>
            <li><span>112</span><br /><label>物业人员</label></li>
            <li><span>25,774</span><br /><label>今日进出人员</label></li>
            <li><span>7,906</span><br /><label>今日进出车辆</label></li>
          </ul>
          <span class="tab"><span class="active">人员</span><span>车辆</span></span>
          <span class="ech_Title">园区进出统计</span>

          <div id="main" :style="{ width: '100%', height: '240px' }"></div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="six">
      <div class="title">园区服务</div>
      <span class="span1">服务有方<br /><label>物业/招商/交费</label><br /><span>立即查看</span></span>
      <span class="span2">惠企有为<br /><label>政策/人才/服务</label><br /><span>立即查看</span></span>
    </div>
    <div class="seven">
      <div class="title">
        园区活动<span>查看更多<van-icon name="arrow" /></span>
      </div>

      <div class="content">
        <div class="top">
          <span class="topSpan">报名<label class="topLabel">活动</label></span
          ><span>发布时间:2022-05-17 15:45:23</span>
          <span
            ><span class="num"><label>￥</label>0</span><span>/不限人数</span></span
          >
        </div>
        <label class="contentTit">每月一次园区大事记要开始咯！！！快来看看吧~</label>

        <span class="text"
          >园区大集市是我们园区每月一次的大型活动，整个园区的人员都可以参加，大家可以以摆摊的形式售卖，物品类别不限，快来参加吧！</span
        >

        <div class="tp">
          <span class="img"></span>
          <span>活动时间：<span>05-28</span> 至 <span>05-30</span></span
          ><br /><label>报名截止<span>15:45:23</span></label> <br /><span class="sign_up">立即报名</span>
        </div>
      </div>
    </div>
    <div class="eight">
      <div class="title">
        园区资讯<span @click="parkClick">查看更多<van-icon name="arrow" /></span>
      </div>
      <div class="content">
        <ul>
          <li>
            <div class="left">
              <span class="leTitle">智慧园区采用信息化、平台化管理，带来的好处是什么，还有...</span>
              <span class="leText">随着“互联网+”、“一带一路”等战略的深入推进，各式各样的产业园区...</span><br />
              <span class="footer"><label>政策</label>2022-04-17 12:35</span>
            </div>
            <div class="right"><span></span><span>3578</span><span>369</span></div>
          </li>
          <li>
            <div class="left">
              <span class="leTitle">智慧园区采用信息化、平台化管理，带来的好处是什么，还有...</span>
              <span class="leText">随着“互联网+”、“一带一路”等战略的深入推进，各式各样的产业园区...</span><br />
              <span class="footer"><label>法律</label>2022-04-17 12:35</span>
            </div>
            <div class="right"><span></span><span>3578</span><span>369</span></div>
          </li>
          <li>
            <div class="left">
              <span class="leTitle">智慧园区采用信息化、平台化管理，带来的好处是什么，还有...</span>
              <span class="leText">随着“互联网+”、“一带一路”等战略的深入推进，各式各样的产业园区...</span><br />
              <span class="footer"><label>生活</label>2022-04-17 12:35</span>
            </div>
            <div class="right"><span></span><span>3578</span><span>369</span></div>
          </li>
        </ul>
      </div>
      <span class="last">我已经到底了(ㄒoㄒ)~~</span>
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
import { Field, Icon, Button } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import * as echarts from 'echarts'
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      value1: 0,
      option1: [
        { text: '琪炜智创园', value: 0 },
        { text: '广泽小区', value: 1 },
        { text: '萧山经济开发区', value: 2 }
      ],
      common: {
        front: [
          { title: '园区中心', url: require('@/assets/img/home/home1.png'), path: 'binding' },
          { title: '物业中心', url: require('@/assets/img/home/home2.png'), path: 'lease' },
          { title: '企业中心', url: require('@/assets/img/home/home3.png'), path: 'activity' },
          { title: '招商中心', url: require('@/assets/img/home/home4.png'), path: 'visitor' },
          { title: '租赁中心', url: require('@/assets/img/home/home5.png'), path: 'report' },
          { title: '交费中心', url: require('@/assets/img/home/home6.png'), path: 'complaint' },
          { title: '服务中心', url: require('@/assets/img/home/home7.png'), path: 'application' },
          { title: '管家中心', url: require('@/assets/img/home/home8.png'), path: 'application' }
        ],
        second: [
          { title: '园区中心', url: require('@/assets/img/home/home1.png'), path: 'binding' },
          { title: '物业中心', url: require('@/assets/img/home/home2.png'), path: 'lease' },
          { title: '企业中心', url: require('@/assets/img/home/home3.png'), path: 'activity' }
        ]
      },
      list: ['园区概况', '企业概况', '招商概况', '招商概况', '商家概况'],
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
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts()
    })
  },
  methods: {
    initEcharts() {
      let base = +new Date(1988, 9, 3)
      let oneDay = 24 * 3600 * 1000
      let data = [[base, Math.random() * 300]]
      for (let i = 1; i < 50; i++) {
        let now = new Date((base += oneDay))
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: ''
        },

        toolbox: {
          show: false,

          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          splitLine: {
            show: false //去掉网格线
          },
          axisLine: {
            //x轴坐标轴，false为隐藏，true为显示
            show: false
          },
          axisTick: {
            //x轴刻度线
            show: false
          },
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          splitLine: {
            show: false //去掉网格线
          },
          axisLine: {
            //x轴坐标轴，false为隐藏，true为显示
            show: false
          },
          axisTick: {
            //x轴刻度线
            show: false
          },
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            borderColor: '#8FDFFE',
            backgroundColor: '#8fdffe99',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data,
            itemStyle: {
              color: 'rgba(135, 152, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(135, 152, 255, 0.1)'
                },
                {
                  offset: 1,
                  color: 'rgba(99, 119, 245, 1)'
                }
              ])
            }
          }
        ]
      }
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(option) // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    parkClick() {
      this.$router.push('/wx/news')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  font-family: 'PingFang SC-Medium';
  height: 100%;
  .one,
  .two,
  .three,
  .four,
  .five,
  .six,
  .seven,
  .eight {
    width: 94%;
    margin: auto;
  }
  ul li {
    float: left;
  }
  .left {
    float: left;
    width: 50%;
  }
  .right {
    float: right;
    width: 50%;
    height: 100%;
    ul li {
      line-height: 30px;
    }
  }
}
.title {
  font-size: 36px;
  font-weight: bold;
  color: #252b50;

  span {
    float: right;
    font-size: 24px;
    font-weight: 400;
    color: #636676;
  }
}
.one {
  height: 7%;
  line-height: 40px;
  .right {
    margin-top: 3%;
  }
  ::v-deep .left {
    height: 90px;
    display: flex;
    align-items: center;
    .van-dropdown-menu {
      width: 80%;
      .van-dropdown-menu__title {
        line-height: 90px;
        .van-ellipsis {
          font-size: 32px;
        }
      }
      ::v-deep .van-dropdown-menu__title::after {
        border: 11px solid;
      }
      .van-cell__title {
        font-size: 28px;
        line-height: 56px;
      }
    }
  }
  ::v-deep .van-dropdown-menu__bar {
    background-color: none;
    box-shadow: none;
    width: 80%;
  }
  .information {
    background: url('../../assets/img/home/information.png') 0% 0% no-repeat;
    background-size: 100% 100%;

    width: 48px;
    height: 48px;
    display: block;
  }
  .search {
    background: url('../../assets/img/home/search.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    width: 48px;
    height: 48px;
    display: block;
  }
  .cloud {
    background: url('../../assets/img/home/cloud-drizzle.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    width: 48px;
    height: 48px;
    display: block;
  }
  li {
    padding-left: 5%;
  }
  li:nth-child(3) {
    font-size: 20px;
    color: #636676;
  }
}
.two {
  height: 22%;
  .left {
    background: url('../../assets/img/home/house.png') 0% 0% no-repeat #7487f9;
    background-size: 100% 100%;
    height: 90%;
    color: #fff;
    padding: 4%;
    box-sizing: border-box;
    line-height: 56px;
    border-radius: 12px;
    span {
      font-size: 24px;
    }
    .btn {
      background: #fff;
      color: #7487f9;
      font-size: 24px;
      border-radius: 25px;
      margin-top: 5%;
      display: block;
      width: 50%;
      text-align: center;
      line-height: 60px;
    }
  }
  .right {
    span {
      width: 100%;
      display: block;
      color: #fff;
      height: 43%;
      margin-left: 4%;
      border-radius: 12px;
      padding: 13% 0%;
      box-sizing: border-box;
      padding-left: 40%;
    }
    span:nth-child(1) {
      background: url('../../assets/img/home/visitor.png') 0% 0% no-repeat;
      background-size: 100% 100%;
    }
    span:nth-child(2) {
      background: url('../../assets/img/home/enterprise.png') 0% 0% no-repeat;
      background-size: 100% 100%;
      margin-top: 4%;
    }
  }
}
.three {
  ::v-deep .van-grid-item__icon {
    font-size: 150px;
  }
  ::v-deep .van-grid-item__content::after,
  ::v-deep .van-hairline--top::after {
    border-width: 0;
  }
  ::v-deep .van-grid-item__icon + .van-grid-item__text {
    margin-top: -10%;
  }
  ::v-deep .van-grid-item__text {
    font-size: 28px;
  }
  ::v-deep .van-grid-item__content {
    padding: 0;
  }
  .banner {
    background: url('../../assets/img/home/diagram.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    height: 196px;
    box-sizing: border-box;
    padding-top: 9%;
    padding-left: 6%;
    line-height: 45px;
    span {
      color: #636676;
      font-size: 24px;
    }
    label {
      color: #252b50;
      font-size: 32px;
      font-weight: bold;
    }
  }
  .top {
    display: flex;
    .top_title {
      width: 20%;
      background: url('../../assets/img/home_title.png') 0% 0% no-repeat;
      background-size: 100% 100%;
      font-size: 14px;
      padding: 7px 13px 7px 7px;
      font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
      font-weight: bold;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        background: linear-gradient(90deg, #fb8753 0%, #ffaf8c 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .van-notice-bar {
      width: 80%;
      padding: 0 2.133vw 0 0;
      font-size: 24px;
    }
  }
  .icon {
    ::v-deep .my-swipe {
      padding-bottom: 10px;
    }
    ::v-deep .van-swipe__indicators {
      bottom: 1px;
    }
  }
  .swipe_img {
    margin-top: 10px;
  }
}
.four {
  margin-top: 4% !important;
  height: 23%;
  .title {
    margin-bottom: 4%;
  }
  ul li {
    width: 30%;
    float: left;
    background: #eee;
    border-radius: 0px 0px 12px 12px;
    box-shadow: 0px 8px 32px 0px #e9eef7;
    height: 280px;
    text-align: center;
    margin-left: 2%;

    span {
      margin-top: 100%;
      box-sizing: border-box;
      display: block;
      background: #fff;
      height: 60px;
      line-height: 60px;
      font-size: 28px;
    }
  }
}
.five {
  margin-top: 4% !important;
  height: 52%;

  ::v-deep.van-tabs__line {
    background: url('../../assets/img/home/warp1.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    height: 24px;
    bottom: 60px;
    width: 17%;
  }
  ::v-deep.van-tab {
    color: #9296af;
    font-size: 24px;
    line-height: 32px;
  }
  ul li {
    width: 166px;
    height: 120px;
    margin-left: 2%;

    border-radius: 12px 12px 12px 12px;
  }
  li:nth-child(1) {
    background: rgba(251, 135, 83, 0.1);
    width: 23%;
    text-align: center;
    line-height: 40px;
    padding: 4% 0%;
    box-sizing: border-box;
    span {
      font-size: 36px;
      font-family: D-DIN-Bold, D-DIN;
      font-weight: bold;
      color: #fb8753;
    }
    label {
      font-size: 24px;

      font-weight: 500;
      color: #252b50;
    }
  }
  li:nth-child(2) {
    background: rgba(50, 203, 199, 0.1);
    width: 23%;
    text-align: center;
    line-height: 40px;
    padding: 4% 0%;
    box-sizing: border-box;
    span {
      font-size: 36px;
      font-family: D-DIN-Bold, D-DIN;
      font-weight: bold;
      color: #32cbc7;
    }
    label {
      font-size: 24px;

      font-weight: 500;
      color: #252b50;
    }
  }
  li:nth-child(3) {
    background: rgba(99, 119, 245, 0.1);
    width: 23%;
    text-align: center;
    line-height: 40px;
    padding: 4% 0%;
    box-sizing: border-box;
    span {
      font-size: 36px;
      font-family: D-DIN-Bold, D-DIN;
      font-weight: bold;
      color: #6377f5;
    }
    label {
      font-size: 24px;

      font-weight: 500;
      color: #252b50;
    }
  }
  li:nth-child(4) {
    background: rgba(72, 132, 252, 0.1);
    width: 23%;
    text-align: center;
    line-height: 40px;
    padding: 4% 0%;
    box-sizing: border-box;
    span {
      font-size: 36px;
      font-family: D-DIN-Bold, D-DIN;
      font-weight: bold;
      color: #4884fc;
    }
    label {
      font-size: 24px;

      font-weight: 500;
      color: #252b50;
    }
  }
  #main {
    margin-top: -10%;
  }
  .ech_Title {
    font-size: 24px;
    padding-left: 5%;
    line-height: 60px;
  }
  .tab {
    float: right;
    width: 24%;
    margin-top: 2%;
    span {
      background: #edf3ff;
      border-radius: 2px 2px 2px 2px;
      color: #6377f5;
      font-size: 20px;
      width: 80px;
      height: 44px;
      display: block;
      float: left;
      line-height: 44px;
      text-align: center;
      margin-left: 2%;
      box-sizing: border-box;
    }
    .active {
      background: linear-gradient(136deg, #8798ff 0%, #6377f5 100%);
      color: #fff;
    }
  }
}
.six {
  height: 20%;
  .title {
    margin-bottom: 4%;
  }
  .span1 {
    background: url('../../assets/img/home/service.png') 0% 0% no-repeat;
    color: #604619;
    width: 50%;
    float: left;
    display: block;
    height: 190px;
    border-radius: 12px 12px 12px 12px;
    padding: 3%;
    box-sizing: border-box;
    span {
      background: linear-gradient(90deg, #fd8b18 0%, #ffab3a 100%);
      box-shadow: 0px 8px 20px 0px rgba(255, 171, 57, 0.5);
      font-size: 20px;
      border-radius: 20px 20px 20px 20px;
      color: #fff;
      padding: 2% 4%;
    }
    label {
      font-size: 24px;
    }
  }
  .span2 {
    background: url('../../assets/img/home/enterprises.png') 0% 0% no-repeat;
    color: #2d6856;
    width: 50%;
    float: left;
    display: block;
    height: 190px;
    border-radius: 12px 12px 12px 12px;
    padding: 3%;
    box-sizing: border-box;
    span {
      color: #fff;
      background: linear-gradient(90deg, #1ec19a 0%, #0eddb6 100%);
      box-shadow: 0px 8px 20px 0px rgba(14, 221, 182, 0.4);
      border-radius: 20px 20px 20px 20px;
      font-size: 20px;
      padding: 2% 4%;
    }
    label {
      font-size: 24px;
    }
  }
}
.seven {
  height: 40%;

  .top {
    height: 10%;
    margin-top: 5px;
    span:nth-child(1) {
      font-size: 28px;
    }
    span:nth-child(2) {
      font-size: 20px;
      padding-left: 5%;
    }
    span:nth-child(3) {
      float: right;
      color: #9296af;
      width: 25%;
      font-size: 24px;
      .num {
        color: #fb8753;
        font-size: 36px;
        label {
          font-size: 20px;
        }
      }
    }
  }
  .content {
    height: 80%;
    padding-bottom: 10%;
    padding: 3% 5%;
    background: url('../../assets/img/home/activity.png') 0% 0% no-repeat;
    background-size: 100% 100%;
    .contentTit {
      font-size: 28px;
      font-weight: bold;
      color: #252b50;
      margin: 5% 0%;
      display: block;
    }
    .text {
      padding-left: 8%;
    }
    .topSpan {
      color: #fb8753;
      font-weight: bold;
    }
    .topLabel {
      color: #6377f5;
      font-weight: bold;
    }
    span {
      color: #636676;
      font-size: 24px;
    }
    .tp {
      line-height: 50px;
      margin-top: 2%;
      .img {
        width: 50%;
        height: 180px;
        border-radius: 12px 12px 12px 12px;
        background: #eee;
        display: block;
        float: left;
        margin-right: 3%;
      }
      span {
        font-size: 24px;
        color: #9296af;
        span {
          color: #6377f5;
        }
      }
      label {
        font-size: 24px;
        color: #9296af;
        span {
          color: #fb8753;
        }
      }
      .sign_up {
        width: 200px;
        height: 52px;
        background: linear-gradient(180deg, #8798ff 0%, #6377f5 100%);
        box-shadow: 0px 4px 20px 0px rgba(134, 151, 255, 0.7);
        border-radius: 40px 40px 40px 40px;
        color: #fff;
        padding: 1% 5%;
        margin-left: 5%;
      }
    }
  }
}
.eight {
  margin-top: 4% !important;
  height: 70%;

  .left {
    width: 62%;
  }
  .right {
    width: 35%;
    font-size: 20px;
    color: #9296af;
  }
  .content {
    margin-top: 1%;
  }
  li {
    box-shadow: 0px 0px 20px 0px #e9eef7;
    margin-top: 3%;
    padding: 3%;
    .leTitle {
      font-size: 28px;
      font-family: PingFang SC-粗体, PingFang SC;
      font-weight: bold;
      color: #252b50;
      display: block;
    }
    .leText {
      font-size: 24px;
      color: #636676;
      font-weight: normal;
    }
    .footer {
      font-size: 24px;
      margin-top: 10%;
      display: block;
      line-height: 40px;
      label {
        width: 88px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px 6px 6px 6px;
        color: #fff;
        display: block;
        float: left;
        text-align: center;
        margin-right: 5%;
      }
    }
  }
  li:nth-child(1) {
    .footer {
      label {
        background: #fb8753;
      }
    }
  }
  li:nth-child(2) {
    .footer {
      label {
        background: #32cbc7;
      }
    }
  }
  li:nth-child(3) {
    .footer {
      label {
        background: #6377f5;
      }
    }
  }
  .right {
    span:nth-child(1) {
      display: block;
      width: 240px;
      height: 180px;
      border-radius: 12px 12px 12px 12px;
      background: #eee;
      margin-bottom: 5%;
    }
    span:nth-child(2) {
      background: url('../../assets/img/home/browse.png') 0% 0% no-repeat;
      padding-left: 12%;
      margin-top: 10%;
    }
    span:nth-child(3) {
      background: url('../../assets/img/home/thumbs_up.png') 0% 0% no-repeat;
      padding-left: 12%;
      margin-left: 10%;
      margin-top: 10%;
    }
  }
  .last {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin: auto;
    display: block;
    padding-bottom: 25%;
    line-height: 80px;
  }
}
</style>
