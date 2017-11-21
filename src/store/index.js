import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedShops: null,
    loadedProducts: null,
    user: null,
    userProfile: null,
    userShop: null,
    setProduct: null,
    loading: false,
    error: null
  },
  mutations: {
    followUserForShop (state, payload) {
      const id = payload.id
      if (state.user.followedUsers.findIndex(shop => shop.id === id) >= 0) {
        return
      }
      state.user.followedUsers.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unfollowUserFromShop (state, payload) {
      const followedUsers = state.user.followedUsers
      followedUsers.splice(followedUsers.findIndex(shop => shop.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedShops (state, payload) {
      state.loadedShops = payload
    },
    createShop (state, payload) {
      state.loadedShops.push(payload)
    },
    updateShop (state, payload) {
      const shop = state.loadedShops.find(shop => {
        return shop.id === payload.id
      })
      if (payload.shopName) {
        shop.shopName = payload.shopName
      }
      if (payload.tagLine) {
        shop.tagLine = payload.tagLine
      }
      if (payload.description) {
        shop.description = payload.description
      }
      if (payload.location) {
        shop.location = payload.location
      }
    },
    setLoadedProducts (state, payload) {
      state.loadedProducts = payload
    },
    createProduct (state, payload) {
      state.loadedProducts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setUserShop (state, payload) {
      state.userShop = payload
    },
    setProduct (state, payload) {
      state.setProduct = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    followUserForShop ({commit, getters}, payload) {
      commit('setLoading', false)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/following/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('followUserForShop', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unfollowUserFromShop ({commit, getters}, payload) {
      commit('setLoading', false)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/following/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unfollowUserFromShop', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadShops ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('shops').once('value')
        .then((data) => {
          const shops = []
          const obj = data.val()
          for (let key in obj) {
            shops.push({
              id: key,
              shopName: obj[key].shopName,
              tagLine: obj[key].tagLine,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
              products: obj[key].products
            })
          }
          commit('setLoadedShops', shops)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createShop ({commit, getters}, payload) {
      const shop = {
        shopName: payload.shopName,
        tagLine: payload.tagLine,
        description: payload.description,
        location: payload.location,
        creatorId: getters.user.id,
        products: []
      }
      let imageUrl
      let key
      firebase.database().ref('shops').push(shop)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('shops/').child(key + '/shop-image/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('shops').child(key).update({imageUrl: imageUrl})
        })
        .then((data) => {
          commit('createShop', {
            ...shop,
            imageUrl: imageUrl,
            id: key,
            shopId: key
          })
          const shopId = key
          firebase.database().ref('/users/').child(getters.user.id + '/shop/').push(shop).update({shopId: shopId})
          commit('setUserShop', {
            ...shop,
            shopId: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateShopData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.shopName) {
        updateObj.shopName = payload.shopName
      }
      if (payload.tagLine) {
        updateObj.tagLine = payload.tagLine
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      firebase.database().ref('shops').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateShop', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadProducts ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('shops/').child(getters.loadedShop.shopId + '/products').once('value')
        .then((data) => {
          const products = []
          const obj = data.val()
          for (let key in obj) {
            products.push({
              id: key,
              productName: obj[key].productName,
              productDescription: obj[key].productDescription,
              productPrice: obj[key].productPrice,
              productUrl: obj[key].productUrl,
              productImageUrl: obj[key].productImageUrl,
              productCategory: obj[key].productCategory,
              creatorId: obj[key].creatorId,
              shopId: obj[key].shopId
            })
          }
          commit('setLoadedProducts', products)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createProduct ({commit, getters}, payload) {
      const product = {
        productName: payload.productName,
        productDescription: payload.productDescription,
        productPrice: payload.productPrice,
        productUrl: payload.productUrl,
        productCategory: payload.productCategory,
        creatorId: getters.user.id,
        shopId: payload.shopId
      }
      let productImageUrl
      let key
      firebase.database().ref('shops/').child(payload.shopId + '/products').push(product)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.productImage.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('shops/').child(payload.shopId + '/products/' + key + '.' + ext).put(payload.productImage)
        })
        .then(fileData => {
          productImageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('shops/').child(payload.shopId + '/products/' + key).update({productImageUrl: productImageUrl})
        })
        .then(() => {
          commit('createProduct', {
            ...product,
            productImageUrl: productImageUrl,
            id: key,
            productId: key
          })
          let key
          firebase.database().ref('/products/').push(product).update({productImageUrl: productImageUrl})
          commit('setProduct', {
            ...product,
            productImageUrl: productImageUrl,
            id: key,
            productId: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    // Grab the products from the products tree in firebase
    fetchSetProduct ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/products/').once('value')
        .then((data) => {
          const products = []
          const obj = data.val()
          for (let key in obj) {
            products.push({
              id: key,
              productName: obj[key].productName,
              productDescription: obj[key].productDescription,
              productPrice: obj[key].productPrice,
              productUrl: obj[key].productUrl,
              creatorId: obj[key].creatorId,
              productCategory: obj[key].productCategory,
              shopId: obj[key].shopId,
              productImageUrl: obj[key].productImageUrl
            })
          }
          commit('setProduct', products)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    signUserUp ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              followedUsers: [],
              favoriteProducts: [],
              fullName: payload.fullName,
              email: payload.email,
              profileName: payload.profileName,
              fbKeys: {}
            }
            commit('setUser', newUser)
            firebase.database().ref('/users/').child(newUser.id + '/profile').push(newUser)
            commit('setUserProfile', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              followedUsers: [],
              favoriteProducts: [],
              fullName: payload.fullName,
              email: payload.email,
              profileName: payload.profileName,
              fbKeys: {}

            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        followedUsers: [],
        favoriteProducts: [],
        fbKeys: {},
        fullName: payload.fullName,
        email: payload.email,
        profileName: payload.profileName
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/following/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let followedUsers = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            followedUsers.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            followedUsers: followedUsers,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    fetchUserProfileData ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/profile/').once('value')
        .then((data) => {
          const profile = []
          const obj = data.val()
          for (let key in obj) {
            profile.push({
              id: getters.user.id,
              fullName: obj[key].fullName,
              email: obj[key].email,
              profileName: obj[key].profileName
            })
          }
          commit('setLoading', false)
          commit('setUserProfile', profile)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    fetchUserShopData ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/shop/').once('value')
        .then((data) => {
          const shop = []
          const obj = data.val()
          for (let key in obj) {
            shop.push({
              shopName: obj[key].shopName,
              tagLine: obj[key].tagLine,
              description: obj[key].description,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
              shopId: obj[key].shopId
            })
          }
          commit('setLoading', false)
          commit('setUserShop', shop)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedShops (state) {
      return state.loadedShops
    },
    featuredShops (state, getters) {
      return getters.loadedShops.slice(0, 3)
    },
    loadedShop (state) {
      return shopId => {
        return state.loadedShops.find((shop) => {
          return shop.id === shopId
        })
      }
    },
    loadedProducts (state) {
      return state.loadedShops
    },
    loadedProduct (state) {
      return productId => {
        return state.loadedShops.find((product) => {
          return product.id === productId
        })
      }
    },
    user (state) {
      return state.user
    },
    userProfile (state) {
      return state.userProfile
    },
    userShop (state) {
      return state.userShop
    },
    setProduct (state) {
      return state.setProduct
    },
    setProducts (state) {
      return productId => {
        return state.setProduct.find((product) => {
          return product.id === productId
        })
      }
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

