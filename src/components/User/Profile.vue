<template>
  <v-layout>
    <v-flex xs12 sm12 mt-3>
      <v-card class="mb-5" flat>
        <v-card-media src="/static/about.png" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 
            class="headline mb-0"
            >
            {{ email }}</h3>
            <h3 
            class="headline mb-0"
            >
            {{ user.displayName }}</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
    props: ['id'],
    created () {
      this.user = firebase.auth().currentUser
      if (this.user) {
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
      }
    }
  }
</script>

