<template>
  <div class="container">
    <div class="top2" v-for="(item, index) in userOne" :key="index">
      <span>{{ item.user_name }}</span
      ><span>{{ item.avatar }}</span>
    </div>

    <div class="content1">
      <van-form @submit="onSubmit">
        <van-field name="type" label="来访类型">
          <template #input>
            <van-radio-group v-model="type" direction="horizontal" disabled>
              <van-radio name="0" @click="chageradio()">访客</van-radio>
              <van-radio name="1" @click="chageradio()">车辆</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-show="type === '0'" disabled
          v-model="from.visitor_name"
          name="访客姓名"
          label="访客姓名"
          input-align="right"
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写访客姓名' }]"
        />
        <van-field
          v-show="type === '0'" disabled
          v-model="from.number"
          name="身份证号"
          label="身份证号"
          input-align="right"
          placeholder="请输入"
         :rules="telRules2"
        />
        <van-field
          v-show="type === '1'" disabled
          v-model="from.number"
          name="车牌号"
          label="车牌"
          input-align="right"
          placeholder="请输入"
         :rules="telRules3"
        />
        <van-field v-model="from.contact" name="联系方式" label="联系方式" input-align="right" placeholder="请输入" disabled  :rules="telRules" />
        <van-field
          v-model="from.peer_nums" disabled
          v-show="type === '0'"
          name="同行人数"
          label="同行人数"
          input-align="right"
          placeholder="人"
          :rules="[{ required: true, message: '请填写同行人数' }]"
        />
        <div class="visitor_photos">访客照片</div>

        <div class="photoImg2" v-show="sumb === true"><img :src="from.image" /></div>
        <van-field
          style="margin-top: 20%"
          v-model="from.company_name" disabled
          input-align="right"
          right-icon="arrow"
          label="造访公司"
          name="造访公司"
          @click="gotocompany"
          placeholder="请输入"
        />
        <!-- <div class="jump"></div> -->

        <van-field
          v-model="from.describe"
          name="造访事由"
          label="造访事由"
          right-icon="arrow"
          input-align="right" disabled
          placeholder="请输入"
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
          :value="from.come_time" disabled
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
            type="datetime" disabled
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </van-form>
    
      <div class="tjbutton">
        <van-button v-if="sumb === true" :color="leave === true ? '#EEEEEE' : '#6377F5'" @click="queren" square block type="info" native-type="submit"
          >{{ leave === true ? '已确认离开' : '确认离开' }}<br />{{ nowTime }}</van-button
        >
      </div>
    
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
      images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
      iconList: [],
      fileList: [],
      showPicker: false,
      showPicker1: false,
      columns: ['面试', '商务洽谈', '上班', '运输', '其他'],
      ewmshow: false,
      sumb: true,
      token:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGFyay5jbmdpYW50ZWNoLmNvbVwvYXBpXC9zeXN0ZW1cL2F1dGgiLCJpYXQiOjE2NjAyOTUyODMsImV4cCI6MTY2MDI5ODg4MywibmJmIjoxNjYwMjk1MjgzLCJqdGkiOiJVeGpFTDUzZWs0MzVMNk50Iiwic3ViIjoxMCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.vMnDOTQJIlrcgrBSpPcicOo_FOP_UxcPT0jyZ3A_d0Y',
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
      telRules2: [
        {
          required: true,
          message: '身份证号不能为空',
          trigger: blur
        },
        {
          validator: value => {
            return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)
          },
          message: '请输入正确的身份证号格式',
          trigger: 'onBlur'
        }
      ],
        telRules3: [
        {
          required: true,
          message: '车牌号不能为空',
          trigger: blur
        },
        {
          validator: value => {
            return/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/.test(value)
          },
          message: '请输入正确的车牌号',
          trigger: 'onBlur'
        }
      ],
      
      from: {
        type: '',
        visitor_name: '',
        number: '',
        contact: '',
        peer_nums: '',
        company_name: '',
        describe: '',
        come_duty: '',
        image: '',
        from: 1,
        leave_time: ''
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
      dataId: '',
      listData: {},
      complayShow: false,
      value1: 0,
      value2: 0,
      value3: 0,
      fileSC: false,
      param:{},
   
    }
  },
  components: {},
  computed: {},
  activated() {},
  mounted() {
    var that = this

    if (that.$route.query !== null || that.$route.query !== '' || that.$route.query !== 'null') {
      this.$store.commit('setDemoValue', that.$route.query)
    }
    that.getCode()
    if (that.code === null || that.code === '' || that.code === 'null') {
      that.getToken()
    }
    that.nowTime = that.formatDate('YY-MM-DD hh:mm:ss')
  },
  methods: {
    ...mapMutations(['changeLogin']),

    onSearch(val) {
      Toast(val)
    },
    getName(item) {
      console.log(item)
      this.from.company_name = item.name
      this.complayShow = false
    },
    onCancel() {
      Toast('取消')
    },
    getToken() {
      //授权页面
      var that = this
      var data = {
        park_id: 1,
        tenant_id: 2,
        redirect_uri: 'https://park.cngiantech.com/wx/guard'
      }

      axios.post('/api/system/auth/wx/code', data).then(res => {
        that.listData = that.$store.getters.getDemoValue
        location.href = res.data.data + 'id=' + that.listData.id

        console.log('值', that.listData)
      })
    },

    getCode() {
      console.log('123')
      var that = this
      that.code = this.getQueryString('code')
      console.log(that.code)
      var data = {
        park_id: 1,
        tenant_id: 2,
        code: that.code
      }
      axios.post('/api/system/auth/wx/user', data).then(res => {
        console.log('1234')
        if (res.data.status_code === 200) {
          if (res.data.data.is_bind === false) {
            that.$router.push({ path: '/wx/login4?code=' + that.code }) //跳绑定手机号页面
          } else {
            that.Login()
          }
        } else {
          Toast(res.data.message)
        }
      })
    },
    Login() {
      console.log('登录')
      var that = this
      that.code = this.getQueryString('code')
      console.log(that.code)
      var data = {
        park_id: 1,
        tenant_id: 2,
        code: that.code
      }

      axios.post('/api/system/auth/wx/login', data).then(res => {
        if (res.data.status_code === 422) {
          Toast(res.data.message)
          that.getToken()
        }
        // sessionStorage.setItem('Authorization', 'Bearer ' + res.data.data.access_token) //存储到本地  res 是后端返回的token

        that.userToken = 'Bearer ' + res.data.data.access_token // 将用户token保存到vuex中
        that.changeLogin({ Authorization: that.userToken })

        axios.get('/api/system/auth/me').then(res => {
          console.log(res.data.data)
          that.userOne.push(res.data.data)

          that.dataId = Number(that.$store.getters.getDemoValue.state.slice(7))

          console.log(param)
          axios.get('/api/prop/visit', { params: { id: that.dataId } }).then(res => {
            // that.from = res.data.data
            that.from.type = res.data.data.type
            that.from.id = res.data.data.id
            that.from.come_time = res.data.data.come_time
            that.from.contact = res.data.data.contact
            that.from.number = res.data.data.number
            that.from.peer_nums = res.data.data.peer_nums
            that.from.visitor_name = res.data.data.visitor_name
            that.from.describe = res.data.data.describe
            that.from.version = res.data.data.version
            that.from.company_name = res.data.data.company_name
            that.from.image = res.data.data.image
          })
        })
      })
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
    onConfirm2(value) {
      //造访事由
      this.from.describe = value
      this.showPicker1 = false
    },
    onConfirm(time) {
      this.from.come_time = this.change(time)
      this.showPicker = false
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

    formatDate(fmt) {
      const date = new Date()
      const o = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth() + 1, // 月
        'D+': date.getDate(), // 日
        'h+': date.getHours(), // 时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        W: date.getDay() // 周
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, () => {
            if (k === 'W') {
              // 星期几
              const week = ['日', '一', '二', '三', '四', '五', '六']
              return week[o[k]]
            } else if (k === 'Y+' || RegExp.$1.length === 1) {
              // 年份 or 小于10不加0
              return o[k]
            } else {
              return ('00' + o[k]).substr(('' + o[k]).length) // 小于10补位0
            }
          })
        }
      }
      return fmt
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
    gotocompany() {
      this.complayShow = true
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

    queren() {
      var that = this

      that.from.leave_time = that.nowTime
      that.from.image=that.from.image.slice(27)
      that.param=that.from
      that.leave = true
      console.log(that.from)
      console.log(that.token)
      axios.patch('/api/prop/visit', that.from).then(res => {
        console.log(res.data)
        Toast.success('确认成功')
      })
    },
    chageradio() {
      this.from = {}
    }
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
  font-size: 18px;
}
.content {
  background: #fff;
  width: 92%;
  height: 100%;
  border-radius: 12px;
  margin: -20% auto;
  position: absolute;
  left: 4%;
}
.content1 {
  background: #fff;
  width: 92%;
  height: 112%;
  border-radius: 12px;
  margin: -5% auto;
  position: absolute;
  left: 4%;
}
.van-form {
  height: 100%;
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
  margin: 7% auto;
  padding: 10%;
  margin-left: 10%;
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
</style>
<style>
.van-uploader__upload {
  margin: 0;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}
.van-uploader__upload-icon {
  display: none;
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