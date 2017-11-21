import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import AlertCmp from './components/shared/Alert.vue'
import EditShop from './components/Shop/Edit/EditShop.vue'
import CreateProduct from './components/Shop/CreateProduct.vue'
import ShopProducts from './components/Shop/ShopProducts.vue'
import FollowDialog from './components/Shop/FollowedUsers/FollowDialog.vue'
import FavoritedProduct from './components/User/Favorites/FavoritedProducts.vue'
import axios from 'axios'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('edit-shop', EditShop)
Vue.component('create-product', CreateProduct)
Vue.component('shop-products', ShopProducts)
Vue.component('follow-dialog', FollowDialog)
Vue.component('favorite-product', FavoritedProduct)

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
      console.log(response)
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
        this.$store.dispatch('fetchUserData', user)
       // this.$store.dispatch('fetchUserProductFavData', user)
        this.$store.dispatch('fetchUserProfileData', user)
        this.$store.dispatch('fetchUserShopData', user)
      }
    })
    this.$store.dispatch('loadShops')
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('fetchSetProduct')
  }
})

