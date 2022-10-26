<template>
  <div>
    <vnp-input-box
      :value="val"
      @click.native="show = true"
    ></vnp-input-box>
    <vnp-keyboard
      :show.sync="show"
      v-model="val"
    ></vnp-keyboard>
  </div>
</template>

<script>
import Box from "./vnp-input-box";
import Keyboard  from "./vnp-keyboard";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  components: {
    'vnp-input-box': Box,
    'vnp-keyboard': Keyboard
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    val: {
      set(v) {
        this.$emit("input", v);
      },
      get() {
        return this.value;
      },
    },
  },
};
</script>
