import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loadedGivers: null,
    loadedProducts: null,
    setProduct: null,
    userProfile: null,
    loading: false,
    error: null
  },
  mutations: {
    updateGiver (state, payload) {
      const giver = state.loadedGivers.find(giver => {
        return giver.id === payload.id
      })
      if (payload.userFullName) {
        giver.userFullName = payload.userFullName
      }
      if (payload.userName) {
        giver.userName = payload.userName
      }
      if (payload.userWebsite) {
        giver.userWebsite = payload.userWebsite
      }
      if (payload.userBio) {
        giver.userBio = payload.userBio
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setLoadedGivers (state, payload) {
      state.loadedGivers = payload
    },
    createProduct (state, payload) {
      state.loadedProducts.push(payload)
    },
    setLoadedProducts (state, payload) {
      state.loadedProducts = payload
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
    signUserUp ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              userName: payload.userName,
              userFullName: payload.userFullName,
              userWebsite: payload.userWebsite,
              userBio: payload.userBio,
              profileImage: payload.profileImage,
              coverImage: payload.coverImage,
              email: payload.email,
              products: []
            }
            commit('setUser', newUser)
            firebase.database().ref('/users/').child(newUser.id).set(newUser)
            commit('setUserProfile', newUser)
            firebase.database().ref('/givers/').child(newUser.id).set(newUser)
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
              email: payload.email
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
    autoSignIn ({commit, getters}, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email
      })
    },
    fetchUserProfileData ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/profile/').once('value')
        .then((data) => {
          const profile = []
          const obj = data.val()
          profile.push({
            id: getters.user.id,
            userName: obj.userName,
            userFullName: obj.userFullName,
            profileImage: obj.profileImage,
            coverImage: obj.coverImage,
            userWebsite: obj.userWebsite,
            userBio: obj.userBio,
            email: obj.email
          })
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
    loadGivers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('givers').once('value')
        .then((data) => {
          const givers = []
          const obj = data.val()
          for (let key in obj) {
            givers.push({
              id: key,
              userName: obj[key].userName,
              userFullName: obj[key].userFullName,
              userBio: obj[key].userBio,
              profileImage: obj[key].profileImage,
              email: obj[key].email,
              coverImage: obj[key].coverImage,
              userWebsite: obj[key].userWebsite,
              products: obj[key].products
            })
          }
          commit('setLoadedGivers', givers)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateGiverData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.userFullName) {
        updateObj.userFullName = payload.userFullName
      }
      if (payload.userName) {
        updateObj.userName = payload.userName
      }
      if (payload.userWebsite) {
        updateObj.userWebsite = payload.userWebsite
      }
      if (payload.userBio) {
        updateObj.userBio = payload.userBio
      }
      firebase.database().ref('givers').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateGiver', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createProduct ({commit, getters}, payload) {
      const product = {
        productName: payload.productName,
        productDescription: payload.productDescription,
        productPrice: payload.productPrice,
        productUrl: payload.productUrl,
        creatorId: getters.user.id,
        giver: payload.giver,
        productImage: payload.productImage
      }
      let key
      firebase.database().ref('givers/').child(payload.giver + '/products').push(product)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('createProduct', {
            ...product,
            id: key,
            productId: key
          })
          let key
          firebase.database().ref('/products/').push(product)
          commit('setProduct', {
            ...product,
            id: key,
            productId: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    loadProducts ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.database().ref('givers/').child(getters.loadedGiver.giver + '/products').once('value')
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
              productImage: obj[key].productImage,
              creatorId: obj[key].creatorId,
              giver: obj[key].giver
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
    }, // Grab the products from the products tree in firebase
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
              giver: obj[key].giver,
              productImage: obj[key].productImage
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
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loadedGivers (state) {
      return state.loadedGivers
    },
    loadedGiver (state) {
      return giverId => {
        return state.loadedGivers.find((giver) => {
          return giver.id === giverId
        })
      }
    },
    loadedProducts (state) {
      return state.loadedGivers
    },
    loadedProduct (state) {
      return productId => {
        return state.loadedGivers.find((product) => {
          return product.id === productId
        })
      }
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
    userProfile (state) {
      return state.userProfile
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

