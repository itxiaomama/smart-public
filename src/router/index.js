import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var path='/wx/'

export const routes = [
  {
    path: '/login',
    name: 'Home',
    component: () => import(/* webpackChunkName: "404" */ '@/views/home/index.vue'),
    // meta: {
    //   auth: false, // 需要登录
    //   thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
    //   wx: {
    //     sign: true, // 是否需要微信验签
    //     jsApiList: [
    //       'updateAppMessageShareData', // 分享朋友
    //       'updateTimelineShareData', // 分享朋友圈
    //       'getLocation', // 定位
    //       'openLocation' // 打开地图
    //     ]
    //   },
    //   keepAlive: false,

    // }
  },
  {
    path: path+'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "404" */ '@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: path+'lease',
    name: 'lease',
    component: () => import(/* webpackChunkName: "404" */ '@/views/lease/index.vue'),
    meta: {
      title: '租赁',
      keepAlive: true
    }
  },
  {
    path: path+'property',
    name: 'property',
    component: () => import(/* webpackChunkName: "404" */ '@/views/property/index.vue'),
    meta: {
      title: '物业',
      keepAlive: true
    }
  },
  {
    path: path+'myBinding',
    name: 'myBinding',
    component: () => import(/* webpackChunkName: "404" */ '@/views/binding/myBinding.vue'),
    meta: {
      title: '我的绑定',
      keepAlive: true
    }
  },
  {
    path: path+'service',
    name: 'service',
    component: () => import(/* webpackChunkName: "404" */ '@/views/serve/service.vue'),
    meta: {
      title: '服务中心',
      keepAlive: true
    }
  },

  {
    path: path+'visitors',
    name: 'visitors',
    component: () => import(/* webpackChunkName: "404" */ '@/views/visitor/visitors.vue'),
    meta: {
      title: '我的访客',
      keepAlive: true
    }
  },
  {
    path: path+'guard',
    name: 'guard',
    component: () => import(/* webpackChunkName: "404" */ '@/views/visitor/guard.vue'),
    meta: {
      title: '访客信息',
      keepAlive: true
    }
  },
 
  {
    path:  path+'complay',
    name: 'complay',
    component: () => import(/* webpackChunkName: "404" */ '@/views/visitor/complay.vue'),
    meta: {
      title: '造访公司',
      keepAlive: true
    }
  },
  {
    path: path+'security',
    name: 'security',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Securitypatrol/Security.vue'),
    meta: {
      title: '安防巡更',
      keepAlive: true
    }
  },
  {
    path: path+'dailyPatrol',
    name: 'dailyPatrol',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Securitypatrol/dailyPatrol.vue'),
    meta: {
      title: '日常巡更',
      keepAlive: true
    }
  },
  {
    path: path+'linePunch',
    name: 'linePunch',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Securitypatrol/linePunch.vue'),
    meta: {
      title: '线路打卡',
      keepAlive: true
    }
  },
  {
    path: path+'personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "404" */ '@/views/myRepair/personal.vue'),
    meta: {
      title: '我的',
      keepAlive: true
    },
    
  },
  {
    path: path+'add_repair',
    name: 'add_repair',
    component: () => import(/* webpackChunkName: "404" */ '@/views/myRepair/add_repair.vue'),
    meta: {
      title: '新建报修',
      keepAlive: true
    },
    
  },
  {
    path: path+'repair_detail',
    name: 'repair_detail',
    component: () => import(/* webpackChunkName: "404" */ '@/views/myRepair/repair_detail.vue'),
    meta: {
      title: '报修进度',
      keepAlive: true
    },
    
  },
 

  {
    path: path+'repair',
    name: 'personal',
    component: () => import(/* webpackChunkName: "404" */ '@/views/myRepair/repair.vue'),
    meta: {
      title: '我的报修',
      keepAlive: true
    }
  },
  {
    path: path+'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "404" */ '@/views/login/login.vue'),
    meta: {
      title: '用户登录',
      keepAlive: true
    }
  },
  {
    path: path+'login2',
    name: 'login2',
    component: () => import(/* webpackChunkName: "404" */ '@/views/login/login2.vue'),
    meta: {
      title: '选择登录',
      keepAlive: true
    }
  },
  {
    path: path+'login3',
    name: 'login3',
    component: () => import(/* webpackChunkName: "404" */ '@/views/login/login3.vue'),
    meta: {
      title: '用户登录',
      keepAlive: true
    }
  },
  
  {
    path: path+'login4',
    name: 'login4',
    component: () => import(/* webpackChunkName: "404" */ '@/views/login/login4.vue'),
    meta: {
      title: '新用户绑定手机号',
      keepAlive: true
    }
  },
  {
    path: path+'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "404" */ '@/views/login/register.vue'),
    meta: {
      title: '用户注册',
      keepAlive: true
    }
  },
  {
    path: path+'news',
    name: 'news',
    component: () => import(/* webpackChunkName: "404" */ '@/views/parkInformation/index.vue'),
    meta: {
      title: '园区资讯',
      keepAlive: true
    }
  },
  {
    path: path+'info_detail',
    name: 'info_detail',
    component: () => import(/* webpackChunkName: "404" */ '@/views/realInfoDetail/index.vue'),
    meta: {
      title: '资讯详情',
      keepAlive: true
    }
  },
  {
    path: path+'sign_in',
    name: 'Home',
    component: () => import('@/views/signIn/index'),
    meta: {
      auth: false,
      thirdAuth: '',
      wx: {
        sign: true,
        jsApiList: ['getLocation']
      },
      keepAlive: false,
      title: '登录'
    }
  },

  // 404
  {
    path: '*',
    component: () => import('@/views/404'),
    meta: {
      title: '错误'
    }
  }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    // base: '/',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: routes
  })

const router = createRouter()
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


router.beforeEach((to, from, next) => {
  if (to.path === '/wx/login3'||to.path === '/wx/visitors') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log(token)

    
    if (token === null || token === '') {
      next('/wx/login3');
    } else {
      next();
    }
  }
});

export default router
