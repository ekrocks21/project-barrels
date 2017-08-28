import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedShops: null,
    user: null,
    loading: false,
    error: null
  },
  mutations: {
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
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
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
              id: user.uid
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
      commit('setUser', { id: payload.uid })
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

