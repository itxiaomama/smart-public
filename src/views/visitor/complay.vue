<template>
  <div class="container">
    <div class="content">
      <form action="/">
        <van-search
          class="search"
          v-model="value"
          show-action
          clearable
          placeholder="请输入关键词"
          shape="round"
          background="rgba(255,255,255,0)"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="quick_find">快速查找</div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
      <div class="list" v-for="item in list" :key="item.number" @click="getName(item)">
        <label>{{ item.number }}</label> <span>{{ item.name }}</span>
      </div>
      <footer-tabbar />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "Article",
  data() {
    return {
      value: "",
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
         { text: "A区", value: 0 },
        { text: "B区", value: 1 },
        { text: "C区", value: 2 },
       
      ],
      option2: [
        { text: "2幢", value: 0 },
        { text: "3幢", value: 1 },
        { text: "4幢", value: 2 },
      ],
      option3: [
        { text: "F15", value: 0 },
        { text: "F2", value: 1 },
        { text: "F4", value: 2 },
      ],
      list: [
        { number: "1501-1505", name: "杭州巨安科技有限公司" },
        { number: "1506", name: "浙江讯飞科技有限公司" },
        { number: "1507-1508", name: " 浙江兴红检测有限公司" },
        { number: "1509", name: "杭州路顺科技有限公司" },
        { number: "1510", name: "杭州千行科技有限公司" },
        {
          number: "1511-1513",
          name: " 中国远洋启航航空航天集团有限公司（杭州分公司）",
        },
        { number: " 1514-1515", name: " 杭州鹿鸣集团有限公司" },
      ],
    };
  },
  mounted() {

  },

  methods: {
    onSearch(val) {
      Toast(val);
    },
    getName(item){
      console.log(item)
    },
    onCancel() {
      Toast("取消");
    },
  },
};
</script>
<style lang="scss" scoped>

p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.container {
  height: 100%;
  width: 100%;
  margin: auto;
  background: linear-gradient(
    180deg,
    #bed3ff 0%,
    rgba(230, 238, 255, 0.85) 18%,
    rgba(216, 228, 255, 0.75) 41%,
    rgba(223, 233, 255, 0.68) 59%,
    rgba(226, 234, 252, 0.62) 81%,
    rgba(216, 229, 255, 0.4) 100%
  );
  font-size: "PingFang SC";
  .content {
    width: 92%;
    margin: auto;
  }
  form {
    padding-top: 5%;
  }
}

.quick_find {

  color: #252b50;
  font-weight: 800;
  width: 92%;
  margin: auto;
  padding: 5% 0% 5% 0%;
}
.list {
  line-height: 60px;
  font-size: 28px;
  label {
    color: #9296af;
  
    font-weight: 600;
  }
  span {
    color: #252b50;

    font-weight: 600;
    margin-left:5%;
  }
}
</style>
<style>
.search .van-field__left-icon {
  width:90px;
  height: 60px;
  background: #6377f5;
  border-radius: 20px 20px 20px 0px;
  opacity: 1;
  color: #fff;
}
.search .van-icon-search {
  font-size: 48px;
  margin-left: 20%;
  margin-top: 10%;
}
.van-search__content {
  background: rgba(76, 109 ,179 , 0.4);
  line-height:60px;
  height: 60px;
  padding-left:0;
}
.van-field__control {
  color: #252b50;
  font-weight: 800;
  font-size: 24px;

}
.van-search .van-cell {
  padding: 0;
  line-height: 60px;
}
::-webkit-input-placeholder {
  color: #ffffff;
  font-weight: 400;
}
.van-dropdown-menu__item {
  width: 110px;
  height: 60px;
  background: #d1ddf7;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  margin-left: 2%;
}
.van-dropdown-menu__bar {
  height: 60px;
  background-color: rgba(255, 255, 255, 0) !important;
  box-shadow: none;
  margin-bottom: 5%;
}
.van-dropdown-menu__title {
  color: #252b50;
  width: 100%;
  height: 38px;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  color: #252b50;
}
.van-dropdown-menu__title::after {
  content: "\e65e";
  color: #252b50;
  width: 4px;
  height: 4px;
  right: 7%;
  border-color: transparent transparent #252b50 #252b50;
  border-radius:3px;
}
.van-search__action {

  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 800;
  color: #252b50;
  height: 30px;
  line-height: 30px;
  font-size: 28px;
}

</style>
