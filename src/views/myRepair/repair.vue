<template>
  <div class="my_application">
    <div class="search">
      <form action="/">
        <van-search
          class="search"
          v-model="Search_value"
          show-action
          clearable
          placeholder="搜索关键词"
          shape="round"
          background="rgba(255,255,255,0)"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="application_content">
      <van-tabs v-model="application_active" color="#6377F5">
        <van-tab title="全部">
          <div class="repairlist" v-for="(item, index) in repairlist" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids">
                  <img @click="gotodetail(item.id)" :src="items.file_path" />
                </li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}{{ item.status }}</label>
              <span v-if="item.status === 3" :class="item.status === 3 ? 'footer2 ' : ''">{{ item.status === 3 ? '待评价' : '' }}</span>
              <span v-else-if="item.status === 1"
                ><span :class="item.status === 1 ? 'footer3' : ''" @click="allocated()">{{ item.status === 1 ? '待分配' : '' }}</span
                ><span @click="cancel()" class="footer4">取消</span></span
              >
              <span v-else-if="item.status === 4" :class="item.status === 4 ? 'footer1' : ''">{{ item.status === 4 ? '已评价' : '' }}</span>
              <span v-else-if="item.status === 5" :class="item.status === 5 ? 'footer1' : ''">{{ item.status === 5 ? '已取消' : '' }}</span>
            </div>
            <div v-if="repairlist.length === 0" class="empty"></div>
          </div>
        </van-tab>
        <van-tab title="待分配">
          <div class="repairlist" v-for="(item, index) in repairlist1" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids"><img :src="items.file_path" /></li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}</label
              ><span :class="item.status === 1 ? 'footer3' : ''">{{ item.status === 1 ? '待分配' : '' }}</span
              ><span @click="cancel()" class="footer4">取消</span>
            </div>
          </div>
          <div v-if="repairlist1.length === 0" class="empty"></div>
        </van-tab>
        <van-tab title="待处理">
          <div class="repairlist" v-for="(item, index) in repairlist2" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids"><img :src="'https://park.cngiantech.com/' + items.file_path" /></li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}</label
              ><span :class="item.status === 1 ? 'footer1' : 'footer2'">{{ item.status === 1 ? '已评价' : '待评价' }}</span>
            </div>
          </div>
          <div class="empty" v-if="repairlist2.length === 0">啊哦，暂无报修~</div></van-tab
        >
        <van-tab title="已完成">
          <div class="repairlist" v-for="(item, index) in repairlist3" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids"><img :src="'https://park.cngiantech.com/' + items.file_path" /></li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}</label
              ><span @click="evaluate()" :class="item.status === 4 ? '' : 'footer2'">{{ item.status === 4 ? '' : '待评价' }}</span>
              <van-popup class="tasktk" v-model="show" closeable close-icon="close" :style="{ height: '55%', width: '80%' }"
                ><span>恭喜任务完成啦</span><br /><span class="tasktk_span">快去评价吧~</span>
                <van-button round type="info" @click="showEv()">快去评价</van-button>
              </van-popup>
            </div>
            <div v-if="repairlist3.length === 0" class="empty"></div>
            <!-- 自定义图标 -->
            <van-popup v-model="evaluate_show" class="Evframe" closeable close-icon="close" position="bottom" :style="{ height: '70%' }">
              <span class="title">工单评价</span>
              <div>
                <ul>
                  <li @click="pingfen(1)">
                    <span :class="pingjia === 1 ? 'evimg21' : 'evimg1'"
                      ><van-rate v-if="pingjia === 1" v-model="from.value" readonly void-color="#FB8753" void-icon="star" :count="1" /></span
                    ><label>差</label>
                  </li>
                  <li @click="pingfen(2)">
                    <span :class="pingjia === 2 ? 'evimg22' : 'evimg2'"
                      ><van-rate v-if="pingjia === 2" v-model="from.value" readonly void-color="#FB8753" void-icon="star" :count="2" /></span
                    ><label>一般</label>
                  </li>
                  <li @click="pingfen(3)">
                    <span :class="pingjia === 3 ? 'evimg23' : 'evimg3'"
                      ><van-rate v-if="pingjia === 3" v-model="from.value" readonly void-color="#FB8753" void-icon="star" :count="3" /></span
                    ><label>还行</label>
                  </li>
                  <li @click="pingfen(4)">
                    <span :class="pingjia === 4 ? 'evimg24' : 'evimg4'"
                      ><van-rate v-if="pingjia === 4" v-model="from.value" readonly void-color="#FB8753" void-icon="star" :count="4" /></span
                    ><label>满意</label>
                  </li>
                  <li @click="pingfen(5)">
                    <span :class="pingjia === 5 ? 'evimg25' : 'evimg5'"
                      ><van-rate v-if="pingjia === 5" v-model="from.value" readonly void-color="#FB8753" void-icon="star" :count="5" /></span
                    ><label>很满意</label>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>完成情况</span
                    ><van-rate v-model="from.completion" :size="25" color="#FB8753" void-icon="star" void-color="rgba(251, 135, 83, 0.3)" />
                  </li>
                  <li>
                    <span>响应时间</span
                    ><van-rate v-model="from.response_time" :size="25" color="#FB8753" void-icon="star" void-color="rgba(251, 135, 83, 0.3)" />
                  </li>
                  <li>
                    <span>工作态度</span
                    ><van-rate v-model="from.working_attitude" :size="25" color="#FB8753" void-icon="star" void-color="rgba(251, 135, 83, 0.3)" />
                  </li>
                </ul>

                <van-field v-model="from.message" rows="4" autosize label="" type="textarea" placeholder="请输入不超过100字的评价或建议~" />
                <van-button color="#6377F5" square block type="info" native-type="submit">提交</van-button>
              </div>
            </van-popup>
          </div>
        </van-tab>
        <van-tab title="已评价">
          <div class="repairlist" v-for="(item, index) in repairlist4" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids"><img :src="'https://park.cngiantech.com/' + items.file_path" /></li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}</label
              ><span :class="item.status === 4 ? 'footer1' : 'footer2'">{{ item.status === 4 ? '已评价' : '待评价' }}</span>
            </div>
            <div v-if="repairlist4.length === 0" class="empty"></div></div
        ></van-tab>
        <van-tab title="已取消">
          <div class="repairlist" v-for="(item, index) in repairlist5" :key="index">
            <div class="time">
              <span>{{ item.created_time }}</span> <span>园区报修</span>
            </div>
            <div class="top">
              <span></span>
              <span
                >{{ item.create_by }}<br /><van-icon name="location-o" /><label>{{ item.company_address }}</label></span
              >
            </div>
            <div class="warp">
              <span>{{ item.describe }}</span>
              <ul>
                <li v-for="(items, ids) in item.repair_file" :key="ids"><img :src="'https://park.cngiantech.com/' + items.file_path" /></li>
              </ul>
            </div>
            <div class="footer">
              <label>{{ item.company_name }}</label
              ><span :class="item.status === 5 ? 'footer1' : ''">{{ item.status === 5 ? '已取消' : '' }}</span>
            </div>
            <div v-if="repairlist5.length === 0" class="empty"></div></div
        ></van-tab>
      </van-tabs>
      <div class="add">
        <van-button color="#6377F5" round type="info" @click="gotoadd()">新建报修</van-button>
      </div>
      <van-popup v-model="cancelshow" position="bottom" :style="{ height: '55%' }">
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="item" :title="`${item}`" @click="toggle(index)">
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes" checked-color="#6377F5" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-cell-ground class="cancelbtn">
          <van-button type="info" color="#EEEEEE">我在想想</van-button>
          <van-button type="info" color="#6377F5">确定取消</van-button>
        </van-cell-ground>
      </van-popup>
      <!-- <van-popup v-model="allocatedList" position="bottom" :style="{ height: '55%' }">
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="item" :title="`${item}`" @click="toggle(index)">
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes" checked-color="#6377F5"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-cell-ground class="cancelbtn">
          <van-button type="info" color="#EEEEEE">我在想想</van-button>
          <van-button type="info" color="#6377F5">确定取消</van-button>
        </van-cell-ground>
      </van-popup> -->
    </div>
  </div>
