<template>
  <div class="vnp-input-box">
    <ul>
      <li
        v-for="(item, index) in val"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="handleClickItem(index)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: ["", "", "", "", "", "", "", ""],
      activeIndex: this.editable ? 0 : undefined,
    };
  },
  watch: {
    activeIndex() {
      this.$emit("activeChange", this.activeIndex);
    },
    value: {
      immediate: true,
      handler() {
        if (this.val.join("") === this.value) {
          return;
        }
        const val = this.value.split("");
        if (this.editable) {
          this.activeIndex = val.length;
        }
        while (val.length < 8) {
          val.push("");
        }
        this.val = val;
      },
    },
    val() {
      this.$emit("input", this.val.join(""));
    },
  },
  methods: {
    handleClickItem(index) {//点击事件
      if (!this.editable) {
        return;
      }
      this.activeIndex = index;
    },
    setValue(val) {
      this.$set(this.val, this.activeIndex, val);
      if (this.activeIndex < 7) {
        this.activeIndex += 1;
      }
    },
    del() {
      this.$set(this.val, this.activeIndex, "");
      if (this.activeIndex > 0) {
        this.activeIndex -= 1;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.vnp-input-box {
  padding: 10px 0;
  border: 1px solid #d8d8d8;
  border-radius: 2px;
  color: #8d8d8d;
  font-size: 15px;
  text-align: center;

  ul {
    display: flex;
  }
  li {
    flex: 1;
    border-right: 1px solid #eaeaea;
    height: 28px;
    line-height: 28px;

    &:first-child {
      border-color: #a6a6a6;
      flex: 1.3;
    }
    &:last-child {
      border: none;
    }
    &.active {
      color: #1989fa;

      > span {
        height: 100%;
        width: 20px;
        display: inline-block;
        border-bottom: 1px solid #1989fa;
      }
    }
  }
}
</style>
