
<template>
  <div class="container">
    <div class="top">
      <div class="img"></div>
      <span
        >填写访客信息 <br />
        <label>入园畅通无阻</label></span
      >
      <van-cell class="share" @click="showShare = true" />
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    </div>

    <div class="content">
      <van-form @submit="onSubmit">
        <div class="warp">
          <van-field name="type" label="来访类型">
            <template #input>
              <van-radio-group v-model="type" direction="horizontal">
                <van-radio name="0" @click="chageradio()">访客</van-radio>
                <van-radio name="1" @click="chageradio()">车辆</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-show="type === '0'"
            v-model="from.visitor_name"
            name="访客姓名"
            label="访客姓名"
            input-align="right"
            placeholder="请输入"
            :rules="[{ required: true, message: '请填写访客姓名' }]"
          />
          <van-field
            v-show="type === '0'"
            v-model="from.number"
            name="身份证号"
            label="身份证号"
            input-align="right"
            placeholder="请输入"
            :rules="[{ required: true, message: '请填写身份证号' }]"
          />
          <!-- <van-field
            v-show="type === '1'"
            v-model="from.number"
            name="车牌号"
            label="车牌"
            input-align="right"
            placeholder="请输入"
            :rules="[{ required: true, message: '请填写车牌号' }]"
          /> -->
          <!-- <van-field
                v-model="carnum"
                name="carnum"
                label="车牌"
                placeholder="车牌"
                is-link
                readonly
                @click="showcarnum = !showcarnum"
                :rules="[{ required: true, message: '请填写车牌号' }]"
              /> -->
          <van-cell-group v-show="type === '1'">
            <van-field :value="from.number" readonly label="车牌号" @click="show = true" />
          </van-cell-group>
          <vnp-keyboard v-show="type === '1' && show" v-model="from.number"></vnp-keyboard>

          <!-- <vnp-input v-model="from.number" v-show="type === '1'" label="车牌"></vnp-input> -->

          <!-- <p-soft-keyboard v-model="from.number"></p-soft-keyboard> -->

          <van-field v-model="from.contact" name="联系方式" label="联系方式" input-align="right" placeholder="请输入" :rules="telRules" />
          <van-field
            v-model="from.peer_nums"
            v-show="type === '0'"
            name="同行人数"
            label="同行人数"
            input-align="right"
            placeholder="人"
            :rules="[{ required: true, message: '请填写同行人数' }]"
          />
          <div class="visitor_photos">访客照片</div>
          <div class="examplebox">
            <div class="example"><span>示例</span></div>
            <!-- <div class="photo">
              <van-uploader :after-read="afterRead" :max-count="1" v-model="fileList" :class="fileSC ? 'Scphoto' : 'photoImg'" />
              <span v-if="!fileSC">拍照上传</span>
            </div> -->
            <div class="photo">
              <van-uploader
                v-model="fileList"
                :max-count="1"
                multiple
                :after-read="afterRead"
                :class="fileList.length === 0 ? 'photoImg1' : 'Scphoto'"
              />
              <span v-if="fileList.length === 0">拍照上传</span>
            </div>
            <label>提示：请保持五官清晰以方便系统识别 不清晰的照片可能会影响您进入园区</label>
          </div>
        </div>
        <div class="warp">
          <van-field
            style="margin-top: 5%"
            v-model="from.company_name"
            input-align="right"
            right-icon="arrow"
            label="造访公司"
            name="造访公司"
            @click="complayShow = true"
            placeholder="请选择"
          />

          <!-- <div class="jump"></div> -->

          <van-field
            v-model="from.describe"
            name="造访事由"
            label="造访事由"
            right-icon="arrow"
            input-align="right"
            placeholder="请选择"
            @click="showPicker1 = true"
            :rules="[{ required: true, message: '请填写造访事由' }]"
          />
          <van-popup v-model="showPicker1" position="bottom">
            <van-picker show-toolbar :columns="columns" @confirm="onConfirm2" @cancel="showPicker1 = false" />
          </van-popup>
          <van-field
            readonly
            clickable
            name="come_time"
            :value="from.come_time"
            label="造访时间"
            right-icon="underway-o"
            input-align="right"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              v-show="showPicker"
              v-model="from.come_time"
              :formatter="formatter"
              type="datetime"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </div>
      </van-form>

      <!-- <div id="qrcode" ref="qrCodeUrl" style="padding: 29%; margin-top: 89%; margin-left: 3.5%"></div> -->
      <!-- <div id="downloadImg"></div>
        <button type="text" @click="downloadCode">保存到本地</button> -->
    </div>
    <div class="tjbutton">
      <van-button color="#6377F5" @click="submitFrom" square block type="info" native-type="submit">生成访客码</van-button>
    </div>

    <div class="ewmTK" v-show="ewmshow" ref="content">
      <img :src="ewmurl" style="width: 40%; margin-top: 126%; margin-left: 34%" />
      <div class="save" @click="savePic" style="width: 100%; height: 50px; margin-left: 3.5%"></div>
    </div>
    <van-popup class="complay_container" v-model="complayShow" position="bottom">
      <div class="complay_content">
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
          <van-dropdown-item v-model="value4" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
        <div class="list" v-for="item in list" :key="item.number" @click="getName(item)">
          <label>{{ item.number }}</label> <span>{{ item.name }}</span>
        </div>
        <footer-tabbar />
      </div>
    </van-popup>
  </div>
