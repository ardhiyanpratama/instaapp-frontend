import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const ls = new SecureLS({ encodingType: 'aes', isCompression: false, encryptionSecret: '0TP-$312V!C35' })

Vue.use(Vuex)
// const vuexLocal = new VuexPersistence({
//   key: 'OTP-SERVICES',
//   storage: {
//     getItem: (key) => ls.get(key),
//     setItem: (key, value) => ls.set(key, value),
//     removeItem: (key) => ls.remove(key),
//   },
// })

export default () => new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  // modules: {
  //   auth: authModules
  // },
  plugins: [createPersistedState({
    key: 'OTP-SERVICES',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })],
})
