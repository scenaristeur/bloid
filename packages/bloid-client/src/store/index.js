import Vue from 'vue'
import Vuex from 'vuex'
// import solid from './modules/solid'
import vatch from './modules/vatch'
import ld from './modules/ld'

Vue.use(Vuex)

export default new Vuex.Store({
  //plugins: [IdbPlugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    //solid,
    vatch,
    ld
  }
})
