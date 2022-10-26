<script setup>
import { onMounted, reactive, ref } from 'vue';
const count = ref(0);
function gaibian() {
  count.value++;
  obj.aa.a++;
  obj.list[0].item = '2222';
}
const obj = reactive({
  aa: {
    a: 1,
    b: 2
  },
  list: [
    {
      id: 1,
      name: '1'
    },
    {
      id: 2,
      name: '2'
    },
    {
      id: 3,
      name: '3'
    },
    {
      id: 4,
      name: '4'
    },
    {
      id: 5,
      name: '5'
    },
    {
      id: 6,
      name: '6'
    },
    {
      id: 7,
      name: '7'
    },
    {
      id: 8,
      name: '8'
    },
    {
      id: 9,
      name: '9'
    },
    {
      id: 10,
      name: '10'
    },
    {
      id: 11,
      name: '11'
    },
    {
      id: 12,
      name: '12'
    }
  ],
  newArr: []
});
onMounted(() => {
  obj.list.forEach((val, index) => {
    let page = Math.floor(index / 3);
    if (!obj.newArr[page]) {
      obj.newArr[page] = [];
    }
    obj.newArr[page].push(val);
  });
  obj.newArr.forEach((item, index) => {
    if (item[0].id % 2 == 0) {
      item.sort((a, b) => {
        return b.id - a.id;
      });
    }
  });
  obj.list = obj.newArr.reduce((prev, curr) => prev.concat(curr), []);
  console.log(obj.list);
});
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
    </h3>
    <button @click="gaibian">1111</button>
    <div>{{ count }} {{ obj.aa.a }}{{ obj.list[0].item }}</div>
    <div class="itemBox">
      <div class="item" v-for="(item, index) in obj.list" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.itemBox {
  display: flex;
  width: 250px;
  flex-wrap: wrap;
}
.item {
  width: 50px;
  height: 40px;
  margin: 10px 10px;
  background: red;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>