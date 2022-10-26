import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
console.log(localStorage.getItem('Authorization'))
const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    demoValue: {
      type: '',
      id: '',
      come_time: '',
      contact: '',
      number: '',
      peer_nums: '',
      visitor_name: '',
      describe: '',
      version: '',
      company_name: '',
      image: '',
      come_duty: '',
    }
  },

  mutations: {

    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    setDemoValue(state, demoValue) {
      state.demoValue = demoValue
    }


  },

  getters: {
    getDemoValue: state => state.demoValue
  },
  modules,

  plugins: [createPersistedState()],


})


export default store
