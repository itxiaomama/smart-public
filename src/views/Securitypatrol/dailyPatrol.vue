<meta name="viewport" content="minimal-ui, initial-scale=1, width=device-width, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
<template>
  <div class="daily_content">
    <div class="one">
      <van-icon name="arrow-left"  @click="gotolist"/><span class="name">{{ name }}</span
      ><span class="user"><span></span>小鹿</span>
    </div>
    <!-- <van-nav-bar :title=name left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> -->
    <van-tabs v-model="active" color="#32CBC7">
      <van-tab title="线路巡更" class="daily">
        <div v-for="(item, index) in line" :key="index" :class="index === line.length - 1 ? 'linepoint1' : 'linepoint'">
          <!-- <div v-for="(item, index) in line" :key="index"  :class="{'linepoint1':parseInt(index) % 3 === 0 ||6*index-1&& parseInt(index) % 2 !== 0,'linepoint':1,index}" > -->
          <div class="icon4" v-if="item.status === 0"></div>
          <div
            @click="gotodetail(item, index)"
            :class="item.task_status === 0 ? 'icon1' : 'icon2'"
            v-if="item.image === null || (item.image === '' && item.status === 1)"
          ></div>
          <img class="icon3" v-if="item.image !== null && item.image !== ''" :src="'https://park.cngiantech.com' + item.image" />
          <div :class="item.task_status === 0 ? 'point' : 'point2'"></div>
          <div :class="item.task_status === 0 ? 'line' : 'line2'"></div>
          <div
            :class=" item.task_status === 0 ? 'line3' : 'line33'"
            v-if="parseInt(index + 1) % 3 === 0 && parseInt(index + 1) % 2 !== 0 && index !== line.length - 1"
          ></div>
          <div  :class=" item.task_status === 0 ? 'line4' : 'line44'" v-if="parseInt(index) % 3 === 0 && parseInt(index) % 2 !== 0 && index !== line.length - 1"></div>
          <span :class="item.status === 0 ? 'linespan' : ''">
            <van-icon name="location-o" style="color: #9296af" /><span
              >{{ item.point_name }}{{ item[index-1]}}<br /><label>（{{ item.dis_describe }}）</label></span
            ></span
          >
        </div>
     
      </van-tab>
      <van-tab title="日常巡逻" class="device">
        <van-collapse v-model="activeName2" accordion v-for="(item, index) in list" :key="index">
          <van-collapse-item :title="item.name" :name="index">
            <div v-for="(items, ids) in item.data" :key="ids" class="listOne">
              <span class="listid"><span class="listid_o"></span>0{{ ids + 1 }}</span
              ><span class="listTitle">{{ items.patrol_name }}</span>
              <div class="list_radio">
                <van-radio-group v-model="items.patrol_status" direction="horizontal">
                  <van-radio :name="1" checked-color="#32CBC7">有异常</van-radio>
                  <van-radio :name="0" checked-color="#32CBC7">无异常</van-radio>
                </van-radio-group>
                <div class="abnormal" v-if="items.patrol_status === 1">
                  <div class="top">
                    <el-select v-model="items.patrol_type_id" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                    <el-select v-model="items.patrol_way" placeholder="请选择">
                      <el-option v-for="(item, index) in options2" :key="index" :label="item" :value="item"> </el-option>
                    </el-select>
                    <van-field
                      v-model="items.remark"
                      rows="1"
                      autosize
                      label=""
                      type="textarea"
                      maxlength="200"
                      placeholder="请添加备注"
                      show-word-limit
                    />
                    <div class="microphone"></div>
                  </div>

                  <div class="bottom">
                    <span class="photo">上传照片</span>
                    <van-uploader
                      v-model="items.daily_files"
                      :max-count="3"
                      multiple
                      :after-read="afterRead"
                      :click-upload="getimg(items.id)"
                      preview-cover="照片上传"
                    ></van-uploader
                    ><label class="photoSpan" v-show="items.daily_files.length === 0">拍照上传</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom2">
              <van-cell center title="默认保存">
                <template #right-icon>
                  <van-switch v-model="item.checked" @click="saveOneData(item.id)" size="20" active-color="#32CBC7" inactive-color="#dcdee0" />
                </template>
              </van-cell>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-button color="#32CBC7" @click="submitFrom" square block type="info" native-type="submit">全部提交</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Field, Icon, Button, Toast } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'
import wx from 'weixin-js-sdk'
const _this = wx

