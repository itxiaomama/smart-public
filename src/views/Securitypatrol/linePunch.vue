
<template>
  <div class="line_content">
    <div id="container"></div>
    <p id="result"></p>
    <div class="user">
      <div class="userle">
        <div class="img"></div>
        <van-image round width="2rem" height="2rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <span>{{ onedata.create_by }}<br /><label>保安部-保安组长</label></span>
      </div>
      <div class="userri">
        <span
          >当前巡更进度<br /><label>{{ onedata.id }}/{{ line.length }}</label></span
        >
      </div>
    </div>
    <button class="tencentlo" @click="tencentLocation">腾讯</button>
    <!-- <button @click="getlocation">获取精确定位信息</button> -->
    <div class="punch">
      <div :class="punch === true ? 'point2' : 'point'" @click="punck">
        {{ punch === true ? '已打卡' : '定位打卡' }}<br /><span class="nowtime">{{ nowTime }}</span>
      </div>
      <label class="text"
        >已进入{{ onedata.point_name }}<span class="pointbz">（{{ onedata.dis_describe }}）</span><br /><span
          >经纬度（<span class="punchlat">{{ onedata.longitude }},{{ onedata.latitude }}</span
          >）</span
        ></label
      >
      <div class="photo">
        <van-uploader
          v-model="fileList"
          :max-count="1"
          :before-delete="beforeDelete"
          multiple
          :after-read="afterRead"
          accept="image/*"
          capture="camera"
        />
      </div>
    </div>
  </div>
</template>
<script src="https://map.qq.com/api/js?v=2.exp&key=XOXBZ-MZWWD-CDX4H-PONXN-UA5PJ-D7FJN"></script>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import Exif from 'exif-js'
import { Field, Icon, Button, Toast } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import $ from 'jquery'
const _this = wx

