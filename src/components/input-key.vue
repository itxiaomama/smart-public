
<template>
  <div class="keyboard">
    <div class="srk">
      <van-password-input
        :value="plate_number"
        :focused="true"
        @focus="showKeyboard = true"
        :length="7"
        :mask="false"
        info="请输入正确车牌号，入场时使用"
      />
    </div>
    <!-- 选择车牌号 首个汉字键盘 弹出层 -->
    <div class="plate_number" v-show="show_chinese">
      <div class="plate_chinese_box">
        <!-- 点击对应的汉字，进行输入 -->
        <van-button
          size="small"
          v-for="(item, index) in ChineseList"
          :key="item"
          @click="checkChinese(index)"
        >{{item}}</van-button>
      </div>
    </div>
    <!-- 英文 数字 键盘 -->
    <div class="allBoard" v-show="show_allBoard">
      <div class="plate_number_box">
        <!-- 点击对应的字母或数字，进行输入 -->
        <van-button
          size="small"
          v-for="(item, index) in English_Number"
          :key="item"
          @click="checkEnglish_num(index)"
        >{{item}}</van-button>
        <van-button size="small" @click="delnum()">
          <van-icon name="close" />
        </van-button>
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Dialog, Toast } from 'vant'
export default defineComponent({
  setup(props, { emit }) {
    const ChineseList = [
      '京',
      '沪',
      '浙',
      '苏',
      '粤',
      '鲁',
      '晋',
      '冀',
      '豫',
      '川',
      '渝',
      '辽',
      '吉',
      '黑',
      '皖',
      '鄂',
      '津',
      '贵',
      '云',
      '桂',
      '琼',
      '青',
      '新',
      '藏',
      '蒙',
      '宁',
      '甘',
      '陕',
      '闽',
      '赣',
      '湘',
      '关闭'
    ]
    const English_Number = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9', //数字字母
      'Q',
      'W',
      'E',
      'R',
      'T',
      'Y',
      'U',
      'I',
      'O',
      'P',
      'A',
      'S',
      'D',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'OK',
      'Z',
      'X',
      'C',
      'V',
      'B',
      'N',
      'M'
    ]
    const showKeyboard = ref(true) //车牌号输入框是否聚焦
    const show_chinese = ref(true) //是否显示汉字键盘
    const show_allBoard = ref(false) //是否显示英文数字键盘
    const plate_number = ref('')
    watch(plate_number, (newValue, oldValue) => {
      console.log(newValue)
      if (newValue.length >= 1) {
        // console.log('测试')
        emit('my-key', { num: plate_number.value })
        show_chinese.value = false
        show_allBoard.value = true
      } else {
        show_chinese.value = true
        show_allBoard.value = false
      }
    })
    const delnum = function() {
      return (
        (plate_number.value = plate_number.value.slice(0, -1)), changeTyper()
      )
    }
    let changeTyper = function() {
      if (plate_number.value.length >= 1) {
        // console.log('测试')
 
        show_chinese.value = false
        show_allBoard.value = true
        emit('my-key', { num: plate_number.value })
      } else {
        emit('my-key', { num: plate_number.value })
        show_chinese.value = true
        show_allBoard.value = false
      }
    }
    const checkEnglish_num = function(val: any) {
      if (English_Number[val] == 'OK') {
        return emit('my-key', { isHid: true })
      }
 
      if (plate_number.value.length < 6) {
        return (plate_number.value = plate_number.value + English_Number[val])
      } else if (plate_number.value.length < 7) {
        return (
          (plate_number.value = plate_number.value + English_Number[val]),
          emit('my-key', { isHid: true })
        )
      } else {
        emit('my-key', { isHid: true })
      }
    }
    let checkChinese = function(val: any) {
      if (ChineseList[val] == '关闭') {
        return emit('my-key', { isHid: true })
      }
      plate_number.value = plate_number.value + ChineseList[val]
      //   console.log(plate_number.value)
    }
    return {
      ChineseList,
      English_Number,
      showKeyboard,
      show_chinese,
      show_allBoard,
      checkEnglish_num,
      checkChinese,
      plate_number,
      delnum
    }
  }
})
</script>
 
<style scoped>
.keyboard {
  width: 100%;
  /* position: absolute; */
  overflow: hidden;
}
.input-box {
  width: 21%;
  height: 10px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 8px 0px rgba(96, 100, 112, 0.1);
  border-radius: 0.4rem;
  border: 1px solid rgba(206, 208, 210, 1);
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
}
.input-box li {
  flex: 1;
  border-right: 1px solid rgba(206, 208, 210, 1);
  box-sizing: border-box;
  margin-left: -1px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #323233;
}
.input-box li:last-child {
  border: none;
}
.van-button {
  width: 10%;
}
.srk {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 10px;
}
</style>
