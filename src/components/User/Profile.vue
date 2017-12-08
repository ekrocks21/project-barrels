<template>
 <v-container>
   <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="secondary--text mt-5"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
  <v-layout row wrap v-else>
    <v-flex xs12 sm12 mt-5>
      <v-card class="mb-5" >

        <!-- Cover Image & Profile Image -->

        <v-card-media id="coverImage" :src="userProfile.coverImage" height="200px">
         <v-card-actions>
           <v-btn class="ml-3"  fab small dark v-tooltip:right="{ html: 'add a cover image' }"><v-icon>photo_camera</v-icon></v-btn></v-btn>
           <v-spacer></v-spacer>
                <template>
                  <v-spacer></v-spacer>
                    <edit-profile :userProfile="userProfile"></edit-profile>
                </template>
        </v-card-actions>
        <div id="avatar">
          <img :src="userProfile.profileImage" height="100"/>
        </div>
        </v-card-media>
      
      <!-- Profile Name & Logout -->

        <v-card-actions primary-title class="pl-4 pt-3 pb-0 mb-0">
          <div>
          <h5 class="mb-2" id="userName">@{{ userProfile.userName }}
            <v-btn small icon flat fab class="mb-2" v-tooltip:right="{ html: 'verified giver' }">
              <v-icon class="secondary--text">verified_user</v-icon>
              </v-btn>
            </h5>
          </div>
          <v-spacer></v-spacer>
          <v-btn class="light--text mb-2 mr-2" flat="flat" @click="onLogout">Logout</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
 </v-container> 
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      userInfo () {
        return this.$store.getters.user
      },
      userProfile () {
        return this.$store.getters.userProfile[0]
      },
      loading () {
        return this.$store.getters.loading
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

<style scoped>
#avatar {
    text-align: center;
    background-size: cover;
    margin: 0 auto;
    background-position: top center;

    /* round the edges to a circle with border radius 1/2 container size */
    border-radius: 50%;
}

#coverImage {
  background-color: #212121;
}


#userName {
  color: #212121;
  font-size: 26px;
  font-family: 'Product Sans';
  text-transform: lowercase;
}


</style>

