import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import UpdateGiver from './components/Givers/Update/updateGiver.vue'
import CreateProduct from './components/Givers/CreateProduct.vue'
import GiverProducts from './components/Givers/GiverProducts.vue'
import axios from 'axios'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('update-giver', UpdateGiver)
Vue.component('create-product', CreateProduct)
Vue.component('giver-products', GiverProducts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    // var url = 'ec2-34-229-219-238.compute-1.amazonaws.com'
    var url = 'https://spreadsheets.google.com/feeds/list/1LYypJ_Uk5paynPnN_cl9pvXD_ePIcVD4t88VJTazfrM/1/public/values?alt=json'
    axios.get(url)
    .then(response => {
    })
    .catch(e => {
      this.errors.push(e)
    })

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
       // this.$store.dispatch('fetchUserProductFavData', user)
        this.$store.dispatch('fetchUserProfileData', user)
      }
    })
    this.$store.dispatch('loadGivers')
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('fetchSetProduct')
  }
})

