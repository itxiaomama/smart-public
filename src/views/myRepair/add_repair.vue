<template>
  <div class="container">
    <div class="top">
      <div class="img"></div>
      <span
        >填写报修信息 <br />
        <label>有问题 交给我</label></span
      >
    </div>
    <div class="content2">
      <van-form @submit="onSubmit">
        <van-field readonly clickable name="area" :value="from.area" label="报修地址" placeholder="请选择" @click="showArea = true" />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
        <van-field readonly clickable name="picker" :value="from.type" label="报修类型" placeholder="请选择" @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field name="uploader" label="报修照片">
          <template #input>
            <van-uploader v-model="from.repair_files" multiple :max-count="5" preview-size="60px"></van-uploader>
          </template>
        </van-field>
        <van-field v-model="from.describe" rows="3" autosize label="详情描述" type="textarea" maxlength="200" placeholder="请详细描述" show-word-limit />

        <van-field v-model="from.contact" name="联系人" label="联系人" placeholder="请输入" :rules="[{ required: true, message: '请填写联系人' }]" />
        <van-field v-model="from.mobile" name="联系方式" label="联系方式" placeholder="请输入" :rules="[{ required: true, message: '请填写联系方式' }]" />
        <div class="step">
          <span>提交订单</span>
          <span>安排上门</span>
          <span>星级服务</span>
        
        </div>
      </van-form>

      <div style="margin: 10px 0px">
        <van-button block type="info" native-type="submit" color="#6377F5">提交</van-button>
      </div>
      <!-- <div id="qrcode" ref="qrCodeUrl" style="padding: 29%; margin-top: 89%; margin-left: 3.5%"></div> -->
      <!-- <div id="downloadImg"></div>
        <button type="text" @click="downloadCode">保存到本地</button> -->
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { Toast } from 'vant'
import { Dialog } from 'vant'
import axios from 'axios'
import { setToken } from '@/utils/auth'
import { mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import { param } from '../../utils'

// const { mapActions } = createNamespacedHelpers('test') // 可使用这种方式直接获得test模板

export default {
  name: 'home',
  data() {
    return {
      from: {},
      value: '',
      showArea: false,
      active: 0,
      areaList: {}, // 数据格式见 Area 组件文档
      columns: ['企业报修', '园区报修', '个人报修', '其他'],
      uploader: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }
      ],
      showPicker: false
    }
  },
  components: {},
  computed: {},
  activated() {},
  mounted() {},
  methods: {
    onConfirm(values) {
      this.value = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showArea = false
    },
    onSubmit() {}
  }
}
</script>
<style lang="scss" scoped>
.complay_container {
  height: 100%;
  width: 100%;
  margin: auto;
  z-index: 2;
  background: linear-gradient(
    180deg,
    #bed3ff 100%,
    rgba(230, 238, 255, 0.85) 18%,
    rgba(216, 228, 255, 0.75) 41%,
    rgba(223, 233, 255, 0.68) 59%,
    rgba(226, 234, 252, 0.62) 81%,
    rgba(216, 229, 255, 0.4) 100%
  );
  font-size: 'PingFang SC-Medium';
  .complay_content {
    width: 92%;
    margin: auto;
  }
  form {
    padding-top: 5%;
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
      margin-left: 5%;
    }
  }
}
.container {
  min-height: 108%;
  width: 100%;

  background: #f5f7fb;
  font-size: 'PingFang SC';
  .centent {
    height: 100%;
    background: #fff;
    width: 94%;
    margin: -20% auto;
    border-radius: 12px 12px 12px 12px;
  }
}
.van-field__label {
  color: #252b50;
}
.top {
  background: #6377f5;
  height: 400px;
  position: relative;
}
.top2 {
  background: #6377f5;
  height: 100px;
  color: #fff;
  position: relative;
  padding-left: 80%;
  padding-top: 5%;
}
.top span {
  color: #fff;
  font-family: 'PingFang SC';
  position: absolute;
  bottom: 48%;
  left: 4%;
  font-size: 36px;
}
.top .img {
  background: url('../../assets/img/repair/add.png') no-repeat 100% 30%;
  background-size: 100% 100%;
  width: 30%;
  height: 50%;
  position: absolute;
  right: 10%;
  bottom: 30%;
  z-index: 2;
}
.top label {
  color: #fff;
  font-size: 24px;
  font-weight: 400;
}
.container .content2 {
    background: #fff;
    width: 92%;
    height: 76%;
    border-radius: 1.6vw;
    margin: -20% auto;
    position: absolute;
    left: 4%;
}
.content1 {
  background: #fff;
  width: 92%;
  height: 100%;
  border-radius: 12px;
  margin: -5% auto;
  position: absolute;
  left: 4%;
}
.container .van-form {
  height: 98%;
  padding-top: 3%;
}
// .back {
//   background: url("../../assets/img/chevron-states.png") no-repeat;
//   background-size: 100% 100%;
//   height: 12%;
//   width: 7%;
//   position: absolute;
//   top: 10%;
// }
.share {
  background: url('../../assets/img/share.png') no-repeat;
  background-size: 100% 100%;
  height: 12%;
  width: 6%;
  position: absolute;
  top: 10%;
  right: 5%;
}
.ewmTK {
  background: url('../../assets/img/ewm.png') no-repeat;
  background-size: cover;
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  z-index: 2;
}
.ewmTK1 {
  width: 100%;
  height: 106%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0%;
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.examplebox {
  width: 94%;
  height: 22%;
  background: #fff;
  margin: auto;
  label {
    color: #9296af;
    width: 60%;
    display: block;
    margin: auto;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
  }
}
.example {
  background: url('../../assets/img/photo.png') 50% 50% #f5f7fb no-repeat;
  // background-size: 90% 80%;
  width: 50%;
  height: 100%;
  float: left;
}
.example span {
  width: 40px;
  height: 20px;
  background: #fb8753;
  border-radius: 3px 0px 3px 0px;
  opacity: 1;
  color: #fff;
  padding: 0 5px 5px 5px;
  font-size: 14px;
}
.photo {
  background: #f5f7fb;
  width: 48%;
  height: 100%;
  float: left;
  margin-left: 2%;
  color: #9296af;
  position: relative;
}
.photoImg {
  background: url('../../assets/img/camera.png') 50% 50% #ffffff no-repeat;
  // background-size: 50% 50%;
  width: 60%;
  height: 60%;
  border-radius: 6px;
}
.Scphoto {
  width: 100%;
  height: 100%;
}

.visitor_photos {
  font-size: 28px;
  line-height: 20px;
  word-wrap: break-word;
  padding: 5% 5%;
  color: #646566;
  text-align: left;
}
.photo span {
  position: absolute;
  bottom: 20%;
  left: 36%;
  font-size: 20px;
}
.tjbutton {
  padding: 20px;
  background: #fff;
  margin-top: 10px;
  button {
    border-radius: 4px;
  }
}

.banner {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.now-value {
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 16px;
  // line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon {
    margin: 0 10px;
  }
}
.buttons {
  padding: 0 15px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: #333;
  }
}
.saveImg {
  width: 220px;
  height: 60px;
  bottom: 4%;
  left: 25%;
  position: absolute;
}
.save {
  cursor: pointer;
}
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.step {
  background: url('../../assets/img/repair/img6.png') 45% 20% #f5f7fb no-repeat;
  padding-top: 20%;
  padding-left: 10%;
  height: 8%;
  text-align: center;
  margin: auto;

  span {
    width: 20%;
    float: left;
    margin-left: 5%;
    font-size: 24px;
  }
}
</style>
<style>
.van-uploader__upload {
  margin: 0;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}
.van-uploader__upload-icon {
  color: #6377f5;
  display: block;
}
.search .van-field__left-icon {
  width: 90px;
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
  background: rgba(76, 109, 179, 0.4);
  line-height: 60px;
  height: 60px;
  padding-left: 0;
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
  content: '\e65e';
  color: #252b50;
  width: 4px;
  height: 4px;
  right: 7%;
  border-color: transparent transparent #252b50 #252b50;
  border-radius: 3px;
}
.van-search__action {
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 800;
  color: #252b50;
  height: 30px;
  line-height: 30px;
  font-size: 28px;
}
.photoImg2 {
  width: 50%;
  height: 20%;
  padding: 5%;
}
.photoImg2 img {
  width: 100%;
  height: 100%;
}
.Scphoto .van-uploader__wrapper,
.Scphoto img,
.Scphoto .van-uploader__preview,
.Scphoto .van-uploader__preview-image {
  width: 100%;
  height: 100%;
}
</style>