export default {
  name: 'Login',
  data() {
    return {
      value: '',
      active: 0,
      active1: 0,
      radio: [0, 0, 0, 0, 0],
      activeNames: '0',
      activeName2: '0',
      token: 'BBearer ',
      from1: [],
      checked: false,
      daily_files: [],
      line: [],
      list: [],
      message: '',
      options: [],
      options2: [],
      value: '',
      params: [],
      wj: [],
      dataId: '',
      url: '',
      oneData: {},
      config: '',
      ids: 0,
      name: ''
    }
  },

  watch: {
    time: {
      handler(val) {
        if (val == 1) {
          wx.startRecord() //开始录音
        }
      }
    }
  },
  created() {
    this.name = this.$route.query.name
  },
  mounted() {
    // axios.post('/api/system/auth/wx/appid', JSON.stringify(data)).then(res => {
    //   console.log(res.data)
    // })
  
    this.getlist()
    this.getlist2()
  },
  activated(){
    this.getdata()
  },
  methods: {
    gotolist() {
      this.$router.go(-1)
    },
    wxconfigInit() {
      const url = location.href.split('#')[0] // 动态获取当前页的#之前的url地址，这个是有https:// 或者http://的
      this.url = url
      axios
        .get('/api/system/auth/wx/config?url=' + encodeURIComponent(url))

        .then(res => {
          if (res.status === 200) {
            const data = res.data.data
            wx.config({
              debug: false, // 开启调试模式,
              appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: data.timestamp + '', // 必填，生成签名的时间戳
              nonceStr: data.nonceStr + '', // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名，见附录1
              jsApiList: ['checkJsApi', 'scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
        .catch(err => {
          console.log(err.msg)
        })
    },
    getpos() {
      wx.getLocation({
        success: function (res) {
          console.log(res) //地理位置信息都在这里
          alert(res.latitude, res.longitude)
        },
        cancel: function (res) {
          alert('用户拒绝授权位置信息！')
        }
      })
    },
    gotodetail(item, index) {
      this.ids = index
      this.wxconfigInit()
      //微信扫一扫
      wx.ready(() => {
        wx.checkJsApi({
          // 这里是判断当前客户端版本是否支持指定JS接口

          jsApiList: ['scanQRCode'],

          success: function (res) {
            // 返回的结果大致如这样{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.scanQRCode === true) {
              wx.scanQRCode({
                // 微信扫一扫接口
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                  console.log(res)
                  const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                  console.log(result)
                  // this.$router.push({ path: result , query: item })
                  window.location.href = result // 此处扫码结果直接跳转链接
                }
              })
            } else {
              alert('抱歉,当前客户端版本不支持扫一扫')
            }
          },

          fail: function (res) {
            // 检测getNetworkType该功能失败时处理

            alert('fail' + res)
          }
        })
      })

      wx.error(res => {
        alert('出错了：' + res.errMsg)
      })
      // console.log(item)
      // this.$router.push({ path: '/wx/linePunch', query: item })
    },
    submitFrom() {
      var that = this
      for (let i = 0; i < that.list.length; i++) {
        for (let j = 0; j < that.list[i].data.length; j++) {
          that.params.push(that.list[i].data[j])
        }
      }
      var data = {
        params: that.params
      }
      axios
        .patch('/api/prop/patrolDailyTask', data)
        .then(res => {
          console.log(res.data)
          Toast.success('提交成功')
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data.status_code === 422) {
              Toast(error.response.data.message)
            }
          }
        })
    },
    getlist() {
      var that = this

      axios
        .get('/api/prop/patrolDailyTask', {
          params: { task_id: that.$route.query.id }
        })
        .then(res => {
          that.list = res.data.data
          // console.log(that.list)
          for (let i = 0; i < that.list.length; i++) {
            for (let j = 0; j < that.list[i].data.length; j++) {
              // console.log( that.list[i].data[j].patrol_way)
              that.options2 = that.list[i].data[j].patrol_way.split(',')
            }
          }
        })
    },
    getlist2() {
      var that = this
      axios.get('/api/prop/patrolPoint').then(res => {
        console.log(res.data.data)
        for (let i = 0; i < res.data.data.data.length; i++) {
          that.options.push({ value: res.data.data.data[i].id, label: res.data.data.data[i].point_name })
          // console.log(that.options)
        }
      })
    },
    getdata() {
      var that = this
      var obj = {
        aa: {
          a: 1,
          b: 2
        },

        newArr: []
      }
      axios
        .get('/api/prop/patrolPoint?per_page=100', {
          params: { task_id: that.$route.query.id }
        })
        .then(res => {
          that.line = res.data.data.data

          console.log(that.line)
          that.line.forEach((val, index) => {
            let page = Math.floor(index / 3)
            if (!obj.newArr[page]) {
              obj.newArr[page] = []
            }
            obj.newArr[page].push(val)
          })
          obj.newArr.forEach((item, index) => {
            if (item[0].id % 2 == 0) {
              item.sort((a, b) => {
                return b.id - a.id
              })
            }
          })
          that.line = obj.newArr.reduce((prev, curr) => prev.concat(curr), [])
        })
    },

    afterRead(file) {
      //上传文件
      let params = new FormData()
      params.append('module', 'park')
      params.append('files[]', file.file)

      axios
        .post('/api/system/upload', params, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          var that = this
          for (let i = 0; i < that.list.length; i++) {
            // console.log(that.list[i].data)
            for (let j = 0; j < that.list[i].data.length; j++) {
              if (that.dataId === that.list[i].data[j].id) {
                that.list[i].data[j].daily_files = []
                that.list[i].data[j].daily_files.push({
                  file_name: res.data.data[0].filename,
                  url: 'https://park.cngiantech.com' + res.data.data[0].path
                })
                console.log(that.list[i].data[j].daily_files)
              }
            }
            // if (that.list[i].id === that.dataId) {
            //   if (that.list[i].data.length !== 0) {
            //     that.params = that.list[i].data
            //      that.params[i].daily_files
            //     console.log(that.params)
            //   }
            // }
          }
        })
    },
    saveOneData(id) {
      var that = this
      for (let i = 0; i < that.list.length; i++) {
        if (that.list[i].id === id) {
          if (that.list[i].data.length !== 0) {
            that.params = that.list[i].data
            // that.params.push({id:that.list[i].data.id,patrol_status:that.list[i].data.patrol_status,
            // trouble_point_id:that.list[i].data.trouble_point_id,treat_way:that.list[i].data.treat_way,remark:that.list[i].data.remark,
            // is_deafult:that.list[i].data.is_deafult,daily_files:that.list[i].data.daily_files,version:that.list[i].data.version})

            console.log(that.params)
          }
        }
      }
      //  this.params[0].daily_files = this.wj

      var data = {
        params: that.params
      }
      axios
        .patch('/api/prop/patrolDailyTask', data)
        .then(res => {
          console.log(res.data)
          Toast.success('保存成功')
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data.status_code === 422) {
              Toast(error.response.data.message)
            }
          }
        })
    },
    getimg(id) {
      // console.log(id)
      this.dataId = id
    },
    getConfig() {
      const self = this
      const data = location.href.split('#')[0] //需要传的地址为#前面的地址
      self
        .axios({
          method: 'post',
          url: '/red/web/getJsWxConfig?ticket=0&url=https://api.sixeco.com/os/', //获取签名等信息的地址
          // headers: {'Content-Type': 'application/json'},
          data: data //向服务端提供授权url参数，并且不需要#后面的部分
        })
        .then(res => {
          // console.log(res.data.data)
          let list = res.data.data
          _this.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

            appId: list.appId, // 必填，企业微信的corpID
            timestamp: list.timesTamp, // 必填，生成签名的时间戳
            nonceStr: list.nonceStr, // 必填，生成签名的随机串
            signature: list.signature, // 必填，签名
            jsApiList: [
              'startRecord', //开始录音接口
              'stopRecord', // 停止录音接口
              'translateVoice',
              'onVoiceRecordEnd'
            ] // 必填，需要使用的JS接口列表
          })
          _this.ready(() => {
            // _this.startRecord();
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个
            // 客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调
            // 用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          })
          _this.error(res => {
            // 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          })
        })
        .catch(error => {
          // error
        })
    },
    // 开始录音
    start(e) {
      let that = this
      that.showPopover = false
      that.videoText = '正在录音...'
      that.videoStatus = '正在切换车辆颜色…'
      if (!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true') {
        _this.startRecord({
          success: function () {
            that.timer = setInterval(() => {
              that.time++
            }, 1000)
            that.vicoeEnd()
          },
          fail: function () {
            // 开始录音失败
          },
          cancel: function () {
            // 用户拒绝授权录音
          }
        })
      }
    },
    // 60秒监听
    vicoeEnd() {
      let that = this
      _this.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          // 60秒停止录音
          that.localId = res.localId
          clearInterval(that.timer)
          this.translate()
        }
      })
    },
    // 结束录音并识别语音
    translate() {
      const that = this
      _this.stopRecord({
        success: function (res) {
          // 翻译前停止录音
          that.localId = res.localId
          that.getText()
        },
        fail: function (res) {
          // 调用停止失败
        }
      })
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.daily_content {
  font-weight: 700;
  background: linear-gradient(180deg, rgba(167, 243, 241, 0.4) 0%, #f5f7fb 41%, #f5f7fb 60%, #f5f7fb 81%, #f5f7fb 100%);
  min-height: 100%;
}

.jobcontent label {
  font-size: 20px;
  font-weight: 500;
}
.dailyList {
  margin: 5% 0%;
}
.linepoint .van-icon-scan,
.linepoint1 .van-icon-scan {
  font-size: 48px;
  padding: 5%;
  background: rgba(238, 238, 238, 0.8);

  border-radius: 6px 6px 6px 6px;
}
.icon1 {
  background: url('../../assets/img/sao1.png') 7px 7px rgba(238, 238, 238, 0.5) no-repeat;

  width: 64px;
  height: 64px;
  border-radius: 12px 12px 12px 12px;
  margin: auto;
}
.icon3 {
  width: 64px;
  height: 60px;
  border-radius: 12px 12px 12px 12px;
  margin: auto;
  display: block;
  border: 1px solid #eeee;
}
.icon4 {
  width: 64px;
  height: 64px;
  border-radius: 12px 12px 12px 12px;
  margin: auto;
  display: block;
  font-size: 24px;
  background: url('../../assets/img/close.png') 7px 7px rgba(238, 238, 238, 0.5) no-repeat;
}

.icon2 {
  background: url('../../assets/img/sao2.png') 7px 7px rgba(50, 203, 199, 0.5) no-repeat;

  width: 64px;
  height: 64px;
  margin: auto;
  border-radius: 12px 12px 12px 12px;
}
.linepoint span,
.linepoint1 span {
  font-size: 24px;
}
.point {
  width: 10px;
  height: 10px;
  background: #d3d5df;
  border-radius: 50%;
  float: left;
  margin-left: 50%;
  margin-top: 6%;
}
.point2 {
  width: 10px;
  height: 10px;
  background: #32cbc7;
  border-radius: 50%;
  float: left;
  margin-left: 50%;
  margin-top: 6%;
}
.line {
  border-bottom: 1px dashed #ddd;
  height: 1px;
  padding: 2% 0% 5%;
  margin-bottom: 4%;
}
.line2 {
  border-bottom: 1px solid #32cbc7;
  height: 1px;
  padding: 2% 0% 5%;
  margin-bottom: 4%;
}
.line3 {
  height: 180px;
  border-right: 1px dashed #ddd;
  width: 2px;
  z-index: 2;
  float: right;
}
.line33 {
  height: 180px;
  border-right: 1px dashed #32cbc7;
  width: 2px;
  z-index: 2;
  float: right;
}
.line4 {
  height: 180px;
  border-right: 1px dashed #ddd;
  width: 2px;
  z-index: 2;
  float: left;
}
.line44 {
  height: 180px;
  border-right: 1px dashed #32cbc7;
  width: 2px;
  z-index: 2;
  float: left;
}

.Scphoto {
  width: 100%;
  height: 100%;
}
.listid {
  border-bottom: 2px solid #252b50;
  color: #252b50;
  font-size: 28px;
  font-weight: 800;
  font-family: 'D DIN';
  .listid_o {
    background: #fb8753;
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    border-radius: 50%;
    margin-top: 2%;
  }
}
.listTitle {
  color: #252b50;
  font-size: 28px;
  padding-left: 5%;
}
.listOne {
  line-height: 64px;
  padding: 5% 2%;
}
::v-deep .van-tabs__wrap{
  width: 100%;
 }
::v-deep .van-step--vertical .van-step__circle-container,
::v-deep.van-step--vertical .van-step__line {
  left: 40%;
}
::v-deep.van-step--vertical .van-step__line {
  width: 1px !important;
}
::v-deep.van-steps--vertical {
  padding: 30px 0 0 0;
  height: 110px;
}
::v-deep.van-tabs__content {
  width: 94%;
  margin: auto;
  overflow: hidden;
  background: #fff;
  border-radius: 12px 12px 12px 12px;
  padding: 2% 2%;
}
::v-deep.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.one ::v-deep .van-icon-arrow-left {
  float: left;
  padding: 3%;
  box-sizing: border-box;
}
::v-deep .van-tabs__line{
  bottom: 45px;
}
.one {
  height: 88px;
  line-height: 88px;
  .name {
    width: 73%;
    margin: auto;
    display: block;
    font-size: 4.8vw;
    font-weight: 500;
    color: #252b50;
    float: left;
    text-align: center;
  }
 ::v-deep .van-tabs__nav{
   width: 100%;
 }
 ::v-deep .van-tabs__wrap{
   width: 100%;
 }
  .user {
    padding-right: 5%;
    float: right;
    font-size: 24px;
    margin-top:1%;
    span {
      background: url('../../assets/img/photo.png') no-repeat #fff;
      background-size: 100% 100%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
      float: left;
      margin-top: 26%;
    }
  }
}
</style>
<style >
.jobcontent {
  padding: 2% 5%;
  float: right;
  background: #fff;
  width: 37%;
}

.van-steps,
.van-tabs__nav,
.van-collapse-item__content {
  background: rgba(255, 255, 255, 0);
}
.daily .van-cell--clickable {
  background: #32cbc7;
  border-radius: 3px 3px 3px 3px;
  color: #fff;
  font-size: 28px;
  width: 70%;
  padding: 10px 30px 10px 30px;
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
.linepoint {
  width: 33%;
  float: left;
  height: 190px;
  text-align: center;
}
.linepoint1 {
  width: 33%;
  float: right;
  height: 190px;
  text-align: center;
}
.linepoint label,
.linepoint1 label {
  font-size: 18px;
}

.daily_content .van-collapse-item__wrapper {
  background: #fff;
}

.el-input {
  font-size: 24px;
}

.list_radio {
  margin-left: 7%;
  margin-top: 2%;
}

.listOne .van-radio__icon .van-icon {
  font-size: 24px;
}
.listOne .van-radio__label {
  color: #252b50;
}
.abnormal {
  min-height: 400px;
}
.top {
  height: 180px;
}
.top .el-select {
  float: left;
  width: 47%;
}
.top .van-field__word-limit {
  margin-top: -8%;
  margin-right: 2%;
  color: #9296af;
}
.top .el-select:nth-child(2) {
  margin-left: 2%;
}
.top .el-select .el-input .el-select__caret {
  color: #252b50;
  font-size: 24px;
}
.top .van-cell {
  width: 85%;
  padding: 0;
  float: left;
}
.top textarea {
  background: #f5f7fb;
  border-radius: 6px 6px 6px 6px;
  font-size: 24px;
  padding-left: 5%;
  width: 100%;
  height: 84px !important;
}
.top.van-cell {
  padding: 0;
}
.bottom {
  color: #252b50;
  position: relative;
}
.bottom img {
  height: 80%;
}
.bottom .van-uploader__upload-icon {
  color: #32cbc7;
}
.bottom .photo {
  width: 100%;
  float: left;
}
.photoSpan {
  font-size: 20px;
  color: #9296af;
  position: absolute;
  bottom: 7%;
  left: 7%;
}
.microphone {
  background: url('../../assets/img/microphone.png') 50% 50% #f5f7fb no-repeat;
  float: right;
  width: 72px;
  height: 72px;
  margin-top: 2%;
}

.visitor_photos {
  font-size: 28px;
  line-height: 20px;
  word-wrap: break-word;
  padding: 5% 5%;
  color: #646566;
  text-align: left;
}
.photoT span {
  position: absolute;
  bottom: 6%;
  left: 4%;
  font-size: 20px;
}
.photoT > .van-uploader.van-uploader__wrapper.van-uploader__upload {
  background: #f5f7fb;
  border-radius: 6px 6px 6px 6px;
}
.bottom2 {
  border-top: 1px solid #eeeeee;
}
.bottom2 .van-cell {
  padding: 5% 0;
}
.el-input__inner {
  background-color: #f5f7fb;
  border: none;
  font-size: 24px;
  height: 60px;
  margin: 5% 0%;
}
.linepoint i {
  font-size: 20px;
  padding-right: 2%;
}
.van-cell::after {
  border: none;
}
.linespan {
  color: #ccc;
}
.daily_content .van-tab__pane-wrapper {
  overflow: hidden;
}
.one {
  width: 100%;
}
</style>