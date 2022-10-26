<template>
  <div class="repair_detail">
    <van-tabs v-model="active" color="#6377F5">
      <van-tab title="报修进度" class="daily">
        <van-steps direction="vertical" :active="5">
          <van-step v-for="(item, ids) in list" :key="ids">
            <h3>{{ item.created_time }}</h3>
            <p :class="item.id === 7 ? 'over' : ''">{{ item.remark }}</p>
            <p class="worker" v-show="ids === 2 && worker != null">
              <span>{{ worker.avatar }}</span
              >{{ worker.worker_contact }}<br />{{ worker.worker_mobile }}
              <a :href="'tel:' + worker.worker_mobile" class="iphone"></a>
            </p>
            <p class="evaluate" v-show="ids === 0 && evaluate != null">
              {{ evatpye(evaluate.evaluate) }}<van-rate v-model="evaluate.completion" color="#FB8753" void-icon="star" /><br />{{ evaluate.suggest }}
            </p>
          </van-step>
        </van-steps>
      </van-tab>
      <van-tab title="报修详情" class="device">
        <van-form>
          <van-field v-model="oneData.building_id" name="报修地址" label="报修地址" />
          <van-field v-model="oneData.customer_id" name="所属公司" label="所属公司" />
          <van-field v-model="oneData.contact" name="报修人" label="报修人" />
          <van-field v-model="oneData.mobile" name="报修电话" label="报修电话" />
          <van-field v-model="oneData.type" name="报修类型" label="报修类型" />
          <van-field v-model="oneData.repair_sn" name="工单号" label="工单号" />
          <van-field v-model="oneData.status" name="报修状态" label="报修状态" />
          <van-field v-model="oneData.worker_start_time" name="报修时间" label="报修时间" />
          <van-field v-model="oneData.describe" name="报修内容" label="报修内容" />
          <van-field name="uploader" label="报修图片">
            <template #input>
              <van-uploader v-model="oneData.repair_files" />
            </template>
          </van-field>
          <!-- <van-field v-model="oneData.repair_files" name="报修图片" label="报修图片" /> -->
        </van-form>
        <van-form>
          <van-field v-model="oneData.create_by" name="维修师傅" label="维修师傅" />
          <van-field v-model="oneData.worker_mobile" name="联系电话" label="联系电话" />
          <van-field v-model="oneData.cost" name="维修费用" label="维修费用" />
          <van-field v-model="oneData.material" name="维修材料" label="维修材料" />
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Field, Icon, Button } from 'vant'
import { mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import axios from 'axios'
import worker from '../../assets/img/login/worker.png'

export default {
  name: 'Login',
  data() {
    return {
      active: 0,
      list: [],
      worker: {},
      evaluate: {},
      oneData: {}
    }
  },
  activated() {
    this.getdata()
  },
  methods: {
    getdata() {
      var that = this
      var param = { repair_id: Number(that.$route.query.id) }

      axios.get('/api/prop/repair/evaluate', { params: { repair_id: Number(that.$route.query.id) } }).then(res => {
        console.log(res.data)

        that.list = res.data.data.logs
        console.log(that.list)
        if (res.data.data.worker.worker_id !== null) {
          that.worker = res.data.data.worker
        }
        if (res.data.data.evaluate.id !== null) {
          that.evaluate = res.data.data.evaluate
        }
      })
      axios.get('/api/prop/repair', { params: { id: Number(that.$route.query.id) } }).then(res => {
        console.log('详情页', res.data.data)
        that.oneData = res.data.data
      })
    },
    evatpye(id) {
      // if (id === 0) {
      //    return ("<span class="+evimg21+">");
      // }
      // if (id === 1) {
      //   return (<span class="evimg22"></span>);
      // }
      // if (id === 2) {
      //    return (<span class="evimg23"></span>);
      // }
      // if (id === 3) {
      //   return (<span class="evimg24"></span>);
      // }
      // if (id === 4) {
      //   return (<span class="evimg25"></span>);
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.repair_detail {
  background: linear-gradient(
    180deg,
    #bed3ff 0%,
    rgba(230, 238, 255, 0.85) 18%,
    rgba(216, 228, 255, 0.75) 41%,
    rgba(223, 233, 255, 0.68) 59%,
    rgba(226, 234, 252, 0.62) 81%,
    rgba(216, 229, 255, 0.4) 100%
  );

  p,
  h3 {
    margin: 2%;
    padding: 1%;
  }
  p {
    color: #636676;
    font-size: 24px;
  }
  h3 {
    color: #252b50;
    font-size: 36px;
  }
  .over {
    color: #6377f5;
  }
  width: 100%;
  min-height: 100%;
  .worker {
    background: #f5f7fb;
    border-radius: 6px 6px 6px 6px;
    width: 90%;
    padding: 4%;
    height: 80px;
    .iphone {
      background: url('../../assets/img/repair/iphone.png') 50% 0%no-repeat;
      float: right;
      width: 48px;
      height: 48px;
    }
    span {
      width: 80px;
      height: 80px;
      border-radius: 12px 12px 12px 12px;
      opacity: 1;
      display: block;
      background: #eee;
      float: left;
      margin-right: 5%;
    }
  }
  .evaluate {
    background: #f5f7fb;
    border-radius: 6px 6px 6px 6px;
    width: 90%;
    padding: 4%;
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
.repair_detail ::v-deep.van-tabs__content {
  margin-top: 2%;
  border-radius: 12px;
}
.repair_detail ::v-deep.van-steps {
  width: 85%;
  margin: auto;
  border-radius: 12px 12px 12px 12px;
}
.repair_detail ::v-deep .van-tabs__content:nth-child(1) {
  background: #fff;
}
</style>
<style>
.van-step--finish .van-step__circle,
.van-step--finish .van-step__line {
  background-color: #6377f5;
}
.van-tabs__nav {
  background: rgba(255, 255, 255, 0);
}

.repair_detail .van-form {
  width: 94%;
  margin: 2% auto;
  border-radius: 12px 12px 12px 12px;
  padding: 2% 0%;
  background: #fff;
}
</style>
