<template>
  <div id="app" class="no-vw">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />

    <!-- 页面切换遮罩层 -->
    <global-mask />
  </div>
</template>
<script>
import GlobalMask from '@/components/GlobalMask'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    GlobalMask
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
    created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  methods: {
    // 用provide / inject 组合,控制router-view的显示或隐藏，从而控制页面的再次加载
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
@font-face {
    font-family: 'PingFang SC-Medium';
    src:url('assets/font/苹方字体.ttf');
    // src:url('/Wx/Index/font/锐字锐线怒放黑简1.0.ttf');
}
@font-face {
    font-family: 'D DIN';
    src:url('assets/font/D-DIN-Bold.ttf');
    // src:url('/Wx/Index/font/锐字锐线怒放黑简1.0.ttf');
}
@font-face {
    font-family: '斗鱼追光体';
    src:url('assets/font/斗鱼追光体-免费商用.otf');
    // src:url('/Wx/Index/font/锐字锐线怒放黑简1.0.ttf');
}
#app {
  font-family: "PingFang SC-Medium", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}
body {
  -webkit-tap-highlight-color: rgba($color: #000000, $alpha: 0); // 点击高亮
  -webkit-text-size-adjust: 100% !important; // ios禁止调整字体大小
}
html,
body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>
