// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import {TaskNode, TaskNodeStore} from './lib/index'

// import store from './lib/store'
/** 引入样式 */
import './lib/styles/index.less'
import './lib/fonts/iconfont.css'

// import '../src/lib/styles/index.less'
Vue.config.productionTip = false

Vue.use(TaskNode)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    TaskNodeStore
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