export default {
  name: 'linePunch',
  data() {
    return {
      fileList: [],
      punch: false,
      token: 'Bearer ',
      value: '',
      nowTime: '',
      map: '',
      line: [],
      onedata: {},
      data: [],
      imgSrc: '',
      position: [],
      param: {},
      lat: [],
      url: '',
      res: '',
      files: {
        name: '',
        type: ''
      }
    }
  },
  mounted() {
    this.nowTimes()
    this.getdata()

    this.$nextTick(() => {
      this.initMap()
    })
    this.wxconfigInit()

    // document.getElementById('pos-area').style.height = document.body.clientHeight - 110 + 'px'

    // var positionNum = 0
    // var options = { timeout: 8000 }
  },
  activated() {
    this.res = this.$route.query
    this.getlocation()
    var data = {
      key: 'XOXBZ-MZWWD-CDX4H-PONXN-UA5PJ-D7FJN' //这个key就是你申请的密钥
    }
    var url = 'https://apis.map.qq.com/ws/location/v1/ip' //这个就是地理位置信息的接口
    data.output = 'jsonp'
    this.$jsonp(url, data)
      .then(res => {
        console.log(res, 123)
      })
      .catch(error => {
        console.log(error, 456)
      })
  },
  methods: {
    tencentLocation() {
      $.ajax({
        type: 'get',
        url: 'https://apis.map.qq.com/ws/location/v1/ip',
        data: {
          key: 'XOXBZ-MZWWD-CDX4H-PONXN-UA5PJ-D7FJN',
          output: 'jsonp'
        },
        dataType: 'jsonp',
        success: function (data) {
          console.log(data)
          var itude = data.result.location.lng + ',' + data.result.location.lat
          alert(itude)
        },
        error: function (ex) {
          console.log(ex)
        }
      })
    },
    async getlocation() {
      const { data: res } = await this.$http.get('https://apis.map.qq.com/ws/location/v1/ip', {
        params: {
          key: 'XOXBZ-MZWWD-CDX4H-PONXN-UA5PJ-D7FJN'
        }
      })
      console.log(res)
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
              jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data.status_code === 422) {
              Toast(error.response.data.message)
            }
          }
        })
    },
    beforeDelete(i) {
      removeAaary(this.fileList, i)
      this.$emit('beforeDelete', i)
    },
    afterRead(file) {
      this.files.name = file.file.name // 获取文件名
      this.files.type = file.file.type // 获取类型
      // file.status = 'uploading'
      // file.message = '上传中...'
      // file.id = ''
      this.imgPreview(file.file)
    },
    imgPreview(file) {
      let self = this
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题   npm install exif-js --save   这里需要安装一下包
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            // 上传图片
            self.postImg(this.result)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              // 上传图片
              self.postImg(data)
              console.log(data)
            }
          }
        }
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas) //转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    },
    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    //将base64转换为文件
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      })
    },
    postImg(base64) {
      let file = this.dataURLtoFile(base64)
      this.$emit('postImg', { file, fileList: this.fileList })

      let params = new FormData()
      params.append('module', 'park')
      params.append('files[]', file)

      axios
        .post('/api/system/upload', params, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.imgSrc = res.data.data[0].path
        })
    },

    getdata() {
      var that = this
      axios.get('/api/prop/patrolPoint?per_page=100').then(res => {
        that.line = res.data.data.data
        console.log(that.line)
      })
      axios.get('/api/prop/patrolPoint', { params: { id: this.$route.query.point_id } }).then(res => {
        that.onedata = res.data.data
        console.log('1221', that.onedata)
        var marker = new AMap.Marker({
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          position: [that.onedata.longitude, that.onedata.latitude],
          offset: new AMap.Pixel(-13, -30)
        })
        marker.setMap(that.map)
      })
    },
    punck() {
      var that = this
      if (that.fileList.length === 0) {
        Toast('请先上传图片')
      } else {
        wx.getLocation({
          success: function (res) {
            that.lat = [res.longitude, res.latitude]

            AMap.convertFrom(that.lat, 'gps', function (status, result) {
              that.position = [result.locations[0].lng, result.locations[0].lat]
              console.log('转换后的经纬度', that.position)
              console.log('用户经纬度', that.position)
              var data = {
                point_id: that.onedata.id,
                image: that.imgSrc,
                longitude: that.position[0] + '',
                latitude: that.position[1] + ''
              }

              axios
                .post('/api/prop/patrolPointTask', data)
                .then(res => {
                  that.punch = true
                  Toast('打卡成功')
                })
                .catch(error => {
                  if (error.response) {
                    if (error.response.data.status_code === 422) {
                      Toast(error.response.data.message)
                    }
                  }
                })
            })
          },
          cancel: function (res) {
            alert('用户拒绝授权位置信息！')
          }
        })
      }
    },
    timeFormate(timeStamp) {
      let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      this.nowTime = hh + ':' + mm + ':' + ss
    },
    nowTimes() {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 1000)
      this.clear()
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },
    initMap() {
      var that = this
      AMapLoader.load({
        key: 'f2c9b1b2ff56a0f8ff940d5f814d2827', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.MoveAnimation', 'AMap.ToolBar', 'AMap.MarkerCluster', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.convertFrom'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          that.map = new AMap.Map('container', {
            viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
            zoom: 11, //初始化地图层级
            center: [120.270932, 30.187355] //初始化地图中心点
          })
          console.log('点位', that.line)
          if (that.line.length > 0) {
            for (let i = 0; i < that.line.length; i++) {
              var lnglat = [that.line[i].longitude, that.line[i].latitude]

              AMap.convertFrom(lnglat, 'gps', function (status, result) {
                if (result.info === 'ok') {
                  var resLnglat = result.locations[0]
                  // console.log('转换后的',result.locations[0])
                  var circle = new AMap.Circle({
                    center: resLnglat,
                    radius: 2, //半径
                    fillColor: '#32CBC7',
                    zIndex: 50
                  })
                  circle.setMap(that.map)
                  // 缩放地图到合适的视野级别
                  that.map.setFitView([circle])
                }
              })
            }
            var path = [
              [120.373931, 30.157078],
              [120.373963, 30.155923],
              [120.375648, 30.155752],
              [120.375363, 30.157106],
              [120.375363, 30.157106]
            ]

            var polygon = new AMap.Polygon({
              path: path,
              strokeColor: '#32CBC7',
              strokeWeight: 1,
              strokeOpacity: 0.7,
              fillOpacity: 0.2,
              fillColor: '#32CBC7',
              strokeStyle: 'dashed',
              zIndex: 50
            })

            that.map.add(polygon)

            // 缩放地图到合适的视野级别
            that.map.setFitView([polygon])
          }
          var options = {
            enableHighAccuracy: true,
            showButton: true, //是否显示定位按钮
            position: 'LB', //定位按钮的位置
            /* LT LB RT RB */
            offset: [10, 20], //定位按钮距离对应角落的距离
            showMarker: true, //是否显示定位点
            panToLocation: true,
            markerOptions: {
              //自定义定位点样式，同Marker的Options
              offset: new AMap.Pixel(-18, -36),
              content: '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
            },
            showCircle: false, //是否显示定位精度圈
            circleOptions: {
              //定位精度圈的样式
              strokeColor: '#0093FF',
              noSelect: true,
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: '#02B0FF',
              fillOpacity: 0.25
            }
          }
          AMap.plugin(['AMap.Geolocation'], function () {
            var geolocation = new AMap.Geolocation(options)
            that.map.addControl(geolocation)
            geolocation.getCurrentPosition(function (status, result) {
              if (status == 'complete') {
                // onComplete(result)
              }
            })
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  computed: {}
}
</script>
<style lang="scss" scoped>
.mappoint {
  width: 12px;
  height: 12px;
  background: #32cbc7;
  border-radius: 50%;
}
.line_content {
  height: 100%;
  font-weight: 600;
  #container {
    height: 50%;
    width: 100%;
    background: #32cbc7;
  }
  .user {
    width: 90%;
    box-shadow: 0px 0px 10px 0px #e9eef7;
    border-radius: 6px 6px 6px 6px;
    margin: 5% auto;
    height: 8%;
    padding: 3% 5% 0% 5%;
    box-sizing: border-box;
    .userle {
      float: left;
      width: 70%;
      span {
        font-size: 28px;
        padding-left: 2%;
        color: #252b50;
        label {
          color: #9296af;
          font-size: 24px;
        }
      }
    }
    .userri {
      float: right;
      span {
        font-size: 24px;
      }
    }
  }
  .punch {
    text-align: center;
    .point {
      width: 240px;
      height: 240px;
      background: linear-gradient(360deg, #32cbc7 0%, #48dcd8 100%);
      box-shadow: 0px 4px 10px 0px #9adfdd;
      color: #fff;
      opacity: 1;
      border-radius: 50%;
      margin: 5% auto;
      text-align: center;
      padding-top: 10%;
      box-sizing: border-box;
      line-height: 1.8rem;
      font-size: 36px;
      .nowtime {
        font-size: 24px;
        opacity: 0.5;
      }
    }
    .point2 {
      width: 240px;
      height: 240px;
      background: #eeeeee;
      color: #9296af;
      opacity: 1;
      border-radius: 50%;
      margin: 5% auto;
      text-align: center;
      padding-top: 10%;
      box-sizing: border-box;
      line-height: 1.5rem;
      font-size: 36px;
      .nowtime {
        font-size: 24px;
        opacity: 0.5;
      }
    }
    .photo {
      position: absolute;
      right: 5%;
      bottom: 20%;
    }
    .text {
      line-height: 1.7rem;
      font-size: 28px;
      span {
        color: #9296af;
      }
      .pointbz {
        color: #636676;
      }
      .punchlat {
        color: #ffaf8c;
        font-size: 24px;
      }
    }
  }
}
</style>
<style>
.photo.van-uploader__upload {
  width: 100px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px #f9dccf;
}
.punch .van-uploader__upload-icon {
  color: #fb8753;
}
.van-image--round {
  float: left;
}
.amap-logo {
  display: none;
  opacity: 0 !important;
}
.amap-copyright {
  opacity: 0;
}
</style>