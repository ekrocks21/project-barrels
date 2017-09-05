import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedShops: null,
    loadedProducts: null,
    user: null,
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
      commit('setLoading', true)
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
      commit('setLoading', true)
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
              creatorId: obj[key].creatorId
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
        creatorId: getters.user.id
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
          return firebase.storage().ref('shops/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('shops').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createShop', {
            ...shop,
            imageUrl: imageUrl,
            id: key
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
    loadProducts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('products').once('value')
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
              creatorId: obj[key].creatorId
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
        creatorId: getters.user.id
      }
      let productImageUrl
      let key
      firebase.database().ref('products').push(product)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.productImage.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('products/' + key + '.' + ext).put(payload.productImage)
        })
        .then(fileData => {
          productImageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('products').child(key).update({productImageUrl: productImageUrl})
        })
        .then(() => {
          commit('createProduct', {
            ...product,
            productImageUrl: productImageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              followedUsers: [],
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
        fbKeys: {}
      })
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
      return getters.loadedShops.slice(0, 5)
    },
    loadedShop (state) {
      return shopId => {
        return state.loadedShops.find((shop) => {
          return shop.id === shopId
        })
      }
    },
    loadedProducts (state) {
      return state.loadedProducts
    },
    loadedProduct (state) {
      return productId => {
        return state.loadedProducts.find((product) => {
          return product.id === productId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