</template>
<script>
import { Toast, Button } from 'vant'
import axios from 'axios'
export default {
  name: 'personal',
  data() {
    return {
      active: 4,
      application_active: 1,
      Search_value: '',
      value: '',
      from: {},
      pingjia: '',
      repairlist: [],
      repairlist1: [],
      repairlist2: [],
      repairlist3: [],
      repairlist4: [],
      repairlist5: [],
      list: ['填错信息，重新填写', '维修问题超出服务范围', '维修费用过高', '暂时不需要维修', '维修问题已解决', '其他情况'],
      result: [],
      show: false,
      evaluate_show: false,
      cancelshow: false,
      allocatList: false,
      common: [
        { title: '我的绑定', icon: '' },
        { title: '我的租赁', icon: '' },
        { title: '我的活动', icon: '' },
        { title: '我的访客', icon: '' },
        { title: '我的报修', icon: '' },
        { title: '我的投诉', icon: '' },
        { title: '我的申请', icon: '' }
      ]
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    gotodetail(id) {
      this.$router.push({ path: '/wx/repair_detail', query: { id: id } })
    },
    cancel() {
      this.cancelshow = true
    },
    allocated() {
      this.allocatedList = true
    },
    onCancel() {
      Toast('取消')
    },
    gotoadd() {
      this.$router.push({ path: '/wx/add_repair' })
    },
    getlist() {
      var that = this
      axios.get('/api/prop/repair').then(res => {
        that.repairlist = res.data.data.data

        for (let i = 0; i < that.repairlist.length; i++) {
          if (that.repairlist[i].status === 1) {
            that.repairlist1.push(that.repairlist[i])
          }
          if (that.repairlist[i].status === 2) {
            that.repairlist2.push(that.repairlist[i])
          }
          if (that.repairlist[i].status === 3) {
            that.repairlist3.push(that.repairlist[i])
          }
          if (that.repairlist[i].status === 4) {
            that.repairlist4.push(that.repairlist[i])
          }
          if (that.repairlist[i].status === 5) {
            that.repairlist5.push(that.repairlist[i])
          }
        }
      })
    },

    evaluate() {
      this.show = true
    },
    showEv() {
      this.evaluate_show = true
    },
    onSearch(val) {
      Toast(val)
    },
    pingfen(x) {
      this.pingjia = x
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.my_application {
  width: 100%;
  min-height: 100%;
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
}
.repairlist {
  padding: 1% 2%;
  width: 90%;
  margin: 5% auto;
  border-radius: 12px 12px 12px 12px;
  background: url('../../assets/img/repair/warp254.png') 98% 0%no-repeat #fff;
  .time {
    float: right;
    padding-right: 3%;
    line-height: 25px;

    span:nth-child(1) {
      color: #6377f5;
      font-size: 20px;
      letter-spacing: -1px;
    }
    span:nth-child(2) {
      color: #fff;
      font-size: 24px;
    }
  }
  .top {
    width: 100%;
    height: 100px;
    padding-left: 2%;

    span:nth-child(1) {
      background: url('../../assets/img/photo.png') 20% 0%no-repeat #fff;
      background-size: cover;
      width: 80px;
      height: 80px;
      border-radius: 12px 12px 12px 12px;
      float: left;
    }
    span:nth-child(2) {
      font-size: 24px;
      color: #252b50;
      font-weight: 500;
      label,
      i {
        color: #9296af;
        font-size: 24px;
      }
    }
  }
  .warp {
    font-size: 28px;
    color: #252b50;
    padding-left: 2%;
    ul {
      height: 120px;
      width: 100%;
      margin-top: 2%;

      li {
        float: left;
        width: 19%;
        height: 100%;
        margin-left: 1%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }
  }
  .footer {
    padding: 2%;
    margin-bottom: 2%;
    label {
      color: #9296af;
      font-size: 24px;
      background: url('../../assets/img/repair/company.png') 0% 0%no-repeat #fff;
      padding-left: 7%;
    }
    .footer1 {
      float: right;
      width: 128px;
      height: 52px;
      background: #eee;

      border-radius: 40px 40px 40px 40px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      line-height: 52px;
    }
    .footer2 {
      float: right;
      width: 128px;
      height: 52px;
      background: #fb8753;
      border-radius: 40px 40px 40px 40px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      line-height: 52px;
    }
    .footer4 {
      float: right;
      width: 128px;
      height: 52px;
      border: 1px solid #6377f5;
      border-radius: 40px 40px 40px 40px;
      text-align: center;
      color: #6377f5;
      font-size: 24px;
      line-height: 52px;
    }
    .footer3 {
      float: right;
      width: 128px;
      height: 52px;
      background: #eeeeee;
      border-radius: 40px 40px 40px 40px;
      text-align: center;
      color: #9296af;
      font-size: 24px;
      line-height: 52px;
    }
    .footer5 {
      float: right;
      width: 128px;
      height: 52px;
      background: #4884fc;
      border-radius: 40px 40px 40px 40px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      line-height: 52px;
    }
    .van-popup {
      background: url('../../assets/img/repair/task.png') 0% 0%no-repeat;
      background-size: 100%;
      border-radius: 12px 12px 12px 12px;
      text-align: center;
      padding-top: 5%;
      .van-button--info {
        background: url('../../assets/img/repair/btn.png') 0% 0%no-repeat;
        background-size: cover;
        border: none;
        margin-top: 50%;
        width: 80%;
        height: 25%;
        padding-top: 8%;
        .van-popup__close-icon {
          color: #fff;
        }
        .van-button__text {
          color: #fff !important;
          font-size: 36px;
          margin-top: 5%;
        }
      }
    }
  }
  .tasktk {
    span:nth-child(1) {
      color: #252b50;
      font-size: 36px;
    }
  }
  .tasktk_span {
    color: #fb8753;
    font-size: 28px;
  }

  .Evframe {
    padding: 5%;
    width: 90%;
    span {
      font-size: 36px;
      color: #252b50;
      font-weight: 600;
    }

    div {
      ul:nth-child(1) {
        height: 150px;
        margin-top: 2%;
        li {
          float: left;
          width: 20%;
          text-align: center;
          span {
            display: block;
            padding-top: 80px;
            height: 50px;
          }
          label {
            color: #9296af;
            font-weight: 600;
            font-size: 28px;
          }
        }
      }
      ul:nth-child(2) {
        margin-top: 5%;
        line-height: 60px;
        span {
          width: 55%;
          float: left;
          font-size: 28px;
          font-weight: 600;
        }
      }
      .van-cell {
        background-color: #f5f7fb;
        width: 100%;
        margin: auto;
        margin: 7% 0%;
        border-radius: 6px 6px 6px 6px;
        color: #9296af;

        font-size: 24px;
        font-weight: 500;
      }
      Button {
        margin: auto;
        color: #fff;
        .van-button__text {
          color: #fff;
          font-weight: 400;
        }
      }

      .evimg1 {
        background: url('../../assets/img/repair/image1.png') 50% 0%no-repeat;
      }
      .evimg2 {
        background: url('../../assets/img/repair/image2.png') 50% 0%no-repeat;
      }
      .evimg3 {
        background: url('../../assets/img/repair/image3.png') 50% 0%no-repeat;
      }
      .evimg4 {
        background: url('../../assets/img/repair/image4.png') 50% 0%no-repeat;
      }
      .evimg5 {
        background: url('../../assets/img/repair/image5.png') 50% 0%no-repeat;
      }
      .evimg21 {
        background: url('../../assets/img/repair/image11.png') 50% 0%no-repeat;
      }
      .evimg22 {
        background: url('../../assets/img/repair/image12.png') 50% 0%no-repeat;
      }
      .evimg23 {
        background: url('../../assets/img/repair/image13.png') 50% 0%no-repeat;
      }
      .evimg24 {
        background: url('../../assets/img/repair/image14.png') 50% 0%no-repeat;
      }
      .evimg25 {
        background: url('../../assets/img/repair/image15.png') 50% 0%no-repeat;
      }
    }
  }
}
.add {
  position: fixed;
  bottom: 0%;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
  text-align: center;
  height: 15%;
  button {
    width: 35%;
    letter-spacing: 5px;
    font-size: 36px;
  }
}
.empty {
  background: url('../../assets/img/repair/empty.png') 50% 50%no-repeat;
  font-size: 24px;
  text-align: center;
  margin: auto;
  width: 100%;
  padding-top: 40%;
}
.cancelbtn {
  .van-button--info:nth-child(1) {
    color: #9296af !important;
  }

  .van-button--info {
    width: 45%;
    margin-left: 3.5%;
  }
}
.tasktk ::v-deep.van-popup__close-icon--top-right {
  right: 50%;
  bottom: 0%;
  color: #fff;
  top: 90%;
}
</style>
<style>
.van-tabs__nav {
  background-color: rgba(255, 255, 255, 0);
}
.Evframe .van-rate__icon {
  font-size: 20px;
}
</style>
