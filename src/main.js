import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import AlertCmp from './components/shared/Alert.vue'
import EditShop from './components/Shop/Edit/EditShop.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('edit-shop', EditShop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA9_vJFswjQLa_MwrcVfO6Llw6IyxmkZ3w',
      authDomain: 'barrels-646b4.firebaseapp.com',
      databaseURL: 'https://barrels-646b4.firebaseio.com',
      projectId: 'barrels-646b4',
      storageBucket: 'barrels-646b4.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadShops')
  }
})

