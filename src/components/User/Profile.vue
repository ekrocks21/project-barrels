<template>
 <v-container>
  <v-layout>
    <v-flex xs12 sm12 mt-3>
      <v-card class="mb-5" flat>
        <v-card-media src="/static/about.png" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
          <h5 class="secondary--text mb-0">{{ userProfile.fullName }}</h5>
          <p class="primary--text mb-0">{{ userProfile.email }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
        <v-btn
          v-if="userShop !== false"
          fab
          small
          style="color: #212121"
          v-bind:href="'/shops/' + userShop.shopId">
          <v-icon>store</v-icon>
        </v-btn>  
        <v-spacer></v-spacer>
          <v-btn class="info--text" flat="flat" @click="onLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
 </v-container> 
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        photo: '',
        userId: '',
        name: '',
        email: '',
        user: {}
      }
    },
    created () {
      this.user = firebase.auth().currentUser
      if (this.user) {
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
      }
    },
    computed: {
      userInfo () {
        return this.$store.getters.user
      },
      userIsFollowing () {
        return this.$store.getters.user.followedUsers
      },
      userProfile () {
        return this.$store.getters.userProfile[0]
      },
      userShop () {
        return this.$store.getters.userShop
      },
      shops () {
        return this.$store.getters.loadedShops
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>