</template>

<script>
import $ from 'jquery'
import html2Canvas from 'html2canvas'

import QRCode from 'qrcodejs2'
import { Toast } from 'vant'
import { Dialog } from 'vant'
import axios from 'axios'
import { setToken } from '@/utils/auth'
import { mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import { param } from '../../utils'
import { getUserInfo } from '../../api/user'
import Keyboard from '@/components/vant-number-plate/vnp-keyboard'
import VnpInput from '@/components/vant-number-plate/vnp-input'

// const { mapActions } = createNamespacedHelpers('test') // 可使用这种方式直接获得test模板

export default {
  name: 'home',
  data() {
    return {
      value: 1,
      param: '',
      userOne: [],
      username: '',
      password: '',
      keyBoard: {
        //键盘
        isShow: false,
        kbLenght: 8, //车牌输入框长度
        indexNum: ' ', //点击车牌设置焦点的下标
        value: [] //键盘值
      },
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      iconList: [],
      fileList: [],
      showPicker: false,
      showPicker1: false,
      gotoCompany: false,
      columns: ['面试', '商务洽谈', '上班', '运输', '其他'],
      comList: [
        '杭州巨安科技有限公司',
        '浙江讯飞科技有限公司',
        '浙江兴红检测有限公司',
        '杭州路顺科技有限公司',
        '杭州千行科技有限公司',
        '中国远洋启航航空航天集团有限公司（杭州分公司）',
        '杭州鹿鸣集团有限公司'
      ],
      ewmshow: false,
      value1: '',
      sumb: true,
      token:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGFyay5jbmdpYW50ZWNoLmNvbVwvYXBpXC9zeXN0ZW1cL2F1dGgiLCJpYXQiOjE2NTk5NDMyMDEsImV4cCI6MTY1OTk0NjgwMSwibmJmIjoxNjU5OTQzMjAxLCJqdGkiOiJlUzdvM1AxOFhHMXJtY1psIiwic3ViIjoxNSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.-6GehREMuuxm3S2A_ACizkrv_bOiG9htIoZZ97vdU6M',
      value: '',
      type: '0',
      ewmurl: '',
      telRules: [
        {
          required: true,
          message: '手机号不能为空',
          trigger: blur
        },
        {
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
          },
          message: '请输入正确的手机号格式',
          trigger: 'onBlur'
        }
      ],
      from: {
        type: '0',
        visitor_name: '',
        number: '',
        contact: '',
        peer_nums: '',
        company_name: '',
        describe: '',
        come_duty: '',
        image: ''
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      come_time: new Date(),
      showShare: false,
      nowTime: '',
      leave: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' }
      ],
      code: '',
      value: '',
      complayShow: false,
      value4: 0,
      value2: 0,
      value3: 0,
      fileSC: false,
      option1: [
        { text: 'A区', value: 0 },
        { text: 'B区', value: 1 },
        { text: 'C区', value: 2 }
      ],
      option2: [
        { text: '2幢', value: 0 },
        { text: '3幢', value: 1 },
        { text: '4幢', value: 2 }
      ],
      option3: [
        { text: 'F15', value: 0 },
        { text: 'F2', value: 1 },
        { text: 'F4', value: 2 }
      ],
      list: [
        { number: '1501-1505', name: '杭州巨安科技有限公司' },
        { number: '1506', name: '浙江讯飞科技有限公司' },
        { number: '1507-1508', name: ' 浙江兴红检测有限公司' },
        { number: '1509', name: '杭州路顺科技有限公司' },
        { number: '1510', name: '杭州千行科技有限公司' },
        {
          number: '1511-1513',
          name: ' 中国远洋启航航空航天集团有限公司（杭州分公司）'
        },
        { number: ' 1514-1515', name: ' 杭州鹿鸣集团有限公司' }
      ],
      show: false
    }
  },
  components: {
    'vnp-keyboard': Keyboard,
    'vnp-input': VnpInput
  },
  computed: {},
  watch: {
    plate_number(newVal, oldVal) {
      console.log(newVal)
    },
    numArr(newVal, oldVal) {
      console.log(newVal)
    },
    first(newVal, oldVal) {
      console.log(newVal)
    }
  },

  activated() {
    var that = this
    if (that.code === null || (that.code === '' && that.$route.query.type === undefined)) {
      that.getToken()
    }
  },
  mounted() {
    var that = this
    that.getCode()

    //   setTimeout(() => {
    // 	  that.Login()
    // }, 3000);
  },
  methods: {
    ...mapMutations(['changeLogin']),
    onSearch(val) {
      Toast(val)
    },
    input_key(val) {
      // console.log(val)
      if (val.isHid == true) {
        showcarnum.value = !val.isHid
      } else {
        carnum.value = val.num
      }
    },

    // 唤起键盘
    clickShowKeyboard() {
      if (!this.first) {
        this.show_chinese = true
      } else {
        this.show_chinese = false
        this.show_allBoard = true
      }
    },
    // 选择车牌号前面的汉字
    checkChinese(index) {
      // debugger
      // 如果点击删除键，删除第一个格的内容
      if (this.ChineseList[index].id == 99) {
        this.first = ''
      } else {
        // 把选中的字赋值给第一个格，并且切换键盘
        this.first = this.ChineseList[index].name
        this.show_chinese = false
        this.show_allBoard = true
      }
    },
    // 选择车牌号后面的数字和字母
    checkEnglish_num(index) {
      // 如果点击删除键，删除 numArr 的最后一个值
      if (this.English_Number[index].id == 99) {
        this.numArr.pop()
        // 如果 numArr 里面被删的没有值了，切换键盘
        if (this.numArr.length == 0) {
          this.show_chinese = true
          this.show_allBoard = false
        }
      } else {
        // 把选中的值 push 到 numArr 内
        this.numArr.push(this.English_Number[index].name)
        // 如果 numArr 中的值超过 7 个（车牌号的最大位数），删除最后一个
        if (this.numArr.length > 7) {
          this.numArr.pop()
        }
      }
    },
    changeNumber() {
      //点击新能源
      this.newNumberFlag = !this.newNumberFlag
      if (this.newNumberFlag && this.numArr.length > 6) {
        this.numArr.pop()
      }
    },
    // 关闭虚拟键盘
    close_keyboard() {
      this.show_chinese = false
      this.show_allBoard = false
    },

    getName(item) {
      console.log(item)
      this.from.company_name = item.name
      this.complayShow = false
    },
    onCancel() {
      this.complayShow = false
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      console.log(val)
      return val
    },
    getToken() {
      console.log('授权')
      var that = this
      var data = {
        park_id: 1,
        tenant_id: 2,
        redirect_uri: 'https://park.cngiantech.com/wx/visitors'
      }

      axios.post('/api/system/auth/wx/code', data).then(res => {
        // Toast.success('提交成功')
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
      axios.post('/api/system/auth/wx/user', data).then(res => {
        console.log('微信授权登录' + res.data)
        if (res.data.status_code === 422) {
          Toast(res.data.message)
          that.getToken()
        }
        if (res.data.status_code === 200) {
          that.Login()
        }
      })
    },
    Login() {
      // console.log('登录')
      // var that = this
      // that.code = this.getQueryString('code')
      // console.log(that.code)
      // var data = {
      //   park_id: 1,
      //   tenant_id: 2,
      //   code: that.code
      // }
      // console.log(data)
      // axios
      //   .post('/api/system/auth/wx/login', data, {
      //     headers: {
      //       Authorization: that.token
      //     }
      //   })
      //   .then(res => {
      //     if (res.data.status_code === 422) {
      //       Toast(res.data.message)
      //       that.getToken()
      //     }
      //     // sessionStorage.setItem('Authorization', 'Bearer ' + res.data.data.access_token) //存储到本地  res 是后端返回的token

      //     that.userToken = 'Bearer ' + res.data.data.access_token // 将用户token保存到vuex中
      //     that.changeLogin({ Authorization: that.userToken })
      //   })
    },
    change(DateIn) {
      console.log(DateIn)
      var Year = 0
      var Month = 0
      var Day = 0
      var Hour = 0
      var Minute = 0
      var CurrentDate = ''
      //初始化时间
      Year = DateIn.getFullYear()
      Month = DateIn.getMonth() + 1
      Day = DateIn.getDate()
      Hour = DateIn.getHours()
      Minute = DateIn.getMinutes()

      CurrentDate = Year + '-'
      if (Month >= 10) {
        CurrentDate = CurrentDate + Month + '-'
      } else {
        CurrentDate = CurrentDate + '0' + Month + '-'
      }
      if (Day >= 10) {
        CurrentDate = CurrentDate + Day
      } else {
        CurrentDate = CurrentDate + '0' + Day
      }

      if (Hour >= 10) {
        CurrentDate = CurrentDate + ' ' + Hour
      } else {
        CurrentDate = CurrentDate + ' 0' + Hour
      }
      if (Minute >= 10) {
        CurrentDate = CurrentDate + ':' + Minute
      } else {
        CurrentDate = CurrentDate + ':0' + Minute
      }
      return CurrentDate
    },
    onSelect(option) {
      Toast(option.name)
      this.showShare = false
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    onOversize(file) {
      console.log(file)
      Toast('文件大小不能超过 500kb')
    },
    onConfirm3(value) {
      this.from.company_name = value
      this.gotoCompany = false
    },
    onConfirm2(value) {
      //造访事由
      this.from.describe = value
      this.showPicker1 = false
    },
    onConfirm(time) {
      this.from.come_time = this.change(time)
      this.showPicker = false
    },

    afterRead(file) {
      this.fileSC = true
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
          // console.log(res.data)
          this.from.image = res.data.data[0].path
          console.log(this.from.image)
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
    },
    submitFrom() {
      console.log('提交事件')
      var that = this
      that.from.type = that.type
      console.log(that.from)
      axios.post('/api/prop/visit', that.from).then(res => {
        console.log(res.data)
        that.ewmurl = res.data.data.path
        Toast.success('提交成功')
        console.log(that.ewmurl)
      })

      that.ewmshow = true

      // that.creatQrCode()
    },

    chageradio() {
      this.from = {}
    },
    savePic() {
      const ref = this.$refs.content // 截图区域
      html2Canvas(ref, {
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      }).then(canvas => {
        const dataURL = canvas.toDataURL('image/png')
        const creatDom = document.createElement('a')
        document.body.appendChild(creatDom)
        creatDom.href = dataURL
        creatDom.download = '图片'
        creatDom.click()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.complay_container {
  height: 70%;
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
  min-height: 100%;
  width: 100%;

  background: #f5f7fb;
  font-size: 'PingFang SC-Medium';
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
  font-family: 'PingFang SC-Medium';
  position: absolute;
  bottom: 48%;
  left: 4%;
  font-size: 36px;
}
.top .img {
  background: url('../../assets/img/map.png') no-repeat 100% 30%;
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
  margin-top: 2%;
}
.content {
  width: 92%;
  height: 110%;
  border-radius: 12px;
  margin: -22% auto;
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
.van-form {
  height: 100%;
  padding-top: 3%;
  border-radius: 12px;
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

  height: 12%;
  width: 6% !important;
  position: absolute;
  top: 10%;
  right: 5%;
}
.ewmTK {
  background: url('../../assets/img/ewm.png') no-repeat;
  background-size: cover;
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;

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
  width: 48%;
  height: 260px;
  float: left;
  border-radius: 6px 6px 6px 6px;
}
.example span {
  width: 40px;
  height: 20px;
  background: #fb8753;
  border-radius: 3px 0px 3px 0px;
  opacity: 1;
  color: #fff;
  padding: 0 5px 5px 5px;
  font-size: 24px;
}
.photo {
  background: #f5f7fb;
  width: 49%;
  height: 260px;
  float: left;
  margin-left: 2%;
  color: #9296af;
  position: relative;
  border-radius: 6px 6px 6px 6px;
}
.photoImg1 {
  margin: 15% 25%;
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
  position: fixed;
  bottom: 0%;
  width: 92%;
  left: 4%;
  background: #fff;
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
.warp {
  background: #fff;
  padding: 2% 0%;
  border-radius: 12px;
  margin-top: 2%;
}
.input-plate-wrap {
  display: flex;
  margin-top: 30upx;
  .plate-item {
    position: relative;
    display: flex;
    flex: 1;
    margin: 0 6upx;
    height: 90upx;
    font-size: 20px;
    border: 3upx solid #c3c2cb;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: #ffffff;
    &.active {
      border: 3upx solid green;
    }
    &:nth-child(2) {
      margin-right: 30upx;
      &:after {
        display: block;
        position: absolute;
        content: '';
        height: 10upx;
        width: 10upx;
        right: -26upx;
        border-radius: 12upx;
        background-color: #c3c2cb;
      }
    }
  }

  .point {
    display: flex;
    width: 14upx;
    height: 14upx;
    border-radius: 14upx;
    margin-top: 40upx;
    background-color: #c3c2cb;
  }
  .icondiandongche {
    color: green;
    font-size: 20px;
  }
}
.keyboard {
  // width: 100%;
  width: calc(100% - 30px);
  // position: absolute;
  // margin-left: 15px;
  // margin-top: 15px;
  margin: 30px auto;
  margin-left: 4%;
  label {
    float: left;
    color: #252b50 !important;
    font-size: 3.733vw;
    font-weight: 800;
  }
}

.numberCover {
  display: flex;

  .button {
    margin-left: 10px;
    width: 18%;

    .van-button {
      width: 100%;
      // margin-right: 15px;
      // margin-top: 15px;
      // margin-left: 10px;
      height: 35px;
    }
  }

  .van-button--normal {
    padding: 0;
  }
}

// 车牌号 & 虚拟键盘
.input-box {
  width: 70%;
  height: 35px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 8px 0px rgba(96, 100, 112, 0.1);
  // border-radius: .4rem;
  border: 1px solid rgba(206, 208, 210, 1);
  // margin: 0 auto 2rem;
  display: flex;
  justify-content: center;

  li {
    flex: 1;
    border-right: 1px solid rgba(206, 208, 210, 1);
    box-sizing: border-box;
    margin-left: -1px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #323233;
  }

  li:last-child {
    border: none;
  }
}

.class-close-box {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0.5rem;
  top: -40px;
}

.class-close-box-div {
  width: 20px;
  height: 20px;
  font-size: 13;
  line-height: 20px;
  margin: auto;
  text-align: center;
  border: 1px solid #666;
  border-radius: 50%;
}

.class-close-box-li {
  width: 1px;
  height: 0.5rem;
  background: #666;
  margin: auto;
}

.overflow-y {
  overflow-y: inherit;
}

.class-van-button-small {
  min-width: 0;
  border-radius: 5px;
  margin: 5px 2px;
  box-shadow: 5px 5px 5px #aaa;
}

.class-plate-box {
  width: 100%;
  padding: 0.7rem 0.5rem;
  box-sizing: border-box;
  background: #eaf1f9;
  position: relative;
}

.plate_number {
  .van-popup {
    @extend .overflow-y;
  }

  .van-popup--bottom {
    background: #eee;
  }

  .plate_chinese_box {
    width: 100%;
    @extend .class-plate-box;

    .close-box {
      @extend .class-close-box;

      div {
        @extend .class-close-box-div;
      }

      li {
        @extend .class-close-box-li;
      }
    }

    .van-button--small {
      width: 11.3%;
      // height: 3.5rem;
      @extend .class-van-button-small;
    }
  }
}

.allBoard {
  .van-popup {
    @extend .overflow-y;
  }

  .plate_number_box {
    width: 100%;
    @extend .class-plate-box;

    .close-box {
      @extend .class-close-box;

      div {
        @extend .class-close-box-div;
      }

      li {
        @extend .class-close-box-li;
      }
    }

    .van-button--small {
      width: 8.8%;
      // height: 3rem;
      @extend .class-van-button-small;
    }

    .van-button--small:nth-child(1) {
      margin-bottom: 5px;
    }

    .van-button--small:nth-child(21) {
      margin-left: 5%;
    }

    .van-button--small:nth-child(30) {
      margin-left: 10%;
    }

    .van-button--small:last-child {
      width: 13%;
    }
  }
}
</style>
<style>
.van-uploader__upload {
  margin: 0;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
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
  font-family: 'PingFang SC-Medium';
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
.warp .van-field__error-message,
.warp .van-field__control {
  font-size: 28px;
}
.examplebox .van-uploader__upload-icon {
  font-size: 80px;
  color: #6377f5;
  display: block;
}
.van-field__label,
.visitor_photos {
  color: #252b50 !important;
  font-size: 28px;
  font-weight: 800;
}

.displayNone {
  display: none !important;
}
</style>