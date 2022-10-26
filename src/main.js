import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import jquery from "jquery";

import 'babel-polyfill' // ES6转ES5
import potatoUi from 'potato-ui';
import 'normalize.css/normalize.css' //  重置样式
import '@/assets/style/index.scss' // 全局生效样式
import '@/plugins/vant' // 按需引入UI库 vant
import axios from "axios";
import { Lazyload, Form, Field, Uploader, Col, Row, DatetimePicker, Button, Icon, Search, DropdownMenu, DropdownItem, ShareSheet, RadioGroup, Radio, Dialog, Toast, Tab, Tabs, Step, Steps, Collapse, CollapseItem, Image as VanImage, Tabbar, TabbarItem, Grid, GridItem, Switch, Picker,Popup,Rate , ContactCard,Swipe, SwipeItem, NoticeBar, NavBar } from 'vant'
import ElementUI from 'element-ui';
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
if (process.env.VUE_APP_USE_VCONSOLE === 'true') {
  const vConsole = require('vconsole')
  // eslint-disable-next-line
  const vconsole = new vConsole()
}

import './assets/icon/svg/index' // svg-iocn
// eslint-disable-next-line
import directive from './directive' // 全局自定义指令
// eslint-disable-next-line
import components from './components' // 全局组件
// eslint-disable-next-line
import mixins from './mixins' // 全局混入
import  { VueJsonp } from 'vue-jsonp'








store.dispatch('system/initSystemType') // 初始化系统平台类型
filter.doFilters() // 全局过滤处理 - 只要判断逻辑
Vue.use(Lazyload)
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Col);
Vue.use(Row);
Vue.use(DatetimePicker);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Search);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ShareSheet);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(NavBar);
Vue.use(GridItem);
Vue.use(Switch);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Rate);
Vue.use(ContactCard);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
Vue.prototype.$ = jquery;
Vue.use(ElementUI);
Vue.use(potatoUi);
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.use(VueJsonp)
//使用axios
Vue.prototype.axios = axios
//axios携带token
// 添加请求拦截器，在请求头中加token
window.router=router;
router.afterEach(to => {
  const u = navigator.userAgent.toLowerCase();
  if (
    u.indexOf("like mac os x") < 0 ||
    u.match(/MicroMessenger/i) != "micromessenger"
  )
    return;
  if (to.path !== global.location.pathname) {
    location.assign(to.fullPath);
  }
});
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
      console.log(localStorage.getItem('Authorization'))
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }); 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
