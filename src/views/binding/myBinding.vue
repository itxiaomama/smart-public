<template>
  <div class="myBinding">
    <label>快速绑定</label>
    <ul>
      <li><span>房产绑定</span><br /><span class="span2">企业或者个人租户需绑定</span></li>
      <li><span>车位绑定</span><br /><span class="span2">添加你的车辆信息吧</span></li>
      <li><span>企业绑定</span><br /><span class="span2">加入你的企业大家庭</span></li>
    </ul>
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
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.myBinding {

  width: 96%;
  margin: 4% auto;
  label {
    color: #252b50;
    font-size: 36px;
    margin:5%;
    font-weight: bold;
  }
  ul {
    height: 90%;
    li:nth-child(1) {
      background: url('../../assets/img/house11.png') 0% 0% no-repeat;
      background-size: 100% 100%;
    }
    li:nth-child(2) {
      background: url('../../assets/img/house12.png') 0% 0% no-repeat;
      background-size: 100% 100%;
    }
    li:nth-child(3) {
      background: url('../../assets/img/house13.png') 0% 0% no-repeat;
      background-size: 100% 100%;
    }
    li {
      height: 18%;
      margin: 6% auto;
      width: 90%;
      padding: 6% 13%;
      box-sizing: border-box;
      line-height: 60px;

      span:nth-child(1) {
        font-size: 36px;
        color: #fff;
        font-weight: bold;
      }
      .span2 {
        font-size: 20px;
        font-weight: 400;
        color: #f5f7fb;
      }
    }
  }
}
</style>
